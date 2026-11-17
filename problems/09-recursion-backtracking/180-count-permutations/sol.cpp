#include <bits/stdc++.h>
using namespace std;
int countPerms(string& s, vector<bool>& used) {
    int count = 0;
    bool is_leaf = true;
    for (int i = 0; i < s.length(); i++) {
        if (used[i]) continue;
        if (i > 0 && s[i] == s[i-1] && !used[i-1]) continue;
        used[i] = true;
        count += countPerms(s, used);
        used[i] = false;
        is_leaf = false;
    }
    return is_leaf ? 1 : count;
}
int main() {
    string s;
    if (cin >> s) {
        sort(s.begin(), s.end());
        vector<bool> used(s.length(), false);
        cout << countPerms(s, used) << "\n";
    }
    return 0;
}
