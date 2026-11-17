#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    int u1, v1, u2, v2;
    if (cin >> u1 >> v1 >> u2 >> v2) {
        if (u1 == u2 || u1 == v2) cout << u1 << "\n";
        else cout << v1 << "\n";
    }
    return 0;
}
