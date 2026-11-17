#include <bits/stdc++.h>
using namespace std;

const int MAX = 5000005;
bool is_prime[MAX];
int prefix_primes[MAX];

void sieve() {
    fill(is_prime, is_prime + MAX, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p < MAX; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i < MAX; i += p) {
                is_prime[i] = false;
            }
        }
    }
    prefix_primes[0] = 0;
    for (int i = 1; i < MAX; i++) {
        prefix_primes[i] = prefix_primes[i - 1] + (is_prime[i] ? 1 : 0);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    sieve();
    int L, R;
    if (cin >> L >> R) {
        if (L > R) swap(L, R);
        if (R >= MAX) R = MAX - 1;
        if (L < 1) L = 1;
        cout << prefix_primes[R] - prefix_primes[L - 1] << "\n";
    }
    return 0;
}
