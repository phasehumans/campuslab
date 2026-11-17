import sys
from collections import deque

data = sys.stdin.read().split()
q = int(data[0])
dq = deque()
out = []
i = 1
for _ in range(q):
    op = data[i]
    i += 1
    if op == "push":
        dq.append(data[i])
        i += 1
    elif op == "pop":
        dq.popleft()
    elif op == "peek":
        out.append(dq[0])
    else:
        out.append("false" if dq else "true")
print("\n".join(out))
