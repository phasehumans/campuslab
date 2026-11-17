#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000007;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n, r;
    if (cin >> n >> r) {
        if (r < 0 || r > n) {
            cout << 0 << "\n";
            return 0;
        }
        long long ans = 1;
        for (long long i = n - r + 1; i <= n; i++) {
            ans = (ans * i) % MOD;
        }
        cout << ans << "\n";
    }
    return 0;
}
