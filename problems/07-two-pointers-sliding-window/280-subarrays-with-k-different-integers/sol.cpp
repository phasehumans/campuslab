#include <bits/stdc++.h>
using namespace std;

long long atMostK(const vector<int>& arr, int k) {
    int n = arr.size();
    unordered_map<int, int> counts;
    int left = 0;
    long long ans = 0;
    for (int right = 0; right < n; right++) {
        if (counts[arr[right]] == 0) {
            k--;
        }
        counts[arr[right]]++;
        while (k < 0) {
            counts[arr[left]]--;
            if (counts[arr[left]] == 0) {
                k++;
            }
            left++;
        }
        ans += (right - left + 1);
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << atMostK(arr, k) - atMostK(arr, k - 1) << "\n";
    return 0;
}
