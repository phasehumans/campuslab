**Approach:**
Initialize two pointers `fast` and `slow`. Move `fast` by `k` steps first. Then, move both pointers together until `fast.next` is null. `slow.next` will point to the node to be deleted, so change `slow.next` to `slow.next.next`.

**Time Complexity:** O(n)
**Space Complexity:** O(1)
