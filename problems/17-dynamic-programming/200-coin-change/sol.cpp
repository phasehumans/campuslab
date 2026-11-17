#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, amount;
    if (cin >> n >> amount) {
        vector<int> coins(n);
        for (int i = 0; i < n; i++) cin >> coins[i];
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i >= c) {
                    dp[i] = min(dp[i], dp[i - c] + 1);
                }
            }
        }
        cout << (dp[amount] > amount ? -1 : dp[amount]) << "\n";
    }
    return 0;
}
