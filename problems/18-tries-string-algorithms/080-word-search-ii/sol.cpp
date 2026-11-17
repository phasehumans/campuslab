#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    string word = "";
    TrieNode* children[26] = {nullptr};
};
void insert(TrieNode* root, const string& word) {
    TrieNode* curr = root;
    for (char c : word) {
        int idx = c - 'a';
        if (!curr->children[idx]) curr->children[idx] = new TrieNode();
        curr = curr->children[idx];
    }
    curr->word = word;
}
int m, n;
vector<string> board;
vector<string> result;
void dfs(int r, int c, TrieNode* node) {
    char ch = board[r][c];
    if (ch == '#' || !node->children[ch - 'a']) return;
    node = node->children[ch - 'a'];
    if (!node->word.empty()) {
        result.push_back(node->word);
        node->word = ""; 
    }
    board[r][c] = '#';
    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    for (int i = 0; i < 4; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];
        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
            dfs(nr, nc, node);
        }
    }
    board[r][c] = ch;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    if (!(cin >> m >> n)) return 0;
    board.resize(m);
    for (int i = 0; i < m; i++) cin >> board[i];
    int w;
    if (!(cin >> w)) return 0;
    TrieNode* root = new TrieNode();
    for (int i = 0; i < w; i++) {
        string word;
        cin >> word;
        insert(root, word);
    }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            dfs(i, j, root);
        }
    }
    sort(result.begin(), result.end());
    for (const string& word : result) {
        cout << word << "\n";
    }
    return 0;
}
