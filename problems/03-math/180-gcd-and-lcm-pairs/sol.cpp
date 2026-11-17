#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long g, l;
    if (cin >> g >> l) {
        if (l % g != 0) {
            cout << 0 << "\n";
            return 0;
        }
        long long d = l / g;
        long long temp = d;
        long long distinct_factors = 0;
        for (long long p = 2; p * p <= temp; p++) {
            if (temp % p == 0) {
                distinct_factors++;
                while (temp % p == 0) {
                    temp /= p;
                }
            }
        }
        if (temp > 1) {
            distinct_factors++;
        }
        cout << (1LL << distinct_factors) << "\n";
    }
    return 0;
}
