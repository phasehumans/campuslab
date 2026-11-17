import sys

s, t = sys.stdin.read().split()[:2]
print("true" if sorted(s) == sorted(t) else "false")
