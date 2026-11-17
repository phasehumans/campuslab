#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    priority_queue<long long> max_heap; // stores left half
    priority_queue<long long, vector<long long>, greater<long long>> min_heap; // stores right half
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        if (max_heap.empty() || x <= max_heap.top()) {
            max_heap.push(x);
        } else {
            min_heap.push(x);
        }
        
        // Rebalance
        if (max_heap.size() > min_heap.size() + 1) {
            min_heap.push(max_heap.top());
            max_heap.pop();
        } else if (min_heap.size() > max_heap.size()) {
            max_heap.push(min_heap.top());
            min_heap.pop();
        }
        
        if (i > 0) cout << " ";
        // Output median
        if (max_heap.size() > min_heap.size()) {
            cout << max_heap.top();
        } else {
            long long sum = max_heap.top() + min_heap.top();
            if (sum % 2 == 0) {
                cout << sum / 2;
            } else {
                // exact: |sum| / 2 followed by ".5", keeping the sign (e.g. -1 -> -0.5)
                if (sum < 0) cout << "-";
                cout << llabs(sum) / 2 << ".5";
            }
        }
    }
    cout << "\n";
    return 0;
}
