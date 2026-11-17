There are n gas stations along a circular route, where the amount of gas at the i-th station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the i-th station to its next (i + 1)-th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

**Input Format:**
- First line: integer n (the number of gas stations)
- Second line: n space-separated integers representing the gas array
- Third line: n space-separated integers representing the cost array

**Output Format:**
- A single integer: the starting gas station's index (0-indexed), or -1
