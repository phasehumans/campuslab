import sys

data = sys.stdin.read().split()
n, k = int(data[0]), int(data[1])
print(list(map(int, data[2:2 + n])).count(k))
