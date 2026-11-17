x, y = map(int, input().split())
d = 0
for i in range(32):
    if (x >> i) & 1 != (y >> i) & 1:
        d += 1
print(d)
