#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int m, n;
    if (cin >> m >> n) {
        vector<long long> dp(n, 1);
        long long MOD = 1000000007;
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] = (dp[j] + dp[j-1]) % MOD;
            }
        }
        cout << dp[n-1] << "\n";
    }
    return 0;
}
