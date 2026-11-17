#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    unordered_map<int, int> count;
    int left = 0, ans = 0;
    for (int right = 0; right < n; right++) {
        count[arr[right]]++;
        while (count.size() > 2) {
            count[arr[left]]--;
            if (count[arr[left]] == 0) {
                count.erase(arr[left]);
            }
            left++;
        }
        ans = max(ans, right - left + 1);
    }
    cout << ans << "\n";
    return 0;
}
