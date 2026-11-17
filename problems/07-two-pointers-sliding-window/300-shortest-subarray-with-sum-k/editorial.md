Use prefix sums: prefix[i+1] = prefix[i] + arr[i]. We want to find min(j - i) such that prefix[j] - prefix[i] >= k. Keep a deque of indices. For each j: 1. While prefix[j] - prefix[dq.front()] >= k, update answer with j - dq.front() and pop front. 2. While prefix[j] <= prefix[dq.back()], pop back to maintain increasing order.

**Time Complexity:** O(n)
**Space Complexity:** O(n) for prefix sums and deque.
