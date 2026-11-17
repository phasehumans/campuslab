#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    vector<int> counts(26, 0);
    for (char c : s) {
        counts[c - 'a']++;
    }
    int ans = -1;
    for (int i = 0; i < s.length(); i++) {
        if (counts[s[i] - 'a'] == 1) {
            ans = i;
            break;
        }
    }
    cout << ans << "\n";
    return 0;
}
