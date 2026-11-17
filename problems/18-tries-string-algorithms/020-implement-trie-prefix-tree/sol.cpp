#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    bool isEnd = false;
    TrieNode* children[26] = {nullptr};
};
class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    void insert(const string& word) {
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
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return curr->isEnd;
    }
    bool startsWith(const string& prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return true;
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    if (!(cin >> q)) return 0;
    Trie trie;
    for (int i = 0; i < q; i++) {
        string op, arg;
        cin >> op >> arg;
        if (op == "insert") {
            trie.insert(arg);
        } else if (op == "search") {
            cout << (trie.search(arg) ? "true" : "false") << "\n";
        } else if (op == "startsWith") {
            cout << (trie.startsWith(arg) ? "true" : "false") << "\n";
        }
    }
    return 0;
}
