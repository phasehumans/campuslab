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
    int n;
    if (!(cin >> n)) {
        cout << 1 << "\n";
        return 0;
    }
    if (n == 0) {
        cout << 1 << "\n";
        return 0;
    }
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int val; cin >> val;
        ListNode* node = new ListNode(val);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    ListNode* prev = nullptr, *curr = slow;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    ListNode* p1 = head, *p2 = prev;
    bool is_pal = true;
    while (p2) {
        if (p1->val != p2->val) {
            is_pal = false;
            break;
        }
        p1 = p1->next;
        p2 = p2->next;
    }
    cout << (is_pal ? 1 : 0) << "\n";
    return 0;
}
