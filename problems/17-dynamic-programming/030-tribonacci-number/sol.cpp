#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        if (n == 0) {
            cout << 0 << "\n";
            return 0;
        }
        if (n == 1 || n == 2) {
            cout << 1 << "\n";
            return 0;
        }
        long long a = 0, b = 1, c = 1;
        long long MOD = 1000000007;
        for (int i = 3; i <= n; i++) {
            long long d = (a + b + c) % MOD;
            a = b;
            b = c;
            c = d;
        }
        cout << c << "\n";
    }
    return 0;
}
