import sys
from collections import Counter
def main():
    d = sys.stdin.read().split()
    s = d[0]; m = int(d[1]); words = d[2:2 + m]
    L = len(words[0]); n = len(s)
    need = Counter(words)
    ids = {w: i for i, w in enumerate(need)}
    cnt = [need[w] for w in ids]
    at = [ids.get(s[i:i + L], -1) for i in range(n)]
    res = []
    for i in range(n - L * m + 1):
        used = [0] * len(cnt)
        ok = True
        for j in range(m):
            x = at[i + j * L]
            if x < 0:
                ok = False; break
            used[x] += 1
            if used[x] > cnt[x]:
                ok = False; break
        if ok:
            res.append(i)
    print(" ".join(map(str, res)))
main()
