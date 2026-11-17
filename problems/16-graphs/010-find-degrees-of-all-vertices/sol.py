import sys
from collections import Counter

def main():
    d = sys.stdin.buffer.read().split()
    n, m = int(d[0]), int(d[1])
    cnt = Counter(d[2:2 + 2 * m])  # every endpoint occurrence adds one to the degree
    print(" ".join(str(cnt.get(str(v).encode(), 0)) for v in range(n)))

main()
