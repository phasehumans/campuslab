import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    r = list(map(int, d[1:1 + n]))
    c = [1] * n
    # Process children from lowest to highest rating: each child's neighbours with a
    # lower rating are already final, so the child needs one more than the largest of them.
    for i in sorted(range(n), key=lambda i: r[i]):
        if i > 0 and r[i - 1] < r[i]:
            c[i] = max(c[i], c[i - 1] + 1)
        if i + 1 < n and r[i + 1] < r[i]:
            c[i] = max(c[i], c[i + 1] + 1)
    print(sum(c))

main()
