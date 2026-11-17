**Approach:**
A doubly linked list is used to maintain the access sequence of cache nodes (front for most recent, tail for eldest). The hash map maps cache keys to list nodes. For GET, move node to front and return value. For PUT, insert or update node, move to front, and evict the tail if capacity is exceeded.

**Time Complexity:** O(1) per operation.
**Space Complexity:** O(capacity).
