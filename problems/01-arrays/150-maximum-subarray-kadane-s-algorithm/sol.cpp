#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    long long max_so_far = -2e18;
    long long curr_max = 0;
    bool has_element = false;
    for (int i = 0; i < n; i++) {
        long long val;
        cin >> val;
        if (!has_element) {
            max_so_far = val;
            curr_max = val;
            has_element = true;
        } else {
            curr_max = max(val, curr_max + val);
            max_so_far = max(max_so_far, curr_max);
        }
    }
    cout << max_so_far << "\n";
    return 0;
}
