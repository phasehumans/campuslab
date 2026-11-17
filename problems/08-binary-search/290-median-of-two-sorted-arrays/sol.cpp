#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<double> A(m);
    for (int i = 0; i < m; i++) cin >> A[i];
    vector<double> B(n);
    for (int i = 0; i < n; i++) cin >> B[i];
    if (m > n) {
        swap(A, B);
        swap(m, n);
    }
    int imin = 0, imax = m, half_len = (m + n + 1) / 2;
    double median = 0.0;
    while (imin <= imax) {
        int i = (imin + imax) / 2;
        int j = half_len - i;
        if (i < m && B[j - 1] > A[i]) {
            imin = i + 1;
        } else if (i > 0 && A[i - 1] > B[j]) {
            imax = i - 1;
        } else {
            double max_of_left;
            if (i == 0) { max_of_left = B[j - 1]; }
            else if (j == 0) { max_of_left = A[i - 1]; }
            else { max_of_left = max(A[i - 1], B[j - 1]); }
            if ((m + n) % 2 == 1) {
                median = max_of_left;
                break;
            }
            double min_of_right;
            if (i == m) { min_of_right = B[j]; }
            else if (j == n) { min_of_right = A[i]; }
            else { min_of_right = min(A[i], B[j]); }
            median = (max_of_left + min_of_right) / 2.0;
            break;
        }
    }
    cout << fixed << setprecision(5) << median << "\n";
    return 0;
}
