#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    int count = 0;
    TrieNode* children[26] = {nullptr};
};
void dfs(TrieNode* node, int depth, string& path, int k, int& max_depth, string& best_path) {
    if (!node) return;
    if (depth > 0 && node->count >= k) {
        if (depth > max_depth) {
            max_depth = depth;
            best_path = path;
        }
    }
    for (int i = 0; i < 26; i++) {
        if (node->children[i] && node->children[i]->count >= k) {
            path.push_back('a' + i);
            dfs(node->children[i], depth + 1, path, k, max_depth, best_path);
            path.pop_back();
        }
    }
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    TrieNode* root = new TrieNode();
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        TrieNode* curr = root;
        for (char c : s) {
            int idx = c - 'a';
            if (!curr->children[idx]) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
            curr->count++;
        }
    }
    int max_depth = 0;
    string best_path = "";
    string path = "";
    dfs(root, 0, path, k, max_depth, best_path);
    cout << best_path << "\n";
    return 0;
}
