#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> nums(n);
        int sum = 0;
        for (int i = 0; i < n; i++) {
            cin >> nums[i];
            sum += nums[i];
        }
        if (sum % 2 != 0) {
            cout << "false\n";
            return 0;
        }
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int x : nums) {
            for (int j = target; j >= x; j--) {
                if (dp[j - x]) {
                    dp[j] = true;
                }
            }
        }
        cout << (dp[target] ? "true" : "false") << "\n";
    }
    return 0;
}
