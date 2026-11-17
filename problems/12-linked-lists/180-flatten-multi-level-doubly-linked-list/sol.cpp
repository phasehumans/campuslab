#include <bits/stdc++.h>
using namespace std;
struct Node {
    int id;
    int val;
    Node* next;
    Node* prev;
    Node* child;
    Node(int i, int v) : id(i), val(v), next(nullptr), prev(nullptr), child(nullptr) {}
};
Node* flattenRec(Node* head) {
    Node* curr = head;
    Node* tail = head;
    while (curr) {
        Node* nextNode = curr->next;
        if (curr->child) {
            Node* childHead = curr->child;
            Node* childTail = flattenRec(childHead);
            curr->next = childHead;
            childHead->prev = curr;
            if (nextNode) {
                childTail->next = nextNode;
                nextNode->prev = childTail;
            }
            curr->child = nullptr;
            tail = childTail;
        } else {
            tail = curr;
        }
        curr = nextNode;
    }
    return tail;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, head_id;
    if (!(cin >> n >> head_id)) return 0;
    unordered_map<int, Node*> m;
    vector<vector<int>> rels;
    for (int i = 0; i < n; i++) {
        int id, val, next_id, prev_id, child_id;
        cin >> id >> val >> next_id >> prev_id >> child_id;
        m[id] = new Node(id, val);
        rels.push_back({id, next_id, prev_id, child_id});
    }
    for (auto& r : rels) {
        int id = r[0], next_id = r[1], prev_id = r[2], child_id = r[3];
        if (next_id != -1) m[id]->next = m[next_id];
        if (prev_id != -1) m[id]->prev = m[prev_id];
        if (child_id != -1) m[id]->child = m[child_id];
    }
    Node* head = m[head_id];
    flattenRec(head);
    Node* curr = head;
    while (curr) {
        cout << curr->val << (curr->next ? " " : "");
        curr = curr->next;
    }
    cout << "\n";
    return 0;
}
