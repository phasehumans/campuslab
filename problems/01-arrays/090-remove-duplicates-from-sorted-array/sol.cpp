#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    if (n == 0) {
        cout << 0 << "\n\n";
        return 0;
    }
    int m = 1;
    for (int i = 1; i < n; i++) {
        if (arr[i] != arr[i - 1]) {
            arr[m] = arr[i];
            m++;
        }
    }
    cout << m << "\n";
    for (int i = 0; i < m; i++) {
        cout << arr[i] << (i == m - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}
