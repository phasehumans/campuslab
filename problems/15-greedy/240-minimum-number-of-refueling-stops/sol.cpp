#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long target, start_fuel;
    if (!(cin >> target >> start_fuel)) return 0;
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<long long, long long>> stations(n);
    for (int i = 0; i < n; i++) {
        cin >> stations[i].first >> stations[i].second;
    }
    
    priority_queue<long long> pq;
    long long curr_max_reach = start_fuel;
    int stops = 0;
    int idx = 0;
    
    while (curr_max_reach < target) {
        while (idx < n && stations[idx].first <= curr_max_reach) {
            pq.push(stations[idx].second);
            idx++;
        }
        if (pq.empty()) {
            stops = -1;
            break;
        }
        curr_max_reach += pq.top();
        pq.pop();
        stops++;
    }
    cout << stops << "\n";
    return 0;
}
