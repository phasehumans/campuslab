#pragma once

#include <string>
#include <vector>
#include <sstream>
#include <chrono>
#include <crypt.h>
#include <openssl/hmac.h>
#include <openssl/evp.h>
#include <openssl/bio.h>
#include <openssl/buffer.h>
#include "json.hpp"

namespace campuslab {

using json = nlohmann::json;

class AuthHelper {
public:
    static std::string base64_url_encode(const std::string& in) {
        BIO *bio, *b64;
        BUF_MEM *bufferPtr;
        b64 = BIO_new(BIO_f_base64());
        BIO_set_flags(b64, BIO_FLAGS_BASE64_NO_NL);
        bio = BIO_new(BIO_s_mem());
        bio = BIO_push(b64, bio);
        BIO_write(bio, in.data(), in.size());
        BIO_flush(bio);
        BIO_get_mem_ptr(bio, &bufferPtr);
        std::string res(bufferPtr->data, bufferPtr->length);
        BIO_free_all(bio);

        for (char& c : res) {
            if (c == '+') c = '-';
            else if (c == '/') c = '_';
        }
        while (!res.empty() && res.back() == '=') res.pop_back();
        return res;
    }

    static std::string base64_url_decode(std::string in) {
        for (char& c : in) {
            if (c == '-') c = '+';
            else if (c == '_') c = '/';
        }
        while (in.size() % 4 != 0) {
            in.push_back('=');
        }

        BIO *bio, *b64;
        char buffer[1024];
        b64 = BIO_new(BIO_f_base64());
        BIO_set_flags(b64, BIO_FLAGS_BASE64_NO_NL);
        bio = BIO_new_mem_buf(in.data(), in.size());
        bio = BIO_push(b64, bio);
        int decoded_len = BIO_read(bio, buffer, sizeof(buffer));
        BIO_free_all(bio);

        if (decoded_len > 0) {
            return std::string(buffer, decoded_len);
        }
        return "";
    }

    static std::string hmac_sha256(const std::string& data, const std::string& key) {
        unsigned char hash[EVP_MAX_MD_SIZE];
        unsigned int length = 0;
        HMAC(EVP_sha256(), key.data(), key.size(),
             reinterpret_cast<const unsigned char*>(data.data()), data.size(),
             hash, &length);
        return std::string(reinterpret_cast<char*>(hash), length);
    }

    static std::string sign_jwt(const std::string& user_id, const std::string& role, const std::string& secret) {
        json header = {{"alg", "HS256"}, {"typ", "JWT"}};
        auto now = std::chrono::system_clock::now();
        auto exp = now + std::chrono::hours(24 * 7); // 7 days

        int64_t iat_sec = std::chrono::duration_cast<std::chrono::seconds>(now.time_since_epoch()).count();
        int64_t exp_sec = std::chrono::duration_cast<std::chrono::seconds>(exp.time_since_epoch()).count();

        json payload = {
            {"id", user_id},
            {"role", role},
            {"iat", iat_sec},
            {"exp", exp_sec}
        };

        std::string encoded_header = base64_url_encode(header.dump());
        std::string encoded_payload = base64_url_encode(payload.dump());
        std::string to_sign = encoded_header + "." + encoded_payload;
        std::string signature = base64_url_encode(hmac_sha256(to_sign, secret));

        return to_sign + "." + signature;
    }

    static bool verify_jwt(const std::string& token, const std::string& secret, std::string& user_id, std::string& role) {
        auto first_dot = token.find('.');
        if (first_dot == std::string::npos) return false;
        auto second_dot = token.find('.', first_dot + 1);
        if (second_dot == std::string::npos) return false;

        std::string to_sign = token.substr(0, second_dot);
        std::string expected_sig = base64_url_encode(hmac_sha256(to_sign, secret));
        std::string token_sig = token.substr(second_dot + 1);

        if (expected_sig != token_sig) {
            return false;
        }

        std::string payload_str = base64_url_decode(token.substr(first_dot + 1, second_dot - first_dot - 1));
        try {
            auto payload = json::parse(payload_str);
            int64_t exp_sec = payload.value("exp", 0LL);
            auto now_sec = std::chrono::duration_cast<std::chrono::seconds>(
                std::chrono::system_clock::now().time_since_epoch()
            ).count();

            if (exp_sec < now_sec) {
                return false; // Expired
            }

            user_id = payload.value("id", "");
            role = payload.value("role", "USER");
            return !user_id.empty();
        } catch (...) {
            return false;
        }
    }

    static std::string hash_password(const std::string& password) {
        char salt_setting[32] = {0};
        crypt_gensalt_rn("$2b$", 10, nullptr, 0, salt_setting, sizeof(salt_setting));
        char hash_buf[128] = {0};
        struct crypt_data data;
        data.initialized = 0;
        char* res = crypt_r(password.c_str(), salt_setting, &data);
        if (res) return std::string(res);
        return "";
    }

    static bool verify_password(const std::string& password, const std::string& hash) {
        struct crypt_data data;
        data.initialized = 0;
        char* res = crypt_r(password.c_str(), hash.c_str(), &data);
        return res != nullptr && std::string(res) == hash;
    }
};

} // namespace campuslab
