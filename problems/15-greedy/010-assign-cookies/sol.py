import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0]); g = list(map(int, d[1:1 + n]))
    m = int(d[1 + n]); s = list(map(int, d[2 + n:2 + n + m]))
    g.sort(reverse=True)
    s.sort(reverse=True)
    j = 0
    count = 0
    # Greediest child first: give it the biggest remaining cookie if it is enough.
    for x in g:
        if j < m and s[j] >= x:
            count += 1
            j += 1
    print(count)

main()
