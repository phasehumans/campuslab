#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> citations(n);
    for (int i = 0; i < n; i++) cin >> citations[i];
    sort(citations.begin(), citations.end());
    int h = 0;
    for (int i = 0; i < n; i++) {
        if (citations[i] >= n - i) {
            h = max(h, n - i);
        }
    }
    cout << h << "\n";
    return 0;
}
