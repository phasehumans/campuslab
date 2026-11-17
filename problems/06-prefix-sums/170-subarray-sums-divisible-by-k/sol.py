import sys

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:1 + n]))
k = int(data[1 + n])
freq = [0] * k
freq[0] = 1
s = 0
for x in a:
    s = (s + x) % k  # Python % is always non-negative for k > 0
    freq[s] += 1
print(sum(c * (c - 1) // 2 for c in freq))
