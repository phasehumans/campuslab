import sys
from collections import defaultdict

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    adj = defaultdict(list)
    for i in range(n):
        adj[d[1 + 2 * i]].append(d[2 + 2 * i])
    for k in adj:
        adj[k].sort(reverse=True)  # pop() yields the smallest destination
    # iterative Hierholzer
    stack = ["JFK"]
    route = []
    while stack:
        top = stack[-1]
        if adj[top]:
            stack.append(adj[top].pop())
        else:
            route.append(stack.pop())
    print(" ".join(reversed(route)))

main()
