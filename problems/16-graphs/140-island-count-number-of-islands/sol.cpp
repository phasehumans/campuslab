#include <bits/stdc++.h>
using namespace std;
int main() {
    int r, c; if (!(cin >> r >> c)) return 0;
    vector<vector<int>> g(r, vector<int>(c));
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) cin >> g[i][j];
    int count = 0;
    vector<vector<bool>> vis(r, vector<bool>(c, false));
    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (g[i][j] == 1 && !vis[i][j]) {
                count++;
                queue<pair<int, int>> q; q.push({i, j}); vis[i][j] = true;
                while (!q.empty()) {
                    auto [cr, cc] = q.front(); q.pop();
                    for (int d = 0; d < 4; d++) {
                        int nr = cr + dr[d], nc = cc + dc[d];
                        if (nr >= 0 && nr < r && nc >= 0 && nc < c && g[nr][nc] == 1 && !vis[nr][nc]) {
                            vis[nr][nc] = true; q.push({nr, nc});
                        }
                    }
                }
            }
        }
    }
    cout << count << "\n";
}
