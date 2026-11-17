**Approach: Node Tree Representation**

Create a node structure representing characters. Each node holds an array of size 26 for children pointers pointing to downstream characters, along with an indicator flag `isEnd`. Traversal maps letters to indices (0-25) by subtracting 'a'.

**Time Complexity:** O(L) per operation, where L is the word/prefix length.
**Space Complexity:** O(U * 26) where U is the total number of unique prefixes inserted.
