#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, W;
    if (cin >> n >> W) {
        vector<int> val(n), wt(n);
        for (int i = 0; i < n; i++) cin >> val[i];
        for (int i = 0; i < n; i++) cin >> wt[i];
        vector<long long> dp(W + 1, 0);
        for (int i = 0; i < n; i++) {
            for (int j = W; j >= wt[i]; j--) {
                dp[j] = max(dp[j], dp[j - wt[i]] + val[i]);
            }
        }
        cout << dp[W] << "\n";
    }
    return 0;
}
