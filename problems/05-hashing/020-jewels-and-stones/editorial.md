**Approach: Hash Set Lookup**

We insert all characters of `jewels` into a Hash Set. This allows us to verify if a character is a jewel in O(1) time. Then, we iterate through `stones` and count how many characters exist in the Hash Set.

**Time Complexity:** O(J + S) where J = |jewels| and S = |stones|.
**Space Complexity:** O(J) to store jewels in the Hash Set.
