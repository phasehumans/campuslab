#include <bits/stdc++.h>
using namespace std;

long long getNext(long long n) {
    long long sum = 0;
    while (n > 0) {
        long long d = n % 10;
        sum += d * d;
        n /= 10;
    }
    return sum;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    if (cin >> n) {
        unordered_set<long long> visited;
        while (n != 1 && !visited.count(n)) {
            visited.insert(n);
            n = getNext(n);
        }
        if (n == 1) cout << "true\n";
        else cout << "false\n";
    }
    return 0;
}
