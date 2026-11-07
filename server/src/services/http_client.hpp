#pragma once

#include <string>
#include <vector>
#include <iostream>
#include <curl/curl.h>

namespace campuslab {

class HttpClient {
public:
    static size_t write_callback(void* contents, size_t size, size_t nmemb, void* userp) {
        size_t total = size * nmemb;
        std::string* s = static_cast<std::string*>(userp);
        s->append(static_cast<char*>(contents), total);
        return total;
    }

    static std::string post_json(const std::string& url, const std::string& payload, const std::vector<std::string>& headers = {}) {
        CURL* curl = curl_easy_init();
        std::string response;
        if (!curl) return "";

        struct curl_slist* chunk = nullptr;
        chunk = curl_slist_append(chunk, "Content-Type: application/json");
        chunk = curl_slist_append(chunk, "Accept: application/json");
        chunk = curl_slist_append(chunk, "User-Agent: CampusLab-OAuth");
        for (const auto& h : headers) {
            chunk = curl_slist_append(chunk, h.c_str());
        }

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, chunk);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 10L);

        CURLcode res = curl_easy_perform(curl);
        if (res != CURLE_OK) {
            std::cerr << "[HttpClient] POST " << url << " failed: " << curl_easy_strerror(res) << std::endl;
        }

        curl_slist_free_all(chunk);
        curl_easy_cleanup(curl);
        return response;
    }

    static std::string get(const std::string& url, const std::vector<std::string>& headers = {}) {
        CURL* curl = curl_easy_init();
        std::string response;
        if (!curl) return "";

        struct curl_slist* chunk = nullptr;
        chunk = curl_slist_append(chunk, "Accept: application/json");
        chunk = curl_slist_append(chunk, "User-Agent: CampusLab-OAuth");
        for (const auto& h : headers) {
            chunk = curl_slist_append(chunk, h.c_str());
        }

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, chunk);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 10L);

        CURLcode res = curl_easy_perform(curl);
        if (res != CURLE_OK) {
            std::cerr << "[HttpClient] GET " << url << " failed: " << curl_easy_strerror(res) << std::endl;
        }

        curl_slist_free_all(chunk);
        curl_easy_cleanup(curl);
        return response;
    }
};

} // namespace campuslab
