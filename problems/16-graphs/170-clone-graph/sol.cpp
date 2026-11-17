#include <bits/stdc++.h>
using namespace std;
struct Node {
    int val; vector<Node*> neighbors;
    Node(int v) : val(v) {}
};
Node* clone(Node* node, unordered_map<int, Node*>& vis) {
    if (!node) return nullptr;
    if (vis.count(node->val)) return vis[node->val];
    Node* copy = new Node(node->val); vis[node->val] = copy;
    for (auto nbr : node->neighbors) copy->neighbors.push_back(clone(nbr, vis));
    return copy;
}
int main() {
    int n, m; if (!(cin >> n >> m)) return 0;
    vector<Node*> nodes(n);
    for (int i = 0; i < n; i++) nodes[i] = new Node(i);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        nodes[u]->neighbors.push_back(nodes[v]);
        nodes[v]->neighbors.push_back(nodes[u]);
    }
    unordered_map<int, Node*> vis;
    if (n > 0) clone(nodes[0], vis);
    for (int i = 0; i < n; i++) {
        cout << i << ":";
        if (vis.count(i)) {
            vector<int> nbrs;
            for (auto nbr : vis[i]->neighbors) nbrs.push_back(nbr->val);
            sort(nbrs.begin(), nbrs.end());
            for (int val : nbrs) cout << " " << val;
        }
        cout << "\n";
    }
}
