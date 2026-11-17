#include <bits/stdc++.h>
using namespace std;

struct Element {
    int val;
    int r;
    int c;
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<vector<int>> matrix(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    for (int i = 0; i < n; i++) {
        pq.push({matrix[i][0], i, 0});
    }
    
    int ans = 0;
    for (int i = 0; i < k; i++) {
        Element curr = pq.top();
        pq.pop();
        ans = curr.val;
        if (curr.c + 1 < n) {
            pq.push({matrix[curr.r][curr.c + 1], curr.r, curr.c + 1});
        }
    }
    cout << ans << "\n";
    return 0;
}
