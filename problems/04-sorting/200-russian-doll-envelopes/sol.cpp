#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> envelopes(n);
    for (int i = 0; i < n; i++) {
        cin >> envelopes[i].first >> envelopes[i].second;
    }
    sort(envelopes.begin(), envelopes.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
        if (a.first == b.first) return a.second > b.second;
        return a.first < b.first;
    });
    vector<int> tails;
    for (int i = 0; i < n; i++) {
        int h = envelopes[i].second;
        auto it = lower_bound(tails.begin(), tails.end(), h);
        if (it == tails.end()) {
            tails.push_back(h);
        } else {
            *it = h;
        }
    }
    cout << tails.size() << "\n";
    return 0;
}
