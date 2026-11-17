#include <bits/stdc++.h>
using namespace std;
unsigned long long fact(int n) {
    if (n <= 1) return 1;
    return (unsigned long long)n * fact(n - 1);
}
int main() {
    int n;
    if (cin >> n) {
        cout << fact(n) << "\n";
    }
    return 0;
}
