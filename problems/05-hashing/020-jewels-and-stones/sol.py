import sys

data = sys.stdin.read().split()
jewels, stones = data[0], data[1]
print(sum(stones.count(c) for c in jewels))
