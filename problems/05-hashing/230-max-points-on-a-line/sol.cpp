#include <bits/stdc++.h>
using namespace std;

int get_gcd(int a, int b) {
    a = abs(a);
    b = abs(b);
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> points(n);
    for (int i = 0; i < n; i++) {
        cin >> points[i].first >> points[i].second;
    }
    if (n <= 2) {
        cout << n << "\n";
        return 0;
    }
    int max_points = 0;
    for (int i = 0; i < n; i++) {
        map<pair<int, int>, int> slope_counts;
        int local_max = 0;
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            int dx = points[j].first - points[i].first;
            int dy = points[j].second - points[i].second;
            int g = get_gcd(dx, dy);
            dx /= g;
            dy /= g;
            if (dx < 0 || (dx == 0 && dy < 0)) {
                dx = -dx;
                dy = -dy;
            }
            slope_counts[{dx, dy}]++;
            local_max = max(local_max, slope_counts[{dx, dy}]);
        }
        max_points = max(max_points, local_max + 1);
    }
    cout << max_points << "\n";
    return 0;
}
