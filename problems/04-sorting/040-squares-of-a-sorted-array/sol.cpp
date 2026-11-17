#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    vector<long long> ans(n);
    int left = 0, right = n - 1;
    for (int i = n - 1; i >= 0; i--) {
        if (abs(arr[left]) > abs(arr[right])) {
            ans[i] = arr[left] * arr[left];
            left++;
        } else {
            ans[i] = arr[right] * arr[right];
            right--;
        }
    }
    for (int i = 0; i < n; i++) {
        cout << ans[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}
