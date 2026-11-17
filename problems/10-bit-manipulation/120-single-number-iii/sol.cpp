#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<long long> arr(n);
        long long xor_sum = 0;
        for (int i = 0; i < n; i++) {
            cin >> arr[i];
            xor_sum ^= arr[i];
        }
        long long lowest_bit = xor_sum & (-xor_sum);
        long long num1 = 0, num2 = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] & lowest_bit) {
                num1 ^= arr[i];
            } else {
                num2 ^= arr[i];
            }
        }
        if (num1 > num2) swap(num1, num2);
        cout << num1 << " " << num2 << "\n";
    }
    return 0;
}
