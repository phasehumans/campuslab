#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];
    long long max_water = 0;
    int left = 0, right = n - 1;
    while (left < right) {
        long long h = min(height[left], height[right]);
        max_water = max(max_water, h * (right - left));
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    cout << max_water << "\n";
    return 0;
}
