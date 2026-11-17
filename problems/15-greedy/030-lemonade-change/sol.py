import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    bills = list(map(int, d[1:1 + n]))
    have = {5: 0, 10: 0}
    for b in bills:
        change = b - 5
        # pay back using the largest notes first (only 10s and 5s are ever useful)
        for note in (10, 5):
            while change >= note and have[note] > 0:
                have[note] -= 1
                change -= note
        if change:
            print("false")
            return
        if b in have:
            have[b] += 1
    print("true")

main()
