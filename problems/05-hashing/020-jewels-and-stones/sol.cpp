#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string j, s;
    if (cin >> j >> s) {
        unordered_set<char> jewels(j.begin(), j.end());
        int count = 0;
        for (char c : s) {
            if (jewels.count(c)) {
                count++;
            }
        }
        cout << count << "\n";
    }
    return 0;
}
