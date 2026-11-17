**Approach: Prefix Sum Map with DFS**
Maintain a hash map of prefix sums encountered on the path from the root to the current node. The map stores prefixSum -> count. At each node, check if currSum - targetSum is in the map and add its frequency to the answer. Recurse to children, then backtrack by decrementing the count of currSum.
Time Complexity: O(N)
Space Complexity: O(H) where H is the height of the tree.
