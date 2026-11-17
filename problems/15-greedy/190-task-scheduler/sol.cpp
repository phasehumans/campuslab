#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k, n;
    if (!(cin >> k >> n)) return 0;
    vector<int> freq(26, 0);
    for (int i = 0; i < k; i++) {
        char ch;
        cin >> ch;
        freq[ch - 'A']++;
    }
    int max_f = 0;
    for (int i = 0; i < 26; i++) {
        max_f = max(max_f, freq[i]);
    }
    int num_max_f = 0;
    for (int i = 0; i < 26; i++) {
        if (freq[i] == max_f) {
            num_max_f++;
        }
    }
    int ans = (max_f - 1) * (n + 1) + num_max_f;
    cout << max(ans, k) << "\n";
    return 0;
}
