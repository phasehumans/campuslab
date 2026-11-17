import sys

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:1 + n]))
if n <= 1500:
    best = 0
    for i in range(n):
        bal = 0
        for j in range(i, n):
            bal += 1 if a[j] else -1
            if bal == 0 and j - i + 1 > best:
                best = j - i + 1
    print(best)
else:
    first = [-2] * (2 * n + 1)
    first[n] = -1
    bal = 0
    best = 0
    for i, x in enumerate(a):
        bal += 1 if x else -1
        if first[bal + n] == -2:
            first[bal + n] = i
        else:
            best = max(best, i - first[bal + n])
    print(best)
