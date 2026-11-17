#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    bool is_heap = true;
    for (int i = 0; i <= (n - 2) / 2; i++) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        if (left < n && arr[i] < arr[left]) {
            is_heap = false;
            break;
        }
        if (right < n && arr[i] < arr[right]) {
            is_heap = false;
            break;
        }
    }
    if (is_heap) cout << "true\n";
    else cout << "false\n";
    return 0;
}
