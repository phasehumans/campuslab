**Approach: Sweepline + Max-Heap (Lazy Deletion)**

1. Define events:
   - Start of building [left, right, height]: event at `left` with positive height `height` and right boundary `right`.
   - End of building: event at `right` with height `0` (or leaving event).
2. Sort all events by x-coordinate. Group events that occur at the same x-coordinate.
3. Maintain a Max-Heap `pq` of active buildings stored as pairs `(height, right_boundary)`:
   - For each event at the current x, if it's a starting event (`height > 0`), push `(height, right_boundary)` to `pq`.
4. Lazily remove expired buildings from the top of the heap. While the heap top's right boundary is <= current x, pop it.
5. The height of the skyline at the current x is the height at the top of the heap (or 0 if empty).
6. If the current height is different from the previously recorded skyline height, we output `current_x current_height` as a new key point.

**Time Complexity:** O(n log n) for sorting and heap operations.
**Space Complexity:** O(n) for storing events and heap elements.
