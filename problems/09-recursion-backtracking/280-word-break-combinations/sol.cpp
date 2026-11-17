#include <bits/stdc++.h>
using namespace std;
unordered_map<string, long long> memo;
unordered_set<string> dict;
long long solve(string s) {
    if (s.empty()) return 1;
    if (memo.count(s)) return memo[s];
    long long ans = 0;
    for (int i = 1; i <= s.length(); i++) {
        string prefix = s.substr(0, i);
        if (dict.count(prefix)) {
            ans += solve(s.substr(i));
        }
    }
    return memo[s] = ans;
}
int main() {
    string s;
    if (cin >> s) {
        int m;
        if (cin >> m) {
            for (int i = 0; i < m; i++) {
                string word;
                cin >> word;
                dict.insert(word);
            }
            cout << solve(s) << "\n";
        }
    }
    return 0;
}
