import sys

# divide and conquer: merge arrays pairwise until one remains
def merge(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:]); out.extend(b[j:])
    return out

d = sys.stdin.read().split()
k, n = int(d[0]), int(d[1])
arrs = [list(map(int, d[2 + i * n: 2 + (i + 1) * n])) for i in range(k)]
while len(arrs) > 1:
    arrs = [merge(arrs[i], arrs[i + 1]) if i + 1 < len(arrs) else arrs[i] for i in range(0, len(arrs), 2)]
print(" ".join(map(str, arrs[0])))
