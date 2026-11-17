#include <bits/stdc++.h>
using namespace std;
int m, n;
vector<string> board;
string word;
bool dfs(int r, int c, int idx) {
    if (idx == word.length()) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word[idx]) return false;
    char temp = board[r][c];
    board[r][c] = '#';
    bool found = dfs(r-1, c, idx+1) || dfs(r+1, c, idx+1) || dfs(r, c-1, idx+1) || dfs(r, c+1, idx+1);
    board[r][c] = temp;
    return found;
}
int main() {
    if (cin >> m >> n) {
        board.resize(m);
        for (int i = 0; i < m; i++) {
            board[i].resize(n);
            for (int j = 0; j < n; j++) {
                cin >> board[i][j];
            }
        }
        cin >> word;
        bool exists = false;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(i, j, 0)) {
                    exists = true;
                    break;
                }
            }
            if (exists) break;
        }
        cout << (exists ? "true" : "false") << "\n";
    }
    return 0;
}
