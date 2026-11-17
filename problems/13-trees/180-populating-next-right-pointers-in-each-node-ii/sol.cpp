#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr, *next = nullptr;
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
void connectAndPrint(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        int sz = q.size(); TreeNode* prev = nullptr;
        for (int i = 0; i < sz; i++) {
            TreeNode* curr = q.front(); q.pop();
            if (prev) prev->next = curr;
            prev = curr;
            if (curr->left) q.push(curr->left);
            if (curr->right) q.push(curr->right);
        }
    }
    TreeNode* currLevel = root;
    vector<string> parts;
    while (currLevel) {
        TreeNode* temp = currLevel;
        TreeNode* nextLevelStart = nullptr;
        while (temp) {
            parts.push_back(to_string(temp->val));
            if (!nextLevelStart) {
                if (temp->left) nextLevelStart = temp->left;
                else if (temp->right) nextLevelStart = temp->right;
            }
            temp = temp->next;
        }
        parts.push_back("#");
        currLevel = nextLevelStart;
    }
    for (size_t i = 0; i < parts.size(); i++) cout << parts[i] << (i + 1 == parts.size() ? "" : " ");
    cout << "\n";
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        connectAndPrint(root);
    }
    return 0;
}
