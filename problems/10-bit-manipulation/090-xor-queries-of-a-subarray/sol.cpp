#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    if (cin >> n >> q) {
        vector<long long> pref(n + 1, 0);
        for (int i = 0; i < n; i++) {
            long long val;
            cin >> val;
            pref[i + 1] = pref[i] ^ val;
        }
        for (int i = 0; i < q; i++) {
            int left, right;
            cin >> left >> right;
            cout << (pref[right + 1] ^ pref[left]) << "\n";
        }
    }
    return 0;
}
