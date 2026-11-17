import sys, heapq
d = sys.stdin.read().split()
n = int(d[0])
sizes = [int(x) for x in d[1:1 + n]]
vals = [int(x) for x in d[1 + n:1 + n + sum(sizes)]]
lists = []
p = 0
for m in sizes:
    lists.append(vals[p:p + m]); p += m
print(" ".join(map(str, heapq.merge(*lists))))
