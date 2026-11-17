#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    int children[2];
};
vector<TrieNode> trie;
void init() {
    trie.push_back({{-1, -1}});
}
void insert(int num) {
    int node = 0;
    for (int i = 30; i >= 0; i--) {
        int bit = (num >> i) & 1;
        if (trie[node].children[bit] == -1) {
            trie[node].children[bit] = trie.size();
            trie.push_back({{-1, -1}});
        }
        node = trie[node].children[bit];
    }
}
int query(int num) {
    int node = 0, result = 0;
    for (int i = 30; i >= 0; i--) {
        int bit = (num >> i) & 1;
        int want = 1 - bit;
        if (trie[node].children[want] != -1) {
            result |= (1 << i);
            node = trie[node].children[want];
        } else {
            node = trie[node].children[bit];
        }
    }
    return result;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    init();
    for (int x : nums) insert(x);
    int ans = 0;
    for (int x : nums) ans = max(ans, query(x));
    cout << ans << endl;
    return 0;
}
