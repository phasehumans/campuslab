import sys

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:1 + n]))
# Fenwick tree over values holding prefix maxima of "LIS ending with this value"
OFF = 10**4 + 1
SIZE = 2 * 10**4 + 2
tree = [0] * (SIZE + 1)


def query(i):
    best = 0
    while i > 0:
        if tree[i] > best:
            best = tree[i]
        i -= i & -i
    return best


def update(i, v):
    while i <= SIZE:
        if tree[i] < v:
            tree[i] = v
        i += i & -i


ans = 0
for x in a:
    pos = x + OFF  # 1-based position of x
    cur = query(pos - 1) + 1  # strictly smaller values only
    update(pos, cur)
    ans = max(ans, cur)
print(ans)
