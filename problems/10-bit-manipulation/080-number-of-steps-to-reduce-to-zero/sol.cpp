#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) {
        cout << 0 << "\n";
        return 0;
    }
    int start = 0;
    while (start < s.size() && s[start] == '0') {
        start++;
    }
    if (start == s.size()) {
        cout << 0 << "\n";
        return 0;
    }
    int len = s.size() - start;
    int ones = 0;
    for (int i = start; i < s.size(); i++) {
        if (s[i] == '1') ones++;
    }
    cout << (len - 1 + ones) << "\n";
    return 0;
}
