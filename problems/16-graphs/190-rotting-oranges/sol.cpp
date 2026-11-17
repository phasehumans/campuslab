#include <bits/stdc++.h>
using namespace std;
int main() {
    int r, c; if (!(cin >> r >> c)) return 0;
    vector<vector<int>> g(r, vector<int>(c));
    queue<pair<int, int>> q; int fresh = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> g[i][j];
            if (g[i][j] == 2) q.push({i, j});
            else if (g[i][j] == 1) fresh++;
        }
    }
    int mins = 0;
    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
    while (!q.empty() && fresh > 0) {
        int sz = q.size(); mins++;
        for (int i = 0; i < sz; i++) {
            auto [cr, cc] = q.front(); q.pop();
            for (int d = 0; d < 4; d++) {
                int nr = cr + dr[d], nc = cc + dc[d];
                if (nr >= 0 && nr < r && nc >= 0 && nc < c && g[nr][nc] == 1) {
                    g[nr][nc] = 2; fresh--; q.push({nr, nc});
                }
            }
        }
    }
    cout << (fresh == 0 ? mins : -1) << "\n";
}
