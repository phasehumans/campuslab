#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];
    int left = 0, right = n - 1;
    long long left_max = 0, right_max = 0;
    long long ans = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= left_max) {
                left_max = height[left];
            } else {
                ans += (left_max - height[left]);
            }
            left++;
        } else {
            if (height[right] >= right_max) {
                right_max = height[right];
            } else {
                ans += (right_max - height[right]);
            }
            right--;
        }
    }
    cout << ans << "\n";
    return 0;
}
