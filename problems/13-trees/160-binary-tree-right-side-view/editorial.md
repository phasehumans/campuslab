**Approach: Level Order Traversal**
Use a queue to process nodes level by level. At each level, extract the size of the queue and iterate through all nodes at that level. Append the value of the last node of the level to the result.
Time Complexity: O(N)
Space Complexity: O(W) where W is the maximum width of the tree.
