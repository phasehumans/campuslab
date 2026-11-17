#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* build(const vector<int>& pre, const vector<int>& in, int& preIdx, int inStart, int inEnd) {
    if (inStart > inEnd) return nullptr;
    int val = pre[preIdx++];
    TreeNode* root = new TreeNode(val);
    int inIdx = inStart;
    while (in[inIdx] != val) inIdx++;
    root->left = build(pre, in, preIdx, inStart, inIdx - 1);
    root->right = build(pre, in, preIdx, inIdx + 1, inEnd);
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
    int n; if (cin >> n) {
        vector<int> pre(n), in(n);
        for (int i = 0; i < n; i++) cin >> pre[i];
        for (int i = 0; i < n; i++) cin >> in[i];
        int preIdx = 0;
        TreeNode* root = build(pre, in, preIdx, 0, n - 1);
        printTree(root);
    }
    return 0;
}
