#include <bits/stdc++.h>
using namespace std;

int board[81];
int rowMask[9], colMask[9], boxMask[9];

inline int boxOf(int r, int c) { return (r / 3) * 3 + c / 3; }

bool solve() {
    // choose the empty cell with the fewest legal digits
    int best = -1, bestOpts = 0, bestCnt = 10;
    for (int i = 0; i < 81; i++) {
        if (board[i]) continue;
        int r = i / 9, c = i % 9;
        int opts = ~(rowMask[r] | colMask[c] | boxMask[boxOf(r, c)]) & 0x3FE;
        int cnt = __builtin_popcount(opts);
        if (cnt < bestCnt) {
            best = i; bestOpts = opts; bestCnt = cnt;
            if (cnt <= 1) break;
        }
    }
    if (best == -1) return true;
    if (bestCnt == 0) return false;
    int r = best / 9, c = best % 9, b = boxOf(r, c);
    for (int v = 1; v <= 9; v++) {
        int bit = 1 << v;
        if (!(bestOpts & bit)) continue;
        board[best] = v;
        rowMask[r] |= bit; colMask[c] |= bit; boxMask[b] |= bit;
        if (solve()) return true;
        rowMask[r] ^= bit; colMask[c] ^= bit; boxMask[b] ^= bit;
        board[best] = 0;
    }
    return false;
}

int main() {
    for (int i = 0; i < 81; i++) {
        char ch;
        cin >> ch;
        board[i] = (ch == '.') ? 0 : ch - '0';
        if (board[i]) {
            int r = i / 9, c = i % 9, bit = 1 << board[i];
            rowMask[r] |= bit; colMask[c] |= bit; boxMask[boxOf(r, c)] |= bit;
        }
    }
    solve();
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) cout << board[r * 9 + c] << (c == 8 ? "\n" : " ");
    }
    return 0;
}
