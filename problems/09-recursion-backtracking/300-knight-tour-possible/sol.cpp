#include <bits/stdc++.h>
using namespace std;
int R, C;
bool visited[10][10];
int dr[] = {-2, -2, -1, -1, 1, 1, 2, 2};
int dc[] = {-1, 1, -2, 2, -2, 2, -1, 1};
bool tour(int r, int c, int count) {
    if (count == R * C) return true;
    for (int i = 0; i < 8; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];
        if (nr >= 0 && nr < R && nc >= 0 && nc < C && !visited[nr][nc]) {
            visited[nr][nc] = true;
            if (tour(nr, nc, count + 1)) return true;
            visited[nr][nc] = false;
        }
    }
    return false;
}
int main() {
    int r, c;
    if (cin >> R >> C >> r >> c) {
        memset(visited, 0, sizeof(visited));
        visited[r][c] = true;
        cout << (tour(r, c, 1) ? "true" : "false") << "\n";
    }
    return 0;
}
