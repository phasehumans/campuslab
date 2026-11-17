import sys

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:1 + n]))
# take[i] / skip[i]: best total up to house i when house i is robbed / not robbed
take, skip = a[0], 0
for x in a[1:]:
    take, skip = skip + x, max(take, skip)
print(max(take, skip))
