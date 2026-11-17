#include <bits/stdc++.h>
using namespace std;

struct Element {
    long long sum;
    int i;
    int j;
    long long u;
    long long v;
    bool operator>(const Element& other) const {
        if (sum != other.sum) return sum > other.sum;
        if (u != other.u) return u > other.u;
        return v > other.v;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n1, n2;
    if (!(cin >> n1 >> n2)) return 0;
    vector<long long> nums1(n1), nums2(n2);
    for (int i = 0; i < n1; i++) cin >> nums1[i];
    for (int i = 0; i < n2; i++) cin >> nums2[i];
    int k;
    if (!(cin >> k)) return 0;
    
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    int limit = min(n1, k);
    for (int i = 0; i < limit; i++) {
        pq.push({nums1[i] + nums2[0], i, 0, nums1[i], nums2[0]});
    }
    
    int count = 0;
    while (!pq.empty() && count < k) {
        Element curr = pq.top();
        pq.pop();
        cout << curr.u << " " << curr.v << "\n";
        count++;
        if (curr.j + 1 < n2) {
            int next_j = curr.j + 1;
            pq.push({nums1[curr.i] + nums2[next_j], curr.i, next_j, nums1[curr.i], nums2[next_j]});
        }
    }
    return 0;
}
