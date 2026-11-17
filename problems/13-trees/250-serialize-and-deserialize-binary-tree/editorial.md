**Approach: Preorder DFS Deserialization**
Maintain a pointer to the current token. Build the tree recursively by populating left and right children in preorder fashion. Then perform BFS to output.
Time Complexity: O(N)
Space Complexity: O(N)
