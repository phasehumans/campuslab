#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    if (cin >> n) {
        long long result = n;
        long long temp = n;
        for (long long p = 2; p * p <= temp; p++) {
            if (temp % p == 0) {
                while (temp % p == 0) {
                    temp /= p;
                }
                result -= result / p;
            }
        }
        if (temp > 1) {
            result -= result / temp;
        }
        cout << result << "\n";
    }
    return 0;
}
