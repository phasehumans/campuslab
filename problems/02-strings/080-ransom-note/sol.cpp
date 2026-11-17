#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string r, m;
    if (cin >> r >> m) {
        vector<int> counts(26, 0);
        for (char c : m) {
            counts[c - 'a']++;
        }
        bool possible = true;
        for (char c : r) {
            if (--counts[c - 'a'] < 0) {
                possible = false;
                break;
            }
        }
        cout << (possible ? "true" : "false") << "\n";
    }
    return 0;
}
