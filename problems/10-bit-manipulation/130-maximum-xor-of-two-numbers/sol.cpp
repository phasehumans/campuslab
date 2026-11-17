#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int maxXor = 0, mask = 0;
    for (int i = 30; i >= 0; i--) {
        mask |= (1 << i);
        unordered_set<int> prefixes;
        for (int num : nums) prefixes.insert(num & mask);
        int candidate = maxXor | (1 << i);
        for (int p : prefixes) {
            if (prefixes.count(candidate ^ p)) {
                maxXor = candidate;
                break;
            }
        }
    }
    cout << maxXor << endl;
    return 0;
}
