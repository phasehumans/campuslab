#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    if (cin >> q) {
        stack<int> s1, s2;
        auto transfer = [&]() {
            if (s2.empty()) {
                while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }
            }
        };
        while (q--) {
            string op; cin >> op;
            if (op == "push") {
                int x; cin >> x;
                s1.push(x);
            } else if (op == "pop") {
                transfer();
                if (!s2.empty()) s2.pop();
            } else if (op == "peek") {
                transfer();
                cout << s2.top() << "\n";
            } else if (op == "empty") {
                cout << (s1.empty() && s2.empty() ? "true" : "false") << "\n";
            }
        }
    }
    return 0;
}
