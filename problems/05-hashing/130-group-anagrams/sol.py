import sys

d = sys.stdin.read().split()
n = int(d[0])
groups = {}
for w in d[1:n + 1]:
    key = [0] * 26
    for ch in w:
        key[ord(ch) - 97] += 1
    groups.setdefault(tuple(key), []).append(w)
out = sorted(sorted(g) for g in groups.values())
print("\n".join(" ".join(g) for g in out))
