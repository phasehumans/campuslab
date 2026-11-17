import sys

n = int(input())
# brute force over all 2^(2n) strings is too slow for n=10, so build level by level:
# keep every valid prefix, extend, and finally sort.
prefixes = {("", 0, 0)}
for _ in range(2 * n):
    nxt = set()
    for s, op, cl in prefixes:
        if op < n:
            nxt.add((s + "(", op + 1, cl))
        if cl < op:
            nxt.add((s + ")", op, cl + 1))
    prefixes = nxt
sys.stdout.write("\n".join(sorted(s for s, _, _ in prefixes)) + "\n")
