#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s, t;
    if (!(cin >> s >> t)) return 0;
    int i = 0, j = 0;
    while (i < (int)s.length() && j < (int)t.length()) {
        if (s[i] == t[j]) {
            i++;
        }
        j++;
    }
    cout << (i == (int)s.length() ? "true" : "false") << "\n";
    return 0;
}
