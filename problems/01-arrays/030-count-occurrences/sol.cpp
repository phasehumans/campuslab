#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;
    int count = 0;
    for (int i = 0; i < n; i++) {
        long long val;
        cin >> val;
        if (val == k) count++;
    }
    cout << count << "\n";
    return 0;
}
