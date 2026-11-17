#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (cin >> n >> m) {
        vector<vector<long long>> grid(n, vector<long long>(m));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cin >> grid[i][j];
            }
        }
        vector<long long> dp = grid[0];
        for (int i = 1; i < n; i++) {
            vector<long long> next_dp(m);
            for (int j = 0; j < m; j++) {
                long long best = dp[j];
                if (j > 0) best = max(best, dp[j-1]);
                if (j < m - 1) best = max(best, dp[j+1]);
                next_dp[j] = grid[i][j] + best;
            }
            dp = next_dp;
        }
        long long ans = dp[0];
        for (int j = 1; j < m; j++) {
            ans = max(ans, dp[j]);
        }
        cout << ans << "\n";
    }
    return 0;
}
