#pragma once

#include <iostream>
#include <memory>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <chrono>
#include <pqxx/pqxx>

namespace campuslab {

class DbConnectionPool {
public:
    class ConnectionGuard {
    public:
        ConnectionGuard(DbConnectionPool& pool, std::unique_ptr<pqxx::connection> conn)
            : pool_(pool), conn_(std::move(conn)) {}

        ~ConnectionGuard() {
            if (conn_) {
                pool_.return_connection(std::move(conn_));
            }
        }

        ConnectionGuard(const ConnectionGuard&) = delete;
        ConnectionGuard& operator=(const ConnectionGuard&) = delete;

        ConnectionGuard(ConnectionGuard&& other) noexcept
            : pool_(other.pool_), conn_(std::move(other.conn_)) {}

        ConnectionGuard& operator=(ConnectionGuard&& other) noexcept {
            if (this != &other) {
                if (conn_) {
                    pool_.return_connection(std::move(conn_));
                }
                conn_ = std::move(other.conn_);
            }
            return *this;
        }

        pqxx::connection& get() { return *conn_; }
        pqxx::connection* operator->() { return conn_.get(); }

    private:
        DbConnectionPool& pool_;
        std::unique_ptr<pqxx::connection> conn_;
    };

    DbConnectionPool(const std::string& db_url, size_t pool_size = 10)
        : db_url_(db_url), pool_size_(pool_size) {
        std::cout << "[DbPool] Initializing connection pool (size: " << pool_size_ << ")..." << std::endl;
        for (size_t i = 0; i < pool_size_; ++i) {
            auto conn = create_connection();
            if (conn) {
                pool_.push(std::move(conn));
            }
        }
        std::cout << "[DbPool] Initialized with " << pool_.size() << " healthy connections." << std::endl;
    }

    ~DbConnectionPool() {
        std::lock_guard<std::mutex> lock(mutex_);
        while (!pool_.empty()) {
            pool_.pop();
        }
    }

    size_t available_count() {
        std::lock_guard<std::mutex> lock(mutex_);
        return pool_.size();
    }

    ConnectionGuard acquire(std::chrono::milliseconds timeout = std::chrono::milliseconds(5000)) {
        std::unique_lock<std::mutex> lock(mutex_);
        if (!cv_.wait_for(lock, timeout, [this] { return !pool_.empty(); })) {
            // Timeout - try creating an emergency connection if pool exhausted
            std::cout << "[DbPool] Warning: connection pool wait timeout, attempting to create emergency connection" << std::endl;
            auto emergency_conn = create_connection();
            if (emergency_conn) {
                return ConnectionGuard(*this, std::move(emergency_conn));
            }
            throw std::runtime_error("Database connection pool exhausted and timed out");
        }

        auto conn = std::move(pool_.front());
        pool_.pop();

        // Verify connection is still alive, recreate if broken
        if (!conn || !conn->is_open()) {
            std::cout << "[DbPool] Reconnecting dead connection..." << std::endl;
            conn = create_connection();
        }

        return ConnectionGuard(*this, std::move(conn));
    }

private:
    void return_connection(std::unique_ptr<pqxx::connection> conn) {
        std::lock_guard<std::mutex> lock(mutex_);
        if (conn && conn->is_open() && pool_.size() < pool_size_) {
            pool_.push(std::move(conn));
            cv_.notify_one();
        }
    }

    std::unique_ptr<pqxx::connection> create_connection() {
        try {
            return std::make_unique<pqxx::connection>(db_url_);
        } catch (const std::exception& e) {
            std::cerr << "[DbPool] Failed to connect to DB: " << e.what() << std::endl;
            return nullptr;
        }
    }

    std::string db_url_;
    size_t pool_size_;
    std::queue<std::unique_ptr<pqxx::connection>> pool_;
    std::mutex mutex_;
    std::condition_variable cv_;
};

} // namespace campuslab
