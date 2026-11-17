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
    
    for (int i = 0; i < k; i++) {
        int m;
        cin >> m;
        lists[i].resize(m);
        for (int j = 0; j < m; j++) {
            cin >> lists[i][j];
        }
        if (m > 0) {
            pq.push({lists[i][0], i, 0});
        }
    }
    
    vector<int> result;
    while (!pq.empty()) {
        Element curr = pq.top();
        pq.pop();
        result.push_back(curr.val);
        if (curr.elem_idx + 1 < lists[curr.list_idx].size()) {
            int next_idx = curr.elem_idx + 1;
            pq.push({lists[curr.list_idx][next_idx], curr.list_idx, next_idx});
        }
    }
    
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << " ";
        cout << result[i];
    }
    cout << "\n";
    return 0;
}
