**Approach: Sorting**

1. Sort the intervals in ascending order based on their start times.
2. Initialize a list of merged intervals. Push the first interval to this list.
3. For each subsequent interval, compare its start time with the end time of the last interval in the merged list:
   - If `start_i <= end_last`, they overlap. Update `end_last = max(end_last, end_i)`.
   - If `start_i > end_last`, they do not overlap. Push the current interval to the merged list.

**Time Complexity:** O(N log N) due to sorting
**Space Complexity:** O(N) to store the merged intervals
