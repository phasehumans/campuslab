#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    int m;
    if (!(cin >> m)) return 0;
    vector<string> words(m);
    unordered_map<string, int> word_counts;
    for (int i = 0; i < m; i++) {
        cin >> words[i];
        word_counts[words[i]]++;
    }
    if (m == 0 || s.empty()) {
        cout << "\n";
        return 0;
    }
    int word_len = words[0].length();
    vector<int> res;
    
    for (int i = 0; i < word_len; i++) {
        int left = i;
        int right = i;
        unordered_map<string, int> curr_counts;
        int count = 0;
        while (right + word_len <= s.length()) {
            string w = s.substr(right, word_len);
            right += word_len;
            if (word_counts.count(w)) {
                curr_counts[w]++;
                count++;
                while (curr_counts[w] > word_counts[w]) {
                    string left_w = s.substr(left, word_len);
                    curr_counts[left_w]--;
                    count--;
                    left += word_len;
                }
                if (count == m) {
                    res.push_back(left);
                }
            } else {
                curr_counts.clear();
                count = 0;
                left = right;
            }
        }
    }
    sort(res.begin(), res.end());
    for (size_t i = 0; i < res.size(); i++) {
        if (i > 0) cout << " ";
        cout << res[i];
    }
    cout << "\n";
    return 0;
}
