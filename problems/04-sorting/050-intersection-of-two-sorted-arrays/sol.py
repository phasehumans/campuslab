import sys

lines = sys.stdin.read().split("\n")
a = set(map(int, lines[1].split()))
b = set(map(int, lines[2].split()))
print(" ".join(map(str, sorted(a & b))))
