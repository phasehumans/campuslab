#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    long long k;
    cin >> k;
    unordered_map<long long, long long> counts;
    counts[0] = 1;
    long long curr_sum = 0;
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        curr_sum += nums[i];
        long long rem = ((curr_sum % k) + k) % k;
        ans += counts[rem];
        counts[rem]++;
    }
    cout << ans << "\n";
    return 0;
}
