**Approach: Postorder Traversal (Tree DP)**
For each subtree, return a tuple: (isBST, minVal, maxVal, sum). A subtree is a BST if both children are BSTs and the node value is strictly between the left max and right min. If valid, update the global maximum sum. Recursively build the results bottom-up.
Time Complexity: O(N)
Space Complexity: O(H) where H is the height of the tree.
