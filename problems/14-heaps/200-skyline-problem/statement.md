Given the positions and heights of buildings, return the key points that uniquely outline their collective skyline.

A key point is the left endpoint of a horizontal line segment of the skyline. The coordinates of key points are sorted by their x-coordinate.

Each building is represented as a triplet [left, right, height] indicating its start position, end position, and height.

**Input Format:**
- First line: integer n (the number of buildings)
- Each of the next n lines contains three space-separated integers: left, right, and height

**Output Format:**
- Print each key point [x, y] as two space-separated integers on a separate line.
