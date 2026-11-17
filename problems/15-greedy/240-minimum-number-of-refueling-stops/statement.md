A car travels from a starting position to a destination which is target miles east of the starting position.

There are gas stations along the way. The gas stations are represented as an array stations where stations[i] = [position_i, fuel_i] indicates that the i-th gas station is position_i miles east of the starting position, and has fuel_i liters of gas.

The car starts with an infinite tank of gas, which initially has startFuel liters of fuel in it. It uses one liter of gas per one mile that it drives. When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.

Return the minimum number of refueling stops the car must make in order to reach its destination. If it cannot reach the destination, return -1.

Note that if the car reaches a gas station with 0 fuel left, the car can still stop there and refuel. If the car reaches the destination with 0 fuel left, it is still considered to have arrived.

**Input Format:**
- First line: two space-separated integers, target and startFuel
- Second line: integer n (the number of stations)
- Next n lines: each line contains two space-separated integers representing the position and fuel of a station

**Output Format:**
- A single integer: the minimum number of refueling stops, or -1
