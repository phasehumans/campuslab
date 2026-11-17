import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    r = 0
    for x in d[1:1 + n]:
        r ^= int(x)
    print(r)

main()
