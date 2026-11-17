import sys

n = int(sys.stdin.read().split()[0])
# odd-only sieve with bytearray slicing
if n < 2:
    print()
else:
    sieve = bytearray([1]) * (n + 1)
    sieve[0] = sieve[1] = 0
    sieve[4::2] = bytearray(len(range(4, n + 1, 2)))
    i = 3
    while i * i <= n:
        if sieve[i]:
            sieve[i * i::2 * i] = bytearray(len(range(i * i, n + 1, 2 * i)))
        i += 2
    print(" ".join(str(i) for i in range(n + 1) if sieve[i]))
