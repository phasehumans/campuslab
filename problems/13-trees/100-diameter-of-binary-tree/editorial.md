**Approach: DFS Height and Diameter Tracking**
Use a helper function to compute the height of the tree. During the height computation of each node, update the diameter with the sum of the left subtree height and right subtree height.
Time Complexity: O(N)
Space Complexity: O(H) where H is the height of the tree.
