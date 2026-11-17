#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long x, y;
    if (cin >> x >> y) {
        long long val = x ^ y;
        int count = 0;
        while (val > 0) {
            val &= (val - 1);
            count++;
        }
        cout << count << "\n";
    }
    return 0;
}
