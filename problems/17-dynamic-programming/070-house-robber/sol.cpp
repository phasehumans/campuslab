#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<long long> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        if (n == 1) {
            cout << nums[0] << "\n";
            return 0;
        }
        long long prev2 = 0, prev1 = 0;
        for (int i = 0; i < n; i++) {
            long long curr = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        cout << prev1 << "\n";
    }
    return 0;
}
