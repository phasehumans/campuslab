#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int r, c;
    if (cin >> r >> c) {
        vector<string> matrix(r);
        for (int i = 0; i < r; i++) cin >> matrix[i];
        vector<int> heights(c, 0);
        int max_area = 0;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (matrix[i][j] == '1') heights[j]++;
                else heights[j] = 0;
            }
            vector<int> h = heights; h.push_back(0);
            stack<int> s;
            for (int j = 0; j <= c; j++) {
                while (!s.empty() && h[j] < h[s.top()]) {
                    int h_idx = s.top(); s.pop();
                    int ht = h[h_idx];
                    int w = s.empty() ? j : j - s.top() - 1;
                    max_area = max(max_area, ht * w);
                }
                s.push(j);
            }
        }
        cout << max_area << "\n";
    }
    return 0;
}
