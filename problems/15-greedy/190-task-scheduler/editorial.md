**Approach: Frequency-based Greedy**

Find the maximum frequency of any task, let it be max_f. The number of tasks with this maximum frequency is num_max_f. The formula (max_f - 1) * (n + 1) + num_max_f gives the minimum slots needed if idles are required. If the total number of tasks is greater than this value, we don't need any idle time, so the answer is the total tasks.

**Complexity:**
- Time Complexity: O(k) to count frequencies.
- Space Complexity: O(1) since we only use a size-26 frequency table.
