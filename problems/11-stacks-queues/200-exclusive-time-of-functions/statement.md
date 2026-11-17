On a single-threaded CPU, we execute a program containing n functions. Each function has a unique ID from 0 to n-1.

Function calls are logged in a list of logs, where each log is formatted as: "function_id:start_or_end:timestamp". For example, "0:start:3" means function 0 starts at the beginning of timestamp 3. "1:end:5" means function 1 ends at the end of timestamp 5.

Note that a function's exclusive time is the sum of execution times for all function calls in the program. For example, if a function starts at 2 and ends at 5, it runs for 5 - 2 + 1 = 4 units of time. If a function is paused by another function call, the time spent on the second function is NOT counted towards the first function's exclusive time.

Given the logs sorted by timestamp, return the exclusive time of each function.

**Input Format:**
- First line: two integers n (number of functions) and m (number of logs)
- Next m lines: each line contains a log in the format "function_id:start_or_end:timestamp"

**Output Format:**
- Print n space-separated integers representing the exclusive time of each function from ID 0 to n-1.
