#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long h;
    if (!(cin >> n >> h)) return 0;
    vector<long long> piles(n);
    long long max_pile = 0;
    for (int i = 0; i < n; i++) {
        cin >> piles[i];
        max_pile = max(max_pile, piles[i]);
    }
    long long low = 1, high = max_pile;
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        long long total = 0;
        for (int i = 0; i < n; i++) {
            total += (piles[i] + mid - 1) / mid;
        }
        if (total <= h) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\n";
    return 0;
}
