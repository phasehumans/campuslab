#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> scores;
        for (int i = 0; i < n; i++) {
            string op;
            cin >> op;
            if (op == "+") {
                scores.push_back(scores[scores.size() - 1] + scores[scores.size() - 2]);
            } else if (op == "D") {
                scores.push_back(scores.back() * 2);
            } else if (op == "C") {
                scores.pop_back();
            } else {
                scores.push_back(stoi(op));
            }
        }
        long long total_sum = 0;
        for (int x : scores) total_sum += x;
        cout << total_sum << "\n";
    }
    return 0;
}
