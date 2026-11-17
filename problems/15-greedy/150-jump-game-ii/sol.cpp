#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    if (n <= 1) {
        cout << 0 << "\n";
        return 0;
    }
    int jumps = 0, cur_end = 0, cur_far = 0;
    for (int i = 0; i < n - 1; i++) {
        cur_far = max(cur_far, i + nums[i]);
        if (i == cur_end) {
            jumps++;
            cur_end = cur_far;
            if (cur_end >= n - 1) break;
        }
    }
    cout << jumps << "\n";
    return 0;
}
