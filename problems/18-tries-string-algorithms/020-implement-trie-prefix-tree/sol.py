import sys
from bisect import bisect_left, insort
def main():
    d = sys.stdin.read().split()
    q = int(d[0])
    words = set()
    prefixes = set()
    out = []
    for i in range(q):
        op, w = d[1 + 2 * i], d[2 + 2 * i]
        if op == "insert":
            if w not in words:
                words.add(w)
                for k in range(1, len(w) + 1):
                    prefixes.add(w[:k])
        elif op == "search":
            out.append("true" if w in words else "false")
        else:
            out.append("true" if w in prefixes else "false")
    print("\n".join(out))
main()
