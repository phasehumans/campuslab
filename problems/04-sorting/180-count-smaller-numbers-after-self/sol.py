import sys

# merge sort on indices; when an element from the left half is placed, every right-half
# element already placed is smaller and lies to its right
def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    a = list(map(int, d[1:1 + n]))
    cnt = [0] * n
    idx = list(range(n))
    tmp = [0] * n
    width = 1
    while width < n:
        for lo in range(0, n, 2 * width):
            mid = min(lo + width, n)
            hi = min(lo + 2 * width, n)
            i, j, k = lo, mid, lo
            while i < mid and j < hi:
                if a[idx[j]] < a[idx[i]]:
                    tmp[k] = idx[j]; j += 1
                else:
                    cnt[idx[i]] += j - mid
                    tmp[k] = idx[i]; i += 1
                k += 1
            while i < mid:
                cnt[idx[i]] += j - mid
                tmp[k] = idx[i]; i += 1; k += 1
            while j < hi:
                tmp[k] = idx[j]; j += 1; k += 1
            idx[lo:hi] = tmp[lo:hi]
        width *= 2
    print(" ".join(map(str, cnt)))

main()
