#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        stack<char> st;
        bool ok = true;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) { ok = false; break; }
                if (c == ')' && st.top() != '(') { ok = false; break; }
                if (c == '}' && st.top() != '{') { ok = false; break; }
                if (c == ']' && st.top() != '[') { ok = false; break; }
                st.pop();
            }
        }
        if (ok && st.empty()) cout << "true\n";
        else cout << "false\n";
    } else cout << "true\n";
    return 0;
}
