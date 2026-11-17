#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<int> a(n), b(m);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < m; i++) cin >> b[i];
    int i = 0, j = 0;
    bool first = true;
    while (i < n || j < m) {
        if (!first) cout << " ";
        first = false;
        if (i < n && (j >= m || a[i] <= b[j])) {
            cout << a[i];
            i++;
        } else {
            cout << b[j];
            j++;
        }
    }
    cout << "\n";
    return 0;
}
