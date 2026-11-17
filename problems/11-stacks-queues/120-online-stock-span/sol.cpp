#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> res;
        stack<pair<int, int>> s;
        for (int i = 0; i < n; i++) {
            int price; cin >> price;
            int span = 1;
            while (!s.empty() && s.top().first <= price) {
                span += s.top().second;
                s.pop();
            }
            s.push({price, span});
            res.push_back(span);
        }
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\n";
    }
    return 0;
}
