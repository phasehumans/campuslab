#include <bits/stdc++.h>
using namespace std;

struct Element {
    int val;
    int freq;
    bool operator<(const Element& other) const {
        if (freq != other.freq) {
            return freq < other.freq;
        }
        return val < other.val;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    unordered_map<int, int> counts;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        counts[x]++;
    }
    priority_queue<Element> pq;
    for (auto& pair : counts) {
        pq.push({pair.first, pair.second});
    }
    for (int i = 0; i < k; i++) {
        if (i > 0) cout << " ";
        cout << pq.top().val;
        pq.pop();
    }
    cout << "\n";
    return 0;
}
