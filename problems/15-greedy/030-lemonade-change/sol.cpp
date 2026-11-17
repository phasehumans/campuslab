#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> bills(n);
    for (int i = 0; i < n; i++) cin >> bills[i];
    int five = 0, ten = 0;
    bool possible = true;
    for (int bill : bills) {
        if (bill == 5) {
            five++;
        } else if (bill == 10) {
            if (five == 0) {
                possible = false;
                break;
            }
            five--;
            ten++;
        } else {
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                possible = false;
                break;
            }
        }
    }
    if (possible) cout << "true\n";
    else cout << "false\n";
    return 0;
}
