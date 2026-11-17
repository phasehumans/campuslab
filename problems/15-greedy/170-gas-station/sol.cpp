#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> gas(n), cost(n);
    long long total_gas = 0, total_cost = 0;
    for (int i = 0; i < n; i++) {
        cin >> gas[i];
        total_gas += gas[i];
    }
    for (int i = 0; i < n; i++) {
        cin >> cost[i];
        total_cost += cost[i];
    }
    if (total_gas < total_cost) {
        cout << -1 << "\n";
        return 0;
    }
    int start = 0;
    long long tank = 0;
    for (int i = 0; i < n; i++) {
        tank += (gas[i] - cost[i]);
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    cout << start << "\n";
    return 0;
}
