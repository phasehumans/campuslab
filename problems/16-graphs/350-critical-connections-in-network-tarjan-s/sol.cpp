#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    // Iterative Tarjan bridge finding (no deep recursion).
    vector<int> tin(n, -1), low(n, 0), parent(n, -1), it(n, 0);
    vector<pair<int, int>> bridges;
    int timer = 0;
    for (int s = 0; s < n; s++) {
        if (tin[s] != -1) continue;
        vector<int> st = {s};
        tin[s] = low[s] = timer++;
        while (!st.empty()) {
            int u = st.back();
            if (it[u] < (int)adj[u].size()) {
                int v = adj[u][it[u]++];
                if (v == parent[u]) continue;
                if (tin[v] != -1) {
                    low[u] = min(low[u], tin[v]);
                } else {
                    parent[v] = u;
                    tin[v] = low[v] = timer++;
                    st.push_back(v);
                }
            } else {
                st.pop_back();
                int p = parent[u];
                if (p != -1) {
                    low[p] = min(low[p], low[u]);
                    if (low[u] > tin[p]) bridges.push_back({min(u, p), max(u, p)});
                }
            }
        }
    }
    sort(bridges.begin(), bridges.end());
    for (auto& b : bridges) cout << b.first << " " << b.second << "\n";
}
