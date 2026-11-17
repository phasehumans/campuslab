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
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}

struct SubtreeInfo {
    bool isBST;
    int minVal;
    int maxVal;
    int sum;
};

int maxSum = 0;

SubtreeInfo solveBST(TreeNode* root) {
    if (!root) {
        return {true, INT_MAX, INT_MIN, 0};
    }
    auto left = solveBST(root->left);
    auto right = solveBST(root->right);
    if (left.isBST && right.isBST && root->val > left.maxVal && root->val < right.minVal) {
        int currSum = left.sum + right.sum + root->val;
        maxSum = max(maxSum, currSum);
        int minV = root->left ? left.minVal : root->val;
        int maxV = root->right ? right.maxVal : root->val;
        return {true, minV, maxV, currSum};
    }
    return {false, 0, 0, 0};
}

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        maxSum = 0;
        solveBST(root);
        cout << maxSum << "\n";
    }
    return 0;
}
