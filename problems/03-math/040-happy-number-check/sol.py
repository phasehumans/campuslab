import sys

def nxt(x):
    return sum(int(c) ** 2 for c in str(x))

n = int(sys.stdin.read().split()[0])
# Floyd cycle detection
slow, fast = n, nxt(n)
while fast != 1 and slow != fast:
    slow = nxt(slow)
    fast = nxt(nxt(fast))
print("true" if fast == 1 else "false")
