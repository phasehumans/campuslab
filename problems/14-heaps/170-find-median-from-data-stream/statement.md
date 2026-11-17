The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement a system that receives a stream of integers and prints the median after each insertion.

If the median is a whole number, print it as an integer (e.g., 3). If the median has a fractional part (it can only be .5), print it with exactly one decimal place (e.g., 2.5, or -0.5 for the median of -1 and 0). Never use scientific notation.

**Input Format:**
- First line: integer N, the number of elements in the stream
- Second line: N space-separated integers representing the stream of elements as they arrive

**Output Format:**
- A single line with N space-separated values representing the median after each insertion
