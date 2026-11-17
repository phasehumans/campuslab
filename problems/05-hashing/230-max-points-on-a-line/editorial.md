**Approach: Slope Hash Map with GCD**

For `n <= 2`, the answer is always `n` because any two points define a line.
For `n > 2`, we can iterate through each point `i` and calculate the slope of the line connecting `i` to every other point `j`. The slope of the line between `(x1, y1)` and `(x2, y2)` is `(y2 - y1) / (x2 - x1)`. However, floating-point divisions can suffer from precision errors.
To avoid this, we can store the slope in its simplified fraction form `(dy / g, dx / g)`, where `dy = y2 - y1`, `dx = x2 - x1`, and `g = gcd(dy, dx)`.
To ensure that negative slopes are represented uniquely, we can normalize the signs: if `dx < 0` or (`dx == 0` and `dy < 0`), we multiply both `dx` and `dy` by -1.
For each point `i`, we use a Hash Map to record the count of each normalized slope. The maximum count of a slope + 1 (representing the point `i` itself) gives the maximum number of points on a line passing through `i`. We take the maximum of this value over all points.

**Time Complexity:** O(N^2 * log(MAX_COORD)) where N is the number of points. We pair every point with all other points, and calculating the GCD takes logarithmic time.
**Space Complexity:** O(N) to store the slopes in the hash map for each point.
