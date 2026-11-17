import sys

# With zero positions z, the best window flips k consecutive zeros z[i..i+k-1] and
# stretches from just after z[i-1] to just before z[i+k].
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
a = d[2:2 + n]
z = [-1] + [i for i, x in enumerate(a) if x == 0] + [n]
m = len(z) - 2
if k >= m:
    print(n)
else:
    print(max(z[i + k + 1] - z[i] - 1 for i in range(m - k + 1)))
