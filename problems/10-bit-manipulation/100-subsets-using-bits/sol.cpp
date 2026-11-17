#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    for (int mask = 0; mask < (1 << n); mask++) {
        bool first = true;
        for (int j = 0; j < n; j++) {
            if (mask & (1 << j)) {
                if (!first) cout << " ";
                cout << arr[j];
                first = false;
            }
        }
        cout << "\n";
    }
    return 0;
}
