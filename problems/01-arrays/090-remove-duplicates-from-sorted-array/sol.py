import sys

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:1 + n]))
u = sorted(set(a))
print(len(u))
print(" ".join(map(str, u)))
