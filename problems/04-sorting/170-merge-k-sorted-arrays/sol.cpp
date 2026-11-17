#include <bits/stdc++.h>
using namespace std;
struct Element {
    long long val;
    int arrIdx;
    int eleIdx;
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k, n;
    if (!(cin >> k >> n)) return 0;
    vector<vector<long long>> arrays(k, vector<long long>(n));
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    for (int i = 0; i < k; i++) {
        for (int j = 0; j < n; j++) {
            cin >> arrays[i][j];
        }
        pq.push({arrays[i][0], i, 0});
    }
    vector<long long> result;
    while (!pq.empty()) {
        Element curr = pq.top();
        pq.pop();
        result.push_back(curr.val);
        if (curr.eleIdx + 1 < n) {
            pq.push({arrays[curr.arrIdx][curr.eleIdx + 1], curr.arrIdx, curr.eleIdx + 1});
        }
    }
    for (int i = 0; i < result.size(); i++) {
        cout << result[i] << (i == result.size() - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}
