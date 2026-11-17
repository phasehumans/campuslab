#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<long long> heights(n);
        for (int i = 0; i < n; i++) cin >> heights[i];
        heights.push_back(0);
        stack<int> s;
        long long max_area = 0;
        for (int i = 0; i <= n; i++) {
            while (!s.empty() && heights[i] < heights[s.top()]) {
                int h_idx = s.top(); s.pop();
                long long h = heights[h_idx];
                long long w = s.empty() ? i : i - s.top() - 1;
                max_area = max(max_area, h * w);
            }
            s.push(i);
        }
        cout << max_area << "\n";
    }
    return 0;
}
