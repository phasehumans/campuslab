import sys

# zero counting + modular inverses (|a[i]| < MOD, so non-zero values are invertible)
MOD = 10**9 + 7
data = sys.stdin.read().split()
n = int(data[0])
a = [int(x) for x in data[1:1 + n]]
zeros = a.count(0)
prod = 1
for x in a:
    if x != 0:
        prod = prod * (x % MOD) % MOD
res = []
for x in a:
    if zeros >= 2:
        res.append(0)
    elif zeros == 1:
        res.append(prod if x == 0 else 0)
    else:
        res.append(prod * pow(x % MOD, MOD - 2, MOD) % MOD)
print(" ".join(map(str, res)))
