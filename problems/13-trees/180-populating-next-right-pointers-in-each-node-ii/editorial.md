**Approach: BFS Level Links**
Traverse the tree level by level. In each level, set `prev.next = current` for consecutive nodes. Then, traverse using `next` pointers to verify connectivity.
Time Complexity: O(N)
Space Complexity: O(N)
