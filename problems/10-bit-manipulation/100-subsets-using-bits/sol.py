import sys

data = sys.stdin.read().split()
n = int(data[0])
a = data[1:n + 1]
# subsets in mask order: subsets[m] for m < 2^k, then the same with a[k] appended
subsets = [[]]
for k in range(n):
    subsets += [s + [a[k]] for s in subsets]
sys.stdout.write("\n".join(" ".join(s) for s in subsets) + "\n")
