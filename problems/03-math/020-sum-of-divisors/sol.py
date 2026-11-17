import sys

n = int(sys.stdin.read().split()[0])
# multiplicative formula: sigma(p^e) = 1 + p + ... + p^e
ans = 1
m = n
p = 2
while p * p <= m:
    if m % p == 0:
        term, pw = 1, 1
        while m % p == 0:
            m //= p
            pw *= p
            term += pw
        ans *= term
    p += 1 if p == 2 else 2
if m > 1:
    ans *= 1 + m
print(ans)
