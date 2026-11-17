#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<string> strs(n);
    for (int i = 0; i < n; i++) cin >> strs[i];
    unordered_map<string, vector<string>> groups;
    for (const string& s : strs) {
        string sorted_s = s;
        sort(sorted_s.begin(), sorted_s.end());
        groups[sorted_s].push_back(s);
    }
    vector<vector<string>> group_list;
    for (auto& pair : groups) {
        sort(pair.second.begin(), pair.second.end());
        group_list.push_back(pair.second);
    }
    sort(group_list.begin(), group_list.end(), [](const vector<string>& a, const vector<string>& b) {
        return a[0] < b[0];
    });
    for (const auto& group : group_list) {
        for (size_t i = 0; i < group.size(); i++) {
            if (i > 0) cout << " ";
            cout << group[i];
        }
        cout << "\n";
    }
    return 0;
}
