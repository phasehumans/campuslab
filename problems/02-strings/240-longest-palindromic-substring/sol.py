# Manacher's algorithm on the transformed string ^#a#b#...#$
s = input().strip()
t = "^#" + "#".join(s) + "#$"
n = len(t)
p = [0] * n
c = r = 0
for i in range(1, n - 1):
    if i < r:
        p[i] = min(r - i, p[2 * c - i])
    while t[i + p[i] + 1] == t[i - p[i] - 1]:
        p[i] += 1
    if i + p[i] > r:
        c, r = i, i + p[i]
best_len, best_start = 0, 0
for i in range(1, n - 1):
    length = p[i]
    start = (i - length) // 2
    if length > best_len or (length == best_len and start < best_start):
        best_len, best_start = length, start
print(s[best_start:best_start + best_len])
