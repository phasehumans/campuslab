#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    if (n > 0) {
        k = k % n;
    }
    vector<int> rotated(n);
    for (int i = 0; i < n; i++) {
        rotated[(i + k) % n] = arr[i];
    }
    for (int i = 0; i < n; i++) {
        cout << rotated[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}
