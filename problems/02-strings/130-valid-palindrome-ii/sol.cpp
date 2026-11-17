#include <bits/stdc++.h>
using namespace std;
bool isPalindrome(const string& s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++;
        r--;
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        int l = 0, r = s.length() - 1;
        bool possible = true;
        while (l < r) {
            if (s[l] != s[r]) {
                possible = isPalindrome(s, l + 1, r) || isPalindrome(s, l, r - 1);
                break;
            }
            l++;
            r--;
        }
        cout << (possible ? "true" : "false") << "\n";
    }
    return 0;
}
