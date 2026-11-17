#include <bits/stdc++.h>
using namespace std;
int n;
int grid[10][10];
bool visited[10][10];
int dr[] = {-1, 1, 0, 0};
int dc[] = {0, 0, -1, 1};
int dfs(int r, int c) {
    if (r == n - 1 && c == n - 1) return 1;
    int count = 0;
    for (int i = 0; i < 4; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1 && !visited[nr][nc]) {
            visited[nr][nc] = true;
            count += dfs(nr, nc);
            visited[nr][nc] = false;
        }
    }
    return count;
}
int main() {
    if (cin >> n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cin >> grid[i][j];
            }
        }
        if (grid[0][0] == 0 || grid[n-1][n-1] == 0) {
            cout << 0 << "\n";
            return 0;
        }
        memset(visited, 0, sizeof(visited));
        visited[0][0] = true;
        cout << dfs(0, 0) << "\n";
    }
    return 0;
}
