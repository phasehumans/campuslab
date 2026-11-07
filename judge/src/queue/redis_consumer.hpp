#pragma once

#include <string>
#include <optional>
#include <iostream>
#include <chrono>
#include <thread>
#include <hiredis/hiredis.h>

namespace campuslab {

class RedisQueueConsumer {
public:
    RedisQueueConsumer(const std::string& host, int port, const std::string& queue_name)
        : host_(host), port_(port), queue_name_(queue_name), redis_(nullptr) {
        connect();
    }

    ~RedisQueueConsumer() {
        if (redis_) {
            redisFree(redis_);
            redis_ = nullptr;
        }
    }

    bool ensure_connected() {
        if (redis_ && !redis_->err) return true;
        return connect();
    }

    std::optional<std::string> pop_job(int timeout_seconds = 2) {
        if (!ensure_connected()) return std::nullopt;

        redisReply* reply = (redisReply*)redisCommand(redis_, "BRPOP %s %d", queue_name_.c_str(), timeout_seconds);
        if (!reply) {
            std::cerr << "[RedisConsumer] Command failed, reconnecting..." << std::endl;
            if (redis_) redisFree(redis_);
            redis_ = nullptr;
            return std::nullopt;
        }

        if (reply->type == REDIS_REPLY_ARRAY && reply->elements == 2) {
            std::string job_json_str = reply->element[1]->str;
            freeReplyObject(reply);
            return job_json_str;
        }

        freeReplyObject(reply);
        return std::nullopt;
    }

    void cache_result(const std::string& submission_id, const std::string& result_json, int ttl_seconds = 120) {
        if (!ensure_connected()) return;
        std::string result_key = "job_result:" + submission_id;
        redisReply* set_reply = (redisReply*)redisCommand(redis_, "SETEX %s %d %s", result_key.c_str(), ttl_seconds, result_json.c_str());
        if (set_reply) freeReplyObject(set_reply);
    }

    void publish_update(const std::string& submission_id, const std::string& result_json) {
        if (!ensure_connected()) return;
        std::string channel = "submission_updates:" + submission_id;
        redisReply* pub_reply = (redisReply*)redisCommand(redis_, "PUBLISH %s %s", channel.c_str(), result_json.c_str());
        if (pub_reply) freeReplyObject(pub_reply);
    }

private:
    bool connect() {
        if (redis_) {
            redisFree(redis_);
            redis_ = nullptr;
        }

        while (!redis_ || redis_->err) {
            if (redis_) {
                redisFree(redis_);
                redis_ = nullptr;
            }
            std::cout << "[RedisConsumer] Connecting to Redis at " << host_ << ":" << port_ << "..." << std::endl;
            redis_ = redisConnect(host_.c_str(), port_);
            if (redis_->err) {
                std::cerr << "[RedisConsumer] Redis connection error: " << redis_->errstr << ". Retrying in 2s..." << std::endl;
                std::this_thread::sleep_for(std::chrono::seconds(2));
            }
        }
        std::cout << "[RedisConsumer] Connected to Redis!" << std::endl;
        return true;
    }

    std::string host_;
    int port_;
    std::string queue_name_;
    redisContext* redis_;
};

} // namespace campuslab
