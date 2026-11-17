#include <bits/stdc++.h>
using namespace std;
int countSubsets(int idx, const vector<int>& arr) {
    int cnt = 1;
    for (int i = idx; i < arr.size(); i++) {
        if (i > idx && arr[i] == arr[i-1]) continue;
        cnt += countSubsets(i + 1, arr);
    }
    return cnt;
}
int main() {
    int n;
    if (cin >> n) {
        vector<int> arr(n);
        for (int i = 0; i < n; i++) cin >> arr[i];
        sort(arr.begin(), arr.end());
        cout << countSubsets(0, arr) << "\n";
    }
    return 0;
}
