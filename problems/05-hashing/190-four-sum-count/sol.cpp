#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n), b(n), c(n), d(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];
    for (int i = 0; i < n; i++) cin >> c[i];
    for (int i = 0; i < n; i++) cin >> d[i];
    unordered_map<long long, int> m;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            m[a[i] + b[j]]++;
        }
    }
    long long count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            long long target = -(c[i] + d[j]);
            if (m.count(target)) {
                count += m[target];
            }
        }
    }
    cout << count << "\n";
    return 0;
}
