#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> temp(n), res(n, 0);
        for (int i = 0; i < n; i++) cin >> temp[i];
        stack<int> s;
        for (int i = 0; i < n; i++) {
            while (!s.empty() && temp[i] > temp[s.top()]) {
                int prev = s.top(); s.pop();
                res[prev] = i - prev;
            }
            s.push(i);
        }
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\n";
    }
    return 0;
}
