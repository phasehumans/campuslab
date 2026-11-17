**Approach: Stack Simulation**

1. Maintain a stack `st` of active function IDs.
2. Keep a variable `prev_time` initialized to `0`.
3. Iterate through each log:
   - Parse the log into `id`, `type`, and `timestamp`.
   - If `type` is "start":
     - If the stack is not empty, the function at `st.top()` has been running from `prev_time` to `timestamp - 1`. Add `timestamp - prev_time` to its exclusive time.
     - Push the current `id` to the stack.
     - Update `prev_time = timestamp`.
   - If `type` is "end":
     - The function on top of the stack (which must be `id`) has been running from `prev_time` to `timestamp`. Add `timestamp - prev_time + 1` to its exclusive time.
     - Pop `id` from the stack.
     - Update `prev_time = timestamp + 1`.
4. Output the exclusive times for all functions.

**Time Complexity:** O(m) where m is the number of logs.
**Space Complexity:** O(m) to store function IDs in the stack.
