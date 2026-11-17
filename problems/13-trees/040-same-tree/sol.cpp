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
bool isSame(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p->val == q->val && isSame(p->left, q->left) && isSame(p->right, q->right);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string l1, l2;
    if (getline(cin, l1) && getline(cin, l2)) {
        TreeNode* p = buildTree(l1);
        TreeNode* q = buildTree(l2);
        cout << (isSame(p, q) ? "true" : "false") << "\n";
    }
    return 0;
}
