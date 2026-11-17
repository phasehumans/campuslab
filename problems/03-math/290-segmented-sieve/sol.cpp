#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long L, R;
    if (cin >> L >> R) {
        long long limit = sqrt(R) + 1;
        vector<bool> is_prime_small(limit + 1, true);
        is_prime_small[0] = is_prime_small[1] = false;
        for (long long p = 2; p * p <= limit; p++) {
            if (is_prime_small[p]) {
                for (long long i = p * p; i <= limit; i += p) {
                    is_prime_small[i] = false;
                }
            }
        }
        vector<long long> primes;
        for (long long p = 2; p <= limit; p++) {
            if (is_prime_small[p]) {
                primes.push_back(p);
            }
        }

        vector<bool> is_prime_seg(R - L + 1, true);
        for (long long p : primes) {
            long long start = max(p * p, ((L + p - 1) / p) * p);
            for (long long i = start; i <= R; i += p) {
                is_prime_seg[i - L] = false;
            }
        }
        if (L == 1) {
            is_prime_seg[0] = false;
        }
        long long cnt = 0;
        for (bool b : is_prime_seg) {
            if (b) cnt++;
        }
        cout << cnt << "\n";
    }
    return 0;
}
