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
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root);
        bool l2r = true;
        while (!q.empty()) {
            int sz = q.size(); vector<int> lvl(sz);
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front(); q.pop();
                int idx = l2r ? i : (sz - 1 - i);
                lvl[idx] = curr->val;
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            for (int i = 0; i < sz; i++) cout << lvl[i] << (i + 1 == sz ? "" : " ");
            cout << "\n";
            l2r = !l2r;
        }
    }
    return 0;
}
