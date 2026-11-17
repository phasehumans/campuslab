import random
import string

def fmt(tasks, n):
    return f"{len(tasks)} {n}\n{' '.join(tasks)}"

def rand_tasks(rng, k, letters, skew=False):
    pool = rng.sample(string.ascii_uppercase, letters)
    if skew:
        w = [rng.randint(1, 20) ** 2 for _ in pool]
        return rng.choices(pool, weights=w, k=k)
    return [rng.choice(pool) for _ in range(k)]

def generate(rng: random.Random) -> list[str]:
    t = [fmt(["A"], 0), fmt(["A"], 100), fmt(["A", "A"], 100), fmt(["A", "B"], 5), fmt(list("AAAB"), 1),
         fmt(list("AAABBBCCCDDE"), 2), fmt(list(string.ascii_uppercase), 100), fmt(list("AAAAAABCDEFG"), 2)]
    K = 10**4
    t.append(fmt(["Z"] * K, 100))
    t.append(fmt(rand_tasks(rng, K, 26), 100))
    t.append(fmt(rand_tasks(rng, K, 26, True), 7))
    t.append(fmt(rand_tasks(rng, K, 3), 0))
    for _ in range(12):
        t.append(fmt(rand_tasks(rng, rng.randint(50, 3000), rng.randint(1, 26), rng.random() < 0.5),
                     rng.choice([0, 1, 2, 5, 30, 100])))
    for _ in range(60):
        t.append(fmt(rand_tasks(rng, rng.randint(1, 12), rng.randint(1, 5), rng.random() < 0.5), rng.randint(0, 4)))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    k, n = int(d[0]), int(d[1])
    assert 1 <= k <= 10**4 and 0 <= n <= 100
    tasks = d[2:]
    assert len(tasks) == k
    assert all(len(x) == 1 and x in string.ascii_uppercase for x in tasks)
