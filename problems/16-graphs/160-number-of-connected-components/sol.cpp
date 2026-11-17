#include <bits/stdc++.h>
using namespace std;
int find_set(int v, vector<int>& parent) {
    if (v == parent[v]) return v;
    return parent[v] = find_set(parent[v], parent);
}
int main() {
    int n, m; if (!(cin >> n >> m)) return 0;
    vector<int> parent(n); iota(parent.begin(), parent.end(), 0);
    int comp = n;
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        int r1 = find_set(u, parent), r2 = find_set(v, parent);
        if (r1 != r2) { parent[r1] = r2; comp--; }
    }
    cout << comp << "\n";
}
