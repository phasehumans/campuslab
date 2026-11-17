import sys

def main():
    d = sys.stdin.read().split()
    m, n = int(d[0]), int(d[1])
    a = list(map(int, d[2:2 + m]))
    b = list(map(int, d[2 + m:2 + m + n]))
    c = sorted(a + b)
    t = m + n
    if t % 2:
        s = 2 * c[t // 2]
    else:
        s = c[t // 2 - 1] + c[t // 2]
    # median = s / 2, printed exactly with 5 decimals
    sign = "-" if s < 0 else ""
    s = abs(s)
    print(f"{sign}{s // 2}.{'50000' if s % 2 else '00000'}")

main()
