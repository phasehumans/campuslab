import sys
from collections import OrderedDict
d = sys.stdin.read().split()
cap, q = int(d[0]), int(d[1])
cache = OrderedDict()   # last item = most recently used
out = []
p = 2
for _ in range(q):
    op = d[p]
    if op == "PUT":
        k, v = d[p + 1], d[p + 2]; p += 3
        if k in cache:
            cache.move_to_end(k)
        cache[k] = v
        if len(cache) > cap:
            cache.popitem(last=False)
    else:
        k = d[p + 1]; p += 2
        if k in cache:
            cache.move_to_end(k)
            out.append(cache[k])
        else:
            out.append("-1")
print(" ".join(out))
