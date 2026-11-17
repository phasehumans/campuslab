#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int left = 0, right = n - 1;
    while (left < right) {
        long long sum = arr[left] + arr[right];
        if (sum == target) {
            cout << (left + 1) << " " << (right + 1) << "\n";
            break;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return 0;
}
