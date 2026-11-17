import sys
from collections import defaultdict

def main():
    d = sys.stdin.read().split()
    begin, end, k = d[0], d[1], int(d[2])
    words = set(d[3:3 + k])
    if end not in words:
        print(0)
        return
    L = len(begin)
    # bucket words by wildcard pattern: "h*t" -> all list words matching it
    buckets = defaultdict(list)
    for w in words:
        for i in range(L):
            buckets[w[:i] + "*" + w[i + 1:]].append(w)
    dist = {begin: 1}
    frontier = [begin]
    used = set()
    while frontier:
        nxt = []
        for w in frontier:
            for i in range(L):
                p = w[:i] + "*" + w[i + 1:]
                if p in used:
                    continue
                used.add(p)
                for x in buckets.get(p, ()):
                    if x not in dist:
                        dist[x] = dist[w] + 1
                        if x == end:
                            print(dist[x])
                            return
                        nxt.append(x)
        frontier = nxt
    print(0)

main()
