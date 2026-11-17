import random, string

LETTERS = string.ascii_letters


def make(rng, jl, sl, pool=None):
    pool = pool or LETTERS
    jewels = "".join(rng.sample(LETTERS, jl))
    stones = "".join(rng.choice(pool) for _ in range(sl))
    return f"{jewels}\n{stones}\n"


def generate(rng):
    t = ["a\na\n", "a\nb\n", "abc\nxyz\n", "A\naaaaA\n", LETTERS + "\n" + LETTERS + "\n",
         "z\n" + "z" * 1000 + "\n", "Zz\nzZzZ\n"]
    for _ in range(25):
        t.append(make(rng, rng.randint(1, 6), rng.randint(1, 15), "abcABCxyz"))
    for _ in range(12):
        t.append(make(rng, rng.randint(1, 52), rng.randint(1, 2000)))
    for _ in range(3):
        t.append(make(rng, rng.randint(1, 52), 100000))
    t.append(make(rng, 52, 100000))
    big = [x for x in t if len(x) > 20000]
    return big + [x for x in t if len(x) <= 20000]


def validate(inp):
    lines = inp.split("\n")
    j, s = lines[0], lines[1]
    assert 1 <= len(j) <= 10**5 and 1 <= len(s) <= 10**5
    assert len(set(j)) == len(j)
    assert all(c in LETTERS for c in j + s)
    assert all(l == "" for l in lines[2:])
