#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    long long expected_sum = (long long)n * (n + 1) / 2;
    long long actual_sum = 0;
    for (int i = 0; i < n; i++) {
        long long val;
        cin >> val;
        actual_sum += val;
    }
    cout << expected_sum - actual_sum << "\n";
    return 0;
}
