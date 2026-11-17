#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    priority_queue<long long> pq;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        pq.push(x);
    }
    for (int i = 0; i < k; i++) {
        if (pq.empty()) break;
        long long val = pq.top();
        if (val <= 1) break;
        pq.pop();
        long long new_val = (long long)sqrtl((long double)val);
        while (new_val * new_val > val) new_val--;
        while ((new_val + 1) * (new_val + 1) <= val) new_val++;
        pq.push(new_val);
    }
    long long total = 0;
    while (!pq.empty()) {
        total += pq.top();
        pq.pop();
    }
    cout << total << "\n";
    return 0;
}
