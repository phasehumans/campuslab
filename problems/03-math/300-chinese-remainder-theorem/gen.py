import random
from math import gcd

def _case(rng, k, cap):
    num = []
    prod = 1
    tries = 0
    while len(num) < k and tries < 10000:
        tries += 1
        x = rng.randint(1, min(10**9, cap // prod))
        if all(gcd(x, y) == 1 for y in num) and prod * x <= cap:
            num.append(x)
            prod *= x
    rem = [rng.randint(0, n - 1) for n in num]
    return f"{len(num)}\n{' '.join(map(str, num))}\n{' '.join(map(str, rem))}"

def generate(rng: random.Random) -> list[str]:
    tests = ["1\n1\n0", "1\n1000000000\n999999999", "2\n1 7\n0 3", "2\n999999937 1000\n5 999",
             "2\n1000000 999999\n999999 0", "3\n2 3 5\n0 0 0", "3\n2 3 5\n1 2 4",
             "10\n2 3 5 7 11 13 17 19 23 29\n1 2 3 4 5 6 7 8 9 10",
             "10\n1 1 1 1 1 1 1 1 1 999999937\n0 0 0 0 0 0 0 0 0 123",
             "3\n1009 1013 1019\n1008 1012 1018"]
    for _ in range(15):
        tests.append(_case(rng, rng.randint(1, 4), 10**4))
    for _ in range(25):
        tests.append(_case(rng, rng.randint(1, 10), 10**12))
    return tests

def validate(inp: str) -> None:
    lines = inp.split("\n")
    k = int(lines[0])
    num = list(map(int, lines[1].split()))
    rem = list(map(int, lines[2].split()))
    assert 1 <= k <= 10 and len(num) == k and len(rem) == k
    prod = 1
    for i in range(k):
        assert 1 <= num[i] <= 10**9 and 0 <= rem[i] < num[i]
        for j in range(i):
            assert gcd(num[i], num[j]) == 1
        prod *= num[i]
    assert prod <= 10**12
