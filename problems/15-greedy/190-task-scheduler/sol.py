import sys

def main():
    d = sys.stdin.read().split()
    k, n = int(d[0]), int(d[1])
    cnt = {}
    for ch in d[2:2 + k]:
        cnt[ch] = cnt.get(ch, 0) + 1
    ready = {ch: 0 for ch in cnt}  # earliest time each letter may run again
    time = 0
    left = k
    # Simulate: at each step run the available letter with the most copies left;
    # if nothing is available, jump forward to the next ready time (idle slots).
    while left:
        best = None
        for ch in cnt:
            if cnt[ch] and ready[ch] <= time:
                if best is None or cnt[ch] > cnt[best]:
                    best = ch
        if best is None:
            time = min(ready[ch] for ch in cnt if cnt[ch])
            continue
        cnt[best] -= 1
        ready[best] = time + n + 1
        left -= 1
        time += 1
    print(time)

main()
