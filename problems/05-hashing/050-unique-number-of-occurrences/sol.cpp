#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    unordered_map<int, int> counts;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        counts[x]++;
    }
    unordered_set<int> occurrences;
    bool unique = true;
    for (auto const& [val, count] : counts) {
        if (occurrences.count(count)) {
            unique = false;
            break;
        }
        occurrences.insert(count);
    }
    cout << (unique ? "true" : "false") << "\n";
    return 0;
}
