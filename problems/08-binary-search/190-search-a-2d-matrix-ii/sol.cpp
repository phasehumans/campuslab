#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int m, n;
    long long target;
    if (!(cin >> m >> n >> target)) return 0;
    vector<vector<long long>> matrix(m, vector<long long>(n));
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    int r = 0, c = n - 1;
    bool found = false;
    while (r < m && c >= 0) {
        if (matrix[r][c] == target) {
            found = true;
            break;
        } else if (matrix[r][c] > target) {
            c--;
        } else {
            r++;
        }
    }
    cout << (found ? "true" : "false") << "\n";
    return 0;
}
