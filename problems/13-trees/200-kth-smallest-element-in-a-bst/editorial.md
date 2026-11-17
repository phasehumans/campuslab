**Approach: Inorder Traversal**
Perform a standard inorder traversal of the BST. Keep track of the number of nodes visited. The kth visited node is the kth smallest element.
Time Complexity: O(N) worst case, O(H + k) with early stopping.
Space Complexity: O(H) recursion stack space.
