#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    cin >> n;
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    cout << count << endl;
    return 0;
}
