#include <bits/stdc++.h>
using namespace std;
int total = 0;
int cols = 0, diag1 = 0, diag2 = 0;
void solve(int row, int n) {
    if (row == n) {
        total++;
        return;
    }
    for (int col = 0; col < n; col++) {
        int cBit = 1 << col;
        int d1Bit = 1 << (row - col + n - 1);
        int d2Bit = 1 << (row + col);
        if (!(cols & cBit) && !(diag1 & d1Bit) && !(diag2 & d2Bit)) {
            cols |= cBit;
            diag1 |= d1Bit;
            diag2 |= d2Bit;
            solve(row + 1, n);
            cols &= ~cBit;
            diag1 &= ~d1Bit;
            diag2 &= ~d2Bit;
        }
    }
}
int main() {
    int n;
    if (cin >> n) {
        solve(0, n);
        cout << total << "\n";
    }
    return 0;
}
