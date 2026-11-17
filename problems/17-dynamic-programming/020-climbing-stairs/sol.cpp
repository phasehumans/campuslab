#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        if (n <= 2) {
            cout << n << "\n";
            return 0;
        }
        long long prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            long long curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        cout << prev1 << "\n";
    }
    return 0;
}
