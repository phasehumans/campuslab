import type { SeedProblem } from './types.js'

export const dynamicProgrammingProblems: SeedProblem[] = [
    {
        title: 'Climbing Stairs',
        description:
            'You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\n**Input Format:**\n- A single line containing an integer n.\n\n**Output Format:**\n- A single integer: the number of distinct ways to climb to the top.',
        difficulty: 'EASY',
        tags: ['dynamic-programming', 'tabulation'],
        constraints: '1 <= n <= 45',
        hints: 'Think about how you can reach the i-th step. You can only reach it from (i-1)-th step by taking 1 step, or from (i-2)-th step by taking 2 steps. This looks like the Fibonacci sequence.',
        editorial:
            '**Approach: Tabulation / Iterative**\n\nLet dp[i] be the number of ways to reach the i-th step.\nTo reach step i, we can come from step i-1 or step i-2. Therefore:\ndp[i] = dp[i-1] + dp[i-2]\n\nWith base cases dp[1] = 1, dp[2] = 2. We can optimize space to O(1) by only keeping track of the last two values.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            { title: 'Example 1', input: '2', output: '2', explanation: '1+1, 2' },
            { title: 'Example 2', input: '3', output: '3', explanation: '1+1+1, 1+2, 2+1' },
        ],
        testcases: [
            { input: '2', output: '2' },
            { input: '3', output: '3' },
            { input: '1', output: '1' },
            { input: '4', output: '5' },
            { input: '5', output: '8' },
            { input: '10', output: '89' },
            { input: '20', output: '10946' },
            { input: '30', output: '1346269' },
            { input: '40', output: '165580141' },
            { input: '45', output: '1836311903' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        if (n <= 2) {
            cout << n << "\n";
            return 0;
        }
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
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
    if n <= 2:
        print(n)
        return
    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
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
        if (n <= 2) {
            System.out.println(n);
            return;
        }
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        System.out.println(prev1);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut iterator = stdin.lock().lines();
    if let Some(Ok(line)) = iterator.next() {
        let n: i32 = line.trim().parse().unwrap();
        if n <= 2 {
            println!("{}", n);
            return;
        }
        let mut prev2 = 1;
        let mut prev1 = 2;
        for _ in 3..=n {
            let curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        println!("{}", prev1);
    }
}`,
        },
    },
    {
        title: 'Fibonacci DP',
        description:
            'Calculate the n-th Fibonacci number.\n\nThe Fibonacci numbers are defined as:\n- F(0) = 0\n- F(1) = 1\n- F(n) = F(n-1) + F(n-2) for n >= 2\n\nSince the result can be very large, print F(n) modulo 1,000,000,007 (10^9 + 7).\n\n**Input Format:**\n- A single line containing an integer n.\n\n**Output Format:**\n- A single integer: F(n) % 1000000007.',
        difficulty: 'EASY',
        tags: ['dynamic-programming', 'tabulation', 'memoization'],
        constraints: '0 <= n <= 10^5',
        hints: 'Use a dynamic programming approach to compute the Fibonacci numbers sequentially. Use modulo arithmetic at each addition to prevent integer overflow.',
        editorial:
            '**Approach: Dynamic Programming (Iterative)**\n\nMaintain two variables `a` and `b` initialized to F(0)=0 and F(1)=1. Iterate from 2 to n, updating the variables:\nnext = (a + b) % MOD\na = b\nb = next\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4',
                output: '3',
                explanation: 'F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3',
            },
            { title: 'Example 2', input: '6', output: '8', explanation: 'F(5)=5, F(6)=8' },
        ],
        testcases: [
            { input: '4', output: '3' },
            { input: '6', output: '8' },
            { input: '0', output: '0' },
            { input: '1', output: '1' },
            { input: '2', output: '1' },
            { input: '10', output: '55' },
            { input: '100', output: '687995182' },
            { input: '1000', output: '517691607' },
            { input: '10000', output: '271496360' },
            { input: '100000', output: '911435502' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        if (n == 0) {
            cout << 0 << "\n";
            return 0;
        }
        if (n == 1) {
            cout << 1 << "\n";
            return 0;
        }
        long long a = 0, b = 1;
        long long MOD = 1000000007;
        for (int i = 2; i <= n; i++) {
            long long c = (a + b) % MOD;
            a = b;
            b = c;
        }
        cout << b << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    if n == 0:
        print(0)
        return
    if n == 1:
        print(1)
        return
    a, b = 0, 1
    MOD = 1000000007
    for _ in range(2, n + 1):
        a, b = b, (a + b) % MOD
    print(b)

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
        if (n == 0) {
            System.out.println(0);
            return;
        }
        if (n == 1) {
            System.out.println(1);
            return;
        }
        long a = 0, b = 1;
        long MOD = 1000000007;
        for (int i = 2; i <= n; i++) {
            long c = (a + b) % MOD;
            a = b;
            b = c;
        }
        System.out.println(b);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut iterator = stdin.lock().lines();
    if let Some(Ok(line)) = iterator.next() {
        let n: usize = line.trim().parse().unwrap();
        if n == 0 {
            println!("0");
            return;
        }
        if n == 1 {
            println!("1");
            return;
        }
        let mut a = 0;
        let mut b = 1;
        let mod_val = 1000000007;
        for _ in 2..=n {
            let c = (a + b) % mod_val;
            a = b;
            b = c;
        }
        println!("{}", b);
    }
}`,
        },
    },
    {
        title: 'House Robber',
        description:
            'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array representing the amount of money in each house, return the maximum amount of money you can rob tonight without alerting the police.\n\n**Input Format:**\n- First line: an integer n (the number of houses)\n- Second line: n space-separated integers representing the money stashed in each house\n\n**Output Format:**\n- A single integer: the maximum money you can rob.',
        difficulty: 'EASY',
        tags: ['dynamic-programming', 'tabulation'],
        constraints:
            '1 <= n <= 10^5\n0 <= money[i] <= 10^9\nNote: The total money can exceed a 32-bit signed integer. Use 64-bit integers where appropriate.',
        hints: 'For each house, you have two choices: rob it or skip it. If you rob it, you cannot rob the previous house. If you skip it, your maximum money is the same as the maximum money from the previous house.',
        editorial:
            '**Approach: Dynamic Programming**\n\nLet `dp[i]` be the maximum money robbed from the first `i` houses.\nFor house `i`, we have two options:\n1. Rob house `i`: the total money is `dp[i-2] + money[i]`\n2. Skip house `i`: the total money is `dp[i-1]`\n\nThus, `dp[i] = max(dp[i-1], dp[i-2] + money[i])`.\nWe can optimize the space to O(1) by keeping track of the previous two maximums.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4\n1 2 3 1',
                output: '4',
                explanation:
                    'Rob house 1 (money = 1) and rob house 3 (money = 3). Total = 1 + 3 = 4.',
            },
            {
                title: 'Example 2',
                input: '5\n2 7 9 3 1',
                output: '12',
                explanation:
                    'Rob house 1 (money = 2), rob house 3 (money = 9), and rob house 5 (money = 1). Total = 2 + 9 + 1 = 12.',
            },
        ],
        testcases: [
            { input: '4\n1 2 3 1', output: '4' },
            { input: '5\n2 7 9 3 1', output: '12' },
            { input: '1\n10', output: '10' },
            { input: '2\n5 100', output: '100' },
            { input: '2\n100 5', output: '100' },
            { input: '6\n0 0 0 0 0 0', output: '0' },
            { input: '7\n1 100 1 1 1 100 1', output: '201' },
            { input: '10\n100 1 1 100 1 1 100 1 1 100', output: '400' },
            {
                input: '5\n1000000000 1000000000 1000000000 1000000000 1000000000',
                output: '3000000000',
            },
            { input: '8\n5 1 2 10 6 2 7 9', output: '26' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<long long> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        if (n == 1) {
            cout << nums[0] << "\n";
            return 0;
        }
        long long prev2 = 0, prev1 = 0;
        for (int i = 0; i < n; i++) {
            long long curr = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        cout << prev1 << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    if n == 1:
        print(nums[0])
        return
    prev2, prev1 = 0, 0
    for x in nums:
        curr = max(prev1, prev2 + x)
        prev2, prev1 = prev1, curr
    print(prev1)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        int n = Integer.parseInt(line1.trim());
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st = new StringTokenizer(line2);
        long[] nums = new long[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Long.parseLong(st.nextToken());
        }
        if (n == 1) {
            System.out.println(nums[0]);
            return;
        }
        long prev2 = 0, prev1 = 0;
        for (int i = 0; i < n; i++) {
            long curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        System.out.println(prev1);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let n: usize = line1.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let nums: Vec<i64> = line2.split_whitespace().map(|x| x.parse().unwrap()).collect();
            if n == 1 {
                println!("{}", nums[0]);
                return;
            }
            let mut prev2 = 0i64;
            let mut prev1 = 0i64;
            for i in 0..n {
                let curr = std::cmp::max(prev1, prev2 + nums[i]);
                prev2 = prev1;
                prev1 = curr;
            }
            println!("{}", prev1);
        }
    }
}`,
        },
    },
    {
        title: 'Min Cost Climbing Stairs',
        description:
            'You are given an integer array cost where cost[i] is the cost of the i-th step on a staircase. Once you pay the cost, you can either climb one or two steps.\n\nYou can start from the step with index 0, or the step with index 1.\n\nReturn the minimum cost to reach the top of the floor (one step beyond the last element of the array).\n\n**Input Format:**\n- First line: an integer n (the number of steps)\n- Second line: n space-separated integers representing the cost of each step\n\n**Output Format:**\n- A single integer: the minimum cost to reach the top.',
        difficulty: 'EASY',
        tags: ['dynamic-programming', 'tabulation'],
        constraints: '2 <= n <= 10^5\n0 <= cost[i] <= 999',
        hints: 'Let dp[i] be the minimum cost to reach the i-th step. You can reach step i either from step i-1 (paying cost[i-1]) or from step i-2 (paying cost[i-2]).',
        editorial:
            '**Approach: Dynamic Programming**\n\nLet `dp[i]` be the minimum cost to reach step `i`.\nTo reach step `i`, we can transition from:\n1. Step `i-1`: `dp[i-1] + cost[i-1]`\n2. Step `i-2`: `dp[i-2] + cost[i-2]`\n\nThus, `dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])`.\nBase cases: `dp[0] = 0`, `dp[1] = 0` (since we can start at index 0 or index 1 free of cost).\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) if optimized',
        examples: [
            {
                title: 'Example 1',
                input: '3\n10 15 20',
                output: '15',
                explanation: 'Start at index 1, pay 15, and climb two steps to reach the top.',
            },
            {
                title: 'Example 2',
                input: '10\n1 100 1 1 1 100 1 1 100 1',
                output: '6',
                explanation:
                    'Start at index 0, pay cost[0]=1, then cost[2]=1, cost[4]=1, cost[6]=1, cost[7]=1, cost[9]=1. Total = 6.',
            },
        ],
        testcases: [
            { input: '3\n10 15 20', output: '15' },
            { input: '10\n1 100 1 1 1 100 1 1 100 1', output: '6' },
            { input: '2\n10 20', output: '10' },
            { input: '2\n20 10', output: '10' },
            { input: '4\n1 2 3 4', output: '4' },
            { input: '4\n0 0 0 0', output: '0' },
            { input: '6\n100 1 100 1 100 1', output: '3' },
            { input: '5\n5 8 12 17 22', output: '25' },
            { input: '10\n1 2 3 4 5 6 7 8 9 10', output: '25' },
            { input: '12\n10 15 20 5 8 12 17 22 100 1 100 1', output: '56' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> cost(n);
        for (int i = 0; i < n; i++) cin >> cost[i];
        if (n < 2) {
            cout << 0 << "\n";
            return 0;
        }
        int prev2 = 0, prev1 = 0;
        for (int i = 2; i <= n; i++) {
            int curr = min(prev1 + cost[i-1], prev2 + cost[i-2]);
            prev2 = prev1;
            prev1 = curr;
        }
        cout << prev1 << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    cost = [int(x) for x in input_data[1:n+1]]
    if n < 2:
        print(0)
        return
    prev2, prev1 = 0, 0
    for i in range(2, n + 1):
        curr = min(prev1 + cost[i-1], prev2 + cost[i-2])
        prev2, prev1 = prev1, curr
    print(prev1)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        int n = Integer.parseInt(line1.trim());
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st = new StringTokenizer(line2);
        int[] cost = new int[n];
        for (int i = 0; i < n; i++) {
            cost[i] = Integer.parseInt(st.nextToken());
        }
        if (n < 2) {
            System.out.println(0);
            return;
        }
        int prev2 = 0, prev1 = 0;
        for (int i = 2; i <= n; i++) {
            int curr = Math.min(prev1 + cost[i-1], prev2 + cost[i-2]);
            prev2 = prev1;
            prev1 = curr;
        }
        System.out.println(prev1);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let n: usize = line1.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let cost: Vec<i32> = line2.split_whitespace().map(|x| x.parse().unwrap()).collect();
            if n < 2 {
                println!("0");
                return;
            }
            let mut prev2 = 0;
            let mut prev1 = 0;
            for i in 2..=n {
                let curr = std::cmp::min(prev1 + cost[i-1], prev2 + cost[i-2]);
                prev2 = prev1;
                prev1 = curr;
            }
            println!("{}", prev1);
        }
    }
}`,
        },
    },
    {
        title: 'Tribonacci Number',
        description:
            'The Tribonacci sequence Tn is defined as follows:\n- T0 = 0\n- T1 = 1\n- T2 = 1\n- Tn = Tn-1 + Tn-2 + Tn-3 for n >= 3\n\nGiven n, return the value of Tn modulo 1,000,000,007 (10^9 + 7).\n\n**Input Format:**\n- A single line containing an integer n.\n\n**Output Format:**\n- A single integer: Tn % 1000000007.',
        difficulty: 'EASY',
        tags: ['dynamic-programming', 'tabulation'],
        constraints: '0 <= n <= 10^5',
        hints: 'This is very similar to Fibonacci, but instead of keeping track of the last two values, you must keep track of the last three values.',
        editorial:
            '**Approach: Dynamic Programming (Iterative)**\n\nUse three variables `a`, `b`, and `c` initialized to T0, T1, and T2 respectively.\nIterate from 3 to n, updating:\nnext = (a + b + c) % MOD\na = b\nb = c\nc = next\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4',
                output: '4',
                explanation: 'T0=0, T1=1, T2=1, T3=0+1+1=2, T4=1+1+2=4.',
            },
            { title: 'Example 2', input: '25', output: '1389537' },
        ],
        testcases: [
            { input: '4', output: '4' },
            { input: '25', output: '1389537' },
            { input: '0', output: '0' },
            { input: '1', output: '1' },
            { input: '2', output: '1' },
            { input: '3', output: '2' },
            { input: '10', output: '149' },
            { input: '100', output: '92295268' },
            { input: '1000', output: '887456284' },
            { input: '100000', output: '30627177' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        if (n == 0) {
            cout << 0 << "\n";
            return 0;
        }
        if (n == 1 || n == 2) {
            cout << 1 << "\n";
            return 0;
        }
        long long a = 0, b = 1, c = 1;
        long long MOD = 1000000007;
        for (int i = 3; i <= n; i++) {
            long long d = (a + b + c) % MOD;
            a = b;
            b = c;
            c = d;
        }
        cout << c << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    if n == 0:
        print(0)
        return
    if n == 1 or n == 2:
        print(1)
        return
    a, b, c = 0, 1, 1
    MOD = 1000000007
    for _ in range(3, n + 1):
        a, b, c = b, c, (a + b + c) % MOD
    print(c)

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
        if (n == 0) {
            System.out.println(0);
            return;
        }
        if (n == 1 || n == 2) {
            System.out.println(1);
            return;
        }
        long a = 0, b = 1, c = 1;
        long MOD = 1000000007;
        for (int i = 3; i <= n; i++) {
            long d = (a + b + c) % MOD;
            a = b;
            b = c;
            c = d;
        }
        System.out.println(c);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut iterator = stdin.lock().lines();
    if let Some(Ok(line)) = iterator.next() {
        let n: usize = line.trim().parse().unwrap();
        if n == 0 {
            println!("0");
            return;
        }
        if n == 1 || n == 2 {
            println!("1");
            return;
        }
        let mut a = 0;
        let mut b = 1;
        let mut c = 1;
        let mod_val = 1000000007;
        for _ in 3..=n {
            let d = (a + b + c) % mod_val;
            a = b;
            b = c;
            c = d;
        }
        println!("{}", c);
    }
}`,
        },
    },
    {
        title: 'Longest Common Subsequence',
        description:
            'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\n\n**Input Format:**\n- First line: string text1\n- Second line: string text2\n\n**Output Format:**\n- A single integer: the length of the longest common subsequence.',
        difficulty: 'MEDIUM',
        tags: ['dynamic-programming', 'lcs', 'tabulation'],
        constraints:
            '1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of lowercase English letters only.',
        hints: 'Let dp[i][j] represent the length of the LCS of text1[0...i-1] and text2[0...j-1]. If text1[i-1] == text2[j-1], then dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
        editorial:
            '**Approach: 2D Dynamic Programming**\n\nDefine `dp[i][j]` as the length of LCS of `text1[0...i-1]` and `text2[0...j-1]`.\n- If `text1[i-1] == text2[j-1]`, then `dp[i][j] = dp[i-1][j-1] + 1`\n- Else, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`\n\nWe can optimize the space to O(min(m, n)) by using only two rows.\n\n**Time Complexity:** O(m * n)\n**Space Complexity:** O(min(m, n))',
        examples: [
            {
                title: 'Example 1',
                input: 'abcde\nace',
                output: '3',
                explanation: 'The longest common subsequence is "ace" and its length is 3.',
            },
            {
                title: 'Example 2',
                input: 'abc\ndef',
                output: '0',
                explanation: 'There is no common subsequence, so the result is 0.',
            },
        ],
        testcases: [
            { input: 'abcde\nace', output: '3' },
            { input: 'abc\ndef', output: '0' },
            { input: 'a\na', output: '1' },
            { input: 'a\nb', output: '0' },
            { input: 'abcdef\nabcdef', output: '6' },
            { input: 'bsbininm\njjfmpech', output: '1' },
            { input: 'longestcommonsubsequence\nsubsequence', output: '11' },
            { input: 'oxcpqrsvwf\nshmtulqryw', output: '3' },
            { input: 'pmjghexybyrgzdc\nhafcdqbgncrwipt', output: '4' },
            { input: 'aaaaa\na', output: '1' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s1, s2;
    if (cin >> s1 >> s2) {
        int m = s1.length();
        int n = s2.length();
        vector<int> prev(n + 1, 0), curr(n + 1, 0);
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1[i-1] == s2[j-1]) {
                    curr[j] = prev[j-1] + 1;
                } else {
                    curr[j] = max(prev[j], curr[j-1]);
                }
            }
            prev = curr;
        }
        cout << prev[n] << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    s1, s2 = lines[0], lines[1]
    m, n = len(s1), len(s2)
    dp = [0] * (n + 1)
    for i in range(1, m + 1):
        prev = 0
        for j in range(1, n + 1):
            temp = dp[j]
            if s1[i-1] == s2[j-1]:
                dp[j] = prev + 1
            else:
                dp[j] = max(dp[j], dp[j-1])
            prev = temp
    print(dp[n])

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null || s2 == null) return;
        s1 = s1.trim();
        s2 = s2.trim();
        int m = s1.length();
        int n = s2.length();
        int[] dp = new int[n + 1];
        for (int i = 1; i <= m; i++) {
            int prev = 0;
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[j] = prev + 1;
                } else {
                    dp[j] = Math.max(dp[j], dp[j-1]);
                }
                prev = temp;
            }
        }
        System.out.println(dp[n]);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let (Some(Ok(s1)), Some(Ok(s2))) = (lines.next(), lines.next()) {
        let s1 = s1.trim();
        let s2 = s2.trim();
        let m = s1.len();
        let n = s2.len();
        let s1_chars: Vec<char> = s1.chars().collect();
        let s2_chars: Vec<char> = s2.chars().collect();
        let mut dp = vec![0; n + 1];
        for i in 1..=m {
            let mut prev = 0;
            for j in 1..=n {
                let temp = dp[j];
                if s1_chars[i-1] == s2_chars[j-1] {
                    dp[j] = prev + 1;
                } else {
                    dp[j] = std::cmp::max(dp[j], dp[j-1]);
                }
                prev = temp;
            }
        }
        println!("{}", dp[n]);
    }
}`,
        },
    },
    {
        title: 'Longest Increasing Subsequence',
        description:
            'Given an integer array nums, return the length of the longest strictly increasing subsequence.\n\n**Input Format:**\n- First line: an integer n (the size of the array)\n- Second line: n space-separated integers representing the array elements\n\n**Output Format:**\n- A single integer: the length of the longest increasing subsequence.',
        difficulty: 'MEDIUM',
        tags: ['dynamic-programming', 'lis', 'binary-search'],
        constraints: '1 <= n <= 2500\n-10^4 <= nums[i] <= 10^4',
        hints: 'The standard DP approach is O(n^2). Can you optimize it to O(n log n) by maintaining a list of active subsequences and performing binary search?',
        editorial:
            '**Approach: DP with Binary Search (Patience Sorting)**\n\nMaintain an array `sub` which stores the smallest tail of all increasing subsequences of various lengths found so far.\nFor each element `x` in `nums`:\n- Find the first element in `sub` that is >= `x` (using binary search / `lower_bound`).\n- If `x` is larger than all elements in `sub`, append it to `sub`.\n- Otherwise, replace the found element with `x`.\n\nThe length of `sub` at the end is the length of the LIS.\n\n**Time Complexity:** O(n log n)\n**Space Complexity:** O(n)',
        examples: [
            {
                title: 'Example 1',
                input: '8\n10 9 2 5 3 7 101 18',
                output: '4',
                explanation:
                    'The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4. [2, 3, 7, 18] is also a valid LIS.',
            },
            {
                title: 'Example 2',
                input: '6\n0 1 0 3 2 3',
                output: '4',
                explanation: 'The LIS is [0, 1, 2, 3].',
            },
        ],
        testcases: [
            { input: '8\n10 9 2 5 3 7 101 18', output: '4' },
            { input: '6\n0 1 0 3 2 3', output: '4' },
            { input: '1\n10', output: '1' },
            { input: '4\n7 7 7 7', output: '1' },
            { input: '5\n5 4 3 2 1', output: '1' },
            { input: '5\n1 2 3 4 5', output: '5' },
            { input: '7\n10 22 9 33 21 50 41', output: '4' },
            { input: '10\n3 10 2 1 20 4 12 5 6 21', output: '5' },
            { input: '15\n1 9 5 18 15 2 10 6 14 3 12 7 8 11 13', output: '7' },
            { input: '12\n100 90 80 70 60 50 10 20 30 40 45 48', output: '6' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        if (n == 0) {
            cout << 0 << "\n";
            return 0;
        }
        vector<int> sub;
        for (int x : nums) {
            auto it = lower_bound(sub.begin(), sub.end(), x);
            if (it == sub.end()) {
                sub.push_back(x);
            } else {
                *it = x;
            }
        }
        cout << sub.size() << "\n";
    }
    return 0;
}`,
            python: `import sys
import bisect
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    if n == 0:
        print(0)
        return
    sub = []
    for x in nums:
        idx = bisect.bisect_left(sub, x)
        if idx == len(sub):
            sub.append(x)
        else:
            sub[idx] = x
    print(len(sub))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        int n = Integer.parseInt(line1.trim());
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st = new StringTokenizer(line2);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(st.nextToken());
        }
        if (n == 0) {
            System.out.println(0);
            return;
        }
        ArrayList<Integer> sub = new ArrayList<>();
        for (int x : nums) {
            int idx = Collections.binarySearch(sub, x);
            if (idx < 0) {
                idx = -(idx + 1);
            }
            if (idx == sub.size()) {
                sub.add(x);
            } else {
                sub.set(idx, x);
            }
        }
        System.out.println(sub.size());
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let n: usize = line1.trim().parse().unwrap();
        if n == 0 {
            println!("0");
            return;
        }
        if let Some(Ok(line2)) = lines.next() {
            let nums: Vec<i32> = line2.split_whitespace().map(|x| x.parse().unwrap()).collect();
            let mut sub = Vec::new();
            for &x in &nums {
                match sub.binary_search(&x) {
                    Ok(idx) => {
                        sub[idx] = x;
                    }
                    Err(idx) => {
                        if idx == sub.len() {
                            sub.push(x);
                        } else {
                            sub[idx] = x;
                        }
                    }
                }
            }
            println!("{}", sub.len());
        }
    }
}`,
        },
    },
    {
        title: 'Coin Change',
        description:
            'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.\n\n**Input Format:**\n- First line: two space-separated integers n and amount (where n is the number of coins)\n- Second line: n space-separated integers representing the coin denominations\n\n**Output Format:**\n- A single integer: the minimum number of coins needed, or -1.',
        difficulty: 'MEDIUM',
        tags: ['dynamic-programming', 'tabulation'],
        constraints: '1 <= n <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4',
        hints: 'Let dp[i] represent the minimum number of coins to make up amount i. To calculate dp[i], check all coins c: dp[i] = min(dp[i], dp[i-c] + 1).',
        editorial:
            '**Approach: 1D DP (Tabulation)**\n\nLet `dp[i]` be the minimum coins to make amount `i`.\nInitialize `dp[0] = 0` and all other elements to `amount + 1`.\nFor `i` from 1 to `amount`:\n  For each coin `c` in `coins`:\n     if `i >= c`:\n       `dp[i] = min(dp[i], dp[i - c] + 1)`\n\nIf `dp[amount]` remains `amount + 1`, it is impossible to make that amount, so return -1.\n\n**Time Complexity:** O(amount * n)\n**Space Complexity:** O(amount)',
        examples: [
            {
                title: 'Example 1',
                input: '3 11\n1 2 5',
                output: '3',
                explanation: '11 = 5 + 5 + 1',
            },
            { title: 'Example 2', input: '1 3\n2', output: '-1' },
        ],
        testcases: [
            { input: '3 11\n1 2 5', output: '3' },
            { input: '1 3\n2', output: '-1' },
            { input: '1 0\n1', output: '0' },
            { input: '4 0\n1 2 5 10', output: '0' },
            { input: '2 3\n2 4', output: '-1' },
            { input: '3 100\n1 2 5', output: '20' },
            { input: '4 6249\n186 419 83 408', output: '20' },
            { input: '5 120\n10 20 30 40 50', output: '3' },
            { input: '1 10000\n1', output: '10000' },
            { input: '3 11\n2 5 10', output: '4' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, amount;
    if (cin >> n >> amount) {
        vector<int> coins(n);
        for (int i = 0; i < n; i++) cin >> coins[i];
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i >= c) {
                    dp[i] = min(dp[i], dp[i - c] + 1);
                }
            }
        }
        cout << (dp[amount] > amount ? -1 : dp[amount]) << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    amount = int(input_data[1])
    coins = [int(x) for x in input_data[2:n+2]]
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i >= c:
                if dp[i - c] + 1 < dp[i]:
                    dp[i] = dp[i - c] + 1
    print(dp[amount] if dp[amount] <= amount else -1)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st1 = new StringTokenizer(line1);
        int n = Integer.parseInt(st1.nextToken());
        int amount = Integer.parseInt(st1.nextToken());
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st2 = new StringTokenizer(line2);
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) {
            coins[i] = Integer.parseInt(st2.nextToken());
        }
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i >= c) {
                    dp[i] = Math.min(dp[i], dp[i - c] + 1);
                }
            }
        }
        System.out.println(dp[amount] > amount ? -1 : dp[amount]);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let parts: Vec<usize> = line1.split_whitespace().map(|x| x.parse().unwrap()).collect();
        let n = parts[0];
        let amount = parts[1];
        if let Some(Ok(line2)) = lines.next() {
            let coins: Vec<usize> = line2.split_whitespace().map(|x| x.parse().unwrap()).collect();
            let mut dp = vec![amount + 1; amount + 1];
            dp[0] = 0;
            for i in 1..=amount {
                for &c in &coins {
                    if i >= c {
                        dp[i] = std::cmp::min(dp[i], dp[i - c] + 1);
                    }
                }
            }
            if dp[amount] > amount {
                println!("-1");
            } else {
                println!("{}", dp[amount]);
            }
        }
    }
}`,
        },
    },
    {
        title: 'Edit Distance',
        description:
            'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character\n\n**Input Format:**\n- First line: string word1\n- Second line: string word2\n\n**Output Format:**\n- A single integer: the minimum operations required.',
        difficulty: 'MEDIUM',
        tags: ['dynamic-programming', 'tabulation'],
        constraints:
            '0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.',
        hints: 'Let dp[i][j] be the minimum edit distance to match word1[0...i-1] and word2[0...j-1]. If word1[i-1] == word2[j-1], no operation is needed: dp[i][j] = dp[i-1][j-1]. Otherwise, you can perform insert (dp[i][j-1]), delete (dp[i-1][j]), or replace (dp[i-1][j-1]) and add 1.',
        editorial:
            '**Approach: 2D Dynamic Programming**\n\nLet `dp[i][j]` be the minimum operations to convert `word1[0...i-1]` to `word2[0...j-1]`.\nBase cases:\n- `dp[i][0] = i` (delete all `i` characters)\n- `dp[0][j] = j` (insert all `j` characters)\n\nTransitions:\n- If `word1[i-1] == word2[j-1]`, then `dp[i][j] = dp[i-1][j-1]`\n- Else, `dp[i][j] = min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]}) + 1`\n\n**Time Complexity:** O(m * n)\n**Space Complexity:** O(m * n)',
        examples: [
            {
                title: 'Example 1',
                input: 'horse\nros',
                output: '3',
                explanation:
                    "horse -> rorse (replace 'h' with 'r'), rorse -> rose (remove 'r'), rose -> ros (remove 'e')",
            },
            { title: 'Example 2', input: 'intention\nexecution', output: '5' },
        ],
        testcases: [
            { input: 'horse\nros', output: '3' },
            { input: 'intention\nexecution', output: '5' },
            { input: '\nabc', output: '3' },
            { input: 'abc\n', output: '3' },
            { input: '\n', output: '0' },
            { input: 'a\nb', output: '1' },
            { input: 'abc\nabc', output: '0' },
            { input: 'dinitrophenylhydrazine\nacetylphenylhydrazine', output: '6' },
            { input: 'plasma\naltitude', output: '7' },
            { input: 'zoologico\ngoblino', output: '5' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

void trim(string &s) {
    while (!s.empty() && (s.back() == '\n' || s.back() == '\r')) {
        s.pop_back();
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s1, s2;
    if (getline(cin, s1)) {
        getline(cin, s2);
        trim(s1);
        trim(s2);
        int m = s1.length();
        int n = s2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1[i-1] == s2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]}) + 1;
                }
            }
        }
        cout << dp[m][n] << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    lines = sys.stdin.read().splitlines()
    s1 = lines[0] if len(lines) > 0 else ""
    s2 = lines[1] if len(lines) > 1 else ""
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1):
        dp[i][0] = i
    for j in range(n+1):
        dp[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1
    print(dp[m][n])

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        else s1 = s1.replaceAll("\\r|\\n", "");
        if (s2 == null) s2 = "";
        else s2 = s2.replaceAll("\\r|\\n", "");
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1])) + 1;
                }
            }
        }
        System.out.println(dp[m][n]);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let s1 = match lines.next() {
        Some(Ok(l)) => l.replace("\r", "").replace("\n", ""),
        _ => "".to_string(),
    };
    let s2 = match lines.next() {
        Some(Ok(l)) => l.replace("\r", "").replace("\n", ""),
        _ => "".to_string(),
    };
    let m = s1.len();
    let n = s2.len();
    let s1_chars: Vec<char> = s1.chars().collect();
    let s2_chars: Vec<char> = s2.chars().collect();
    let mut dp = vec![vec![0; n + 1]; m + 1];
    for i in 0..=m { dp[i][0] = i; }
    for j in 0..=n { dp[0][j] = j; }
    for i in 1..=m {
        for j in 1..=n {
            if s1_chars[i-1] == s2_chars[j-1] {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = std::cmp::min(
                    dp[i-1][j-1],
                    std::cmp::min(dp[i-1][j], dp[i][j-1])
                ) + 1;
            }
        }
    }
    println!("{}", dp[m][n]);
}`,
        },
    },
    {
        title: 'Unique Paths',
        description:
            'There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m-1][n-1]`). The robot can only move either down or right at any point in time.\n\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner modulo 1,000,000,007 (10^9 + 7).\n\n**Input Format:**\n- A single line containing two space-separated integers m and n.\n\n**Output Format:**\n- A single integer: the number of unique paths modulo 1000000007.',
        difficulty: 'MEDIUM',
        tags: ['dynamic-programming', 'tabulation'],
        constraints: '1 <= m, n <= 100',
        hints: 'The robot can reach any cell (i, j) only from (i-1, j) or (i, j-1). So the number of ways is the sum of the ways to reach those two cells.',
        editorial:
            '**Approach: Dynamic Programming (1D Space Optimization)**\n\nLet `dp[j]` be the number of paths to reach the current cell in column `j`.\nInitialize `dp` array of size `n` with 1 (since there is only 1 path to reach any cell in the first row).\nFor each row from 1 to `m-1`:\n  For each column `j` from 1 to `n-1`:\n    `dp[j] = (dp[j] + dp[j-1]) % MOD`\n\nReturn `dp[n-1]`.\n\n**Time Complexity:** O(m * n)\n**Space Complexity:** O(n)',
        examples: [
            { title: 'Example 1', input: '3 7', output: '28' },
            {
                title: 'Example 2',
                input: '3 2',
                output: '3',
                explanation:
                    'From top-left corner, there are a total of 3 ways to reach the bottom-right corner: 1. Right -> Down -> Down, 2. Down -> Down -> Right, 3. Down -> Right -> Down',
            },
        ],
        testcases: [
            { input: '3 7', output: '28' },
            { input: '3 2', output: '3' },
            { input: '1 1', output: '1' },
            { input: '1 10', output: '1' },
            { input: '10 1', output: '1' },
            { input: '10 10', output: '48620' },
            { input: '20 20', output: '345263555' },
            { input: '50 50', output: '267422234' },
            { input: '100 100', output: '690285631' },
            { input: '10 20', output: '6906900' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int m, n;
    if (cin >> m >> n) {
        vector<long long> dp(n, 1);
        long long MOD = 1000000007;
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] = (dp[j] + dp[j-1]) % MOD;
            }
        }
        cout << dp[n-1] << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    m = int(input_data[0])
    n = int(input_data[1])
    MOD = 1000000007
    dp = [1] * n
    for i in range(1, m):
        for j in range(1, n):
            dp[j] = (dp[j] + dp[j-1]) % MOD
    print(dp[n-1])

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
        int m = Integer.parseInt(st.nextToken());
        int n = Integer.parseInt(st.nextToken());
        long[] dp = new long[n];
        Arrays.fill(dp, 1);
        long MOD = 1000000007;
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] = (dp[j] + dp[j-1]) % MOD;
            }
        }
        System.out.println(dp[n-1]);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<usize> = line.split_whitespace().map(|x| x.parse().unwrap()).collect();
        let m = parts[0];
        let n = parts[1];
        let mut dp = vec![1i64; n];
        let mod_val = 1000000007;
        for _ in 1..m {
            for j in 1..n {
                dp[j] = (dp[j] + dp[j-1]) % mod_val;
            }
        }
        println!("{}", dp[n-1]);
    }
}`,
        },
    },
    {
        title: '0/1 Knapsack',
        description:
            'Given weights and values of `n` items, and a knapsack of capacity `W`, find the maximum value that can be put in the knapsack. You cannot split items; you either take them (1) or leave them (0).\n\n**Input Format:**\n- First line: two integers n and W (number of items and capacity of the knapsack)\n- Second line: n space-separated integers representing the values of each item\n- Third line: n space-separated integers representing the weights of each item\n\n**Output Format:**\n- A single integer: the maximum value that can be stashed.',
        difficulty: 'HARD',
        tags: ['dynamic-programming', 'knapsack', 'tabulation'],
        constraints: '1 <= n <= 1000\n1 <= W <= 1000\n1 <= val[i] <= 10^5\n1 <= wt[i] <= 1000',
        hints: 'For each item, you can decide to either include it in the knapsack or exclude it. If you include it, the remaining capacity decreases by its weight, and your value increases by its value.',
        editorial:
            '**Approach: 0/1 Knapsack DP**\n\nLet `dp[j]` be the maximum value we can achieve with capacity `j`.\nWe initialize the `dp` array of size `W + 1` with 0.\nFor each item `i` with weight `wt[i]` and value `val[i]`:\n  For capacity `j` from `W` down to `wt[i]`:\n    `dp[j] = max(dp[j], dp[j - wt[i]] + val[i])`\n\n**Time Complexity:** O(n * W)\n**Space Complexity:** O(W)',
        examples: [
            {
                title: 'Example 1',
                input: '3 4\n1 2 3\n4 5 1',
                output: '3',
                explanation:
                    'The only item that fits is the 3rd item with weight 1 and value 3. The other items are too heavy.',
            },
            {
                title: 'Example 2',
                input: '3 50\n60 100 120\n10 20 30',
                output: '220',
                explanation:
                    'Choose items with weights 20 and 30. Total weight is 50, total value is 100 + 120 = 220.',
            },
        ],
        testcases: [
            { input: '3 4\n1 2 3\n4 5 1', output: '3' },
            { input: '3 50\n60 100 120\n10 20 30', output: '220' },
            { input: '1 10\n5\n11', output: '0' },
            { input: '1 10\n5\n10', output: '5' },
            { input: '5 10\n10 20 30 40 50\n1 2 3 4 5', output: '100' },
            { input: '4 5\n10 40 30 50\n5 4 6 3', output: '50' },
            { input: '5 100\n20 30 40 50 60\n10 20 30 40 50', output: '140' },
            { input: '8 15\n1 2 3 4 5 6 7 8\n1 1 2 2 3 3 4 4', output: '28' },
            { input: '3 10\n50 60 100\n3 4 5', output: '160' },
            {
                input: '10 80\n15 20 5 8 12 17 22 10 14 18\n10 15 5 8 12 17 25 10 15 20',
                output: '89',
            },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, W;
    if (cin >> n >> W) {
        vector<int> val(n), wt(n);
        for (int i = 0; i < n; i++) cin >> val[i];
        for (int i = 0; i < n; i++) cin >> wt[i];
        vector<long long> dp(W + 1, 0);
        for (int i = 0; i < n; i++) {
            for (int j = W; j >= wt[i]; j--) {
                dp[j] = max(dp[j], dp[j - wt[i]] + val[i]);
            }
        }
        cout << dp[W] << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    W = int(input_data[1])
    values = [int(x) for x in input_data[2:n+2]]
    weights = [int(x) for x in input_data[n+2:2*n+2]]
    dp = [0] * (W + 1)
    for i in range(n):
        v, w = values[i], weights[i]
        for j in range(W, w - 1, -1):
            if dp[j-w] + v > dp[j]:
                dp[j] = dp[j-w] + v
    print(dp[W])

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st1 = new StringTokenizer(line1);
        int n = Integer.parseInt(st1.nextToken());
        int W = Integer.parseInt(st1.nextToken());
        
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st2 = new StringTokenizer(line2);
        int[] val = new int[n];
        for (int i = 0; i < n; i++) {
            val[i] = Integer.parseInt(st2.nextToken());
        }
        
        String line3 = br.readLine();
        if (line3 == null) return;
        StringTokenizer st3 = new StringTokenizer(line3);
        int[] wt = new int[n];
        for (int i = 0; i < n; i++) {
            wt[i] = Integer.parseInt(st3.nextToken());
        }
        
        long[] dp = new long[W + 1];
        for (int i = 0; i < n; i++) {
            for (int j = W; j >= wt[i]; j--) {
                dp[j] = Math.max(dp[j], dp[j - wt[i]] + val[i]);
            }
        }
        System.out.println(dp[W]);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let parts: Vec<usize> = line1.split_whitespace().map(|x| x.parse().unwrap()).collect();
        let n = parts[0];
        let w_cap = parts[1];
        if let (Some(Ok(line2)), Some(Ok(line3))) = (lines.next(), lines.next()) {
            let val: Vec<i64> = line2.split_whitespace().map(|x| x.parse().unwrap()).collect();
            let wt: Vec<usize> = line3.split_whitespace().map(|x| x.parse().unwrap()).collect();
            let mut dp = vec![0i64; w_cap + 1];
            for i in 0..n {
                let v = val[i];
                let w = wt[i];
                for j in (w..=w_cap).rev() {
                    dp[j] = std::cmp::max(dp[j], dp[j - w] + v);
                }
            }
            println!("{}", dp[w_cap]);
        }
    }
}`,
        },
    },
    {
        title: 'Partition Equal Subset Sum',
        description:
            'Given an integer array nums, return "true" if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or "false" otherwise.\n\n**Input Format:**\n- First line: an integer n (the size of the array)\n- Second line: n space-separated integers representing the array elements\n\n**Output Format:**\n- Print "true" if partitioning is possible, "false" otherwise.',
        difficulty: 'HARD',
        tags: ['dynamic-programming', 'knapsack', 'tabulation'],
        constraints: '1 <= n <= 200\n1 <= nums[i] <= 100',
        hints: 'The problem can be framed as finding if there is a subset of elements that sums up to exactly half of the total sum of the array. If the total sum is odd, partitioning is impossible.',
        editorial:
            '**Approach: Subset Sum DP**\n\nFirst, calculate the total sum of the array. If it is odd, partition is impossible (return false).\nOtherwise, our target sum is `target = sum / 2`.\nLet `dp[j]` be a boolean indicating if a subset sum of `j` is possible.\nInitialize `dp[0] = true` and all other elements to `false`.\nFor each number `x` in `nums`:\n  For `j` from `target` down to `x`:\n    if `dp[j - x]` is true:\n      `dp[j] = true`\n\n**Time Complexity:** O(n * target) = O(n * sum / 2)\n**Space Complexity:** O(target)',
        examples: [
            {
                title: 'Example 1',
                input: '4\n1 5 11 5',
                output: 'true',
                explanation: 'The array can be partitioned as [1, 5, 5] and [11].',
            },
            {
                title: 'Example 2',
                input: '4\n1 2 3 5',
                output: 'false',
                explanation: 'The array cannot be partitioned into equal sum subsets.',
            },
        ],
        testcases: [
            { input: '4\n1 5 11 5', output: 'true' },
            { input: '4\n1 2 3 5', output: 'false' },
            { input: '1\n100', output: 'false' },
            { input: '2\n10 10', output: 'true' },
            { input: '2\n10 20', output: 'false' },
            { input: '6\n2 2 3 5 8 10', output: 'true' },
            { input: '5\n1 1 1 1 1', output: 'false' },
            { input: '10\n1 2 3 4 5 6 7 8 9 11', output: 'true' },
            { input: '7\n10 20 30 40 50 60 70', output: 'true' },
            { input: '4\n2 2 2 8', output: 'false' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> nums(n);
        int sum = 0;
        for (int i = 0; i < n; i++) {
            cin >> nums[i];
            sum += nums[i];
        }
        if (sum % 2 != 0) {
            cout << "false\n";
            return 0;
        }
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int x : nums) {
            for (int j = target; j >= x; j--) {
                if (dp[j - x]) {
                    dp[j] = true;
                }
            }
        }
        cout << (dp[target] ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    total = sum(nums)
    if total % 2 != 0:
        print("false")
        return
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for j in range(target, x - 1, -1):
            if dp[j - x]:
                dp[j] = True
    print("true" if dp[target] else "false")

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        int n = Integer.parseInt(line1.trim());
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st = new StringTokenizer(line2);
        int[] nums = new int[n];
        int sum = 0;
        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(st.nextToken());
            sum += nums[i];
        }
        if (sum % 2 != 0) {
            System.out.println("false");
            return;
        }
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int x : nums) {
            for (int j = target; j >= x; j--) {
                if (dp[j - x]) {
                    dp[j] = true;
                }
            }
        }
        System.out.println(dp[target] ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let n: usize = line1.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let nums: Vec<usize> = line2.split_whitespace().map(|x| x.parse().unwrap()).collect();
            let sum: usize = nums.iter().sum();
            if sum % 2 != 0 {
                println!("false");
                return;
            }
            let target = sum / 2;
            let mut dp = vec![false; target + 1];
            dp[0] = true;
            for &x in &nums {
                for j in (x..=target).rev() {
                    if dp[j - x] {
                        dp[j] = true;
                    }
                }
            }
            if dp[target] {
                println!("true");
            } else {
                println!("false");
            }
        }
    }
}`,
        },
    },
    {
        title: 'Word Break II',
        description:
            'Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in alphabetical (lexicographical) order, each on a separate line.\n\n**Input Format:**\n- First line: string s\n- Second line: integer n (size of dictionary)\n- Third line: n space-separated words representing the dictionary\n\n**Output Format:**\n- All valid sentences sorted lexicographically, one per line. If no sentence can be formed, print nothing.',
        difficulty: 'HARD',
        tags: ['dynamic-programming', 'memoization', 'dfs'],
        constraints:
            '1 <= s.length <= 20\n1 <= wordDict.length <= 10\n1 <= wordDict[i].length <= 10\ns and wordDict[i] consist of lowercase English letters.',
        hints: 'Use Depth First Search (DFS) with memoization. At each index, check if any prefix matches a word in the dictionary, then recursively solve for the remaining substring.',
        editorial:
            '**Approach: DFS with Memoization**\n\nWe define a function `dfs(idx)` that returns all valid sentences that can be formed from the suffix `s[idx...]`.\nTo find `dfs(idx)`:\n- Iterate `j` from `idx + 1` to `s.length()`.\n- If `s[idx...j-1]` is a valid word in the dictionary:\n  - Recursively get all sentences from `dfs(j)`.\n  - Append `s[idx...j-1]` to each of those sentences.\n- Cache the result in a map `memo` at key `idx` to avoid redundant computations.\n\nAt the end, sort the results lexicographically.\n\n**Time Complexity:** O(2^len(s)) in the worst case, but memoization significantly reduces repeated work.\n**Space Complexity:** O(2^len(s)) to store all sentences.',
        examples: [
            {
                title: 'Example 1',
                input: 'catsanddog\n5\ncat cats and sand dog',
                output: 'cat sand dog\ncats and dog',
                explanation: 'Two sentences can be formed: "cat sand dog" and "cats and dog".',
            },
            {
                title: 'Example 2',
                input: 'pineapplepenapple\n5\napple pen applepen pine pineapple',
                output: 'pine apple pen apple\npine applepen apple\npineapple pen apple',
            },
        ],
        testcases: [
            { input: 'catsanddog\n5\ncat cats and sand dog', output: 'cat sand dog\ncats and dog' },
            {
                input: 'pineapplepenapple\n5\napple pen applepen pine pineapple',
                output: 'pine apple pen apple\npine applepen apple\npineapple pen apple',
            },
            { input: 'catsandog\n5\ncats dog sand and cat', output: '' },
            { input: 'a\n1\na', output: 'a' },
            { input: 'a\n1\nb', output: '' },
            { input: 'leetcode\n3\nleet code leetcode', output: 'leet code\nleetcode' },
            { input: 'penapplepen\n3\npen apple applepen', output: 'pen apple pen' },
            { input: 'sanddog\n3\nsand dog sanddog', output: 'sand dog\nsanddog' },
            {
                input: 'applesandpeaches\n6\napple apples sand peaches and peach',
                output: 'apple sand peaches\napples and peaches',
            },
            { input: 'aaaa\n2\na aa', output: 'a a a a\na a aa\na aa a\naa a a\naa aa' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

unordered_map<int, vector<string>> memo;

vector<string> solve(const string &s, int idx, const unordered_set<string> &words) {
    if (memo.count(idx)) return memo[idx];
    if (idx == s.length()) return {""};
    vector<string> res;
    for (int j = idx + 1; j <= s.length(); j++) {
        string w = s.substr(idx, j - idx);
        if (words.count(w)) {
            vector<string> sub = solve(s, j, words);
            for (const string &s_sub : sub) {
                if (s_sub.empty()) {
                    res.push_back(w);
                } else {
                    res.push_back(w + " " + s_sub);
                }
            }
        }
    }
    memo[idx] = res;
    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        int n;
        if (cin >> n) {
            unordered_set<string> words;
            for (int i = 0; i < n; i++) {
                string w;
                cin >> w;
                words.insert(w);
            }
            vector<string> result = solve(s, 0, words);
            sort(result.begin(), result.end());
            for (const string &res : result) {
                cout << res << "\n";
            }
        }
    }
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    s = input_data[0]
    n = int(input_data[1])
    wordDict = input_data[2:2+n]
    
    words = set(wordDict)
    memo = {}
    
    def dfs(idx):
        if idx in memo:
            return memo[idx]
        if idx == len(s):
            return ['']
        res = []
        for j in range(idx + 1, len(s) + 1):
            w = s[idx:j]
            if w in words:
                sub = dfs(j)
                for s_sub in sub:
                    if s_sub == '':
                        res.append(w)
                    else:
                        res.append(w + ' ' + s_sub)
        memo[idx] = res
        return res
        
    ans = dfs(0)
    ans.sort()
    for sentence in ans:
        print(sentence)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static Map<Integer, List<String>> memo = new HashMap<>();
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        String line2 = br.readLine();
        if (line2 == null) return;
        int n = Integer.parseInt(line2.trim());
        String line3 = br.readLine();
        Set<String> words = new HashSet<>();
        if (line3 != null && !line3.trim().isEmpty()) {
            StringTokenizer st = new StringTokenizer(line3);
            for (int i = 0; i < n; i++) {
                if (st.hasMoreTokens()) {
                    words.add(st.nextToken());
                }
            }
        }
        List<String> ans = dfs(s, 0, words);
        Collections.sort(ans);
        for (String sentence : ans) {
            System.out.println(sentence);
        }
    }
    
    private static List<String> dfs(String s, int idx, Set<String> words) {
        if (memo.containsKey(idx)) {
            return memo.get(idx);
        }
        List<String> res = new ArrayList<>();
        if (idx == s.length()) {
            res.add("");
            return res;
        }
        for (int j = idx + 1; j <= s.length(); j++) {
            String w = s.substring(idx, j);
            if (words.contains(w)) {
                List<String> sub = dfs(s, j, words);
                for (String s_sub : sub) {
                    if (s_sub.isEmpty()) {
                        res.add(w);
                    } else {
                        res.add(w + " " + s_sub);
                    }
                }
            }
        }
        memo.put(idx, res);
        return res;
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::{HashMap, HashSet};

fn dfs(s: &str, idx: usize, words: &HashSet<String>, memo: &mut HashMap<usize, Vec<String>>) -> Vec<String> {
    if let Some(res) = memo.get(&idx) {
        return res.clone();
    }
    if idx == s.len() {
        return vec!["".to_string()];
    }
    let mut res = Vec::new();
    for j in (idx + 1)..=s.len() {
        let w = &s[idx..j];
        if words.contains(w) {
            let sub = dfs(s, j, words, memo);
            for s_sub in sub {
                if s_sub.is_empty() {
                    res.push(w.to_string());
                } else {
                    res.push(format!("{} {}", w, s_sub));
                }
            }
        }
    }
    memo.insert(idx, res.clone());
    res
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(s)) = lines.next() {
        let s = s.trim().to_string();
        if let Some(Ok(line2)) = lines.next() {
            let _n: usize = line2.trim().parse().unwrap();
            if let Some(Ok(line3)) = lines.next() {
                let words: HashSet<String> = line3.split_whitespace().map(|x| x.to_string()).collect();
                let mut memo = HashMap::new();
                let mut ans = dfs(&s, 0, &words, &mut memo);
                ans.sort();
                for sentence in ans {
                    println!("{}", sentence);
                }
            }
        }
    }
}`,
        },
    },
    {
        title: 'Maximum Path Sum in Matrix',
        description:
            'Given an `N x M` matrix, find the maximum path sum from any cell of the first row to any cell of the last row. At each cell `(i, j)`, you can move to `(i+1, j)`, `(i+1, j-1)`, or `(i+1, j+1)`.\n\n**Input Format:**\n- First line: two space-separated integers N and M\n- Next N lines: M space-separated integers representing the matrix rows\n\n**Output Format:**\n- A single integer: the maximum path sum.',
        difficulty: 'HARD',
        tags: ['dynamic-programming', 'tabulation'],
        constraints: '1 <= N, M <= 100\n-10^4 <= matrix[i][j] <= 10^4',
        hints: 'Use dynamic programming starting from the second row. For each cell (i, j), update it with the max of the three reachable cells from the row above: (i-1, j-1), (i-1, j), and (i-1, j+1).',
        editorial:
            "**Approach: Dynamic Programming (Tabulation)**\n\nLet `dp[i][j]` be the maximum path sum starting from any cell in the first row and ending at `(i, j)`.\nBase Case:\n- `dp[0][j] = matrix[0][j]` for all `0 <= j < M`.\n\nTransitions:\nFor each cell `(i, j)` where `i > 0`:\n- `dp[i][j] = matrix[i][j] + max({dp[i-1][j], dp[i-1][j-1], dp[i-1][j+1]})`\n(Taking care of boundary conditions where `j-1` or `j+1` are out of bounds).\n\nFinally, the answer is the maximum value in `dp[N-1]`.\nWe can optimize the space to O(M) by maintaining only the previous row's DP values.\n\n**Time Complexity:** O(N * M)\n**Space Complexity:** O(M)",
        examples: [
            {
                title: 'Example 1',
                input: '3 3\n1 2 10\n100 3 2\n1 1 20',
                output: '103',
                explanation:
                    'Path: 2 (row 0, col 1) -> 100 (row 1, col 0) -> 1 (row 2, col 0). Sum = 2 + 100 + 1 = 103.',
            },
            {
                title: 'Example 2',
                input: '2 2\n5 6\n-10 10',
                output: '16',
                explanation: 'Path: 6 -> 10. Sum = 16.',
            },
        ],
        testcases: [
            { input: '3 3\n1 2 10\n100 3 2\n1 1 20', output: '103' },
            { input: '2 2\n5 6\n-10 10', output: '16' },
            { input: '1 1\n42', output: '42' },
            { input: '1 5\n-1 -2 -3 -4 -5', output: '-1' },
            { input: '4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', output: '40' },
            { input: '3 4\n1 3 5 7\n2 4 6 8\n10 1 1 1', output: '19' },
            { input: '2 3\n-5 -2 -1\n-10 -15 -20', output: '-12' },
            { input: '4 3\n1 2 3\n9 8 0\n4 5 6\n10 -2 7', output: '26' },
            { input: '3 3\n10 20 30\n50 40 60\n1 2 3', output: '93' },
            {
                input: '5 5\n10 8 2 1 0\n-2 100 -5 8 12\n50 -10 25 4 3\n1 10 15 20 30\n5 8 12 100 1',
                output: '255',
            },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (cin >> n >> m) {
        vector<vector<long long>> grid(n, vector<long long>(m));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cin >> grid[i][j];
            }
        }
        vector<long long> dp = grid[0];
        for (int i = 1; i < n; i++) {
            vector<long long> next_dp(m);
            for (int j = 0; j < m; j++) {
                long long best = dp[j];
                if (j > 0) best = max(best, dp[j-1]);
                if (j < m - 1) best = max(best, dp[j+1]);
                next_dp[j] = grid[i][j] + best;
            }
            dp = next_dp;
        }
        long long ans = dp[0];
        for (int j = 1; j < m; j++) {
            ans = max(ans, dp[j]);
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
    m = int(input_data[1])
    idx = 2
    grid = []
    for i in range(n):
        grid.append([int(x) for x in input_data[idx:idx+m]])
        idx += m
    dp = list(grid[0])
    for i in range(1, n):
        next_dp = [0] * m
        for j in range(m):
            best = dp[j]
            if j > 0:
                best = max(best, dp[j-1])
            if j < m - 1:
                best = max(best, dp[j+1])
            next_dp[j] = grid[i][j] + best
        dp = next_dp
    print(max(dp))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st1 = new StringTokenizer(line1);
        int n = Integer.parseInt(st1.nextToken());
        int m = Integer.parseInt(st1.nextToken());
        long[][] grid = new long[n][m];
        for (int i = 0; i < n; i++) {
            String line = br.readLine();
            if (line == null) return;
            StringTokenizer st = new StringTokenizer(line);
            for (int j = 0; j < m; j++) {
                grid[i][j] = Long.parseLong(st.nextToken());
            }
        }
        long[] dp = new long[m];
        for (int j = 0; j < m; j++) {
            dp[j] = grid[0][j];
        }
        for (int i = 1; i < n; i++) {
            long[] next_dp = new long[m];
            for (int j = 0; j < m; j++) {
                long best = dp[j];
                if (j > 0) best = Math.max(best, dp[j-1]);
                if (j < m - 1) best = Math.max(best, dp[j+1]);
                next_dp[j] = grid[i][j] + best;
            }
            dp = next_dp;
        }
        long ans = dp[0];
        for (int j = 1; j < m; j++) {
            ans = Math.max(ans, dp[j]);
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead};
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let parts: Vec<usize> = line1.split_whitespace().map(|x| x.parse().unwrap()).collect();
        let n = parts[0];
        let m = parts[1];
        let mut grid = vec![vec![0i64; m]; n];
        for i in 0..n {
            if let Some(Ok(line)) = lines.next() {
                let row: Vec<i64> = line.split_whitespace().map(|x| x.parse().unwrap()).collect();
                for j in 0..m {
                    grid[i][j] = row[j];
                }
            }
        }
        let mut dp = grid[0].clone();
        for i in 1..n {
            let mut next_dp = vec![0i64; m];
            for j in 0..m {
                let mut best = dp[j];
                if j > 0 {
                    best = std::cmp::max(best, dp[j-1]);
                }
                if j < m - 1 {
                    best = std::cmp::max(best, dp[j+1]);
                }
                next_dp[j] = grid[i][j] + best;
            }
            dp = next_dp;
        }
        let mut ans = dp[0];
        for j in 1..m {
            ans = std::cmp::max(ans, dp[j]);
        }
        println!("{}", ans);
    }
}`,
        },
    },
    {
        title: 'Regular Expression Matching',
        description:
            "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n- '.' Matches any single character.\n- '*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).\n\n**Input Format:**\n- First line: string s\n- Second line: string p\n\n**Output Format:**\n- Print \"true\" if the pattern matches the string, \"false\" otherwise.",
        difficulty: 'HARD',
        tags: ['dynamic-programming', 'memoization'],
        constraints:
            "1 <= s.length <= 20\n1 <= p.length <= 30\ns and p contain only lowercase English letters, '.', and '*'.\nIt is guaranteed for each '*' there is a preceding valid character to match.",
        hints: "Let dp(i, j) be the boolean answer for s[i...] and p[j...]. If p[j+1] == '*', we can either skip the pattern (dp(i, j+2)) or match s[i] (if s[i] matches p[j]) and check dp(i+1, j).",
        editorial:
            "**Approach: Top-Down DP with Memoization**\n\nWe define `dp(i, j)` to check if `s[i...]` matches `p[j...]`.\n- Base Case: If `j == p.length()`, matching is successful if `i == s.length()`.\n- Check if first characters match: `first_match = (i < s.length() && (p[j] == s[i] || p[j] == '.'))`\n- If `p[j+1] == '*'`, we have two options:\n  1. Match zero times: `dp(i, j+2)`\n  2. Match one or more times: `first_match && dp(i+1, j)`\n- Else, match one character: `first_match && dp(i+1, j+1)`\n\n**Time Complexity:** O(s.length * p.length)\n**Space Complexity:** O(s.length * p.length)",
        examples: [
            {
                title: 'Example 1',
                input: 'aa\na*',
                output: 'true',
                explanation:
                    "'*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\".",
            },
            {
                title: 'Example 2',
                input: 'ab\n.*',
                output: 'true',
                explanation: '".*" means "zero or more (*) of any character (.)".',
            },
        ],
        testcases: [
            { input: 'aa\na*', output: 'true' },
            { input: 'ab\n.*', output: 'true' },
            { input: 'aab\nc*a*b', output: 'true' },
            { input: 'mississippi\nmis*is*ip*.', output: 'true' },
            { input: 'mississippi\nmis*is*p*.', output: 'false' },
            { input: 'ab\n.*c', output: 'false' },
            { input: 'a\nab*a', output: 'false' },
            { input: 'aaa\na*a', output: 'true' },
            { input: 'aaa\nab*a*c*a', output: 'true' },
            { input: 'abcd\nd*', output: 'false' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
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
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int memo[50][50];

bool solve(int i, int j, const string &s, const string &p) {
    if (memo[i][j] != -1) return memo[i][j];
    if (j == p.length()) return i == s.length();
    bool first_match = (i < s.length() && (p[j] == s[i] || p[j] == '.'));
    bool ans = false;
    if (j + 1 < p.length() && p[j+1] == '*') {
        ans = solve(i, j + 2, s, p) || (first_match && solve(i + 1, j, s, p));
    } else {
        ans = first_match && solve(i + 1, j + 1, s, p);
    }
    return memo[i][j] = ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s, p;
    if (cin >> s >> p) {
        memset(memo, -1, sizeof(memo));
        cout << (solve(0, 0, s, p) ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    s = lines[0]
    p = lines[1]
    
    memo = {}
    def dp(i, j):
        if (i, j) in memo:
            return memo[(i, j)]
        if j == len(p):
            return i == len(s)
        first_match = i < len(s) and (p[j] == s[i] or p[j] == '.')
        if j + 1 < len(p) and p[j+1] == '*':
            ans = dp(i, j+2) or (first_match and dp(i+1, j))
        else:
            ans = first_match and dp(i+1, j+1)
        memo[(i, j)] = ans
        return ans
        
    print("true" if dp(0, 0) else "false")

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static int[][] memo;
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        String p = br.readLine();
        if (s == null || p == null) return;
        s = s.trim();
        p = p.trim();
        memo = new int[s.length() + 1][p.length() + 1];
        for (int[] row : memo) Arrays.fill(row, -1);
        System.out.println(solve(0, 0, s, p) ? "true" : "false");
    }
    
    private static boolean solve(int i, int j, String s, String p) {
        if (memo[i][j] != -1) return memo[i][j] == 1;
        if (j == p.length()) return i == s.length();
        boolean firstMatch = i < s.length() && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');
        boolean ans;
        if (j + 1 < p.length() && p.charAt(j+1) == '*') {
            ans = solve(i, j + 2, s, p) || (firstMatch && solve(i + 1, j, s, p));
        } else {
            ans = firstMatch && solve(i + 1, j + 1, s, p);
        }
        memo[i][j] = ans ? 1 : 0;
        return ans;
    }
}`,
            rust: `use std::io::{self, BufRead};

fn solve(i: usize, j: usize, s: &[char], p: &[char], memo: &mut Vec<Vec<i8>>) -> bool {
    if memo[i][j] != -1 {
        return memo[i][j] == 1;
    }
    if j == p.len() {
        return i == s.len();
    }
    let first_match = i < s.len() && (p[j] == s[i] || p[j] == '.');
    let ans = if j + 1 < p.len() && p[j+1] == '*' {
        solve(i, j + 2, s, p, memo) || (first_match && solve(i + 1, j, s, p, memo))
    } else {
        first_match && solve(i + 1, j + 1, s, p, memo)
    };
    memo[i][j] = if ans { 1 } else { 0 };
    ans
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let (Some(Ok(s_line)), Some(Ok(p_line))) = (lines.next(), lines.next()) {
        let s: Vec<char> = s_line.trim().chars().collect();
        let p: Vec<char> = p_line.trim().chars().collect();
        let mut memo = vec![vec![-1; p.len() + 1]; s.len() + 1];
        if solve(0, 0, &s, &p, &mut memo) {
            println!("true");
        } else {
            println!("false");
        }
    }
}`,
        },
    },
]
