Use recursion. For a given state (string suffix), iterate through all dictionary words. If a word is a prefix of the current suffix, recurse on the remaining suffix. Use memoization to avoid TLE.
