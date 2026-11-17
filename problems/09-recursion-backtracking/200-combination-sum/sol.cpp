#include <bits/stdc++.h>
using namespace std;
long long memo[35][505];
long long solve(int idx, int target, const vector<int>& candidates) {
    if (target == 0) return 1;
    if (target < 0 || idx >= (int)candidates.size()) return 0;
    if (memo[idx][target] != -1) return memo[idx][target];
    long long take = solve(idx, target - candidates[idx], candidates);
    long long skip = solve(idx + 1, target, candidates);
    return memo[idx][target] = take + skip;
}
int main() {
    int n, target;
    if (cin >> n >> target) {
        vector<int> candidates(n);
        for (int i = 0; i < n; i++) cin >> candidates[i];
        memset(memo, -1, sizeof(memo));
        cout << solve(0, target, candidates) << "\n";
    }
    return 0;
}
