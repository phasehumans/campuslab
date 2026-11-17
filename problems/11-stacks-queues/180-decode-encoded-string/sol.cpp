#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        stack<int> counts;
        stack<string> strs;
        string curr = "";
        int k = 0;
        for (char c : s) {
            if (isdigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                counts.push(k);
                strs.push(curr);
                curr = ""; k = 0;
            } else if (c == ']') {
                int count = counts.top(); counts.pop();
                string prev = strs.top(); strs.pop();
                string rep = "";
                for (int i = 0; i < count; i++) rep += curr;
                curr = prev + rep;
            } else {
                curr += c;
            }
        }
        cout << curr << "\n";
    }
    return 0;
}
