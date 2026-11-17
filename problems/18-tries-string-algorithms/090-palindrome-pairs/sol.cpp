#include <bits/stdc++.h>
using namespace std;
bool isPalindrome(const string& s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        if (s[l++] != s[r--]) return false;
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<string> words(n);
    unordered_map<string, int> wordMap;
    string dummy;
    getline(cin, dummy); 
    for (int i = 0; i < n; i++) {
        getline(cin, words[i]);
        wordMap[words[i]] = i;
    }
    set<pair<int, int>> ans;
    for (int i = 0; i < n; i++) {
        string w = words[i];
        int len = w.length();
        for (int j = 0; j <= len; j++) {
            string s1 = w.substr(0, j);
            string s2 = w.substr(j);
            if (isPalindrome(s1)) {
                string rev_s2 = s2;
                reverse(rev_s2.begin(), rev_s2.end());
                if (wordMap.count(rev_s2) && wordMap[rev_s2] != i) {
                    ans.insert({wordMap[rev_s2], i});
                }
            }
            if (isPalindrome(s2)) {
                string rev_s1 = s1;
                reverse(rev_s1.begin(), rev_s1.end());
                if (wordMap.count(rev_s1) && wordMap[rev_s1] != i) {
                    ans.insert({i, wordMap[rev_s1]});
                }
            }
        }
    }
    cout << ans.size() << "\n";
    for (auto p : ans) {
        cout << p.first << " " << p.second << "\n";
    }
    return 0;
}
