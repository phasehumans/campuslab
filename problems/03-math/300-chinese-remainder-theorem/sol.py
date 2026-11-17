import sys

data = sys.stdin.read().split()
k = int(data[0])
num = list(map(int, data[1:1 + k]))
rem = list(map(int, data[1 + k:1 + 2 * k]))
# incremental merge: x = cur (mod mod); step x by mod until it fits the next congruence,
# using a modular inverse to jump directly
cur, mod = 0, 1
for n, r in zip(num, rem):
    # find t with cur + t*mod = r (mod n)
    if n == 1:
        continue
    t = (r - cur) * pow(mod % n, -1, n) % n
    cur += t * mod
    mod *= n
    cur %= mod
print(cur)
