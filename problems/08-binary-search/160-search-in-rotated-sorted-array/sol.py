import sys

def main():
    d = sys.stdin.read().split()
    n, t = int(d[0]), int(d[1])
    a = list(map(int, d[2:2 + n]))
    pos = {x: i for i, x in enumerate(a)}
    print(pos.get(t, -1))

main()
