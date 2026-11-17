#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000007;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        if (n == 1) {
            cout << 0 << "\n";
            return 0;
        }
        if (n == 2) {
            cout << 1 << "\n";
            return 0;
        }
        long long prev2 = 0;
        long long prev1 = 1;
        for (int i = 3; i <= n; i++) {
            long long curr = ((i - 1) * (prev1 + prev2)) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        cout << prev1 << "\n";
    }
    return 0;
}
