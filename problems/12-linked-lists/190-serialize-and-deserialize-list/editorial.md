**Approach:**
During serialization, build a mapping of node addresses to 0-indexed values. Represent the list as space-separated `val,random_index` tokens. Deserialization parses these tokens to construct an array of nodes, connects the `next` pointers in sequence, and resolves random pointers using the parsed `random_index` values.

**Time Complexity:** O(n)
**Space Complexity:** O(n)
