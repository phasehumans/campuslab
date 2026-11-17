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
    int n1, n2;
    if (!(cin >> n1 >> n2)) return 0;
    ListNode* h1 = nullptr, *t1 = nullptr;
    for (int i = 0; i < n1; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!h1) { h1 = node; t1 = node; }
        else { t1->next = node; t1 = node; }
    }
    ListNode* h2 = nullptr, *t2 = nullptr;
    for (int i = 0; i < n2; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!h2) { h2 = node; t2 = node; }
        else { t2->next = node; t2 = node; }
    }
    ListNode dummy(0);
    ListNode* curr = &dummy;
    ListNode* p1 = h1, *p2 = h2;
    while (p1 && p2) {
        if (p1->val <= p2->val) { curr->next = p1; p1 = p1->next; }
        else { curr->next = p2; p2 = p2->next; }
        curr = curr->next;
    }
    curr->next = p1 ? p1 : p2;
    ListNode* temp = dummy.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}
