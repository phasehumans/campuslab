import sys

# two linear scans with counters (left-to-right, then right-to-left)
s = sys.stdin.readline().strip()


def scan(chars, opener):
    best = o = c = 0
    for ch in chars:
        if ch == opener:
            o += 1
        else:
            c += 1
        if o == c:
            best = max(best, 2 * o)
        elif c > o:
            o = c = 0
    return best


print(max(scan(s, "("), scan(reversed(s), ")")))
