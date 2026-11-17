import sys

# Divide and conquer: merge lists pairwise until one remains.
tok = list(map(int, sys.stdin.read().split()))
k = tok[0]
pos = 1
lists = []
for _ in range(k):
    m = tok[pos]
    lists.append(tok[pos + 1:pos + 1 + m])
    pos += 1 + m


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


while len(lists) > 1:
    lists = [merge(lists[i], lists[i + 1]) if i + 1 < len(lists) else lists[i] for i in range(0, len(lists), 2)]
print(" ".join(map(str, lists[0] if lists else [])))
