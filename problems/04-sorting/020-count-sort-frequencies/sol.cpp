#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> freq(101, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        freq[x]++;
    }
    for (int i = 0; i <= 100; i++) {
        if (freq[i] > 0) {
            cout << i << " " << freq[i] << "\n";
        }
    }
    return 0;
}
