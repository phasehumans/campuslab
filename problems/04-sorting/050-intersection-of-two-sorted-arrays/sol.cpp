#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<long long> a(m);
    for (int i = 0; i < m; i++) cin >> a[i];
    vector<long long> b(n);
    for (int i = 0; i < n; i++) cin >> b[i];
    int i = 0, j = 0;
    vector<long long> ans;
    while (i < m && j < n) {
        if (a[i] == b[j]) {
            if (ans.empty() || ans.back() != a[i]) {
                ans.push_back(a[i]);
            }
            i++;
            j++;
        } else if (a[i] < b[j]) {
            i++;
        } else {
            j++;
        }
    }
    for (int k = 0; k < (int)ans.size(); k++) {
        cout << ans[k] << (k == (int)ans.size() - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}
