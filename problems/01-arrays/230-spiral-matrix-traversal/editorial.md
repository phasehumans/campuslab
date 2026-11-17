**Approach: Boundary Simulation**

Use four pointers representing the matrix boundaries: `top`, `bottom`, `left`, and `right`. Traverse from left to right on `top`, then top to bottom on `right`, then right to left on `bottom`, and bottom to top on `left`. Update the boundary variables after each step.

**Time Complexity:** O(r * c)
**Space Complexity:** O(1) auxiliary space.
