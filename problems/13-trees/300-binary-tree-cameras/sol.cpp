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
int minCam(TreeNode* r, int& cameras) {
    if (!r) return 2;
    int left = minCam(r->left, cameras);
    int right = minCam(r->right, cameras);
    if (left == 0 || right == 0) {
        cameras++;
        return 1;
    }
    if (left == 1 || right == 1) {
        return 2;
    }
    return 0;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        int cameras = 0;
        if (minCam(root, cameras) == 0) {
            cameras++;
        }
        cout << cameras << "\n";
    }
    return 0;
}
