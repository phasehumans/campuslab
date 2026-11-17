#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* deserializePreorder(const vector<string>& tokens, int& i) {
    if (i >= tokens.size() || tokens[i] == "null") { i++; return nullptr; }
    TreeNode* root = new TreeNode(stoi(tokens[i++]));
    root->left = deserializePreorder(tokens, i);
    root->right = deserializePreorder(tokens, i);
    return root;
}
void printTree(TreeNode* root) {
    if (!root) { cout << "null\n"; return; }
    vector<string> res; queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        TreeNode* curr = q.front(); q.pop();
        if (curr) {
            res.push_back(to_string(curr->val));
            q.push(curr->left); q.push(curr->right);
        } else res.push_back("null");
    }
    while (!res.empty() && res.back() == "null") res.pop_back();
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\n";
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        stringstream ss(line); string val; vector<string> tokens;
        while (ss >> val) tokens.push_back(val);
        int i = 0;
        TreeNode* root = deserializePreorder(tokens, i);
        printTree(root);
    }
    return 0;
}
