#include <bits/stdc++.h>
using namespace std;
long long sumDigits(long long n) {
    if (n == 0) return 0;
    return (n % 10) + sumDigits(n / 10);
}
int main() {
    long long n;
    if (cin >> n) {
        if (n == 0) cout << 0 << "\n";
        else cout << sumDigits(n) << "\n";
    }
    return 0;
}
