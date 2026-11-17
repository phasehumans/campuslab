import sys


def main():
    data = sys.stdin.read().split()
    n = int(data[0])
    N = n * n
    free0 = 0
    for i in range(N):
        if data[1 + i] == "1":
            free0 |= 1 << i
    target = N - 1
    if not free0 & 1 or not (free0 >> target) & 1:
        print(0)
        return
    nbrs = []
    for i in range(N):
        r, c = divmod(i, n)
        lst = []
        for dr, dc in ((1, 0), (0, 1), (-1, 0), (0, -1)):
            rr, cc = r + dr, c + dc
            if 0 <= rr < n and 0 <= cc < n:
                lst.append((rr * n + cc, 1 << (rr * n + cc)))
        nbrs.append(lst)

    def go(cell, free):
        # count simple paths from cell to target using only cells in `free`
        if cell == target:
            return 1
        total = 0
        for nb, bit in nbrs[cell]:
            if free & bit:
                total += go(nb, free ^ bit)
        return total

    print(go(0, free0 & ~1))


main()
