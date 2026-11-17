#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (getline(cin, s)) {
        stack<long long> st;
        long long current_sum = 0, sign = 1; int n = s.length();
        for (int i = 0; i < n; i++) {
            char c = s[i];
            if (isdigit(c)) {
                long long num = 0;
                while (i < n && isdigit(s[i])) { num = num * 10 + (s[i] - '0'); i++; }
                i--;
                current_sum += sign * num;
            } else if (c == '+') {
                sign = 1;
            } else if (c == '-') {
                sign = -1;
            } else if (c == '(') {
                st.push(current_sum); st.push(sign);
                current_sum = 0; sign = 1;
            } else if (c == ')') {
                long long prev_sign = st.top(); st.pop();
                long long prev_sum = st.top(); st.pop();
                current_sum = prev_sum + prev_sign * current_sum;
            }
        }
        cout << current_sum << "\n";
    }
    return 0;
}
