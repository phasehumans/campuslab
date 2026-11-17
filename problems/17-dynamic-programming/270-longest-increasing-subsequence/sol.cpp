#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        if (n == 0) {
            cout << 0 << "\n";
            return 0;
        }
        vector<int> sub;
        for (int x : nums) {
            auto it = lower_bound(sub.begin(), sub.end(), x);
            if (it == sub.end()) {
                sub.push_back(x);
            } else {
                *it = x;
            }
        }
        cout << sub.size() << "\n";
    }
    return 0;
}
