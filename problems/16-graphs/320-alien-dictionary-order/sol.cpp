#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<string> words(n);
    for (int i = 0; i < n; i++) cin >> words[i];
    
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, int> in_degree;
    
    for (const string& w : words) {
        for (char c : w) {
            if (!adj.count(c)) adj[c] = unordered_set<char>();
            if (!in_degree.count(c)) in_degree[c] = 0;
        }
    }
    
    bool possible = true;
    for (int i = 0; i < n - 1; i++) {
        const string& w1 = words[i];
        const string& w2 = words[i+1];
        if (w1.length() > w2.length() && w1.compare(0, w2.length(), w2) == 0) {
            possible = false;
            break;
        }
        int min_len = min(w1.length(), w2.length());
        for (int j = 0; j < min_len; j++) {
            char c1 = w1[j];
            char c2 = w2[j];
            if (c1 != c2) {
                if (!adj[c1].count(c2)) {
                    adj[c1].insert(c2);
                    in_degree[c2]++;
                }
                break;
            }
        }
    }
    
    if (!possible) {
        cout << "\n";
        return 0;
    }
    
    priority_queue<char, vector<char>, greater<char>> pq;
    for (auto const& [c, count] : in_degree) {
        if (count == 0) {
            pq.push(c);
        }
    }
    
    string res = "";
    while (!pq.empty()) {
        char curr = pq.top();
        pq.pop();
        res += curr;
        for (char neighbor : adj[curr]) {
            in_degree[neighbor]--;
            if (in_degree[neighbor] == 0) {
                pq.push(neighbor);
            }
        }
    }
    
    if (res.length() < in_degree.size()) {
        cout << "\n";
    } else {
        cout << res << "\n";
    }
    return 0;
}
