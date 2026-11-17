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
    int map_s[256], map_t[256];
    memset(map_s, -1, sizeof(map_s));
    memset(map_t, -1, sizeof(map_t));
    bool isomorphic = true;
    for (int i = 0; i < s.length(); i++) {
        int c1 = (unsigned char)s[i];
        int c2 = (unsigned char)t[i];
        if (map_s[c1] != -1 && map_s[c1] != c2) {
            isomorphic = false;
            break;
        }
        if (map_t[c2] != -1 && map_t[c2] != c1) {
            isomorphic = false;
            break;
        }
        map_s[c1] = c2;
        map_t[c2] = c1;
    }
    cout << (isomorphic ? "true" : "false") << "\n";
    return 0;
}
