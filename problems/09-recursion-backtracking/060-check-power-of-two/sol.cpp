#include <bits/stdc++.h>
using namespace std;
bool isPowerOfTwo(long long n) {
    if (n <= 0) return false;
    if (n == 1) return true;
    if (n % 2 != 0) return false;
    return isPowerOfTwo(n / 2);
}
int main() {
    long long n;
    if (cin >> n) {
        cout << (isPowerOfTwo(n) ? "true" : "false") << "\n";
    }
    return 0;
}
