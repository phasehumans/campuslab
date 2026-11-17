#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s, t;
    if (!(cin >> s >> t)) return 0;
    vector<int> target(256, 0);
    vector<int> current(256, 0);
    for (char c : t) target[(unsigned char)c]++;
    int required = 0;
    for (int i = 0; i < 256; i++) {
        if (target[i] > 0) required++;
    }
    int left = 0, right = 0;
    int formed = 0;
    int min_len = 1e9;
    int best_left = 0;
    while (right < (int)s.length()) {
        char c = s[right];
        current[(unsigned char)c]++;
        if (target[(unsigned char)c] > 0 && current[(unsigned char)c] == target[(unsigned char)c]) {
            formed++;
        }
        while (left <= right && formed == required) {
            char cl = s[left];
            if (right - left + 1 < min_len) {
                min_len = right - left + 1;
                best_left = left;
            }
            current[(unsigned char)cl]--;
            if (target[(unsigned char)cl] > 0 && current[(unsigned char)cl] < target[(unsigned char)cl]) {
                formed--;
            }
            left++;
        }
        right++;
    }
    if (min_len == 1e9) {
        cout << "\n";
    } else {
        cout << s.substr(best_left, min_len) << "\n";
    }
    return 0;
}
