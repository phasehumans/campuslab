#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> ratings(n);
    for (int i = 0; i < n; i++) cin >> ratings[i];
    if (n <= 1) {
        cout << n << "\n";
        return 0;
    }
    vector<int> candies(n, 1);
    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = max(candies[i], candies[i + 1] + 1);
        }
    }
    long long total = 0;
    for (int c : candies) total += c;
    cout << total << "\n";
    return 0;
}
