import sys

data = sys.stdin.buffer.read().split()
n = int(data[0])
a = list(map(int, data[1:n + 1]))
# decide the answer bit by bit: can some pair of prefixes reach "answer so far + this bit"?
ans = 0
for b in range(30, -1, -1):
    cand = ans | (1 << b)
    prefixes = {x >> b for x in a}
    target = cand >> b
    if any((p ^ target) in prefixes for p in prefixes):
        ans = cand
print(ans)
