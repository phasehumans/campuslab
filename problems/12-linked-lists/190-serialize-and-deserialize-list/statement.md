Design an algorithm to serialize and deserialize a singly linked list where each node contains an additional `random` pointer, which could point to any node in the list or null.

Your serialization should convert the list into a string format, and deserialization should reconstruct the exact same list (with proper next and random pointers).

**Input Format:**
- First line: integer `n` (number of nodes)
- Second line: `n` space-separated integers representing node values
- Third line: `n` space-separated integers representing the 0-indexed indices of nodes pointed to by random pointers (or `-1` if null)

**Output Format:**
- Two lines:
  1. Node values of the deserialized list (space-separated)
  2. Random pointer target indices of the deserialized list (space-separated)
