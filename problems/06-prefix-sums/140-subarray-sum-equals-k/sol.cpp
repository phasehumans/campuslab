#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    unordered_map<long long, int> m;
    m[0] = 1;
    long long current_sum = 0;
    long long count = 0;
    for (int i = 0; i < n; i++) {
        current_sum += nums[i];
        if (m.count(current_sum - k)) {
            count += m[current_sum - k];
        }
        m[current_sum]++;
    }
    cout << count << "\n";
    return 0;
}
