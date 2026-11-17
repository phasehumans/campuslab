import sys


def pattern(x):
    first = {}
    return [first.setdefault(c, len(first)) for c in x]


s, t = sys.stdin.read().split()[:2]
print("true" if len(s) == len(t) and pattern(s) == pattern(t) else "false")
