#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, pos;
    if (!(cin >> n >> pos)) return 0;
    if (n == 0) { cout << 0 << "\n"; return 0; }
    vector<ListNode*> nodes(n);
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        nodes[i] = new ListNode(v);
    }
    for (int i = 0; i < n - 1; i++) nodes[i]->next = nodes[i + 1];
    if (pos != -1) nodes[n - 1]->next = nodes[pos];
    ListNode* slow = nodes[0], *fast = nodes[0];
    bool cycle = false;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) { cycle = true; break; }
    }
    cout << (cycle ? 1 : 0) << "\n";
    return 0;
}
