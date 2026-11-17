#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    if (!(cin >> n)) return 0;
    bool first = true;
    long long temp = n;
    for (long long i = 2; i * i <= temp; i++) {
        if (temp % i == 0) {
            int count = 0;
            while (temp % i == 0) {
                count++;
                temp /= i;
            }
            if (!first) cout << " ";
            cout << i << "^" << count;
            first = false;
        }
    }
    if (temp > 1) {
        if (!first) cout << " ";
        cout << temp << "^1";
    }
    cout << "\n";
    return 0;
}
