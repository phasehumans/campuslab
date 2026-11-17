#include <bits/stdc++.h>
using namespace std;
int main() {
    int r, c; if (!(cin >> r >> c)) return 0;
    vector<vector<int>> g(r, vector<int>(c));
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) cin >> g[i][j];
    int sr, sc, newColor; cin >> sr >> sc >> newColor;
    int orig = g[sr][sc];
    if (orig != newColor) {
        queue<pair<int, int>> q; q.push({sr, sc}); g[sr][sc] = newColor;
        int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
        while (!q.empty()) {
            auto [cr, cc] = q.front(); q.pop();
            for (int d = 0; d < 4; d++) {
                int nr = cr + dr[d], nc = cc + dc[d];
                if (nr >= 0 && nr < r && nc >= 0 && nc < c && g[nr][nc] == orig) {
                    g[nr][nc] = newColor; q.push({nr, nc});
                }
            }
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) cout << g[i][j] << (j + 1 == c ? "" : " ");
        cout << "\n";
    }
}
