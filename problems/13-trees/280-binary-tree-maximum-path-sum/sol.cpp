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
int maxPathSumDFS(TreeNode* root, int& maxSum) {
    if (!root) return 0;
    int left = max(0, maxPathSumDFS(root->left, maxSum));
    int right = max(0, maxPathSumDFS(root->right, maxSum));
    maxSum = max(maxSum, root->val + left + right);
    return root->val + max(left, right);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        int maxSum = -1e9;
        maxPathSumDFS(root, maxSum);
        cout << maxSum << "\n";
    }
    return 0;
}
