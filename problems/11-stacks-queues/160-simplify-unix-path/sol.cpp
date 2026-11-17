#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        vector<string> st;
        stringstream ss(s);
        string token;
        while (getline(ss, token, '/')) {
            if (token == "" || token == ".") continue;
            if (token == "..") {
                if (!st.empty()) st.pop_back();
            } else {
                st.push_back(token);
            }
        }
        string res = "";
        for (const string& dir : st) res += "/" + dir;
        if (res == "") res = "/";
        cout << res << "\n";
    }
    return 0;
}
