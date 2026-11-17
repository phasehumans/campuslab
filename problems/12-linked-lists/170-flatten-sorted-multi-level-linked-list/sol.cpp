#include <bits/stdc++.h>
using namespace std;
struct Node {
    int data;
    Node* next;
    Node* bottom;
    Node(int x) : data(x), next(nullptr), bottom(nullptr) {}
};
Node* merge(Node* a, Node* b) {
    Node dummy(0);
    Node* temp = &dummy;
    while (a && b) {
        if (a->data <= b->data) {
            temp->bottom = a;
            a = a->bottom;
        } else {
            temp->bottom = b;
            b = b->bottom;
        }
        temp = temp->bottom;
        temp->next = nullptr;
    }
    if (a) temp->bottom = a;
    else temp->bottom = b;
    return dummy.bottom;
}
Node* flatten(Node* root) {
    if (!root || !root->next) return root;
    Node* curr = root;
    Node* next_list = root->next;
    while (next_list) {
        Node* nxt = next_list->next;
        curr = merge(curr, next_list);
        next_list = nxt;
    }
    return curr;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> m(n);
    for (int i = 0; i < n; i++) cin >> m[i];
    Node* root = nullptr;
    Node* last = nullptr;
    for (int i = 0; i < n; i++) {
        Node* head = nullptr;
        Node* curr = nullptr;
        for (int j = 0; j < m[i]; j++) {
            int val; cin >> val;
            Node* temp = new Node(val);
            if (!head) {
                head = temp;
                curr = temp;
            } else {
                curr->bottom = temp;
                curr = temp;
            }
        }
        if (!root) {
            root = head;
            last = head;
        } else {
            last->next = head;
            last = head;
        }
    }
    Node* flat = flatten(root);
    Node* temp = flat;
    while (temp) {
        cout << temp->data << (temp->bottom ? " " : "");
        temp = temp->bottom;
    }
    cout << "\n";
    return 0;
}
