import sys

def main():
    d = sys.stdin.read().split()
    n, t = int(d[0]), int(d[1])
    a = list(map(int, d[2:2 + n]))
    # linear scan: first index whose value is >= target
    ans = n
    for i, x in enumerate(a):
        if x >= t:
            ans = i
            break
    print(ans)

main()
