#include <bits/stdc++.h>
using namespace std;

struct Project {
    long long capital;
    long long profit;
    bool operator<(const Project& other) const {
        return capital < other.capital;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    long long w;
    if (!(cin >> n >> k >> w)) return 0;
    vector<long long> profits(n);
    for (int i = 0; i < n; i++) cin >> profits[i];
    vector<long long> capital(n);
    for (int i = 0; i < n; i++) cin >> capital[i];
    
    vector<Project> projects(n);
    for (int i = 0; i < n; i++) {
        projects[i] = {capital[i], profits[i]};
    }
    sort(projects.begin(), projects.end());
    
    priority_queue<long long> pq;
    int idx = 0;
    for (int step = 0; step < k; step++) {
        while (idx < n && projects[idx].capital <= w) {
            pq.push(projects[idx].profit);
            idx++;
        }
        if (pq.empty()) break;
        w += pq.top();
        pq.pop();
    }
    cout << w << "\n";
    return 0;
}
