**Approach: Frequency Map and Set**

We first traverse the array and construct a frequency map (or Hash Map) to count the number of occurrences of each element.
Next, we extract all values (frequencies) from the map and insert them into a Hash Set. Since a Hash Set only stores unique elements, we can compare the size of the Hash Set to the size of the Hash Map. If their sizes are equal, every element has a unique frequency. Otherwise, some elements have the same frequency, so we return `false`.

**Time Complexity:** O(N) where N is the length of `arr`, as map operations and set insertions take O(1) on average.
**Space Complexity:** O(N) to store the elements in the map and their frequencies in the set.
