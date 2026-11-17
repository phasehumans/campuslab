#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int left = 0, zero_count = 0, ans = 0;
    for (int right = 0; right < n; right++) {
        if (arr[right] == 0) {
            zero_count++;
        }
        while (zero_count > k) {
            if (arr[left] == 0) {
                zero_count--;
            }
            left++;
        }
        ans = max(ans, right - left + 1);
    }
    cout << ans << "\n";
    return 0;
}
