#include <bits/stdc++.h>
using namespace std;

long long power(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2;
    }
    return res;
}

// Returns the smallest index where some length-L substring that occurs at least twice
// first appears, or -1 if all length-L substrings are distinct.
int search(int L, const string& s, const vector<int>& nums) {
    int n = s.length();
    long long MOD1 = 1000000007;
    long long MOD2 = 1000000009;
    long long BASE = 26;

    long long h1 = 0, h2 = 0;
    for (int i = 0; i < L; i++) {
        h1 = (h1 * BASE + nums[i]) % MOD1;
        h2 = (h2 * BASE + nums[i]) % MOD2;
    }

    unordered_map<unsigned long long, int> first;
    first.reserve(2 * (n - L + 1));
    first[((unsigned long long)h1 << 32) | h2] = 0;

    long long aL1 = power(BASE, L, MOD1);
    long long aL2 = power(BASE, L, MOD2);
    int best = -1;

    for (int start = 1; start <= n - L; start++) {
        h1 = (h1 * BASE - nums[start - 1] * aL1 + nums[start + L - 1]) % MOD1;
        h2 = (h2 * BASE - nums[start - 1] * aL2 + nums[start + L - 1]) % MOD2;

        if (h1 < 0) h1 += MOD1;
        if (h2 < 0) h2 += MOD2;

        unsigned long long key = ((unsigned long long)h1 << 32) | h2;
        auto it = first.find(key);
        if (it != first.end()) {
            if (best == -1 || it->second < best) best = it->second;
        } else {
            first.emplace(key, start);
        }
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    int n = s.length();
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        nums[i] = s[i] - 'a';
    }
    
    int left = 1, right = n - 1;
    int start_idx = -1;
    int best_len = 0;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int idx = search(mid, s, nums);
        if (idx != -1) {
            start_idx = idx;
            best_len = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    if (best_len == 0) {
        cout << "\n";
    } else {
        cout << s.substr(start_idx, best_len) << "\n";
    }
    return 0;
}
