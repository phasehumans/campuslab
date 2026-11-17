#include <bits/stdc++.h>
using namespace std;

struct Element {
    int val;
    int list_idx;
    int elem_idx;
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k;
    if (!(cin >> k)) return 0;
    vector<vector<int>> lists(k);
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    int max_val = -2e9;
    
    for (int i = 0; i < k; i++) {
        int m;
        cin >> m;
        lists[i].resize(m);
        for (int j = 0; j < m; j++) {
            cin >> lists[i][j];
        }
        pq.push({lists[i][0], i, 0});
        max_val = max(max_val, lists[i][0]);
    }
    
    int start = -1e9, end = 1e9;
    while (true) {
        Element curr = pq.top();
        pq.pop();
        int min_val = curr.val;
        
        if ((long long)max_val - min_val < (long long)end - start) {
            start = min_val;
            end = max_val;
        }
        
        if (curr.elem_idx + 1 < lists[curr.list_idx].size()) {
            int next_idx = curr.elem_idx + 1;
            int next_val = lists[curr.list_idx][next_idx];
            pq.push({next_val, curr.list_idx, next_idx});
            max_val = max(max_val, next_val);
        } else {
            break;
        }
    }
    cout << start << " " << end << "\n";
    return 0;
}
