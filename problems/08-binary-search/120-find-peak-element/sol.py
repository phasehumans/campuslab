import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    a = list(map(int, d[1:1 + n]))
    # the array is unimodal, so the peak is the maximum
    print(max(range(n), key=lambda i: a[i]))

main()
