#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> arr(n);
        for (int i = 0; i < n; i++) cin >> arr[i];
        vector<int> res(n, -1);
        stack<int> s;
        for (int i = n - 1; i >= 0; i--) {
            while (!s.empty() && s.top() <= arr[i]) s.pop();
            if (!s.empty()) res[i] = s.top();
            s.push(arr[i]);
        }
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\n";
    }
    return 0;
}
