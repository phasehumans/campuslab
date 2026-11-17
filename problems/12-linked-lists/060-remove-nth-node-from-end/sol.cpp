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
    int n, k;
    if (!(cin >> n >> k)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode dummy(0);
    dummy.next = head;
    ListNode* fast = &dummy;
    for (int i = 0; i < k; i++) fast = fast->next;
    ListNode* slow = &dummy;
    while (fast->next) {
        slow = slow->next;
        fast = fast->next;
    }
    ListNode* to_del = slow->next;
    slow->next = slow->next->next;
    delete to_del;
    ListNode* temp = dummy.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}
