#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v); adj[v].push_back(u);
    }
    int src, dst; cin >> src >> dst;
    if (src == dst) { cout << "true\n"; return 0; }
    vector<bool> vis(n, false);
    queue<int> q; q.push(src); vis[src] = true;
    bool found = false;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (u == dst) { found = true; break; }
        for (int v : adj[u]) {
            if (!vis[v]) { vis[v] = true; q.push(v); }
        }
    }
    cout << (found ? "true" : "false") << "\n";
}
