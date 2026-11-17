**Approach: Stack Simulation**

1. Iterate through each asteroid:
   - If the asteroid is positive (moving right), push it to the stack.
   - If it is negative (moving left), a collision can happen as long as there is a positive asteroid at the top of the stack:
     - If the top of the stack is smaller than the absolute value of the current asteroid, the top asteroid is destroyed (pop it).
     - If the top of the stack is equal to the absolute value of the current asteroid, both are destroyed (pop the top and do not push the current one).
     - If the top of the stack is larger than the absolute value of the current asteroid, the current asteroid is destroyed (do not push it).
   - If the current asteroid is not destroyed, push it onto the stack.
2. Print the final elements in the stack.

**Time Complexity:** O(N) as each asteroid is pushed and popped at most once.
**Space Complexity:** O(N) to store remaining asteroids.
