#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000007;

long long power(long long base, long long exp) {
    long long res = 1;
    base %= MOD;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % MOD;
        base = (base * base) % MOD;
        exp /= 2;
    }
    return res;
}

long long modInverse(long long n) {
    return power(n, MOD - 2);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n, r;
    if (cin >> n >> r) {
        if (r < 0 || r > n) {
            cout << 0 << "\n";
            return 0;
        }
        if (r == 0 || r == n) {
            cout << 1 << "\n";
            return 0;
        }
        long long fact_n = 1;
        for (int i = 1; i <= n; i++) fact_n = (fact_n * i) % MOD;
        
        long long fact_r = 1;
        for (int i = 1; i <= r; i++) fact_r = (fact_r * i) % MOD;
        
        long long fact_n_r = 1;
        for (int i = 1; i <= n - r; i++) fact_n_r = (fact_n_r * i) % MOD;
        
        long long ans = fact_n * modInverse(fact_r) % MOD * modInverse(fact_n_r) % MOD;
        cout << ans << "\n";
    }
    return 0;
}
