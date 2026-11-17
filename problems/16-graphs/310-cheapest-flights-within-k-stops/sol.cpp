#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; if (!(cin >> n >> m)) return 0;
    vector<tuple<int, int, int>> flights;
    for (int i = 0; i < m; i++) {
        int u, v, w; cin >> u >> v >> w; flights.push_back({u, v, w});
    }
    int src, dst, k; cin >> src >> dst >> k;
    vector<int> dist(n, 1e9); dist[src] = 0;
    for (int i = 0; i <= k; i++) {
        vector<int> temp = dist;
        for (auto [u, v, w] : flights) {
            if (dist[u] != 1e9 && dist[u] + w < temp[v]) temp[v] = dist[u] + w;
        }
        dist = temp;
    }
    cout << (dist[dst] == 1e9 ? -1 : dist[dst]) << "\n";
}
