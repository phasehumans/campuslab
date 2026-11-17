#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> cost(n);
        for (int i = 0; i < n; i++) cin >> cost[i];
        if (n < 2) {
            cout << 0 << "\n";
            return 0;
        }
        int prev2 = 0, prev1 = 0;
        for (int i = 2; i <= n; i++) {
            int curr = min(prev1 + cost[i-1], prev2 + cost[i-2]);
            prev2 = prev1;
            prev1 = curr;
        }
        cout << prev1 << "\n";
    }
    return 0;
}
