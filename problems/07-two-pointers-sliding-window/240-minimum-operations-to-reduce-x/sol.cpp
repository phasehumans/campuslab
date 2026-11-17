#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long x;
    if (!(cin >> n >> x)) return 0;
    vector<long long> arr(n);
    long long total = 0;
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        total += arr[i];
    }
    long long target = total - x;
    if (target < 0) {
        cout << -1 << "\n";
        return 0;
    }
    if (target == 0) {
        cout << n << "\n";
        return 0;
    }
    int max_len = -1;
    long long curr_sum = 0;
    int left = 0;
    for (int right = 0; right < n; right++) {
        curr_sum += arr[right];
        while (curr_sum > target && left <= right) {
            curr_sum -= arr[left];
            left++;
        }
        if (curr_sum == target) {
            max_len = max(max_len, right - left + 1);
        }
    }
    if (max_len != -1) {
        cout << n - max_len << "\n";
    } else {
        cout << -1 << "\n";
    }
    return 0;
}
