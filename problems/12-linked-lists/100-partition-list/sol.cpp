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
    int n, x;
    if (!(cin >> n >> x)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int val; cin >> val;
        ListNode* node = new ListNode(val);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode before_head(0), after_head(0);
    ListNode* before = &before_head, *after = &after_head;
    ListNode* curr = head;
    while (curr) {
        if (curr->val < x) {
            before->next = curr;
            before = before->next;
        } else {
            after->next = curr;
            after = after->next;
        }
        curr = curr->next;
    }
    after->next = nullptr;
    before->next = after_head.next;
    ListNode* temp = before_head.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}
