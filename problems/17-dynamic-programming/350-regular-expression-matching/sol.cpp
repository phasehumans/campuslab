#include <bits/stdc++.h>
using namespace std;

int memo[50][50];

bool solve(int i, int j, const string &s, const string &p) {
    if (memo[i][j] != -1) return memo[i][j];
    if (j == p.length()) return i == s.length();
    bool first_match = (i < s.length() && (p[j] == s[i] || p[j] == '.'));
    bool ans = false;
    if (j + 1 < p.length() && p[j+1] == '*') {
        ans = solve(i, j + 2, s, p) || (first_match && solve(i + 1, j, s, p));
    } else {
        ans = first_match && solve(i + 1, j + 1, s, p);
    }
    return memo[i][j] = ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s, p;
    if (cin >> s >> p) {
        memset(memo, -1, sizeof(memo));
        cout << (solve(0, 0, s, p) ? "true" : "false") << "\n";
    }
    return 0;
}
