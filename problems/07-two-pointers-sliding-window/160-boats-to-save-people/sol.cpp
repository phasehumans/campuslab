#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, limit;
    if (!(cin >> n >> limit)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    sort(arr.begin(), arr.end());
    int l = 0, r = n - 1;
    int boats = 0;
    while (l <= r) {
        if (l == r) {
            boats++;
            break;
        }
        if (arr[l] + arr[r] <= limit) {
            l++;
        }
        r--;
        boats++;
    }
    cout << boats << "\n";
    return 0;
}
