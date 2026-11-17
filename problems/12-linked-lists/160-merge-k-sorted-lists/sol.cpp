#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
struct Compare {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k;
    if (!(cin >> k)) return 0;
    priority_queue<ListNode*, vector<ListNode*>, Compare> pq;
    for (int i = 0; i < k; i++) {
        int m; cin >> m;
        ListNode* head = nullptr, *tail = nullptr;
        for (int j = 0; j < m; j++) {
            int val; cin >> val;
            ListNode* node = new ListNode(val);
            if (!head) { head = node; tail = node; }
            else { tail->next = node; tail = node; }
        }
        if (head) pq.push(head);
    }
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (!pq.empty()) {
        ListNode* node = pq.top(); pq.pop();
        curr->next = node;
        curr = curr->next;
        if (node->next) pq.push(node->next);
    }
    ListNode* temp = dummy.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}
