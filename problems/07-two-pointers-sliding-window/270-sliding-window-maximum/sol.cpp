#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    deque<int> dq;
    vector<int> result;
    for (int i = 0; i < n; i++) {
        if (!dq.empty() && dq.front() + k <= i) {
            dq.pop_front();
        }
        while (!dq.empty() && arr[dq.back()] <= arr[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
        if (i >= k - 1) {
            result.push_back(arr[dq.front()]);
        }
    }
    for (int i = 0; i < (int)result.size(); i++) {
        cout << result[i] << (i == (int)result.size() - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}
