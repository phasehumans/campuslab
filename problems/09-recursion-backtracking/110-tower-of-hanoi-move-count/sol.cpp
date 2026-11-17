#include <bits/stdc++.h>
using namespace std;
long long hanoi(int n) {
    if (n == 1) return 1;
    return 2LL * hanoi(n - 1) + 1;
}
int main() {
    int n;
    if (cin >> n) {
        cout << hanoi(n) << "\n";
    }
    return 0;
}
