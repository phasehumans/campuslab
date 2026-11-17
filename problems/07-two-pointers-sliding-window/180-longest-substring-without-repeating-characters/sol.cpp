#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!getline(cin, s)) {
        cout << 0 << "\n";
        return 0;
    }
    int max_len = 0;
    int start = 0;
    vector<int> char_map(256, -1);
    for (int i = 0; i < (int)s.length(); i++) {
        unsigned char c = s[i];
        if (char_map[c] >= start) {
            start = char_map[c] + 1;
        }
        char_map[c] = i;
        max_len = max(max_len, i - start + 1);
    }
    cout << max_len << "\n";
    return 0;
}
