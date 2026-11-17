Design a Least Recently Used (LRU) cache that holds at most `capacity` key-value pairs, and process a sequence of operations on it:

- `GET key`: if `key` is in the cache, output its value and mark the key as the most recently used; otherwise output `-1`.
- `PUT key value`: store `value` under `key` (overwriting any old value) and mark the key as the most recently used. If this insertion makes the cache hold more than `capacity` keys, first evict the least recently used key.

Both operations count as a "use" of the key. Aim for O(1) time per operation.

**Input Format:**
- First line: two integers `capacity` (cache capacity) and `q` (number of operations)
- Next `q` lines: each line describes an operation: either `PUT key value` or `GET key`.

**Output Format:**
- Space-separated integers representing the outputs of all `GET` operations, in order
