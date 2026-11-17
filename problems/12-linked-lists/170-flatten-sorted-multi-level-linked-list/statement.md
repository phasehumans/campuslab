Given a linked list where every node represents a sub-linked-list and contains two pointers:
1. `next` pointer to the next list node.
2. `bottom` pointer to a sub-linked-list where this node is the head.

Each of the sub-linked-lists is in sorted order. Flatten the linked list such that all the nodes appear in a single sorted singly linked list using the `bottom` pointer (with `next` pointers set to null in the output).

**Input Format:**
- First line: integer `n` (number of sub-linked-lists)
- Second line: `n` space-separated integers representing the size of each sub-linked-list `m_i`
- Third line: sum(m_i) space-separated integers, representing the sorted elements of each sub-list sequentially

**Output Format:**
- Space-separated integers representing the flattened sorted linked list
