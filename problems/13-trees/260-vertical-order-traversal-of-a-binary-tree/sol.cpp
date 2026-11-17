#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
struct Info { int col, row, val; };
bool comp(const Info& a, const Info& b) {
    if (a.col != b.col) return a.col < b.col;
    if (a.row != b.row) return a.row < b.row;
    return a.val < b.val;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        if (!root) return 0;
        vector<Info> nodes;
        queue<pair<TreeNode*, pair<int, int>>> q;
        q.push({root, {0, 0}});
        while (!q.empty()) {
            auto curr = q.front(); q.pop();
            TreeNode* node = curr.first;
            int col = curr.second.first, row = curr.second.second;
            nodes.push_back({col, row, node->val});
            if (node->left) q.push({node->left, {col - 1, row + 1}});
            if (node->right) q.push({node->right, {col + 1, row + 1}});
        }
        sort(nodes.begin(), nodes.end(), comp);
        int i = 0, n = nodes.size();
        while (i < n) {
            int c = nodes[i].col;
            vector<int> col_vals;
            while (i < n && nodes[i].col == c) {
                col_vals.push_back(nodes[i].val);
                i++;
            }
            for (size_t k = 0; k < col_vals.size(); k++) cout << col_vals[k] << (k + 1 == col_vals.size() ? "" : " ");
            cout << "\n";
        }
    }
    return 0;
}
