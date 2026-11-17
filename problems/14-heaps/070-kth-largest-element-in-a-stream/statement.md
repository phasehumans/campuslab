Design a system that processes a stream of integers and finds the k-th largest element at any point.

You need to output the k-th largest element starting from the k-th insertion. Specifically, you will be given an array representing the order of elements arriving in the stream. For each element that is added, if the stream has at least k elements, output the current k-th largest element.

**Input Format:**
- First line: two space-separated integers, k and n (the size of the stream)
- Second line: n space-separated integers representing the stream of elements in the order they arrive

**Output Format:**
- A single line containing n - k + 1 space-separated integers, representing the k-th largest element after each insertion starting from the k-th element.
