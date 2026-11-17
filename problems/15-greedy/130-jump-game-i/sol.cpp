#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int max_reach = 0;
    bool ok = true;
    for (int i = 0; i < n; i++) {
        if (i > max_reach) {
            ok = false;
            break;
        }
        max_reach = max(max_reach, i + nums[i]);
        if (max_reach >= n - 1) break;
    }
    if (ok) cout << "true\n";
    else cout << "false\n";
    return 0;
}
