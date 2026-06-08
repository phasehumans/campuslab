import type { SeedProblem } from './types.js'

export const mathNumberTheoryProblems: SeedProblem[] = [
    // ==================== EASY #1: Sieve of Eratosthenes ====================
    {
        title: "Sieve of Eratosthenes",
        description: "Given an integer n, find all prime numbers less than or equal to n.\n\n**Input Format:**\n- A single line containing an integer n.\n\n**Output Format:**\n- A single line containing all prime numbers less than or equal to n in ascending order, separated by a single space. If there are no prime numbers less than or equal to n (i.e., n < 2), print an empty line.",
        difficulty: "EASY",
        tags: ["math", "number-theory", "prime"],
        constraints: "1 <= n <= 10^6",
        hints: "Use the Sieve of Eratosthenes algorithm. Maintain a boolean array to keep track of prime numbers, initially marking all numbers from 2 to n as prime. Then, for each prime number, mark all its multiples as non-prime.",
        editorial: "**Approach: Sieve of Eratosthenes**\n\nThe Sieve of Eratosthenes is an ancient and efficient algorithm for finding all prime numbers up to any given limit. It runs in O(n log log n) time complexity.\n\n1. Create a boolean array `isPrime` of size `n + 1` and initialize all entries as `true`. Set `isPrime[0]` and `isPrime[1]` to `false`.\n2. Loop from `p = 2` to `sqrt(n)`. If `isPrime[p]` is true, then mark all multiples of `p` starting from `p*p` as `false`.\n3. Finally, collect and print all indices `p` where `isPrime[p]` is true.\n\n**Time Complexity:** O(n log log n)\n**Space Complexity:** O(n)",
        examples: [
            { title: "Example 1", input: "10", output: "2 3 5 7", explanation: "Primes less than or equal to 10 are 2, 3, 5, and 7." },
            { title: "Example 2", input: "1", output: "", explanation: "There are no prime numbers less than or equal to 1." }
        ],
        testcases: [
            { input: "10", output: "2 3 5 7" },
            { input: "1", output: "" },
            { input: "2", output: "2" },
            { input: "3", output: "2 3" },
            { input: "20", output: "2 3 5 7 11 13 17 19" },
            { input: "50", output: "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47" },
            { input: "100", output: "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97" },
            { input: "11", output: "2 3 5 7 11" },
            { input: "30", output: "2 3 5 7 11 13 17 19 23 29" },
            { input: "15", output: "2 3 5 7 11 13" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    // Read n and print primes up to n
    
    return 0;
}`,
            python: `def main():
    # Read n and print primes up to n
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n and print primes up to n
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and print primes up to n
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    if (n < 2) {
        cout << "\n";
        return 0;
    }
    vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p <= n; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= n; i += p) {
                is_prime[i] = false;
            }
        }
    }
    bool first = true;
    for (int p = 2; p <= n; p++) {
        if (is_prime[p]) {
            if (!first) cout << " ";
            cout << p;
            first = false;
        }
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys

def main():
    line = sys.stdin.read().split()
    if not line:
        return
    n = int(line[0])
    if n < 2:
        print()
        return
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for p in range(2, int(n**0.5) + 1):
        if is_prime[p]:
            for i in range(p * p, n + 1, p):
                is_prime[i] = False
    primes = [str(p) for p in range(2, n + 1) if is_prime[p]]
    print(" ".join(primes))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            return;
        }
        int n = Integer.parseInt(line.trim());
        if (n < 2) {
            System.out.println();
            return;
        }
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        for (int p = 2; p * p <= n; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= n; i += p) {
                    isPrime[i] = false;
                }
            }
        }
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        for (int p = 2; p <= n; p++) {
            if (isPrime[p]) {
                if (!first) sb.append(" ");
                sb.append(p);
                first = false;
            }
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut line = String::new();
    if stdin.lock().read_line(&mut line).is_err() {
        return;
    }
    let trimmed = line.trim();
    if trimmed.is_empty() {
        return;
    }
    let n: usize = match trimmed.parse() {
        Ok(val) => val,
        Err(_) => return,
    };
    if n < 2 {
        writeln!(out).unwrap();
        return;
    }
    let mut is_prime = vec![true; n + 1];
    is_prime[0] = false;
    is_prime[1] = false;
    let mut p = 2;
    while p * p <= n {
        if is_prime[p] {
            let mut i = p * p;
            while i <= n {
                is_prime[i] = false;
                i += p;
            }
        }
        p += 1;
    }
    let mut first = true;
    for p in 2..=n {
        if is_prime[p] {
            if !first {
                write!(out, " ").unwrap();
            }
            write!(out, "{}", p).unwrap();
            first = false;
        }
    }
    writeln!(out).unwrap();
}`
        }
    },

    // ==================== EASY #2: GCD and LCM ====================
    {
        title: "GCD and LCM",
        description: "Given two integers a and b, find their Greatest Common Divisor (GCD) and Least Common Multiple (LCM).\n\n**Input Format:**\n- A single line containing two space-separated integers a and b.\n\n**Output Format:**\n- A single line containing two space-separated integers: GCD(a, b) and LCM(a, b).",
        difficulty: "EASY",
        tags: ["math", "number-theory"],
        constraints: "1 <= a, b <= 10^9\nNote: LCM can exceed the limits of a 32-bit signed integer.",
        hints: "Use the Euclidean algorithm to find the GCD. Once GCD is found, the LCM can be calculated using the formula: LCM(a, b) = (a * b) / GCD(a, b). To avoid overflow during calculation, divide one of the numbers by GCD before multiplying.",
        editorial: "**Approach: Euclidean Algorithm**\n\nThe Greatest Common Divisor (GCD) of two numbers can be found using the Euclidean Algorithm, which recursively computes gcd(a, b) = gcd(b, a % b). This runs in logarithmic time.\n\nThe Least Common Multiple (LCM) is related to GCD by the formula: `a * b = GCD(a, b) * LCM(a, b)`. Thus, `LCM(a, b) = (a / GCD(a, b)) * b`.\n\nTo prevent integer overflow during multiplication, division should be performed first. Using 64-bit integers (`long long` in C++, `long` in Java, `u64` in Rust) is mandatory.\n\n**Time Complexity:** O(log(min(a, b)))\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "12 18", output: "6 36", explanation: "GCD of 12 and 18 is 6. LCM is (12 * 18) / 6 = 36." },
            { title: "Example 2", input: "5 7", output: "1 35", explanation: "GCD of 5 and 7 is 1. LCM is (5 * 7) / 1 = 35." }
        ],
        testcases: [
            { input: "12 18", output: "6 36" },
            { input: "5 7", output: "1 35" },
            { input: "1 1", output: "1 1" },
            { input: "100 100", output: "100 100" },
            { input: "1000000000 1000000000", output: "1000000000 1000000000" },
            { input: "24 60", output: "12 120" },
            { input: "987654321 123456789", output: "9 13537018526105319" },
            { input: "1000000 999999", output: "1 999999000000" },
            { input: "1000000000 1", output: "1 1000000000" },
            { input: "123456 654321", output: "3 26945532096" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long a, b;
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read a and b and print GCD and LCM
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

long long gcd(long long a, long long b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long a, b;
    if (cin >> a >> b) {
        long long g = gcd(a, b);
        long long l = (a / g) * b;
        cout << g << " " << l << "\n";
    }
    return 0;
}`,
            python: `import sys
import math

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    a = int(input_data[0])
    b = int(input_data[1])
    g = math.gcd(a, b)
    l = (a // g) * b
    print(f"{g} {l}")

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    private static long gcd(long a, long b) {
        while (b > 0) {
            long temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        if (!st.hasMoreTokens()) return;
        long a = Long.parseLong(st.nextToken());
        long b = Long.parseLong(st.nextToken());
        long g = gcd(a, b);
        long l = (a / g) * b;
        System.out.println(g + " " + l);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn gcd(mut a: u64, mut b: u64) -> u64 {
    while b > 0 {
        let temp = a % b;
        a = b;
        b = temp;
    }
    a
}

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut line = String::new();
    if stdin.lock().read_line(&mut line).is_err() {
        return;
    }
    let parts: Vec<&str> = line.trim().split_whitespace().collect();
    if parts.len() < 2 {
        return;
    }
    let a: u64 = parts[0].parse().unwrap();
    let b: u64 = parts[1].parse().unwrap();
    let g = gcd(a, b);
    let l = (a / g) * b;
    writeln!(out, "{} {}", g, l).unwrap();
}`
        }
    },

    // ==================== EASY #3: Prime Factorization ====================
    {
        title: "Prime Factorization",
        description: "Given an integer n, find its prime factorization.\n\n**Input Format:**\n- A single line containing an integer n.\n\n**Output Format:**\n- A single line containing the prime factorization of n in ascending order of prime factors, in the format `p^e` separated by spaces. If n = 1, print an empty line.",
        difficulty: "EASY",
        tags: ["math", "number-theory", "prime"],
        constraints: "2 <= n <= 10^9",
        hints: "Loop from i = 2 up to sqrt(n). If i divides n, count how many times it divides. Output the factor as i^count, update n, and continue. If after the loop n is still greater than 1, then n itself is a prime factor.",
        editorial: "**Approach: Trial Division up to sqrt(n)**\n\nTo find the prime factorization of a number n:\n1. Iterate `i` from 2 up to `sqrt(n)`.\n2. If `i` divides `n` perfectly, count how many times it divides (`count`). Print `i^count`.\n3. Update `n = n / (i^count)`.\n4. After examining all candidate divisors up to `sqrt(n)`, if the remaining `n` is greater than 1, it must be prime. In this case, print `n^1`.\n\n**Time Complexity:** O(sqrt(n))\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "12", output: "2^2 3^1", explanation: "12 = 2 * 2 * 3, which is 2^2 * 3^1." },
            { title: "Example 2", input: "30", output: "2^1 3^1 5^1", explanation: "30 = 2 * 3 * 5, which is 2^1 * 3^1 * 5^1." }
        ],
        testcases: [
            { input: "12", output: "2^2 3^1" },
            { input: "30", output: "2^1 3^1 5^1" },
            { input: "2", output: "2^1" },
            { input: "999999991", output: "999999991^1" },
            { input: "100000000", output: "2^8 5^8" },
            { input: "1024", output: "2^10" },
            { input: "123456789", output: "3^2 3607^1 3803^1" },
            { input: "999999999", output: "3^4 37^1 333667^1" },
            { input: "97", output: "97^1" },
            { input: "1000000000", output: "2^9 5^9" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long n;
    // Read n and output prime factors in format p^e
    
    return 0;
}`,
            python: `def main():
    # Read n and output prime factors in format p^e
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n and output prime factors in format p^e
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and output prime factors in format p^e
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    if (!(cin >> n)) return 0;
    bool first = true;
    long long temp = n;
    for (long long i = 2; i * i <= temp; i++) {
        if (temp % i == 0) {
            int count = 0;
            while (temp % i == 0) {
                count++;
                temp /= i;
            }
            if (!first) cout << " ";
            cout << i << "^" << count;
            first = false;
        }
    }
    if (temp > 1) {
        if (!first) cout << " ";
        cout << temp << "^1";
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys

def main():
    line = sys.stdin.read().split()
    if not line:
        return
    n = int(line[0])
    temp = n
    factors = []
    i = 2
    while i * i <= temp:
        if temp % i == 0:
            count = 0
            while temp % i == 0:
                count += 1
                temp //= i
            factors.append(f"{i}^{count}")
        i += 1
    if temp > 1:
        factors.append(f"{temp}^1")
    print(" ".join(factors))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        long n = Long.parseLong(line.trim());
        long temp = n;
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        for (long i = 2; i * i <= temp; i++) {
            if (temp % i == 0) {
                int count = 0;
                while (temp % i == 0) {
                    count++;
                    temp /= i;
                }
                if (!first) sb.append(" ");
                sb.append(i).append("^").append(count);
                first = false;
            }
        }
        if (temp > 1) {
            if (!first) sb.append(" ");
            sb.append(temp).append("^1");
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut line = String::new();
    if stdin.lock().read_line(&mut line).is_err() {
        return;
    }
    let trimmed = line.trim();
    if trimmed.is_empty() {
        return;
    }
    let n: u64 = trimmed.parse().unwrap();
    let mut temp = n;
    let mut first = true;
    let mut i = 2;
    while i * i <= temp {
        if temp % i == 0 {
            let mut count = 0;
            while temp % i == 0 {
                count += 1;
                temp /= i;
            }
            if !first {
                write!(out, " ").unwrap();
            }
            write!(out, "{}^{}", i, count).unwrap();
            first = false;
        }
        i += 1;
    }
    if temp > 1 {
        if !first {
            write!(out, " ").unwrap();
        }
        write!(out, "{}^1", temp).unwrap();
    }
    writeln!(out).unwrap();
}`
        }
    },

    // ==================== EASY #4: Power (x, n) / Modular Exponentiation ====================
    {
        title: "Modular Exponentiation",
        description: "Given base x, exponent n, and modulo m, calculate (x^n) % m.\n\n**Input Format:**\n- A single line containing three space-separated integers x, n, and m.\n\n**Output Format:**\n- A single integer: (x^n) % m.",
        difficulty: "EASY",
        tags: ["math", "number-theory", "modulo"],
        constraints: "0 <= x <= 10^9\n0 <= n <= 10^18\n1 <= m <= 10^9",
        hints: "Implement Binary Exponentiation (also known as exponentiation by squaring) to compute the power in O(log n) time. Make sure to perform all operations using 64-bit integers and apply the modulo operation at each multiplication step to prevent overflow. Note that if m = 1, the result is always 0.",
        editorial: "**Approach: Binary Exponentiation**\n\nTo compute `(x^n) % m` efficiently, we can use binary exponentiation. Instead of multiplying `x` `n` times (which is O(n) and too slow), we can express the exponent in binary.\n\nFor example, to compute `x^13`, we can write `13` in binary as `1101_2`, so `x^13 = x^8 * x^4 * x^1`.\n\nAlgorithm:\n1. If `m == 1`, return 0.\n2. Initialize `res = 1` and `x = x % m`.\n3. While `n > 0`:\n   - If the least significant bit of `n` is 1 (i.e. `n % 2 == 1`), update `res = (res * x) % m`.\n   - Update `x = (x * x) % m`.\n   - Right-shift `n` by 1 (`n = n / 2`).\n4. Return `res`.\n\n**Time Complexity:** O(log n)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "2 10 1000", output: "24", explanation: "2^10 = 1024. 1024 % 1000 = 24." },
            { title: "Example 2", input: "5 0 7", output: "1", explanation: "5^0 = 1. 1 % 7 = 1." }
        ],
        testcases: [
            { input: "2 10 1000", output: "24" },
            { input: "5 0 7", output: "1" },
            { input: "5 0 1", output: "0" },
            { input: "0 0 5", output: "1" },
            { input: "0 10 5", output: "0" },
            { input: "2 60 1000000007", output: "536396504" },
            { input: "123456789 987654321 1000000007", output: "652541198" },
            { input: "999999999 1000000000000000000 1000000007", output: "951047217" },
            { input: "7 100000 1000000007", output: "183133701" },
            { input: "1000000000 1000000000 999999999", output: "1" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long x, n, m;
    // Read input and compute (x^n) % m
    
    return 0;
}`,
            python: `def main():
    # Read x, n, m and print (x^n) % m
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read x, n, m and print (x^n) % m
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read x, n, m and print (x^n) % m
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long x, n, m;
    if (cin >> x >> n >> m) {
        if (m == 1) {
            cout << 0 << "\n";
            return 0;
        }
        long long res = 1;
        x %= m;
        while (n > 0) {
            if (n & 1) {
                res = (res * x) % m;
            }
            x = (x * x) % m;
            n >>= 1;
        }
        cout << res << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    x = int(input_data[0])
    n = int(input_data[1])
    m = int(input_data[2])
    if m == 1:
        print(0)
        return
    print(pow(x, n, m))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        if (!st.hasMoreTokens()) return;
        long x = Long.parseLong(st.nextToken());
        long n = Long.parseLong(st.nextToken());
        long m = Long.parseLong(st.nextToken());
        if (m == 1) {
            System.out.println(0);
            return;
        }
        long res = 1;
        x %= m;
        while (n > 0) {
            if ((n & 1) == 1) {
                res = (res * x) % m;
            }
            x = (x * x) % m;
            n >>= 1;
        }
        System.out.println(res);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut line = String::new();
    if stdin.lock().read_line(&mut line).is_err() {
        return;
    }
    let parts: Vec<&str> = line.trim().split_whitespace().collect();
    if parts.len() < 3 {
        return;
    }
    let mut x: u64 = parts[0].parse().unwrap();
    let mut n: u64 = parts[1].parse().unwrap();
    let m: u64 = parts[2].parse().unwrap();
    if m == 1 {
        writeln!(out, "0").unwrap();
        return;
    }
    let mut res = 1u64;
    x %= m;
    while n > 0 {
        if (n & 1) == 1 {
            res = ((res as u128 * x as u128) % m as u128) as u64;
        }
        x = ((x as u128 * x as u128) % m as u128) as u64;
        n >>= 1;
    }
    writeln!(out, "{}", res).unwrap();
}`
        }
    },

    // ==================== MEDIUM #1: Count Primes in a Range ====================
    {
        title: "Count Primes in a Range",
        description: "Given a range [L, R], count the number of prime numbers in the closed interval.\n\n**Input Format:**\n- A single line containing two space-separated integers L and R.\n\n**Output Format:**\n- A single line containing the number of prime numbers in [L, R].",
        difficulty: "MEDIUM",
        tags: ["math", "number-theory", "prime"],
        constraints: "1 <= L <= R <= 5 * 10^6",
        hints: "Since R can be up to 5 * 10^6, you can precompute primes up to R using a Sieve of Eratosthenes. Then count how many numbers in [L, R] are prime.",
        editorial: "**Approach: Sieve of Eratosthenes**\n\n1. Sieve prime numbers up to R (max 5 * 10^6).\n2. Count all indices `i` in the range `[L, R]` where `isPrime[i]` is true.\n3. Python slicing or fast sum over array indices can be used to count primes efficiently in under 0.2s.\n\n**Time Complexity:** O(R log log R) for sieve, O(R - L) for counting\n**Space Complexity:** O(R)",
        examples: [
            { title: "Example 1", input: "1 10", output: "4", explanation: "Primes in [1, 10] are 2, 3, 5, 7. Total count is 4." },
            { title: "Example 2", input: "10 20", output: "4", explanation: "Primes in [10, 20] are 11, 13, 17, 19. Total count is 4." }
        ],
        testcases: [
            { input: "1 10", output: "4" },
            { input: "10 20", output: "4" },
            { input: "1 1", output: "0" },
            { input: "2 2", output: "1" },
            { input: "2 3", output: "2" },
            { input: "14 16", output: "0" },
            { input: "100 1000", output: "143" },
            { input: "999900 1000000", output: "8" },
            { input: "4000000 5000000", output: "65367" },
            { input: "1 5000000", output: "348513" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int L, R;
    // Read L and R, count primes in [L, R]
    
    return 0;
}`,
            python: `def main():
    # Read L and R, count primes in [L, R]
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read L and R, count primes in [L, R]
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read L and R, count primes in [L, R]
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

const int MAX = 5000005;
bool is_prime[MAX];
int prefix_primes[MAX];

void sieve() {
    fill(is_prime, is_prime + MAX, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p < MAX; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i < MAX; i += p) {
                is_prime[i] = false;
            }
        }
    }
    prefix_primes[0] = 0;
    for (int i = 1; i < MAX; i++) {
        prefix_primes[i] = prefix_primes[i - 1] + (is_prime[i] ? 1 : 0);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    sieve();
    int L, R;
    if (cin >> L >> R) {
        if (L > R) swap(L, R);
        if (R >= MAX) R = MAX - 1;
        if (L < 1) L = 1;
        cout << prefix_primes[R] - prefix_primes[L - 1] << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    L = int(input_data[0])
    R = int(input_data[1])
    if L > R:
        L, R = R, L
    
    is_prime = [True] * (R + 1)
    if R >= 0: is_prime[0] = False
    if R >= 1: is_prime[1] = False
    
    for p in range(2, int(R**0.5) + 1):
        if is_prime[p]:
            is_prime[p*p::p] = [False] * ((R - p*p) // p + 1)
            
    count = sum(is_prime[L:R+1])
    print(count)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        if (!st.hasMoreTokens()) return;
        int L = Integer.parseInt(st.nextToken());
        int R = Integer.parseInt(st.nextToken());
        if (L > R) {
            int temp = L; L = R; R = temp;
        }
        
        boolean[] isPrime = new boolean[R + 1];
        Arrays.fill(isPrime, true);
        if (R >= 0) isPrime[0] = false;
        if (R >= 1) isPrime[1] = false;
        
        for (int p = 2; p * p <= R; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= R; i += p) {
                    isPrime[i] = false;
                }
            }
        }
        
        int count = 0;
        for (int i = L; i <= R; i++) {
            if (isPrime[i]) count++;
        }
        System.out.println(count);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut line = String::new();
    if stdin.lock().read_line(&mut line).is_err() {
        return;
    }
    let parts: Vec<&str> = line.trim().split_whitespace().collect();
    if parts.len() < 2 {
        return;
    }
    let mut l: usize = parts[0].parse().unwrap();
    let mut r: usize = parts[1].parse().unwrap();
    if l > r {
        let temp = l;
        l = r;
        r = temp;
    }
    let mut is_prime = vec![true; r + 1];
    if r >= 0 { is_prime[0] = false; }
    if r >= 1 { is_prime[1] = false; }
    let mut p = 2;
    while p * p <= r {
        if is_prime[p] {
            let mut i = p * p;
            while i <= r {
                is_prime[i] = false;
                i += p;
            }
        }
        p += 1;
    }
    let mut count = 0;
    for i in l..=r {
        if is_prime[i] {
            count += 1;
        }
    }
    writeln!(out, "{}", count).unwrap();
}`
        }
    },

    // ==================== MEDIUM #2: Permutations Count (nPr) ====================
    {
        title: "Permutations Count (nPr)",
        description: "Given n and r, calculate the number of permutations P(n, r) modulo 10^9 + 7.\n\nFormula:\n- P(n, r) = n! / (n - r)! if 0 <= r <= n\n- P(n, r) = 0 if r > n\n\n**Input Format:**\n- A single line containing two space-separated integers n and r.\n\n**Output Format:**\n- A single line containing the value of P(n, r) % 1000000007.",
        difficulty: "MEDIUM",
        tags: ["math", "number-theory", "modulo"],
        constraints: "0 <= n, r <= 10^5",
        hints: "P(n, r) is the product of all integers from n - r + 1 to n. Compute this product in a loop using a 64-bit integer, taking modulo 10^9 + 7 at each step. If r > n, output 0.",
        editorial: "**Approach: Direct Loop Modulo Multiplication**\n\nThe permutation count is given by:\n`P(n, r) = n * (n - 1) * ... * (n - r + 1)`.\n\nInstead of computing factorials and performing division (which requires finding modular inverse), we can simply multiply `r` terms from `n - r + 1` up to `n` modulo `10^9 + 7`.\n- If `r > n` or `r < 0`, the count of permutations is `0`.\n- If `r == 0`, the answer is `1` (empty permutation).\n- Otherwise, compute the product of the `r` integers.\n\n**Time Complexity:** O(r)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "5 2", output: "20", explanation: "P(5, 2) = 5! / 3! = 5 * 4 = 20." },
            { title: "Example 2", input: "10 5", output: "30240", explanation: "P(10, 5) = 10 * 9 * 8 * 7 * 6 = 30240." }
        ],
        testcases: [
            { input: "5 2", output: "20" },
            { input: "10 5", output: "30240" },
            { input: "0 0", output: "1" },
            { input: "5 0", output: "1" },
            { input: "2 5", output: "0" },
            { input: "99999 1", output: "99999" },
            { input: "1000 5", output: "943093762" },
            { input: "100000 50000", output: "466765821" },
            { input: "100000 100000", output: "457992974" },
            { input: "100000 0", output: "1" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long n, r;
    // Read input and compute P(n, r) % 1000000007
    
    return 0;
}`,
            python: `def main():
    # Read n and r and print P(n, r) % 1000000007
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n and r and print P(n, r) % 1000000007
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and r and print P(n, r) % 1000000007
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000007;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n, r;
    if (cin >> n >> r) {
        if (r < 0 || r > n) {
            cout << 0 << "\n";
            return 0;
        }
        long long ans = 1;
        for (long long i = n - r + 1; i <= n; i++) {
            ans = (ans * i) % MOD;
        }
        cout << ans << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    r = int(input_data[1])
    MOD = 1000000007
    if r < 0 or r > n:
        print(0)
        return
    ans = 1
    for i in range(n - r + 1, n + 1):
        ans = (ans * i) % MOD
    print(ans)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        if (!st.hasMoreTokens()) return;
        long n = Long.parseLong(st.nextToken());
        long r = Long.parseLong(st.nextToken());
        long MOD = 1000000007;
        if (r < 0 || r > n) {
            System.out.println(0);
            return;
        }
        long ans = 1;
        for (long i = n - r + 1; i <= n; i++) {
            ans = (ans * i) % MOD;
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut line = String::new();
    if stdin.lock().read_line(&mut line).is_err() {
        return;
    }
    let parts: Vec<&str> = line.trim().split_whitespace().collect();
    if parts.len() < 2 {
        return;
    }
    let n: u64 = parts[0].parse().unwrap();
    let r: u64 = parts[1].parse().unwrap();
    let mod_val = 1000000007u64;
    if r > n {
        writeln!(out, "0").unwrap();
        return;
    }
    let mut ans = 1u64;
    for i in (n - r + 1)..=n {
        ans = (ans * i) % mod_val;
    }
    writeln!(out, "{}", ans).unwrap();
}`
        }
    },

    // ==================== MEDIUM #3: Combinations Count (nCr) ====================
    {
        title: "Combinations Count (nCr)",
        description: "Given two integers n and r, calculate the number of combinations C(n, r) modulo 10^9 + 7.\n\nFormula:\n- C(n, r) = n! / (r! * (n - r)!) if 0 <= r <= n\n- C(n, r) = 0 if r > n\n\n**Input Format:**\n- A single line containing two space-separated integers n and r.\n\n**Output Format:**\n- A single line containing the value of C(n, r) % 1000000007.",
        difficulty: "MEDIUM",
        tags: ["math", "number-theory", "modulo"],
        constraints: "0 <= n, r <= 10^6",
        hints: "Since r can be up to 10^6, compute n!, r!, and (n - r)! modulo 10^9 + 7. Then compute modular inverse of r! and (n - r)! using Fermat's Little Theorem (base^(MOD-2) % MOD).",
        editorial: "**Approach: Modular Multiplicative Inverse via Fermat's Little Theorem**\n\nThe combination count is given by:\n`C(n, r) = n! / (r! * (n-r)!)`.\n\nTo compute division under modulo `10^9 + 7` (which is a prime), we compute the modular inverse of the denominator using Fermat's Little Theorem:\n`inv(A) = A^(MOD - 2) % MOD`.\n\nAlgorithm:\n1. If `r > n` or `r < 0`, return 0.\n2. Compute `fact_n = n! % MOD`, `fact_r = r! % MOD`, and `fact_n_r = (n - r)! % MOD`.\n3. Answer is `fact_n * inv(fact_r) * inv(fact_n_r) % MOD`.\n\nThis single-query solution runs in O(n) time and O(1) space, avoiding large table precomputation.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "5 2", output: "10", explanation: "C(5, 2) = 5! / (2! * 3!) = 10." },
            { title: "Example 2", input: "1000 500", output: "159835829", explanation: "C(1000, 500) modulo 10^9 + 7 = 159835829." }
        ],
        testcases: [
            { input: "5 2", output: "10" },
            { input: "1000 500", output: "159835829" },
            { input: "10 0", output: "1" },
            { input: "10 10", output: "1" },
            { input: "0 0", output: "1" },
            { input: "5 6", output: "0" },
            { input: "1000000 3", output: "500336845" },
            { input: "999999 499999", output: "998346392" },
            { input: "1000000 500000", output: "996692777" },
            { input: "1000000 0", output: "1" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long n, r;
    // Read input and compute C(n, r) % 1000000007
    
    return 0;
}`,
            python: `def main():
    # Read n and r and print C(n, r) % 1000000007
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n and r and print C(n, r) % 1000000007
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and r and print C(n, r) % 1000000007
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000007;

long long power(long long base, long long exp) {
    long long res = 1;
    base %= MOD;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % MOD;
        base = (base * base) % MOD;
        exp /= 2;
    }
    return res;
}

