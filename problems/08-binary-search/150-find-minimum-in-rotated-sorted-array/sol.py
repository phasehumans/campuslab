import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    print(min(map(int, d[1:1 + n])))

main()
