**Approach:**
Use a dummy node to simplify list building. Maintain a pointer `curr` at the end of the merged list. Compare the heads of the two lists, append the smaller node to `curr.next`, and move the pointer of that list. Append any remaining nodes of either list at the end.

**Time Complexity:** O(n1 + n2)
**Space Complexity:** O(1)
