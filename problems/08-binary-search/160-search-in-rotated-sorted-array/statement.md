There is an integer array sorted in ascending order (with distinct values). Prior to being passed to your function, the array is possibly rotated at an unknown pivot index.

Given the array after the possible rotation and an integer target, return the index of target if it is in the array, or -1 if it is not in the array.

You must write an algorithm with O(log N) runtime complexity.

**Input Format:**
- First line: two space-separated integers N and target
- Second line: N space-separated integers representing the rotated sorted array

**Output Format:**
- A single integer: the index of target (0-indexed), or -1 if not found
