Use a monotonic increasing stack to store the indices of the histogram bars. When the height of the current bar is less than the bar at the top of the stack, pop from the stack and compute the area.
