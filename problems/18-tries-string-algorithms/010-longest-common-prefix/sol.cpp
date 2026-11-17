#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<string> s(n);
    for (int i = 0; i < n; i++) cin >> s[i];
    if (n == 0) {
        cout << "\n";
        return 0;
    }
    string pref = s[0];
    for (int i = 1; i < n; i++) {
        while (s[i].compare(0, pref.length(), pref) != 0) {
            pref = pref.substr(0, pref.length() - 1);
            if (pref.empty()) break;
        }
    }
    cout << pref << "\n";
    return 0;
}
