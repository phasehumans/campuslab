#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    bool is_pal = true;
    if (s[0] == '-') {
        is_pal = false;
    } else {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s[i] != s[j]) {
                is_pal = false;
                break;
            }
            i++;
            j--;
        }
    }
    cout << (is_pal ? "true" : "false") << "\n";
    return 0;
}
