**Approach: Binary Search on Substring Length + Rolling Hash (Rabin-Karp)**

The length of the longest duplicate substring can be binary-searched between `1` and `n`. For a candidate length `L`:
1. Compute the rolling hash of all substrings of length `L` using a base (e.g. `26`) and two modulos (e.g. `10^9+7` and `10^9+9`) to avoid collisions.
2. Store the double hashes in a Hash Set.
3. Map each hash to the index where it first appeared. If a hash is seen again, a substring of length `L` is duplicated; among all such hashes keep the smallest first-appearance index (this is the required tie-break). If no duplicate is found for `L`, we search shorter lengths.

The property "some substring of length `L` repeats" is monotone (if a length-`L` substring repeats, so does its length-`L-1` prefix), which is what makes the binary search valid.

Alternative: build a suffix array with the LCP array. The answer length is the maximum LCP value, and the earliest first occurrence is the smallest suffix index adjacent to a maximum-LCP position.

**Time Complexity:** O(n log n) because binary search takes O(log n) steps, and Rabin-Karp takes O(n) time per step.
**Space Complexity:** O(n) to store substring hashes in the Hash Set.
