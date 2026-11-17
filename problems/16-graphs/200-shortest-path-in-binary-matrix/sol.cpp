#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; if (!(cin >> n)) return 0;
    vector<vector<int>> g(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> g[i][j];
    if (g[0][0] != 0 || g[n-1][n-1] != 0) { cout << "-1\n"; return 0; }
    queue<tuple<int, int, int>> q; q.push({0, 0, 1});
    vector<vector<bool>> vis(n, vector<bool>(n, false)); vis[0][0] = true;
    bool found = false;
    while (!q.empty()) {
        auto [r, c, d] = q.front(); q.pop();
        if (r == n - 1 && c == n - 1) { cout << d << "\n"; found = true; break; }
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if (dr == 0 && dc == 0) continue;
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && g[nr][nc] == 0 && !vis[nr][nc]) {
                    vis[nr][nc] = true; q.push({nr, nc, d + 1});
                }
            }
        }
    }
    if (!found) cout << "-1\n";
}
