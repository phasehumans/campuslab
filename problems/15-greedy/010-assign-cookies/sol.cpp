#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> g(n);
    for (int i = 0; i < n; i++) cin >> g[i];
    int m;
    if (!(cin >> m)) return 0;
    vector<int> s(m);
    for (int i = 0; i < m; i++) cin >> s[i];
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());
    int i = 0, j = 0;
    while (i < n && j < m) {
        if (s[j] >= g[i]) {
            i++;
        }
        j++;
    }
    cout << i << "\n";
    return 0;
}
