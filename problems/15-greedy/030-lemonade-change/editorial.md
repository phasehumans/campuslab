**Approach: Greedy Simulation**

We simulate the process of giving change. When a customer pays with $20, we have two options for change: one $10 bill and one $5 bill, or three $5 bills. Since $5 bills are more versatile (they can be used for change for both $10 and $20 bills), we should always greedily prefer to use a $10 bill and a $5 bill first.

**Complexity:**
- Time Complexity: O(n) to iterate through the bills.
- Space Complexity: O(1).
