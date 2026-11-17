#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long x, n, m;
    if (cin >> x >> n >> m) {
        if (m == 1) {
            cout << 0 << "\n";
            return 0;
        }
        long long res = 1;
        x %= m;
        while (n > 0) {
            if (n & 1) {
                res = (res * x) % m;
            }
            x = (x * x) % m;
            n >>= 1;
        }
        cout << res << "\n";
    }
    return 0;
}
