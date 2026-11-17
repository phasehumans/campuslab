#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    long long val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(long long x) : val(x) {}
};

TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoll(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoll(v[i])));
        i++;
    }
    return root;
}

void dfs(TreeNode* root, long long currSum, long long targetSum, unordered_map<long long, int>& mp, int& ans) {
    if (!root) return;
    currSum += root->val;
    if (mp.count(currSum - targetSum)) {
        ans += mp[currSum - targetSum];
    }
    mp[currSum]++;
    dfs(root->left, currSum, targetSum, mp, ans);
    dfs(root->right, currSum, targetSum, mp, ans);
    mp[currSum]--;
}

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        long long targetSum;
        if (cin >> targetSum) {
            unordered_map<long long, int> mp;
            mp[0] = 1;
            int ans = 0;
            dfs(root, 0, targetSum, mp, ans);
            cout << ans << "\n";
        }
    }
    return 0;
}
