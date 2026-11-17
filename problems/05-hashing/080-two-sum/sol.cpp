#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    unordered_map<long long, int> val_to_idx;
    for (int i = 0; i < n; i++) {
        long long val;
        cin >> val;
        long long complement = target - val;
        if (val_to_idx.count(complement)) {
            cout << val_to_idx[complement] + 1 << " " << i + 1 << "\n";
            return 0;
        }
        val_to_idx[val] = i;
    }
    return 0;
}
