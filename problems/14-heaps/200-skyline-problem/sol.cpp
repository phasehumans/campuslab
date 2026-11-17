#include <bits/stdc++.h>
using namespace std;

struct Event {
    int x;
    int h;
    int r;
    bool operator<(const Event& other) const {
        return x < other.x;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<Event> events;
    for (int i = 0; i < n; i++) {
        int l, r, h;
        cin >> l >> r >> h;
        events.push_back({l, h, r});
        events.push_back({r, 0, 0});
    }
    
    sort(events.begin(), events.end());
    
    priority_queue<pair<int, int>> pq;
    int prev_h = 0;
    
    int i = 0;
    int sz = events.size();
    while (i < sz) {
        int cur_x = events[i].x;
        while (i < sz && events[i].x == cur_x) {
            if (events[i].h > 0) {
                pq.push({events[i].h, events[i].r});
            }
            i++;
        }
        
        while (!pq.empty() && pq.top().second <= cur_x) {
            pq.pop();
        }
        
        int cur_h = pq.empty() ? 0 : pq.top().first;
        if (cur_h != prev_h) {
            cout << cur_x << " " << cur_h << "\n";
            prev_h = cur_h;
        }
    }
    return 0;
}
