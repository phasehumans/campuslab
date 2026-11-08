#include <iostream>
#include <cassert>
#include <string>
#include <chrono>
#include <thread>
#include <vector>
#include <future>
#include <atomic>
#include <stdexcept>
#include <pqxx/pqxx>
#include "crow_all.h"
#include "json.hpp"
#include "types.hpp"
#include "auth_helper.hpp"
#include "../../server/src/config/app_config.hpp"
#include "../../server/src/db/connection_pool.hpp"
#include "../../server/src/middleware/rate_limiter.hpp"
#include "../../server/src/middleware/auth_middleware.hpp"
#include "../../server/src/middleware/cors.hpp"

using namespace campuslab;
using json = nlohmann::json;

#define TEST_ASSERT(cond, msg) \
    do { \
        if (!(cond)) { \
            std::cerr << "[-] FAILED: " << msg << " (" << #cond << ") at line " << __LINE__ << std::endl; \
            exit(1); \
        } else { \
            std::cout << "[+] PASSED: " << msg << std::endl; \
        } \
    } while(0)

int main() {
    std::cout << "==========================================================" << std::endl;
    std::cout << "  Campus Lab - Server Middleware & Connection Pool Tests  " << std::endl;
    std::cout << "==========================================================" << std::endl;

    AppConfig cfg = AppConfig::load_from_env();

    // -------------------------------------------------------------
    // 1. RateLimiter Sliding Window & Multi-Client Isolation
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing RateLimiter Sliding Window & Multi-Client Isolation..." << std::endl;
    {
        RateLimiter limiter(3, 1); // 3 requests per 1-second window

        // Client A: Requests 1, 2, 3 allowed
        auto r1 = limiter.check_limit("client_A");
        TEST_ASSERT(r1.allowed && r1.remaining == 2, "Req 1 allowed, 2 remaining");
        auto r2 = limiter.check_limit("client_A");
        TEST_ASSERT(r2.allowed && r2.remaining == 1, "Req 2 allowed, 1 remaining");
        auto r3 = limiter.check_limit("client_A");
        TEST_ASSERT(r3.allowed && r3.remaining == 0, "Req 3 allowed, 0 remaining");

        // Client A: 4th request rejected
        auto r4 = limiter.check_limit("client_A");
        TEST_ASSERT(!r4.allowed && r4.remaining == 0, "Req 4 rejected");
        TEST_ASSERT(r4.retry_after_seconds >= 1, "Retry after is positive");

        // Client B: Unaffected by Client A's block
        auto rb = limiter.check_limit("client_B");
        TEST_ASSERT(rb.allowed && rb.remaining == 2, "Client B unaffected by Client A (bucket isolation)");

        // Client C with Unicode key
        auto rc = limiter.check_limit("用户_123");
        TEST_ASSERT(rc.allowed && rc.remaining == 2, "Unicode client key isolated and allowed");

        // Wait 1.1s for Client A's window to expire
        std::this_thread::sleep_for(std::chrono::milliseconds(1100));
        auto r5 = limiter.check_limit("client_A");
        TEST_ASSERT(r5.allowed && r5.remaining == 2, "Client A allowed again after window expiration");
    }

    // -------------------------------------------------------------
    // 2. RateLimiter Multithreaded Concurrency Under Load
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing RateLimiter Multithreaded Concurrency Under Load..." << std::endl;
    {
        const int limit = 50;
        RateLimiter concurrent_limiter(limit, 2);
        std::atomic<int> allowed_count{0};
        std::atomic<int> rejected_count{0};

        std::vector<std::thread> workers;
        for (int i = 0; i < 20; ++i) {
            workers.emplace_back([&]() {
                for (int j = 0; j < 5; ++j) {
                    auto res = concurrent_limiter.check_limit("shared_client");
                    if (res.allowed) {
                        allowed_count++;
                    } else {
                        rejected_count++;
                    }
                }
            });
        }

        for (auto& w : workers) w.join();

        TEST_ASSERT(allowed_count.load() == limit, "Exactly " + std::to_string(limit) + " concurrent requests allowed");
        TEST_ASSERT(rejected_count.load() == (100 - limit), "Exactly 50 concurrent requests rejected");
    }

    // -------------------------------------------------------------
    // 3. RateLimiter Client IP Extraction Precedence & IPv6
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing RateLimiter Client IP Extraction & Header Precedence..." << std::endl;
    {
        // 3a. Multi-hop X-Forwarded-For extracts first IP
        crow::request req1;
        req1.add_header("X-Forwarded-For", "203.0.113.195, 70.41.3.18, 150.172.238.178");
        req1.add_header("X-Real-IP", "10.0.0.1");
        req1.remote_ip_address = "127.0.0.1";
        TEST_ASSERT(RateLimiter::get_client_ip(req1) == "203.0.113.195", "Extracts first client IP in multi-hop list");

        // 3b. X-Forwarded-For multi-hop extraction
        crow::request req1b;
        req1b.add_header("X-Forwarded-For", "198.51.100.42, 10.0.0.1");
        TEST_ASSERT(RateLimiter::get_client_ip(req1b) == "198.51.100.42", "Extracts first IP before comma");

        // 3c. IPv6 address in X-Forwarded-For
        crow::request req1c;
        req1c.add_header("X-Forwarded-For", "2001:db8:85a3::8a2e:370:7334, 127.0.0.1");
        TEST_ASSERT(RateLimiter::get_client_ip(req1c) == "2001:db8:85a3::8a2e:370:7334", "IPv6 address extracted properly");

        // 3d. X-Real-IP used when X-Forwarded-For absent
        crow::request req2;
        req2.add_header("X-Real-IP", "172.16.254.1");
        req2.remote_ip_address = "127.0.0.1";
        TEST_ASSERT(RateLimiter::get_client_ip(req2) == "172.16.254.1", "X-Real-IP used when X-Forwarded-For absent");

        // 3e. remote_ip_address fallback
        crow::request req3;
        req3.remote_ip_address = "192.168.1.50";
        TEST_ASSERT(RateLimiter::get_client_ip(req3) == "192.168.1.50", "remote_ip_address used when headers absent");

        // 3f. Default 127.0.0.1 fallback
        crow::request req4;
        req4.remote_ip_address = "";
        TEST_ASSERT(RateLimiter::get_client_ip(req4) == "127.0.0.1", "Default 127.0.0.1 returned when all empty");
    }

    // -------------------------------------------------------------
    // 4. CORSMiddleware Allowed Origins, Disallowed Origins & Preflight
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing CORSMiddleware Allowed Origins & Preflight..." << std::endl;
    {
        CORSMiddleware cors;
        CORSMiddleware::context ctx;

        // 4a. OPTIONS preflight request
        crow::request req_opt;
        req_opt.method = crow::HTTPMethod::OPTIONS;
        req_opt.add_header("Origin", "http://localhost:5173");
        crow::response res_opt;
        cors.before_handle(req_opt, res_opt, ctx);
        TEST_ASSERT(res_opt.code == 204, "OPTIONS preflight returns 204 No Content");
        TEST_ASSERT(res_opt.get_header_value("Access-Control-Allow-Origin") == "http://localhost:5173", "Allow-Origin header set");
        TEST_ASSERT(res_opt.get_header_value("Access-Control-Allow-Credentials") == "true", "Credentials set to true");
        TEST_ASSERT(res_opt.get_header_value("Access-Control-Allow-Methods").find("POST") != std::string::npos, "Methods header set");

        // 4b. Allowed origin: production
        crow::request r_prod;
        r_prod.add_header("Origin", "https://lab.trydecember.com");
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(r_prod) == "https://lab.trydecember.com", "lab.trydecember.com allowed");

        // 4c. Allowed origin: dev port 4000
        crow::request r_local;
        r_local.add_header("Origin", "http://127.0.0.1:4000");
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(r_local) == "http://127.0.0.1:4000", "127.0.0.1:4000 allowed");

        // 4d. Custom origin reflected
        crow::request r_custom;
        r_custom.add_header("Origin", "https://custom-client.com");
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(r_custom) == "https://custom-client.com", "Custom origin returned");

        // 4e. Missing origin header -> defaults safely
        crow::request r_empty;
        TEST_ASSERT(CORSMiddleware::get_allowed_origin(r_empty) == "http://localhost:5173", "Missing origin defaults to http://localhost:5173");
    }

    // -------------------------------------------------------------
    // 5. DbConnectionPool Move Semantics, Exhaustion Timeout & Concurrent Acquisition
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing DbConnectionPool Move Semantics & Exhaustion..." << std::endl;
    {
        DbConnectionPool pool(cfg.db_url, 3);
        TEST_ASSERT(pool.available_count() == 3, "Initial available count is 3");

        // 5a. Move constructor
        auto g1 = pool.acquire();
        TEST_ASSERT(pool.available_count() == 2, "2 available after g1 acquire");
        DbConnectionPool::ConnectionGuard g_moved(std::move(g1));
        {
            pqxx::work txn(g_moved.get());
            auto r = txn.exec("SELECT 777");
            TEST_ASSERT(r[0][0].as<int>() == 777, "Moved guard executes query successfully");
        }

        // 5b. Move assignment
        auto g2 = pool.acquire();
        TEST_ASSERT(pool.available_count() == 1, "1 available after g2 acquire");
        g2 = std::move(g_moved);
        {
            pqxx::work txn(g2.get());
            auto r = txn.exec("SELECT 888");
            TEST_ASSERT(r[0][0].as<int>() == 888, "Move-assigned guard executes query successfully");
        }

        // 5c. Concurrent worker checkouts and releases
        std::vector<std::thread> pool_workers;
        std::atomic<int> success_queries{0};
        for (int i = 0; i < 9; ++i) {
            pool_workers.emplace_back([&, i]() {
                auto guard = pool.acquire();
                pqxx::work txn(guard.get());
                auto r = txn.exec("SELECT " + std::to_string(i + 1));
                if (r[0][0].as<int>() == (i + 1)) {
                    success_queries++;
                }
            });
        }
        for (auto& w : pool_workers) w.join();

        TEST_ASSERT(success_queries.load() == 9, "All 9 concurrent pool workers succeeded");
        TEST_ASSERT(pool.available_count() >= 1, "Pool capacity restored after worker completion");

        // 5d. Exhaustion timeout with dead pool
        DbConnectionPool dead_pool("postgresql://invalid_host_xyz_99:5432/bad_db", 1);
        bool timeout_hit = false;
        try {
            dead_pool.acquire(std::chrono::milliseconds(50));
        } catch (const std::runtime_error& e) {
            timeout_hit = true;
            TEST_ASSERT(std::string(e.what()).find("exhausted and timed out") != std::string::npos, "Exception message specifies timeout");
        }
        TEST_ASSERT(timeout_hit, "Dead pool acquire throws runtime_error within timeout");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL MIDDLEWARE & POOL UNIT TESTS PASSED (100%)!         " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}
