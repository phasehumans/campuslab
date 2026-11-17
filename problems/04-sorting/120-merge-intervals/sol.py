import sys

# sort starts and ends independently; a merged block ends at ends[i] when starts[i+1] > ends[i]
d = sys.stdin.read().split()
n = int(d[0])
starts = sorted(int(d[1 + 2 * i]) for i in range(n))
ends = sorted(int(d[2 + 2 * i]) for i in range(n))
res = []
j = 0
for i in range(n):
    if i == n - 1 or starts[i + 1] > ends[i]:
        res.append(f"{starts[j]} {ends[i]}")
        j = i + 1
print(len(res))
print("\n".join(res))
