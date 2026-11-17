#include <bits/stdc++.h>
using namespace std;
void dfs1(int u, const vector<vector<int>>& adj, vector<bool>& vis, vector<int>& order) {
    vis[u] = true;
    for (int v : adj[u]) {
        if (!vis[v]) dfs1(v, adj, vis, order);
    }
    order.push_back(u);
}
void dfs2(int u, const vector<vector<int>>& radj, vector<bool>& vis) {
    vis[u] = true;
    for (int v : radj[u]) {
        if (!vis[v]) dfs2(v, radj, vis);
    }
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n), radj(n);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        radj[v].push_back(u);
    }
    vector<bool> vis(n, false);
    vector<int> order;
    for (int i = 0; i < n; i++) {
        if (!vis[i]) dfs1(i, adj, vis, order);
    }
    fill(vis.begin(), vis.end(), false);
    int scc_count = 0;
    for (int i = n - 1; i >= 0; i--) {
        int u = order[i];
        if (!vis[u]) {
            dfs2(u, radj, vis);
            scc_count++;
        }
    }
    cout << scc_count << "\n";
    return 0;
}
