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

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long a, m;
    if (cin >> a >> m) {
        if (m <= 1) {
            cout << -1 << "\n";
            return 0;
        }
        long long x, y;
        long long g = extGCD(a, m, x, y);
        if (g != 1) {
            cout << -1 << "\n";
        } else {
            cout << (x % m + m) % m << "\n";
        }
    }
    return 0;
}
