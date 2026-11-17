#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    long long max_val = -2e18;
    for (int i = 0; i < n; i++) {
        long long val;
        cin >> val;
        max_val = max(max_val, val);
    }
    cout << max_val << "\n";
    return 0;
}
