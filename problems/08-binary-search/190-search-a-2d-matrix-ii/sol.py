import sys

def main():
    d = sys.stdin.read().split()
    m, n, t = int(d[0]), int(d[1]), d[2]
    vals = d[3:3 + m * n]
    # tokens compared as integers
    tv = int(t)
    print("true" if any(int(x) == tv for x in vals) else "false")

main()
