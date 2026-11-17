**Approach: Cycle Detection with Hash Set**

We calculate the next number by summing the squares of the digits of `n`. We keep repeating this process while inserting the intermediate values into a Hash Set. If the number becomes 1, it is happy. If the current number is already present in the Hash Set, it means we have entered a cycle that does not contain 1, so the number is not happy.

**Time Complexity:** O(log n) as the numbers shrink rapidly to small values (sums of squares of digits of $2^{31}-1$ are small, e.g., max 729), then take at most a constant number of steps to cycle or reach 1.
**Space Complexity:** O(log n) to store visited numbers.
