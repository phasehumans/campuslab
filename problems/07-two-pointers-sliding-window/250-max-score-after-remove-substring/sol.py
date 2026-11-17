import sys

# Counter-based greedy per maximal block of a/b letters: first take every pair of the more
# valuable order, then the leftover letters pair up in the other order min(a, b) times.
d = sys.stdin.read().split()
s, x, y = d[0], int(d[1]), int(d[2])
first, second = ("a", "b") if x >= y else ("b", "a")
hi, lo = max(x, y), min(x, y)
total = 0
cf = cs = 0
for ch in s + "#":
    if ch == first:
        cf += 1
    elif ch == second:
        if cf:
            cf -= 1
            total += hi
        else:
            cs += 1
    else:
        total += min(cf, cs) * lo
        cf = cs = 0
print(total)
