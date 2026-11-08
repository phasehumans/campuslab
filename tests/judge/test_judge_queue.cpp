#include <iostream>
#include <cassert>
#include <string>
#include <vector>
#include <chrono>
#include <thread>
#include <atomic>
#include <json.hpp>
#include <hiredis/hiredis.h>
#include "types.hpp"
#include "../../judge/src/config/worker_config.hpp"
#include "../../judge/src/queue/redis_consumer.hpp"

using json = nlohmann::json;
using namespace campuslab;

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
    std::cout << "   Campus Lab - Judge Redis Queue & Consumer Tests        " << std::endl;
    std::cout << "==========================================================" << std::endl;

    WorkerConfig cfg = WorkerConfig::load_from_env();
    std::string unique_queue = "test_queue_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());

    // -------------------------------------------------------------
    // 1. Connection & Lifecycle
    // -------------------------------------------------------------
    std::cout << "\n[1] Testing RedisQueueConsumer Lifecycle & Connection..." << std::endl;
    {
        RedisQueueConsumer consumer(cfg.redis_host, cfg.redis_port, unique_queue);
        TEST_ASSERT(consumer.ensure_connected(), "RedisQueueConsumer connects successfully");
    }

    // -------------------------------------------------------------
    // 2. Empty Queue BRPOP Timeout Handling
    // -------------------------------------------------------------
    std::cout << "\n[2] Testing Empty Queue Timeout (BRPOP)..." << std::endl;
    {
        RedisQueueConsumer consumer(cfg.redis_host, cfg.redis_port, unique_queue);
        auto start = std::chrono::steady_clock::now();
        auto job = consumer.pop_job(1); // 1 second timeout
        auto elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - start).count();

        TEST_ASSERT(!job.has_value(), "Empty queue pop returns nullopt");
        TEST_ASSERT(elapsed >= 800 && elapsed <= 2500, "BRPOP blocked for approximately 1 second (elapsed: " + std::to_string(elapsed) + "ms)");
    }

    // -------------------------------------------------------------
    // 3. FIFO Ingestion & Delivery
    // -------------------------------------------------------------
    std::cout << "\n[3] Testing FIFO Queue Ordering..." << std::endl;
    {
        RedisQueueConsumer consumer(cfg.redis_host, cfg.redis_port, unique_queue);

        // Direct Redis client to push jobs (LPUSH)
        redisContext* r_ctx = redisConnect(cfg.redis_host.c_str(), cfg.redis_port);
        TEST_ASSERT(r_ctx && !r_ctx->err, "Helper client connected to Redis");

        std::vector<std::string> job_ids = {"job_alpha", "job_beta", "job_gamma", "job_delta"};
        for (const auto& jid : job_ids) {
            json j = {{"submissionId", jid}, {"type", "SUBMIT"}};
            std::string payload = j.dump();
            // LPUSH pushes to head; BRPOP pops from tail -> FIFO
            redisReply* rep = (redisReply*)redisCommand(r_ctx, "LPUSH %s %s", unique_queue.c_str(), payload.c_str());
            TEST_ASSERT(rep != nullptr, "LPUSH succeeded for " + jid);
            freeReplyObject(rep);
        }

        // Pop via consumer and check order
        for (size_t i = 0; i < job_ids.size(); ++i) {
            auto popped = consumer.pop_job(1);
            TEST_ASSERT(popped.has_value(), "Popped job #" + std::to_string(i));
            auto parsed = json::parse(*popped);
            TEST_ASSERT(parsed["submissionId"] == job_ids[i], "FIFO preserved: expected " + job_ids[i] + " got " + parsed["submissionId"].get<std::string>());
        }

        // Verify queue is now empty
        auto empty_pop = consumer.pop_job(1);
        TEST_ASSERT(!empty_pop.has_value(), "Queue is empty after reading all items");

        redisFree(r_ctx);
    }

    // -------------------------------------------------------------
    // 4. Result Caching & TTL Enforcement
    // -------------------------------------------------------------
    std::cout << "\n[4] Testing Result Caching & TTLs..." << std::endl;
    {
        RedisQueueConsumer consumer(cfg.redis_host, cfg.redis_port, unique_queue);
        std::string sub_id = "cache_test_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        
        json result_data = {
            {"allPassed", true},
            {"status", "Accepted"},
            {"executionTime", "0.015s"},
            {"memoryUsage", "3.2 MB"}
        };
        consumer.cache_result(sub_id, result_data.dump(), 60);

        // Verify key exists and TTL is set in Redis
        redisContext* r_ctx = redisConnect(cfg.redis_host.c_str(), cfg.redis_port);
        std::string cache_key = "job_result:" + sub_id;
        redisReply* rep_get = (redisReply*)redisCommand(r_ctx, "GET %s", cache_key.c_str());
        TEST_ASSERT(rep_get && rep_get->type == REDIS_REPLY_STRING, "Cached result retrieved from Redis");
        auto retrieved_json = json::parse(rep_get->str);
        TEST_ASSERT(retrieved_json["status"] == "Accepted", "Retrieved cached status is Accepted");
        TEST_ASSERT(retrieved_json["allPassed"] == true, "Retrieved cached allPassed is true");
        freeReplyObject(rep_get);

        redisReply* rep_ttl = (redisReply*)redisCommand(r_ctx, "TTL %s", cache_key.c_str());
        TEST_ASSERT(rep_ttl && rep_ttl->type == REDIS_REPLY_INTEGER, "TTL reply is integer");
        TEST_ASSERT(rep_ttl->integer > 0 && rep_ttl->integer <= 60, "TTL is set correctly between 1 and 60 seconds");
        freeReplyObject(rep_ttl);

        // Cleanup key
        redisReply* rep_del = (redisReply*)redisCommand(r_ctx, "DEL %s", cache_key.c_str());
        freeReplyObject(rep_del);
        redisFree(r_ctx);
    }

    // -------------------------------------------------------------
    // 5. Real-Time Pub/Sub Messaging
    // -------------------------------------------------------------
    std::cout << "\n[5] Testing Redis Pub/Sub Submission Updates..." << std::endl;
    {
        std::string sub_id = "pubsub_test_" + std::to_string(std::chrono::system_clock::now().time_since_epoch().count());
        std::string expected_msg = "{\"status\":\"Compiling\"}";

        std::atomic<bool> subscriber_ready{false};
        std::atomic<bool> message_received{false};
        std::string received_payload;

        std::thread sub_thread([&]() {
            redisContext* sub_ctx = redisConnect(cfg.redis_host.c_str(), cfg.redis_port);
            if (!sub_ctx || sub_ctx->err) return;

            std::string channel = "submission_updates:" + sub_id;
            redisReply* reply = (redisReply*)redisCommand(sub_ctx, "SUBSCRIBE %s", channel.c_str());
            if (reply) freeReplyObject(reply);

            subscriber_ready = true;

            // Wait for published message
            void* raw_reply = nullptr;
            if (redisGetReply(sub_ctx, &raw_reply) == REDIS_OK && raw_reply) {
                redisReply* pub_reply = (redisReply*)raw_reply;
                if (pub_reply->type == REDIS_REPLY_ARRAY && pub_reply->elements == 3) {
                    received_payload = pub_reply->element[2]->str;
                    message_received = true;
                }
                freeReplyObject(pub_reply);
            }
            redisFree(sub_ctx);
        });

        // Wait until subscriber is ready
        while (!subscriber_ready) {
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(50)); // let SUBSCRIBE register in Redis

        // Publish update via consumer
        RedisQueueConsumer consumer(cfg.redis_host, cfg.redis_port, unique_queue);
        consumer.publish_update(sub_id, expected_msg);

        sub_thread.join();

        TEST_ASSERT(message_received, "PubSub subscriber received message");
        TEST_ASSERT(received_payload == expected_msg, "Received PubSub payload matches published payload");
    }

    // -------------------------------------------------------------
    // 6. Large & Complex Payloads
    // -------------------------------------------------------------
    std::cout << "\n[6] Testing Large Payload Serialization & Transport..." << std::endl;
    {
        RedisQueueConsumer consumer(cfg.redis_host, cfg.redis_port, unique_queue);
        redisContext* r_ctx = redisConnect(cfg.redis_host.c_str(), cfg.redis_port);

        // Generate ~64KB of code and nested testcases
        std::string large_code(65000, '/');
        large_code += "\nint main() { return 0; }";

        json large_job = {
            {"submissionId", "large_payload_sub_1"},
            {"type", "RUN"},
            {"sourceCode", large_code},
            {"testcases", json::array({
                {{"input", "1 2 3"}, {"output", "6"}},
                {{"input", "10 20 30"}, {"output", "60"}}
            })}
        };

        std::string serialized = large_job.dump();
        redisReply* rep = (redisReply*)redisCommand(r_ctx, "LPUSH %s %s", unique_queue.c_str(), serialized.c_str());
        TEST_ASSERT(rep != nullptr, "Large payload LPUSH succeeded");
        freeReplyObject(rep);
        redisFree(r_ctx);

        auto popped = consumer.pop_job(2);
        TEST_ASSERT(popped.has_value(), "Large payload popped successfully");
        auto parsed = json::parse(*popped);
        TEST_ASSERT(parsed["submissionId"] == "large_payload_sub_1", "Parsed large payload submissionId intact");
        TEST_ASSERT(parsed["sourceCode"].get<std::string>().size() == large_code.size(), "Large payload sourceCode length preserved without truncation");
        TEST_ASSERT(parsed["testcases"].size() == 2, "Testcases array preserved in large payload");
    }

    std::cout << "\n==========================================================" << std::endl;
    std::cout << "  ALL JUDGE QUEUE UNIT TESTS PASSED (100%)!               " << std::endl;
    std::cout << "==========================================================" << std::endl;
    return 0;
}
