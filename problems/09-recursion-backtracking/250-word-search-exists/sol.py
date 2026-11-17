import sys

sys.setrecursionlimit(10000)
data = sys.stdin.read().split()
m, n = int(data[0]), int(data[1])
grid = [data[2 + i * n: 2 + (i + 1) * n] for i in range(m)]
word = data[2 + m * n]


def search(r, c, k, used):
    if grid[r][c] != word[k]:
        return False
    if k == len(word) - 1:
        return True
    used.add((r, c))
    for rr, cc in ((r, c + 1), (r + 1, c), (r, c - 1), (r - 1, c)):
        if 0 <= rr < m and 0 <= cc < n and (rr, cc) not in used and search(rr, cc, k + 1, used):
            used.discard((r, c))
            return True
    used.discard((r, c))
    return False


from collections import Counter

have = Counter(ch for row in grid for ch in row)
need = Counter(word)
if any(have[ch] < cnt for ch, cnt in need.items()):
    found = False  # the board does not even contain enough of some letter
else:
    found = any(search(r, c, 0, set()) for r in range(m) for c in range(n))
print("true" if found else "false")
