import sys

data = sys.stdin.read().split()
s = data[0]
m = int(data[1])
words = set(data[2:2 + m])
n = len(s)
ways = [0] * (n + 1)  # ways[i] = number of sentences for the suffix s[i:]
ways[n] = 1
for i in range(n - 1, -1, -1):
    ways[i] = sum(ways[i + len(w)] for w in words if s.startswith(w, i))
print(ways[0])
