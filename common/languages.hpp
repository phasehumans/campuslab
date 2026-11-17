#pragma once

#include <algorithm>
#include <cctype>
#include <string>
#include <vector>

namespace campuslab {

// Languages students can submit in. Shared by the API (validation, labels) and the
// judge (which maps each id to compile/run commands in judge/src/languages.hpp).
// Keep in sync with web/src/data/code.ts.
struct SupportedLanguage {
    const char* id;
    const char* display_name;
};

inline const std::vector<SupportedLanguage>& supported_languages() {
    static const std::vector<SupportedLanguage> langs = {
        {"cpp", "C++20 (GCC 13)"},
        {"c", "C17 (GCC 13)"},
        {"python", "Python 3"},
        {"javascript", "JavaScript (Node 22)"},
        {"typescript", "TypeScript (Node 22)"},
        {"lua", "Lua 5.4"},
        {"perl", "Perl 5"},
        {"ruby", "Ruby 3"},
    };
    return langs;
}

inline const char* kDefaultLanguage = "cpp";

/**
 * Maps a client-supplied value to a supported language id, or "" if unsupported.
 * An empty value means the default (C++), and legacy labels like "C++ (GCC 13)"
 * still resolve to "cpp".
 */
inline std::string normalize_language(std::string raw) {
    std::transform(raw.begin(), raw.end(), raw.begin(), [](unsigned char c) { return std::tolower(c); });
    if (raw.empty() || raw == "c++" || raw.rfind("c++", 0) == 0) return "cpp";
    if (raw == "js" || raw == "node") return "javascript";
    if (raw == "ts") return "typescript";
    if (raw == "py" || raw == "python3") return "python";
    for (const auto& l : supported_languages()) {
        if (raw == l.id) return l.id;
    }
    return "";
}

inline std::string language_display_name(const std::string& id) {
    for (const auto& l : supported_languages()) {
        if (id == l.id) return l.display_name;
    }
    return id;
}

} // namespace campuslab
