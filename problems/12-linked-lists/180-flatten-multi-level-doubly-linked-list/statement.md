Given a doubly linked list, where each node also has a `child` pointer. This child pointer may point to a separate doubly linked list, which also has its own children, and so on. Flatten the list so that all the nodes appear in a single-level, doubly linked list.

Flatten the list by visiting children first recursively (depth-first order), setting the `next` pointer of the current node to the child, and preserving the rest of the list after the child.

**Input Format:**
- First line: two integers `n` (number of nodes in total) and `head_id` (ID of the head node)
- Next `n` lines: each line contains five integers describing a node: `id val next_id prev_id child_id`. Use `-1` to represent null pointer targets.

**Output Format:**
- A single line of space-separated integers representing the flattened list values
