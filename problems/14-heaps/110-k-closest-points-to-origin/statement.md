Given an array of points on the X-Y plane where `points[i] = [x_i, y_i]` and an integer `k`, return the `k` closest points to the origin `(0, 0)`.

The distance between two points on the X-Y plane is the Euclidean distance: `sqrt(x_i^2 + y_i^2)`.

To ensure a unique and consistent output across all languages:
1. Sort the `k` points by their squared distance to the origin in ascending order.
2. If two points have the same distance, sort them by their x-coordinate in ascending order.
3. If they also have the same x-coordinate, sort them by their y-coordinate in ascending order.

**Input Format:**
- First line: two integers `n` (number of points) and `k` (number of closest points to return).
- Next `n` lines: each line contains two space-separated integers `x_i` and `y_i` representing a point.

**Output Format:**
- `k` lines, each containing two space-separated integers representing a point. The points must be sorted as specified.