long long modInverse(long long n) {
    return power(n, MOD - 2);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n, r;
    if (cin >> n >> r) {
        if (r < 0 || r > n) {
            cout << 0 << "\n";
            return 0;
        }
        if (r == 0 || r == n) {
            cout << 1 << "\n";
            return 0;
        }
        long long fact_n = 1;
        for (int i = 1; i <= n; i++) fact_n = (fact_n * i) % MOD;
        
        long long fact_r = 1;
        for (int i = 1; i <= r; i++) fact_r = (fact_r * i) % MOD;
        
        long long fact_n_r = 1;
        for (int i = 1; i <= n - r; i++) fact_n_r = (fact_n_r * i) % MOD;
        
        long long ans = fact_n * modInverse(fact_r) % MOD * modInverse(fact_n_r) % MOD;
        cout << ans << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    r = int(input_data[1])
    MOD = 1000000007
    if r < 0 or r > n:
        print(0)
        return
    if r == 0 or r == n:
        print(1)
        return
        
    fact_n = 1
    for i in range(1, n + 1):
        fact_n = (fact_n * i) % MOD
        
    fact_r = 1
    for i in range(1, r + 1):
        fact_r = (fact_r * i) % MOD
        
    fact_n_r = 1
    for i in range(1, n - r + 1):
        fact_n_r = (fact_n_r * i) % MOD
        
    ans = fact_n * pow(fact_r, MOD - 2, MOD) % MOD * pow(fact_n_r, MOD - 2, MOD) % MOD
    print(ans)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    private static final long MOD = 1000000007;

    private static long power(long base, long exp) {
        long res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp % 2 == 1) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp /= 2;
        }
        return res;
    }

    private static long modInverse(long n) {
        return power(n, MOD - 2);
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        if (!st.hasMoreTokens()) return;
        long n = Long.parseLong(st.nextToken());
        long r = Long.parseLong(st.nextToken());
        if (r < 0 || r > n) {
            System.out.println(0);
            return;
        }
        if (r == 0 || r == n) {
            System.out.println(1);
            return;
        }
        
        long fact_n = 1;
        for (int i = 1; i <= n; i++) fact_n = (fact_n * i) % MOD;
        
        long fact_r = 1;
        for (int i = 1; i <= r; i++) fact_r = (fact_r * i) % MOD;
        
        long fact_n_r = 1;
        for (int i = 1; i <= n - r; i++) fact_n_r = (fact_n_r * i) % MOD;
        
        long ans = fact_n * modInverse(fact_r) % MOD * modInverse(fact_n_r) % MOD;
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

const MOD: u64 = 1000000007;

fn power(mut base: u64, mut exp: u64) -> u64 {
    let mut res = 1u64;
    base %= MOD;
    while exp > 0 {
        if exp % 2 == 1 {
            res = (res as u128 * base as u128 % MOD as u128) as u64;
        }
        base = (base as u128 * base as u128 % MOD as u128) as u64;
        exp /= 2;
    }
    res
}

fn mod_inverse(n: u64) -> u64 {
    power(n, MOD - 2)
}

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut line = String::new();
    if stdin.lock().read_line(&mut line).is_err() {
        return;
    }
    let parts: Vec<&str> = line.trim().split_whitespace().collect();
    if parts.len() < 2 {
        return;
    }
    let n: u64 = parts[0].parse().unwrap();
    let r: u64 = parts[1].parse().unwrap();
    if r > n {
        writeln!(out, "0").unwrap();
        return;
    }
    if r == 0 || r == n {
        writeln!(out, "1").unwrap();
        return;
    }
    let mut fact_n = 1u64;
    for i in 1..=n {
        fact_n = (fact_n as u128 * i as u128 % MOD as u128) as u64;
    }
    let mut fact_r = 1u64;
    for i in 1..=r {
        fact_r = (fact_r as u128 * i as u128 % MOD as u128) as u64;
    }
    let mut fact_n_r = 1u64;
    for i in 1..=(n - r) {
        fact_n_r = (fact_n_r as u128 * i as u128 % MOD as u128) as u64;
    }
    let ans = (fact_n as u128 * mod_inverse(fact_r) as u128 % MOD as u128 * mod_inverse(fact_n_r) as u128 % MOD as u128) as u64;
    writeln!(out, "{}", ans).unwrap();
}`
        }
    },

    // ==================== HARD #1: Modular Multiplicative Inverse ====================
    {
        title: "Modular Multiplicative Inverse",
        description: "Given two integers a and m, find the modular multiplicative inverse of a modulo m.\n\nSpecifically, find an integer x in the range [0, m - 1] such that:\n- (a * x) % m == 1\n\nIf no such integer exists, print -1.\n\n**Input Format:**\n- A single line containing two space-separated integers a and m.\n\n**Output Format:**\n- A single line containing the modular inverse of a modulo m, or -1 if it does not exist.",
        difficulty: "HARD",
        tags: ["math", "number-theory", "modulo"],
        constraints: "1 <= a, m <= 10^9\nNote: m is not guaranteed to be prime, so Fermat's Little Theorem cannot be used. You must use the Extended Euclidean Algorithm.",
        hints: "Use the Extended Euclidean Algorithm to solve the equation: a * x + m * y = gcd(a, m). If gcd(a, m) is 1, the modular inverse exists and is x % m (adjusted to be positive). Otherwise, it does not exist.",
        editorial: "**Approach: Extended Euclidean Algorithm**\n\nThe modular inverse of `a` modulo `m` is an integer `x` such that `a * x = 1 (mod m)`, which can be rewritten as `a * x - q * m = 1` for some integer `q`.\n\nThis is a Linear Diophantine Equation: `a * x + m * y = 1`.\nBy Bezout's Identity, this equation has a solution if and only if `gcd(a, m) = 1`.\n\nWe can find `x` using the Extended Euclidean Algorithm:\n```cpp\nlong long extGCD(long long a, long long b, long long &x, long long &y) {\n    if (b == 0) {\n        x = 1; y = 0;\n        return a;\n    }\n    long long x1, y1;\n    long long g = extGCD(b, a % b, x1, y1);\n    x = y1;\n    y = x1 - (a / b) * y1;\n    return g;\n}\n```\nIf `g != 1`, return `-1`. Otherwise, return `(x % m + m) % m` to ensure it is positive.\n\n**Time Complexity:** O(log(min(a, m)))\n**Space Complexity:** O(log(min(a, m))) due to recursion stack",
        examples: [
            { title: "Example 1", input: "3 11", output: "4", explanation: "(3 * 4) % 11 = 12 % 11 = 1. So 4 is the modular inverse." },
            { title: "Example 2", input: "6 9", output: "-1", explanation: "Since gcd(6, 9) = 3 != 1, no modular inverse exists." }
        ],
        testcases: [
            { input: "3 11", output: "4" },
            { input: "6 9", output: "-1" },
            { input: "1 1", output: "-1" },
            { input: "1 1000000000", output: "1" },
            { input: "123456789 1000000007", output: "18633540" },
            { input: "999999999 1000000000", output: "999999999" },
            { input: "1000000000 999999999", output: "1" },
            { input: "2 1000000000", output: "-1" },
            { input: "1000000007 1000000007", output: "-1" },
            { input: "35 126", output: "-1" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long a, m;
    // Read input and compute modular inverse of a modulo m
    
    return 0;
}`,
            python: `def main():
    # Read a and m and print modular inverse or -1
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read a and m and print modular inverse or -1
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read a and m and print modular inverse or -1
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

long long extGCD(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long g = extGCD(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long a, m;
    if (cin >> a >> m) {
        if (m <= 1) {
            cout << -1 << "\n";
            return 0;
        }
        long long x, y;
        long long g = extGCD(a, m, x, y);
        if (g != 1) {
            cout << -1 << "\n";
        } else {
            cout << (x % m + m) % m << "\n";
        }
    }
    return 0;
}`,
            python: `import sys

def ext_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = ext_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return g, x, y

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    a = int(input_data[0])
    m = int(input_data[1])
    if m <= 1:
        print(-1)
        return
    g, x, y = ext_gcd(a, m)
    if g != 1:
        print(-1)
    else:
        print((x % m + m) % m)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    private static long extGCD(long a, long b, long[] xy) {
        if (b == 0) {
            xy[0] = 1;
            xy[1] = 0;
            return a;
        }
        long[] xy1 = new long[2];
        long g = extGCD(b, a % b, xy1);
        xy[0] = xy1[1];
        xy[1] = xy1[0] - (a / b) * xy1[1];
        return g;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        if (!st.hasMoreTokens()) return;
        long a = Long.parseLong(st.nextToken());
        long m = Long.parseLong(st.nextToken());
        if (m <= 1) {
            System.out.println(-1);
            return;
        }
        long[] xy = new long[2];
        long g = extGCD(a, m, xy);
        if (g != 1) {
            System.out.println(-1);
        } else {
            System.out.println((xy[0] % m + m) % m);
        }
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn ext_gcd(a: i64, b: i64) -> (i64, i64, i64) {
    if b == 0 {
        return (a, 1, 0);
    }
    let (g, x1, y1) = ext_gcd(b, a % b);
    let x = y1;
    let y = x1 - (a / b) * y1;
    (g, x, y)
}

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut line = String::new();
    if stdin.lock().read_line(&mut line).is_err() {
        return;
    }
    let parts: Vec<&str> = line.trim().split_whitespace().collect();
    if parts.len() < 2 {
        return;
    }
    let a: i64 = parts[0].parse().unwrap();
    let m: i64 = parts[1].parse().unwrap();
    if m <= 1 {
        writeln!(out, "-1").unwrap();
        return;
    }
    let (g, x, _) = ext_gcd(a, m);
    if g != 1 {
        writeln!(out, "-1").unwrap();
    } else {
        writeln!(out, "{}", (x % m + m) % m).unwrap();
    }
}`
        }
    },

    // ==================== HARD #2: Chinese Remainder Theorem ====================
    {
        title: "Chinese Remainder Theorem",
        description: "Given two arrays num and rem of size k, where elements of num are pairwise coprime. Find the smallest non-negative integer x such that:\n- x % num[i] == rem[i] for all 0 <= i < k\n\nOutput the answer modulo the product of all elements of num.\n\n**Input Format:**\n- First line: integer k (number of congruence equations)\n- Second line: k space-separated integers representing the array num\n- Third line: k space-separated integers representing the array rem\n\n**Output Format:**\n- A single line containing the smallest non-negative integer x.",
        difficulty: "HARD",
        tags: ["math", "number-theory", "modulo"],
        constraints: "1 <= k <= 10\n1 <= num[i] <= 10^9\n0 <= rem[i] < num[i]\nAll elements in num are pairwise coprime.\nProduct of all elements of num <= 10^12.",
        hints: "Compute the product of all num[i] (let it be M). For each equation i, let M_i = M / num[i]. Calculate modular multiplicative inverse of M_i modulo num[i] (let it be t_i). Sum up rem[i] * t_i * M_i and take the final sum modulo M.",
        editorial: "**Approach: Chinese Remainder Theorem (CRT)**\n\nWe have a system of congruences:\n`x = rem[i] (mod num[i])` for `0 <= i < k`.\n\nAlgorithm:\n1. Compute the product `M = num[0] * num[1] * ... * num[k-1]`.\n2. For each `i`:\n   - Compute `M_i = M / num[i]`.\n   - Find the modular inverse `t_i` of `M_i` modulo `num[i]` using the Extended Euclidean Algorithm.\n   - Add `rem[i] * t_i * M_i` to the sum.\n3. Return `sum % M`.\n\nTo prevent intermediate 64-bit integer overflow during calculations, we can:\n- Compute `term = (rem[i] * t_i) % num[i]`.\n- Then multiply `term * M_i` and add to sum modulo `M`.\n- Use `__int128` in C++, `BigInteger` in Java, or `u128` in Rust.\n\n**Time Complexity:** O(k log(max(num[i])))\n**Space Complexity:** O(k)",
        examples: [
            { title: "Example 1", input: "3\n3 5 7\n2 3 2", output: "23", explanation: "23 % 3 = 2, 23 % 5 = 3, 23 % 7 = 2. Smallest such number is 23." },
            { title: "Example 2", input: "2\n5 7\n1 3", output: "31", explanation: "31 % 5 = 1, 31 % 7 = 3. Smallest such number is 31." }
        ],
        testcases: [
            { input: "3\n3 5 7\n2 3 2", output: "23" },
            { input: "2\n5 7\n1 3", output: "31" },
            { input: "1\n17\n5", output: "5" },
            { input: "4\n2 3 5 7\n1 2 3 4", output: "53" },
            { input: "3\n11 13 17\n1 2 3", output: "496" },
            { input: "2\n1000000 999999\n0 1", output: "1000000" },
            { input: "1\n1000000000\n999999999", output: "999999999" },
            { input: "3\n101 103 107\n1 2 3", output: "1066258" },
            { input: "3\n997 991 983\n5 12 17", output: "471125376" },
            { input: "2\n999983 999979\n123 456", output: "250073748797" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int k;
    // Read input and compute x using Chinese Remainder Theorem
    
    return 0;
}`,
            python: `def main():
    # Read k, num, and rem, and compute x using Chinese Remainder Theorem
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input and solve using Chinese Remainder Theorem
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve using Chinese Remainder Theorem
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

long long extGCD(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long g = extGCD(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

long long modInverse(long long a, long long m) {
    long long x, y;
    extGCD(a, m, x, y);
    return (x % m + m) % m;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k;
    if (cin >> k) {
        vector<long long> num(k);
        vector<long long> rem(k);
        for (int i = 0; i < k; i++) cin >> num[i];
        for (int i = 0; i < k; i++) cin >> rem[i];
        
        long long prod = 1;
        for (int i = 0; i < k; i++) prod *= num[i];
        
        long long ans = 0;
        for (int i = 0; i < k; i++) {
            long long p = prod / num[i];
            long long inv = modInverse(p, num[i]);
            long long term = (rem[i] * inv) % num[i];
            
            unsigned __int128 term_p = (unsigned __int128)term * p;
            long long term_p_mod = (long long)(term_p % prod);
            
            ans = (ans + term_p_mod) % prod;
        }
        cout << ans << "\n";
    }
    return 0;
}`,
            python: `import sys

def ext_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = ext_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return g, x, y

def mod_inverse(a, m):
    g, x, y = ext_gcd(a, m)
    return (x % m + m) % m

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    k = int(input_data[0])
    num = [int(x) for x in input_data[1:k+1]]
    rem = [int(x) for x in input_data[k+1:2*k+1]]
    
    prod = 1
    for x in num:
        prod *= x
        
    ans = 0
    for i in range(k):
        p = prod // num[i]
        inv = mod_inverse(p, num[i])
        term = (rem[i] * inv) % num[i]
        ans = (ans + term * p) % prod
        
    print(ans)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
import java.math.BigInteger;

public class Main {
    private static long extGCD(long a, long b, long[] xy) {
        if (b == 0) {
            xy[0] = 1;
            xy[1] = 0;
            return a;
        }
        long[] xy1 = new long[2];
        long g = extGCD(b, a % b, xy1);
        xy[0] = xy1[1];
        xy[1] = xy1[0] - (a / b) * xy1[1];
        return g;
    }

    private static long modInverse(long a, long m) {
        long[] xy = new long[2];
        extGCD(a, m, xy);
        return (xy[0] % m + m) % m;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int k = Integer.parseInt(line.trim());
        
        long[] num = new long[k];
        StringTokenizer st1 = new StringTokenizer(br.readLine().trim());
        for (int i = 0; i < k; i++) {
            num[i] = Long.parseLong(st1.nextToken());
        }
        
        long[] rem = new long[k];
        StringTokenizer st2 = new StringTokenizer(br.readLine().trim());
        for (int i = 0; i < k; i++) {
            rem[i] = Long.parseLong(st2.nextToken());
        }
        
        BigInteger prod = BigInteger.ONE;
        for (int i = 0; i < k; i++) {
            prod = prod.multiply(BigInteger.valueOf(num[i]));
        }
        
        BigInteger ans = BigInteger.ZERO;
        for (int i = 0; i < k; i++) {
            BigInteger nVal = BigInteger.valueOf(num[i]);
            BigInteger rVal = BigInteger.valueOf(rem[i]);
            BigInteger p = prod.divide(nVal);
            long inv = modInverse(p.mod(nVal).longValue(), num[i]);
            BigInteger term = rVal.multiply(BigInteger.valueOf(inv)).mod(nVal);
            ans = ans.add(term.multiply(p)).mod(prod);
        }
        System.out.println(ans.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn ext_gcd(a: i64, b: i64) -> (i64, i64, i64) {
    if b == 0 {
        return (a, 1, 0);
    }
    let (g, x1, y1) = ext_gcd(b, a % b);
    let x = y1;
    let y = x1 - (a / b) * y1;
    (g, x, y)
}

fn mod_inverse(a: i64, m: i64) -> i64 {
    let (_, x, _) = ext_gcd(a, m);
    (x % m + m) % m
}

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    
    let k_line = match lines.next() {
        Some(Ok(l)) => l,
        _ => return,
    };
    let k: usize = k_line.trim().parse().unwrap();
    
    let num_line = lines.next().unwrap().unwrap();
    let num: Vec<u64> = num_line.trim().split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
        
    let rem_line = lines.next().unwrap().unwrap();
    let rem: Vec<u64> = rem_line.trim().split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
        
    let mut prod = 1u128;
    for &n_i in &num {
        prod *= n_i as u128;
    }
    
    let mut ans = 0u128;
    for i in 0..k {
        let n_i = num[i] as u128;
        let r_i = rem[i] as u128;
        let p = prod / n_i;
        let inv = mod_inverse((p % n_i) as i64, num[i] as i64) as u128;
        let term = (r_i * inv) % n_i;
        ans = (ans + term * p) % prod;
    }
    writeln!(out, "{}", ans).unwrap();
}`
        }
    },

    // ==================== HARD #3: Count Derangements ====================
    {
        title: "Count Derangements",
        description: "A derangement is a permutation of the elements of a set, such that no element appears in its original position. Given an integer n, find the number of derangements of a set of size n, modulo 10^9 + 7.\n\n**Input Format:**\n- A single line containing an integer n.\n\n**Output Format:**\n- A single line containing the number of derangements modulo 1000000007.",
        difficulty: "HARD",
        tags: ["math", "number-theory", "modulo"],
        constraints: "1 <= n <= 10^6",
        hints: "Use dynamic programming with the recurrence relation: D(n) = (n - 1) * (D(n - 1) + D(n - 2)) % (10^9 + 7). Optimize the space to O(1) by keeping track of only the last two values.",
        editorial: "**Approach: DP with O(1) Space**\n\nLet `D(n)` be the number of derangements of a set of size `n`.\n\nTo find `D(n)`:\nConsider where the first element `1` is placed. It cannot be in position 1. So it has `n - 1` choices. Suppose it is placed in position `i` (where `i != 1`).\nNow, look at the element `i`:\n1. If element `i` is placed in position 1: The two elements swap positions. The remaining `n - 2` elements can be deranged in `D(n - 2)` ways.\n2. If element `i` is NOT placed in position 1: We can think of position 1 as the new 'forbidden' position for element `i`. This is equivalent to deranging `n - 1` elements, which can be done in `D(n - 1)` ways.\n\nTherefore, we have the recurrence:\n`D(n) = (n - 1) * (D(n - 1) + D(n - 2))`.\n\nBase cases:\n- `D(1) = 0`\n- `D(2) = 1`\n\nUsing variables `prev2` and `prev1`, we can iteratively calculate `D(n)` in O(n) time and O(1) space.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "4", output: "9", explanation: "For n=4, the derangements are: {2,1,4,3}, {2,3,4,1}, {2,4,1,3}, {3,1,4,2}, {3,4,1,2}, {3,4,2,1}, {4,1,2,3}, {4,3,1,2}, and {4,3,2,1}. Total 9." },
            { title: "Example 2", input: "5", output: "44", explanation: "Number of derangements for a set of size 5 is 44." }
        ],
        testcases: [
            { input: "4", output: "9" },
            { input: "5", output: "44" },
            { input: "1", output: "0" },
            { input: "2", output: "1" },
            { input: "3", output: "2" },
            { input: "6", output: "265" },
            { input: "10", output: "1334961" },
            { input: "100", output: "944828409" },
            { input: "1000", output: "37043040" },
            { input: "1000000", output: "102701088" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    // Read n and compute derangements modulo 10^9 + 7
    
    return 0;
}`,
            python: `def main():
    # Read n and print derangements modulo 10^9 + 7
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n and print derangements modulo 10^9 + 7
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and print derangements modulo 10^9 + 7
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000007;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        if (n == 1) {
            cout << 0 << "\n";
            return 0;
        }
        if (n == 2) {
            cout << 1 << "\n";
            return 0;
        }
        long long prev2 = 0;
        long long prev1 = 1;
        for (int i = 3; i <= n; i++) {
            long long curr = ((i - 1) * (prev1 + prev2)) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        cout << prev1 << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    line = sys.stdin.read().split()
    if not line:
        return
    n = int(line[0])
    MOD = 1000000007
    if n == 1:
        print(0)
        return
    if n == 2:
        print(1)
        return
    prev2, prev1 = 0, 1
    for i in range(3, n + 1):
        curr = ((i - 1) * (prev1 + prev2)) % MOD
        prev2, prev1 = prev1, curr
    print(prev1)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        long MOD = 1000000007;
        if (n == 1) {
            System.out.println(0);
            return;
        }
        if (n == 2) {
            System.out.println(1);
            return;
        }
        long prev2 = 0;
        long prev1 = 1;
        for (int i = 3; i <= n; i++) {
            long curr = ((i - 1) * (prev1 + prev2)) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        System.out.println(prev1);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut line = String::new();
    if stdin.lock().read_line(&mut line).is_err() {
        return;
    }
    let trimmed = line.trim();
    if trimmed.is_empty() {
        return;
    }
    let n: usize = trimmed.parse().unwrap();
    let mod_val = 1000000007u64;
    if n == 1 {
        writeln!(out, "0").unwrap();
        return;
    }
    if n == 2 {
        writeln!(out, "1").unwrap();
        return;
    }
    let mut prev2 = 0u64;
    let mut prev1 = 1u64;
    for i in 3..=n {
        let curr = ((i as u64 - 1) * (prev1 + prev2)) % mod_val;
        prev2 = prev1;
        prev1 = curr;
    }
    writeln!(out, "{}", prev1).unwrap();
}`
        }
    }
]
