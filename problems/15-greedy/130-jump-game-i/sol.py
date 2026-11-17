import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    a = list(map(int, d[1:1 + n]))
    # Walk backwards keeping the leftmost index known to reach the end.
    goal = n - 1
    for i in range(n - 2, -1, -1):
        if i + a[i] >= goal:
            goal = i
    print("true" if goal == 0 else "false")

main()
