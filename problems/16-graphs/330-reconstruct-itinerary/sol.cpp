#include <bits/stdc++.h>
using namespace std;
void dfs(string u, unordered_map<string, vector<string>>& adj, vector<string>& path) {
    while (adj.count(u) && !adj[u].empty()) {
        string v = adj[u].back(); adj[u].pop_back(); dfs(v, adj, path);
    }
    path.push_back(u);
}
int main() {
    int n; if (!(cin >> n)) return 0;
    unordered_map<string, vector<string>> adj;
    for (int i = 0; i < n; i++) {
        string u, v; cin >> u >> v; adj[u].push_back(v);
    }
    for (auto& pair : adj) sort(pair.second.rbegin(), pair.second.rend());
    vector<string> path; dfs("JFK", adj, path);
    reverse(path.begin(), path.end());
    for (int i = 0; i < path.size(); i++) cout << path[i] << (i + 1 == path.size() ? "" : " ");
    cout << "\n";
}
