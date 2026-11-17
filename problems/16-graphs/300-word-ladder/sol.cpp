#include <bits/stdc++.h>
using namespace std;
int main() {
    string beginWord, endWord; int k;
    if (!(cin >> beginWord >> endWord >> k)) return 0;
    unordered_set<string> wordList;
    for (int i = 0; i < k; i++) { string s; cin >> s; wordList.insert(s); }
    if (!wordList.count(endWord)) { cout << "0\n"; return 0; }
    if (beginWord == endWord) { cout << "1\n"; return 0; }
    queue<pair<string, int>> q; q.push({beginWord, 1});
    unordered_set<string> vis; vis.insert(beginWord);
    bool found = false;
    while (!q.empty()) {
        auto [word, d] = q.front(); q.pop();
        if (word == endWord) { cout << d << "\n"; found = true; break; }
        for (int i = 0; i < word.length(); i++) {
            char orig = word[i];
            for (char c = 'a'; c <= 'z'; c++) {
                if (c == orig) continue;
                word[i] = c;
                if (wordList.count(word) && !vis.count(word)) {
                    vis.insert(word); q.push({word, d + 1});
                }
            }
            word[i] = orig;
        }
    }
    if (!found) cout << "0\n";
}
