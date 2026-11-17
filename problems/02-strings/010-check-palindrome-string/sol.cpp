#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    bool is_palindrome = true;
    int left = 0, right = (int)s.length() - 1;
    while (left < right) {
        if (s[left] != s[right]) {
            is_palindrome = false;
            break;
        }
        left++;
        right--;
    }
    cout << (is_palindrome ? "true" : "false") << "\n";
    return 0;
}
