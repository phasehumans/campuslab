import sys

def suffix_array(s):
    n = len(s)
    rank = [ord(c) - 96 for c in s]
    sa = list(range(n))
    if n == 1:
        return sa, [0]
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
    data = sys.stdin.read().split()
    s = data[0]
    q = int(data[1])
    n = len(s)
    sa, rank = suffix_array(s)
    # distinct substrings = n(n+1)/2 - sum of LCPs of adjacent suffixes (Kasai)
    h = 0
    total_lcp = 0
    for i in range(n):
        r = rank[i]
        if r > 0:
            j = sa[r - 1]
            while i + h < n and j + h < n and s[i + h] == s[j + h]:
                h += 1
            total_lcp += h
            if h:
                h -= 1
        else:
            h = 0
    distinct = n * (n + 1) // 2 - total_lcp
    out = []
    pos = 2
    cache = {}
    for _ in range(q):
        t = data[pos]; pos += 1
        if t == "distinct":
            out.append(distinct)
            continue
        p = data[pos]; pos += 1
        if p in cache:
            out.append(cache[p]); continue
        m = len(p)
        lo, hi = 0, n          # first suffix whose m-prefix >= p
        while lo < hi:
            mid = (lo + hi) // 2
            if s[sa[mid]:sa[mid] + m] < p:
                lo = mid + 1
            else:
                hi = mid
        left = lo
        hi = n                 # first suffix whose m-prefix > p
        while lo < hi:
            mid = (lo + hi) // 2
            if s[sa[mid]:sa[mid] + m] <= p:
                lo = mid + 1
            else:
                hi = mid
        cache[p] = lo - left
        out.append(lo - left)
    print("\n".join(map(str, out)))

main()
