**Approach: Unique Backtracking Permutations**

Sort the characters of the string. In the backtracking function, we maintain a `used` boolean array. At each position of the permutation, we loop through all characters. We skip character `i` if it's already used, or if `S[i] == S[i-1]` and `S[i-1]` is not used (which implies the current choice would generate a duplicate branch).

Time complexity is O(N!), space complexity is O(N) due to recursion stack depth.
