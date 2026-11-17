#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    bool isEnd = false;
    TrieNode* children[26] = {nullptr};
};
class WordDictionary {
    TrieNode* root;
    bool searchHelper(const string& word, int idx, TrieNode* node) {
        if (!node) return false;
        if (idx == word.length()) return node->isEnd;
        char c = word[idx];
        if (c == '.') {
            for (int i = 0; i < 26; i++) {
                if (node->children[i] && searchHelper(word, idx + 1, node->children[i])) {
                    return true;
                }
            }
            return false;
        } else {
            int i = c - 'a';
            return searchHelper(word, idx + 1, node->children[i]);
        }
    }
public:
    WordDictionary() { root = new TrieNode(); }
    void addWord(const string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
        }
        curr->isEnd = true;
    }
    bool search(const string& word) {
        return searchHelper(word, 0, root);
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    if (!(cin >> q)) return 0;
    WordDictionary wd;
    for (int i = 0; i < q; i++) {
        string op, arg;
        cin >> op >> arg;
        if (op == "add") {
            wd.addWord(arg);
        } else if (op == "search") {
            cout << (wd.search(arg) ? "true" : "false") << "\n";
        }
    }
    return 0;
}
