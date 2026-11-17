import sys

def suffix_array(s):
    n = len(s)
    rank = [ord(c) - 96 for c in s]
    sa = list(range(n))
    k = 1
    while True:
        mul = max(rank) + 2
        key = [rank[i] * mul + (rank[i + k] + 1 if i + k < n else 0) for i in range(n)]
        sa.sort(key=key.__getitem__)
        new = [0] * n
        r = 0
        for idx in range(1, n):
            if key[sa[idx]] != key[sa[idx - 1]]:
                r += 1
            new[sa[idx]] = r
        rank = new
        if r == n - 1:
            break
        k <<= 1
    return sa, rank

def main():
    s = sys.stdin.readline().strip()
    n = len(s)
    if n == 1:
        print(""); return
    sa, rank = suffix_array(s)
    lcp = [0] * n  # lcp[i] = lcp(sa[i-1], sa[i])
    h = 0
    for i in range(n):
        r = rank[i]
        if r > 0:
            j = sa[r - 1]
            while i + h < n and j + h < n and s[i + h] == s[j + h]:
                h += 1
            lcp[r] = h
            if h:
                h -= 1
        else:
            h = 0
    m = max(lcp)
    if m == 0:
        print(""); return
    start = min(min(sa[i], sa[i - 1]) for i in range(1, n) if lcp[i] == m)
    print(s[start:start + m])

main()
