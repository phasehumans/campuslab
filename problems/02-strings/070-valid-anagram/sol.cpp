#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s, t;
    if (!(cin >> s >> t)) return 0;
    if (s.length() != t.length()) {
        cout << "false\n";
        return 0;
    }
    vector<int> counts(26, 0);
    for (char c : s) counts[c - 'a']++;
    for (char c : t) counts[c - 'a']--;
    bool ok = true;
    for (int x : counts) {
        if (x != 0) { ok = false; break; }
    }
    cout << (ok ? "true" : "false") << "\n";
    return 0;
}
