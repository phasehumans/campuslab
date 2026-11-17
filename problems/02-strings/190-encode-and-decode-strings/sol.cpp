#include <bits/stdc++.h>
using namespace std;

void trim_cr(string& s) {
    if (!s.empty() && s.back() == '\r') {
        s.pop_back();
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string line;
    if (!getline(cin, line)) return 0;
    trim_cr(line);
    if (line.empty()) return 0;
    int n = stoi(line);
    vector<string> strs(n);
    for (int i = 0; i < n; i++) {
        getline(cin, strs[i]);
        trim_cr(strs[i]);
    }
    string encoded = "";
    for (const string& s : strs) {
        encoded += to_string(s.length()) + "#" + s;
    }
    cout << encoded.length() << "\n";
    cout << encoded << "\n";
    
    // Decode
    vector<string> decoded;
    int i = 0;
    int total_len = encoded.length();
    while (i < total_len) {
        int j = i;
        while (j < total_len && encoded[j] != '#') {
            j++;
        }
        int len = stoi(encoded.substr(i, j - i));
        decoded.push_back(encoded.substr(j + 1, len));
        i = j + 1 + len;
    }
    for (const string& s : decoded) {
        cout << s << "\n";
    }
    return 0;
}
