#include <bits/stdc++.h>
using namespace std;

struct Point {
    long long x, y;
    long long dist_sq;
    bool operator<(const Point& other) const {
        if (dist_sq != other.dist_sq) {
            return dist_sq < other.dist_sq;
        }
        if (x != other.x) {
            return x < other.x;
        }
        return y < other.y;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    priority_queue<Point> pq;
    for (int i = 0; i < n; i++) {
        long long x, y;
        cin >> x >> y;
        long long d = x * x + y * y;
        pq.push({x, y, d});
        if (pq.size() > k) {
            pq.pop();
        }
    }
    vector<Point> result;
    while (!pq.empty()) {
        result.push_back(pq.top());
        pq.pop();
    }
    reverse(result.begin(), result.end());
    for (const auto& p : result) {
        cout << p.x << " " << p.y << "\n";
    }
    return 0;
}
