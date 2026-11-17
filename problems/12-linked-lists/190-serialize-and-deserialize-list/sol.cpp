#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode* random;
    ListNode(int x) : val(x), next(nullptr), random(nullptr) {}
};
string serialize(ListNode* head) {
    if (!head) return "";
    vector<ListNode*> nodes;
    ListNode* curr = head;
    while (curr) { nodes.push_back(curr); curr = curr->next; }
    unordered_map<ListNode*, int> m;
    for (int i = 0; i < nodes.size(); i++) m[nodes[i]] = i;
    string res = "";
    for (int i = 0; i < nodes.size(); i++) {
        int r_idx = (nodes[i]->random) ? m[nodes[i]->random] : -1;
        res += to_string(nodes[i]->val) + "," + to_string(r_idx) + " ";
    }
    return res;
}
ListNode* deserialize(string data) {
    if (data.empty()) return nullptr;
    stringstream ss(data);
    string token;
    vector<pair<int, int>> parsed;
    while (ss >> token) {
        int comma = token.find(',');
        int val = stoi(token.substr(0, comma));
        int r_idx = stoi(token.substr(comma + 1));
        parsed.push_back({val, r_idx});
    }
    int n = parsed.size();
    if (n == 0) return nullptr;
    vector<ListNode*> nodes(n);
    for (int i = 0; i < n; i++) nodes[i] = new ListNode(parsed[i].first);
    for (int i = 0; i < n; i++) {
        if (i + 1 < n) nodes[i]->next = nodes[i + 1];
        int r_idx = parsed[i].second;
        if (r_idx != -1) nodes[i]->random = nodes[r_idx];
    }
    return nodes[0];
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    if (n == 0) { cout << "\n\n"; return 0; }
    vector<int> vals(n), rands(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    for (int i = 0; i < n; i++) cin >> rands[i];
    vector<ListNode*> nodes(n);
    for (int i = 0; i < n; i++) nodes[i] = new ListNode(vals[i]);
    for (int i = 0; i < n - 1; i++) nodes[i]->next = nodes[i + 1];
    for (int i = 0; i < n; i++) {
        if (rands[i] != -1) nodes[i]->random = nodes[rands[i]];
    }
    string s = serialize(nodes[0]);
    ListNode* d = deserialize(s);
    vector<ListNode*> out;
    ListNode* curr = d;
    while (curr) { out.push_back(curr); curr = curr->next; }
    unordered_map<ListNode*, int> m;
    for (int i = 0; i < out.size(); i++) m[out[i]] = i;
    for (int i = 0; i < out.size(); i++) cout << out[i]->val << (i + 1 < out.size() ? " " : "");
    cout << "\n";
    for (int i = 0; i < out.size(); i++) {
        int r_idx = out[i]->random ? m[out[i]->random] : -1;
        cout << r_idx << (i + 1 < out.size() ? " " : "");
    }
    cout << "\n";
    return 0;
}
