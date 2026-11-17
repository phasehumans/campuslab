#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums.begin(), nums.end());
    int low = 0;
    int high = nums.back() - nums[0];
    while (low < high) {
        int mid = low + (high - low) / 2;
        long long count = 0;
        int l = 0;
        for (int r = 0; r < n; r++) {
            while (nums[r] - nums[l] > mid) {
                l++;
            }
            count += (r - l);
        }
        if (count >= k) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    cout << low << "\n";
    return 0;
}
