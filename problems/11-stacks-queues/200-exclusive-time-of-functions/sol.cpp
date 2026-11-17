#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (cin >> n >> m) {
        vector<int> res(n, 0);
        stack<int> st;
        int prev_time = 0;
        for (int i = 0; i < m; i++) {
            string s;
            cin >> s;
            size_t colon1 = s.find(':');
            size_t colon2 = s.rfind(':');
            int fid = stoi(s.substr(0, colon1));
            string type = s.substr(colon1 + 1, colon2 - colon1 - 1);
            int timestamp = stoi(s.substr(colon2 + 1));
            
            if (type == "start") {
                if (!st.empty()) {
                    res[st.top()] += timestamp - prev_time;
                }
                st.push(fid);
                prev_time = timestamp;
            } else {
                res[st.top()] += timestamp - prev_time + 1;
                st.pop();
                prev_time = timestamp + 1;
            }
        }
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\n";
    }
    return 0;
}
