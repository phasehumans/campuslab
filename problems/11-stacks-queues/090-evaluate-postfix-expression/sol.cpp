#include <bits/stdc++.h>
using namespace std;
bool is_op(const string& s) { return s == "+" || s == "-" || s == "*" || s == "/"; }
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        stack<long long> s;
        for (int i = 0; i < n; i++) {
            string t; cin >> t;
            if (is_op(t)) {
                long long b = s.top(); s.pop();
                long long a = s.top(); s.pop();
                if (t == "+") s.push(a + b);
                else if (t == "-") s.push(a - b);
                else if (t == "*") s.push(a * b);
                else if (t == "/") s.push(a / b);
            } else {
                s.push(stoll(t));
            }
        }
        cout << s.top() << "\n";
    }
    return 0;
}
