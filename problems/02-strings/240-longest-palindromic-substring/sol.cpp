#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    int n = s.length();
    if (n == 0) return 0;
    int start = 0, max_len = 1;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) {
            l--;
            r++;
        }
        return r - l - 1;
    };
    for (int i = 0; i < n; i++) {
        int len1 = expand(i, i);
        int len2 = expand(i, i + 1);
        int len = max(len1, len2);
        if (len > max_len) {
            max_len = len;
            start = i - (len - 1) / 2;
        }
    }
    cout << s.substr(start, max_len) << "\n";
    return 0;
}
