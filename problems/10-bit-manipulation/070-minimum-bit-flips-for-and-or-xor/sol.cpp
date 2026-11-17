#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long a, b, c;
    cin >> a >> b >> c;
    int flips = 0;
    for (int i = 0; i < 31; i++) {
        int ai = (a >> i) & 1;
        int bi = (b >> i) & 1;
        int ci = (c >> i) & 1;
        if (ci == 1) {
            if (ai == 0 && bi == 0) flips++;
        } else {
            flips += ai + bi;
        }
    }
    cout << flips << endl;
    return 0;
}
