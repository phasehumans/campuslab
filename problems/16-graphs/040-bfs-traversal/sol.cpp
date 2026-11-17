#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v); adj[v].push_back(u);
    }
    for (int i = 0; i < n; i++) sort(adj[i].begin(), adj[i].end());
    vector<int> res; vector<bool> vis(n, false);
    queue<int> q; q.push(0); vis[0] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop(); res.push_back(u);
        for (int v : adj[u]) {
            if (!vis[v]) { vis[v] = true; q.push(v); }
        }
    }
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\n";
}
