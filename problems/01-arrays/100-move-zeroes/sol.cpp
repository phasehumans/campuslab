#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int write_idx = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] != 0) {
            arr[write_idx++] = arr[i];
        }
    }
    while (write_idx < n) {
        arr[write_idx++] = 0;
    }
    for (int i = 0; i < n; i++) {
        cout << arr[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}
