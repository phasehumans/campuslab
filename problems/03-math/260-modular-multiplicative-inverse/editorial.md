**Approach: Extended Euclidean Algorithm**

The modular inverse of `a` modulo `m` is an integer `x` such that `a * x = 1 (mod m)`, which can be rewritten as `a * x - q * m = 1` for some integer `q`.

This is a Linear Diophantine Equation: `a * x + m * y = 1`.
By Bezout's Identity, this equation has a solution if and only if `gcd(a, m) = 1`.

We can find `x` using the Extended Euclidean Algorithm:
```cpp
long long extGCD(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    long long x1, y1;
    long long g = extGCD(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}
```
If `g != 1`, return `-1`. Otherwise, return `(x % m + m) % m` to ensure it is positive.

**Time Complexity:** O(log(min(a, m)))
**Space Complexity:** O(log(min(a, m))) due to recursion stack
