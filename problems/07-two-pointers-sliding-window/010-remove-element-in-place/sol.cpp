#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, val;
    if (!(cin >> n >> val)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int k = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] != val) {
            arr[k++] = arr[i];
        }
    }
    sort(arr.begin(), arr.begin() + k);
    cout << k << "\n";
    for (int i = 0; i < k; i++) {
        cout << arr[i] << (i == k - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}
