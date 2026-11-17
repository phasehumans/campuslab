#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n); vector<int> deg(n, 0);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v; adj[u].push_back(v); deg[v]++;
    }
    queue<int> q; int count = 0;
    for (int i = 0; i < n; i++) { if (deg[i] == 0) q.push(i); }
    while (!q.empty()) {
        int u = q.front(); q.pop(); count++;
        for (int v : adj[u]) { if (--deg[v] == 0) q.push(v); }
    }
    cout << (count == n ? "true" : "false") << "\n";
}
