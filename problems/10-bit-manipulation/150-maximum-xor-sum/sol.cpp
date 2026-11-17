#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<unsigned long long> basis(62, 0);
        for (int i = 0; i < n; i++) {
            unsigned long long x;
            cin >> x;
            for (int bit = 61; bit >= 0; bit--) {
                if ((x >> bit) & 1) {
                    if (!basis[bit]) {
                        basis[bit] = x;
                        break;
                    }
                    x ^= basis[bit];
                }
            }
        }
        unsigned long long ans = 0;
        for (int bit = 61; bit >= 0; bit--) {
            if ((ans ^ basis[bit]) > ans) {
                ans ^= basis[bit];
            }
        }
        cout << ans << "\n";
    }
    return 0;
}
