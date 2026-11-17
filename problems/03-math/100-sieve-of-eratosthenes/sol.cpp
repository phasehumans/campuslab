#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    if (n < 2) {
        cout << "\n";
        return 0;
    }
    vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p <= n; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= n; i += p) {
                is_prime[i] = false;
            }
        }
    }
    bool first = true;
    for (int p = 2; p <= n; p++) {
        if (is_prime[p]) {
            if (!first) cout << " ";
            cout << p;
            first = false;
        }
    }
    cout << "\n";
    return 0;
}
