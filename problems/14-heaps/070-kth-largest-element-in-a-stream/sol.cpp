#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k, n;
    if (!(cin >> k >> n)) return 0;
    priority_queue<int, vector<int>, greater<int>> pq;
    bool first = true;
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        pq.push(val);
        if (pq.size() > k) {
            pq.pop();
        }
        if (pq.size() == k) {
            if (!first) cout << " ";
            cout << pq.top();
            first = false;
        }
    }
    cout << "\n";
    return 0;
}
