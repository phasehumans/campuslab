import sys

def main():
    data = sys.stdin.read().split("\n")
    n = int(data[0])
    words = (data[1:1 + n] + [""] * n)[:n]
    pairs = []
    if n <= 300:
        for i in range(n):
            for j in range(n):
                if i != j:
                    s = words[i] + words[j]
                    if s == s[::-1]:
                        pairs.append((i, j))
    else:
        rev = {w[::-1]: i for i, w in enumerate(words)}
        found = set()
        for i, w in enumerate(words):
            L = len(w)
            for k in range(L + 1):
                left, right = w[:k], w[k:]
                # w + words[j] palindrome: words[j] == reverse(left) and right palindrome
                if right == right[::-1]:
                    j = rev.get(left)
                    if j is not None and j != i:
                        found.add((i, j))
                # words[j] + w palindrome: words[j] == reverse(right) and left palindrome
                if left == left[::-1]:
                    j = rev.get(right)
                    if j is not None and j != i:
                        found.add((j, i))
        pairs = sorted(found)
    out = [str(len(pairs))]
    out += [f"{a} {b}" for a, b in pairs]
    print("\n".join(out))

main()
