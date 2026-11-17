import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    pos = list(map(int, d[1:1 + n]))
    # Try both candidate parities directly: cost = chips of the other parity.
    best = min(sum(1 for p in pos if (p - target) % 2) for target in (0, 1))
    print(best)

main()
