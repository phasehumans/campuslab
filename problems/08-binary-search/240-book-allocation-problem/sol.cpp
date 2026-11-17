#include <bits/stdc++.h>
using namespace std;
bool isPossible(const vector<long long>& A, int n, int m, long long maxPages) {
    int students = 1;
    long long currentPages = 0;
    for (int i = 0; i < n; i++) {
        if (A[i] > maxPages) return false;
        if (currentPages + A[i] > maxPages) {
            students++;
            currentPages = A[i];
            if (students > m) return false;
        } else {
            currentPages += A[i];
        }
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<long long> A(n);
    long long low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        cin >> A[i];
        low = max(low, A[i]);
        high += A[i];
    }
    if (m > n) {
        cout << -1 << "\n";
        return 0;
    }
    long long ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (isPossible(A, n, m, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\n";
    return 0;
}
