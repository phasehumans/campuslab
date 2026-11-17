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
    if (n == 0) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    k %= n;
    if (k == 0) {
        ListNode* temp = head;
        while (temp) { cout << temp->val << (temp->next ? " " : ""); temp = temp->next; }
        cout << "\n";
        return 0;
    }
    tail->next = head; // make circular
    ListNode* new_tail = head;
    for (int i = 0; i < n - k - 1; i++) {
        new_tail = new_tail->next;
    }
    head = new_tail->next;
    new_tail->next = nullptr;
    ListNode* temp = head;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}
