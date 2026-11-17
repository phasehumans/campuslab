#include <bits/stdc++.h>
using namespace std;
bool canSplit(const vector<long long>& nums, int k, long long max_sum) {
    long long current_sum = 0;
    int count = 1;
    for (long long num : nums) {
        if (current_sum + num > max_sum) {
            count++;
            current_sum = num;
            if (count > k) return false;
        } else {
            current_sum += num;
        }
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> nums(n);
    long long low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
        low = max(low, nums[i]);
        high += nums[i];
    }
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (canSplit(nums, k, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\n";
    return 0;
}
