import sys

sys.setrecursionlimit(100)
n = int(input())
pos = [0] * n  # pos[r] = column of the queen in row r


def place(r):
    if r == n:
        return 1
    total = 0
    for c in range(n):
        ok = True
        for pr in range(r):
            pc = pos[pr]
            if pc == c or abs(pc - c) == r - pr:
                ok = False
                break
        if ok:
            pos[r] = c
            total += place(r + 1)
    return total


print(place(0))
