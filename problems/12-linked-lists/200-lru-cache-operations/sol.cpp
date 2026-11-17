#include <bits/stdc++.h>
using namespace std;
class LRUCache {
    int capacity;
    list<pair<int, int>> cache;
    unordered_map<int, list<pair<int, int>>::iterator> m;
public:
    LRUCache(int cap) : capacity(cap) {}
    int get(int key) {
        if (m.find(key) == m.end()) return -1;
        cache.splice(cache.begin(), cache, m[key]);
        return m[key]->second;
    }
    void put(int key, int value) {
        if (m.find(key) != m.end()) {
            m[key]->second = value;
            cache.splice(cache.begin(), cache, m[key]);
            return;
        }
        if (cache.size() == capacity) {
            auto last = cache.back();
            m.erase(last.first);
            cache.pop_back();
        }
        cache.push_front({key, value});
        m[key] = cache.begin();
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int capacity, q;
    if (!(cin >> capacity >> q)) return 0;
    LRUCache cache(capacity);
    vector<int> res;
    for (int i = 0; i < q; i++) {
        string op; cin >> op;
        if (op == "PUT") {
            int k, v; cin >> k >> v;
            cache.put(k, v);
        } else {
            int k; cin >> k;
            res.push_back(cache.get(k));
        }
    }
    for (int i = 0; i < res.size(); i++) {
        cout << res[i] << (i + 1 < res.size() ? " " : "");
    }
    cout << "\n";
    return 0;
}
