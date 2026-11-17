#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    if (cin >> q) {
        stack<int> s, mins;
        while (q--) {
            string op; cin >> op;
            if (op == "push") {
                int x; cin >> x;
                s.push(x);
                if (mins.empty() || x <= mins.top()) mins.push(x);
            } else if (op == "pop") {
                int x = s.top(); s.pop();
                if (x == mins.top()) mins.pop();
            } else if (op == "top") {
                cout << s.top() << "\n";
            } else if (op == "getMin") {
                cout << mins.top() << "\n";
            }
        }
    }
    return 0;
}
