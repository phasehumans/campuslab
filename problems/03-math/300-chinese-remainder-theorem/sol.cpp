#include <bits/stdc++.h>
using namespace std;

long long extGCD(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long g = extGCD(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

long long modInverse(long long a, long long m) {
    long long x, y;
    extGCD(a, m, x, y);
    return (x % m + m) % m;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k;
    if (cin >> k) {
        vector<long long> num(k);
        vector<long long> rem(k);
        for (int i = 0; i < k; i++) cin >> num[i];
        for (int i = 0; i < k; i++) cin >> rem[i];
        
        long long prod = 1;
        for (int i = 0; i < k; i++) prod *= num[i];
        
        long long ans = 0;
        for (int i = 0; i < k; i++) {
            long long p = prod / num[i];
            long long inv = modInverse(p, num[i]);
            long long term = (rem[i] * inv) % num[i];
            
            unsigned __int128 term_p = (unsigned __int128)term * p;
            long long term_p_mod = (long long)(term_p % prod);
            
            ans = (ans + term_p_mod) % prod;
        }
        cout << ans << "\n";
    }
    return 0;
}
