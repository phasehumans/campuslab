#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) {
        cout << 0 << "\n";
        return 0;
    }
    unordered_set<long long> s;
    for (int i = 0; i < n; i++) {
        long long val;
        cin >> val;
        s.insert(val);
    }
    int longest = 0;
    for (long long x : s) {
        if (!s.count(x - 1)) {
            int current_len = 1;
            long long current_val = x;
            while (s.count(current_val + 1)) {
                current_val++;
                current_len++;
            }
            longest = max(longest, current_len);
        }
    }
    cout << longest << "\n";
    return 0;
}
