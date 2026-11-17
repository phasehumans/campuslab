#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    long long MOD = 1000000007;
    for (int i = 0; i < n; i++) {
        long long val;
        cin >> val;
        arr[i] = (val % MOD + MOD) % MOD;
    }
    vector<long long> prefix(n, 1);
    for (int i = 1; i < n; i++) {
        prefix[i] = (prefix[i - 1] * arr[i - 1]) % MOD;
    }
    vector<long long> suffix(n, 1);
    for (int i = n - 2; i >= 0; i--) {
        suffix[i] = (suffix[i + 1] * arr[i + 1]) % MOD;
    }
    for (int i = 0; i < n; i++) {
        long long ans = (prefix[i] * suffix[i]) % MOD;
        cout << ans << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}
