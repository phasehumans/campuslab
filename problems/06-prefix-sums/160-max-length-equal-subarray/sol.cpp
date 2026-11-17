#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    unordered_map<int, int> m;
    m[0] = -1;
    int max_len = 0;
    int curr_sum = 0;
    for (int i = 0; i < n; i++) {
        curr_sum += (nums[i] == 1 ? 1 : -1);
        if (m.count(curr_sum)) {
            max_len = max(max_len, i - m[curr_sum]);
        } else {
            m[curr_sum] = i;
        }
    }
    cout << max_len << "\n";
    return 0;
}
