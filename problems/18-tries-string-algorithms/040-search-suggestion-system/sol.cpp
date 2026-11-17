#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<string> products(n);
    for (int i = 0; i < n; i++) cin >> products[i];
    string searchWord;
    cin >> searchWord;
    sort(products.begin(), products.end());
    string cur = "";
    for (char c : searchWord) {
        cur += c;
        auto it = lower_bound(products.begin(), products.end(), cur);
        vector<string> temp;
        for (int i = 0; i < 3 && (it + i) != products.end(); i++) {
            string s = *(it + i);
            if (s.compare(0, cur.length(), cur) == 0) {
                temp.push_back(s);
            } else {
                break;
            }
        }
        for (int i = 0; i < temp.size(); i++) {
            if (i > 0) cout << " ";
            cout << temp[i];
        }
        cout << "\n";
    }
    return 0;
}
