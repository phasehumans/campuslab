import type { SeedProblem } from './types.js'

export const greedyProblems: SeedProblem[] = [
    // ==================== EASY #1: Assign Cookies ====================
    {
        title: 'Assign Cookies',
        description:
            'Assume you are a parent and want to give your children some cookies. But, you should give each child at most one cookie.\n\nEach child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.\n\n**Input Format:**\n- First line: integer n (number of children)\n- Second line: n space-separated integers representing the greed factors g[i]\n- Third line: integer m (number of cookies)\n- Fourth line: m space-separated integers representing the cookie sizes s[j]\n\n**Output Format:**\n- A single integer: the maximum number of children who can be content',
        difficulty: 'EASY',
        tags: ['greedy', 'sorting-greedy'],
        constraints: '1 <= n, m <= 3 * 10^4\\n1 <= g[i], s[j] <= 2 * 10^9',
        hints: "Sort both the children's greed factors and the cookie sizes. Iterate through the cookies and assign the smallest possible cookie that satisfies each child's greed.",
        editorial:
            '**Approach: Greedy + Sorting**\n\nBy sorting both arrays, we can align the children and the cookies. For each child, we want to find the smallest cookie that satisfies their greed. Since both arrays are sorted, a two-pointer approach works optimally.\n\n**Complexity:**\n- Time Complexity: O(n log n + m log m) due to sorting.\n- Space Complexity: O(1) if sorting in place.',
        examples: [
            {
                title: 'Example 1',
                input: '3\n1 2 3\n2\n1 1',
                output: '1',
                explanation:
                    'You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. And even though you have 2 cookies, since their size is both 1, you could only make the child with greed factor 1 content. You need to output 1.',
            },
            {
                title: 'Example 2',
                input: '2\n1 2\n3\n1 2 3',
                output: '2',
                explanation:
                    'You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. You have 3 cookies and their sizes are big enough to gratify all of the children. You need to output 2.',
            },
        ],
        testcases: [
            { input: '3\n1 2 3\n2\n1 1', output: '1' },
            { input: '2\n1 2\n3\n1 2 3', output: '2' },
            { input: '1\n2\n1\n1', output: '0' },
            { input: '1\n1\n1\n2', output: '1' },
            { input: '5\n1 2 3 4 5\n5\n5 4 3 2 1', output: '5' },
            { input: '4\n1 3 5 7\n4\n2 2 6 8', output: '3' },
            { input: '5\n10 9 8 7 6\n4\n5 6 7 8', output: '3' },
            { input: '3\n10 20 30\n1\n5', output: '0' },
            { input: '10\n1 1 1 1 1 1 1 1 1 1\n5\n1 1 1 1 1', output: '5' },
            { input: '6\n5 10 15 20 25 30\n8\n2 4 6 8 10 12 14 16', output: '3' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        vector<int> g(n);
        for (int i = 0; i < n; i++) cin >> g[i];
        int m;
        cin >> m;
        vector<int> s(m);
        for (int i = 0; i < m; i++) cin >> s[i];
        
        // Solve and print result
    }
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    g = [int(x) for x in data[1:n+1]]
    m = int(data[n+1])
    s = [int(x) for x in data[n+2:n+2+m]]
    
    # Solve and print result

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] g = new int[n];
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            for (int i = 0; i < n; i++) g[i] = Integer.parseInt(st.nextToken());
        }
        int m = Integer.parseInt(br.readLine().trim());
        int[] s = new int[m];
        if (m > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            for (int i = 0; i < m; i++) s[i] = Integer.parseInt(st.nextToken());
        }
        
        // Solve and print result
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
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
    if (!(cin >> n)) return 0;
    vector<int> g(n);
    for (int i = 0; i < n; i++) cin >> g[i];
    int m;
    if (!(cin >> m)) return 0;
    vector<int> s(m);
    for (int i = 0; i < m; i++) cin >> s[i];
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());
    int i = 0, j = 0;
    while (i < n && j < m) {
        if (s[j] >= g[i]) {
            i++;
        }
        j++;
    }
    cout << i << "\\n";
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    g = [int(x) for x in data[1:n+1]]
    m = int(data[n+1])
    s = [int(x) for x in data[n+2:n+2+m]]
    g.sort()
    s.sort()
    i = 0
    j = 0
    while i < len(g) and j < len(s):
        if s[j] >= g[i]:
            i += 1
        j += 1
    print(i)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        int n = Integer.parseInt(line1.trim());
        int[] g = new int[n];
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            for (int i = 0; i < n; i++) {
                g[i] = Integer.parseInt(st.nextToken());
            }
        }
        int m = Integer.parseInt(br.readLine().trim());
        int[] s = new int[m];
        if (m > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            for (int i = 0; i < m; i++) {
                s[i] = Integer.parseInt(st.nextToken());
            }
        }
        Arrays.sort(g);
        Arrays.sort(s);
        int i = 0, j = 0;
        while (i < n && j < m) {
            if (s[j] >= g[i]) {
                i++;
            }
            j++;
        }
        System.out.println(i);
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    
    let n_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = n_line.trim().parse().unwrap();
    let mut g = Vec::new();
    if n > 0 {
        if let Some(Ok(line)) = lines.next() {
            g = line.split_whitespace()
                    .map(|x| x.parse::<i32>().unwrap())
                    .collect();
        }
    }
    
    let m_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let m: usize = m_line.trim().parse().unwrap();
    let mut s = Vec::new();
    if m > 0 {
        if let Some(Ok(line)) = lines.next() {
            s = line.split_whitespace()
                    .map(|x| x.parse::<i32>().unwrap())
                    .collect();
        }
    }
    
    g.sort_unstable();
    s.sort_unstable();
    
    let mut i = 0;
    let mut j = 0;
    while i < g.len() && j < s.len() {
        if s[j] >= g[i] {
            i += 1;
        }
        j += 1;
    }
    println!("{}", i);
}`,
        },
    },

    // ==================== EASY #2: Lemonade Change ====================
    {
        title: 'Lemonade Change',
        description:
            'At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order given by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.\n\nNote that you do not have any change in hand at first.\n\nGiven an integer array bills where bills[i] is the bill the i-th customer pays, return true if you can provide every customer with the correct change, or false otherwise.\n\n**Input Format:**\n- First line: integer n (the number of customers)\n- Second line: n space-separated integers representing the bills\n\n**Output Format:**\n- Print "true" or "false" (lowercase)',
        difficulty: 'EASY',
        tags: ['greedy'],
        constraints: '1 <= n <= 10^5\\nbills[i] is either 5, 10, or 20',
        hints: 'Keep track of the number of $5 and $10 bills you have. When giving change for a $20 bill, prefer giving one $10 and one $5 bill before giving three $5 bills.',
        editorial:
            '**Approach: Greedy Simulation**\n\nWe simulate the process of giving change. When a customer pays with $20, we have two options for change: one $10 bill and one $5 bill, or three $5 bills. Since $5 bills are more versatile (they can be used for change for both $10 and $20 bills), we should always greedily prefer to use a $10 bill and a $5 bill first.\n\n**Complexity:**\n- Time Complexity: O(n) to iterate through the bills.\n- Space Complexity: O(1).',
        examples: [
            {
                title: 'Example 1',
                input: '5\n5 5 5 10 20',
                output: 'true',
                explanation:
                    'From the first 3 customers, we collect three $5 bills in order. From the fourth, we collect a $10 bill and give back a $5 bill. From the fifth, we give a $10 bill and a $5 bill. Since everyone got change, output true.',
            },
            {
                title: 'Example 2',
                input: '5\n5 5 10 10 20',
                output: 'false',
                explanation:
                    'From the first two customers, we collect two $5 bills. For the next two, we collect a $10 bill and give back a $5 bill. For the last customer, we cannot give change of $15 back because we only have two $10 bills. Since not everyone received correct change, the answer is false.',
            },
        ],
        testcases: [
            { input: '5\n5 5 5 10 20', output: 'true' },
            { input: '5\n5 5 10 10 20', output: 'false' },
            { input: '1\n5', output: 'true' },
            { input: '1\n10', output: 'false' },
            { input: '3\n5 10 20', output: 'false' },
            { input: '4\n5 5 5 20', output: 'true' },
            { input: '10\n5 5 5 5 10 5 10 10 20 20', output: 'true' },
            { input: '5\n5 5 10 20 20', output: 'false' },
            { input: '8\n5 5 5 5 20 20 5 5', output: 'false' },
            { input: '12\n5 5 5 10 5 5 10 20 20 5 10 20', output: 'true' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        vector<int> bills(n);
        for (int i = 0; i < n; i++) cin >> bills[i];
        
        // Solve and print "true" or "false"
    }
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    bills = [int(x) for x in data[1:]]
    
    # Solve and print "true" or "false"

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] bills = new int[n];
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            for (int i = 0; i < n; i++) bills[i] = Integer.parseInt(st.nextToken());
        }
        
        // Solve and print "true" or "false"
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
    if (!(cin >> n)) return 0;
    vector<int> bills(n);
    for (int i = 0; i < n; i++) cin >> bills[i];
    int five = 0, ten = 0;
    bool possible = true;
    for (int bill : bills) {
        if (bill == 5) {
            five++;
        } else if (bill == 10) {
            if (five == 0) {
                possible = false;
                break;
            }
            five--;
            ten++;
        } else {
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                possible = false;
                break;
            }
        }
    }
    if (possible) cout << "true\\n";
    else cout << "false\\n";
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    bills = [int(x) for x in data[1:]]
    five = 0
    ten = 0
    possible = True
    for bill in bills:
        if bill == 5:
            five += 1
        elif bill == 10:
            if five == 0:
                possible = False
                break
            five -= 1
            ten += 1
        else:
            if ten > 0 and five > 0:
                ten -= 1
                five -= 1
            elif five >= 3:
                five -= 3
            else:
                possible = False
                break
    print("true" if possible else "false")

if __name__ == '__main__':
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
            System.out.println("true");
            return;
        }
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        int[] bills = new int[n];
        for (int i = 0; i < n; i++) {
            bills[i] = Integer.parseInt(st.nextToken());
        }
        int five = 0, ten = 0;
        boolean possible = true;
        for (int bill : bills) {
            if (bill == 5) {
                five++;
            } else if (bill == 10) {
                if (five == 0) {
                    possible = false;
                    break;
                }
                five--;
                ten++;
            } else {
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
                    possible = false;
                    break;
                }
            }
        }
        System.out.println(possible ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let n_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = n_line.trim().parse().unwrap();
    if n == 0 {
        println!("true");
        return;
    }
    let bills_line = lines.next().unwrap().unwrap();
    let bills: Vec<i32> = bills_line.split_whitespace()
                                    .map(|x| x.parse().unwrap())
                                    .collect();
    let mut five = 0;
    let mut ten = 0;
    let mut possible = true;
    for bill in bills {
        if bill == 5 {
            five += 1;
        } else if bill == 10 {
            if five == 0 {
                possible = false;
                break;
            }
            five -= 1;
            ten += 1;
        } else {
            if ten > 0 && five > 0 {
                ten -= 1;
                five -= 1;
            } else if five >= 3 {
                five -= 3;
            } else {
                possible = false;
                break;
            }
        }
    }
    if possible {
        println!("true");
    } else {
        println!("false");
    }
}`,
        },
    },

    // ==================== EASY #3: Minimum Cost to Move Chips ====================
    {
        title: 'Minimum Cost to Move Chips',
        description:
            'We have n chips, where the position of the i-th chip is position[i]. We want to move all the chips to the same position. In one step, we can change the position of the i-th chip from position[i] to:\n- position[i] + 2 or position[i] - 2 with cost 0.\n- position[i] + 1 or position[i] - 1 with cost 1.\n\nReturn the minimum cost needed to move all the chips to the same position.\n\n**Input Format:**\n- First line: integer n (the number of chips)\n- Second line: n space-separated integers representing the positions of the chips\n\n**Output Format:**\n- A single integer: the minimum cost to move all chips to the same position',
        difficulty: 'EASY',
        tags: ['greedy'],
        constraints: '1 <= n <= 10^5\\n1 <= position[i] <= 10^9',
        hints: 'Moving a chip by 2 units costs 0. Moving by 1 unit costs 1. This means all chips at even positions can be moved to the same even position for free, and all odd positions to the same odd position for free.',
        editorial:
            '**Approach: Parity Count**\n\nWe can move all chips at even positions to position 0 with cost 0, and all chips at odd positions to position 1 with cost 0. Then, we either move all chips at 0 to 1 (cost = count of even chips) or all chips at 1 to 0 (cost = count of odd chips). The minimum cost is min(even_chips, odd_chips).\n\n**Complexity:**\n- Time Complexity: O(n) to count parities.\n- Space Complexity: O(1).',
        examples: [
            {
                title: 'Example 1',
                input: '5\n1 2 3 4 5',
                output: '2',
                explanation:
                    'We can move all chips to position 3. Chip at 1 -> 3 (cost 0), chip at 2 -> 3 (cost 1), chip at 4 -> 3 (cost 1), chip at 5 -> 3 (cost 0). Total cost: 2.',
            },
            {
                title: 'Example 2',
                input: '3\n2 2 2',
                output: '0',
                explanation: 'All chips are already at position 2. Total cost: 0.',
            },
        ],
        testcases: [
            { input: '5\n1 2 3 4 5', output: '2' },
            { input: '3\n2 2 2', output: '0' },
            { input: '1\n100', output: '0' },
            { input: '6\n1 3 5 7 9 11', output: '0' },
            { input: '4\n2 4 6 8', output: '0' },
            { input: '7\n1 1 1 1 2 2 2', output: '3' },
            { input: '8\n10 22 30 40 5 15 25 35', output: '4' },
            { input: '2\n1 2', output: '1' },
            { input: '10\n1 2 1 2 1 2 1 2 1 2', output: '5' },
            { input: '12\n1000000000 1 1000000000 1 2 2 2 2 2 2 2 2', output: '2' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        vector<int> position(n);
        for (int i = 0; i < n; i++) cin >> position[i];
        
        // Solve and print minimum cost
    }
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    positions = [int(x) for x in data[1:]]
    
    # Solve and print minimum cost

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] position = new int[n];
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            for (int i = 0; i < n; i++) position[i] = Integer.parseInt(st.nextToken());
        }
        
        // Solve and print minimum cost
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
    if (!(cin >> n)) return 0;
    int odd = 0, even = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x % 2 == 0) even++;
        else odd++;
    }
    cout << min(odd, even) << "\\n";
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    positions = [int(x) for x in data[1:]]
    odd = 0
    even = 0
    for p in positions:
        if p % 2 == 0:
            even += 1
        else:
            odd += 1
    print(min(odd, even))

if __name__ == '__main__':
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
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        int odd = 0, even = 0;
        for (int i = 0; i < n; i++) {
            int x = Integer.parseInt(st.nextToken());
            if (x % 2 == 0) even++;
            else odd++;
        }
        System.out.println(Math.min(odd, even));
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let n_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = n_line.trim().parse().unwrap();
    if n == 0 {
        println!("0");
        return;
    }
    let pos_line = lines.next().unwrap().unwrap();
    let positions: Vec<i32> = pos_line.split_whitespace()
                                       .map(|x| x.parse().unwrap())
                                       .collect();
    let mut odd = 0;
    let mut even = 0;
    for p in positions {
        if p % 2 == 0 {
            even += 1;
        } else {
            odd += 1;
        }
    }
    println!("{}", std::cmp::min(odd, even));
}`,
        },
    },

    // ==================== MEDIUM #1: Jump Game I ====================
    {
        title: 'Jump Game I',
        description:
            'You are given an integer array nums representing the maximum jump length from each position. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position.\n\nReturn true if you can reach the last index, or false otherwise.\n\n**Input Format:**\n- First line: integer n (the size of the array)\n- Second line: n space-separated integers representing the array nums\n\n**Output Format:**\n- Print "true" or "false" (lowercase)',
        difficulty: 'MEDIUM',
        tags: ['greedy'],
        constraints: '1 <= n <= 10^5\\n0 <= nums[i] <= 10^5',
        hints: 'Maintain the maximum index you can reach at any point. If the current index is greater than the maximum reachable index, you cannot proceed.',
        editorial:
            '**Approach: Greedy Maximum Reach**\n\nWe keep track of the maximum index we can reach so far, initialized to 0. As we iterate through the array, if the current index is reachable, we update the maximum reachable index to max(max_reach, i + nums[i]). If at any point the maximum reachable index is at least the last index of the array, we can return true. If we encounter an index we cannot reach, we return false.\n\n**Complexity:**\n- Time Complexity: O(n) in a single pass.\n- Space Complexity: O(1).',
        examples: [
            {
                title: 'Example 1',
                input: '5\n2 3 1 1 4',
                output: 'true',
                explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.',
            },
            {
                title: 'Example 2',
                input: '5\n3 2 1 0 4',
                output: 'false',
                explanation:
                    'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.',
            },
        ],
        testcases: [
            { input: '5\n2 3 1 1 4', output: 'true' },
            { input: '5\n3 2 1 0 4', output: 'false' },
            { input: '1\n0', output: 'true' },
            { input: '2\n0 1', output: 'false' },
            { input: '5\n0 1 2 3 4', output: 'false' },
            { input: '6\n1 2 0 0 1 1', output: 'false' },
            { input: '6\n2 0 2 0 1 0', output: 'true' },
            { input: '10\n1 1 1 1 1 1 1 1 1 1', output: 'true' },
            { input: '10\n5 4 3 2 1 0 0 0 0 0', output: 'false' },
            { input: '12\n1 2 3 5 0 0 0 0 3 0 1 0', output: 'true' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        vector<int> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        
        // Solve and print "true" or "false"
    }
    return 0;
}`,
            python: `def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:]]
    
    # Solve and print "true" or "false"

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
        int[] nums = new int[n];
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(st.nextToken());
        }
        
        // Solve and print "true" or "false"
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
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int max_reach = 0;
    bool ok = true;
    for (int i = 0; i < n; i++) {
        if (i > max_reach) {
            ok = false;
            break;
        }
        max_reach = max(max_reach, i + nums[i]);
        if (max_reach >= n - 1) break;
    }
    if (ok) cout << "true\\n";
    else cout << "false\\n";
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:]]
    max_reach = 0
    ok = True
    for i in range(n):
        if i > max_reach:
            ok = False
            break
        max_reach = max(max_reach, i + nums[i])
        if max_reach >= n - 1:
            break
    print("true" if ok else "false")

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(st.nextToken());
        }
        int maxReach = 0;
        boolean ok = true;
        for (int i = 0; i < n; i++) {
            if (i > maxReach) {
                ok = false;
                break;
            }
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= n - 1) break;
        }
        System.out.println(ok ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let n_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = n_line.trim().parse().unwrap();
    let nums_line = lines.next().unwrap().unwrap();
    let nums: Vec<i32> = nums_line.split_whitespace()
                                  .map(|x| x.parse().unwrap())
                                  .collect();
    let mut max_reach = 0;
    let mut ok = true;
    for i in 0..n {
        if i > max_reach {
            ok = false;
            break;
        }
        max_reach = std::cmp::max(max_reach, i + nums[i] as usize);
        if max_reach >= n - 1 {
            break;
        }
    }
    if ok {
        println!("true");
    } else {
        println!("false");
    }
}`,
        },
    },

    // ==================== MEDIUM #2: Jump Game II ====================
    {
        title: 'Jump Game II',
        description:
            "You are given an integer array nums representing the maximum jump length from each position. You are initially positioned at the array's first index.\n\nYour goal is to reach the last index in the minimum number of jumps. You can assume that you can always reach the last index.\n\n**Input Format:**\n- First line: integer n (the size of the array)\n- Second line: n space-separated integers representing the array nums\n\n**Output Format:**\n- A single integer: the minimum number of jumps to reach the last index",
        difficulty: 'MEDIUM',
        tags: ['greedy'],
        constraints:
            '1 <= n <= 10^4\\n0 <= nums[i] <= 1000\\nIt is guaranteed that you can reach the last index.',
        hints: "This can be solved by finding the maximum reach of the current jump and updating the jump boundary. Only increment jumps when we reach the end of the current jump's range.",
        editorial:
            '**Approach: Greedy Range Expansion**\n\nWe maintain the maximum reach in the next jump (cur_far) and the end of the current jump range (cur_end). We iterate through the array (excluding the last element), updating cur_far. When we reach cur_end, it means we must make another jump. We increment jumps and set cur_end to cur_far.\n\n**Complexity:**\n- Time Complexity: O(n) to traverse the array.\n- Space Complexity: O(1).',
        examples: [
            {
                title: 'Example 1',
                input: '5\n2 3 1 1 4',
                output: '2',
                explanation:
                    'The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.',
            },
            {
                title: 'Example 2',
                input: '5\n2 3 0 1 4',
                output: '2',
                explanation:
                    'Minimum jumps is 2. From index 0, jump to 1. From index 1, jump to 4.',
            },
        ],
        testcases: [
            { input: '5\n2 3 1 1 4', output: '2' },
            { input: '5\n2 3 0 1 4', output: '2' },
            { input: '1\n0', output: '0' },
            { input: '2\n1 1', output: '1' },
            { input: '10\n1 1 1 1 1 1 1 1 1 1', output: '9' },
            { input: '6\n5 1 1 1 1 1', output: '1' },
            { input: '8\n2 3 1 1 4 1 1 1', output: '3' },
            { input: '7\n3 4 3 2 5 1 1', output: '3' },
            { input: '3\n10 10 10', output: '1' },
            { input: '12\n3 1 4 2 1 1 1 5 1 1 1 1', output: '4' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        vector<int> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        
        // Solve and print minimum jumps
    }
    return 0;
}`,
            python: `def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:]]
    
    # Solve and print minimum jumps

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
        int[] nums = new int[n];
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(st.nextToken());
        }
        
        // Solve and print minimum jumps
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
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    if (n <= 1) {
        cout << 0 << "\\n";
        return 0;
    }
    int jumps = 0, cur_end = 0, cur_far = 0;
    for (int i = 0; i < n - 1; i++) {
        cur_far = max(cur_far, i + nums[i]);
        if (i == cur_end) {
            jumps++;
            cur_end = cur_far;
            if (cur_end >= n - 1) break;
        }
    }
    cout << jumps << "\\n";
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:]]
    if n <= 1:
        print(0)
        return
    jumps = 0
    cur_end = 0
    cur_far = 0
    for i in range(n - 1):
        cur_far = max(cur_far, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = cur_far
            if cur_end >= n - 1:
                break
    print(jumps)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        if (n <= 1) {
            System.out.println(0);
            return;
        }
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(st.nextToken());
        }
        int jumps = 0, curEnd = 0, curFar = 0;
        for (int i = 0; i < n - 1; i++) {
            curFar = Math.max(curFar, i + nums[i]);
            if (i == curEnd) {
                jumps++;
                curEnd = curFar;
                if (curEnd >= n - 1) break;
            }
        }
        System.out.println(jumps);
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let n_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = n_line.trim().parse().unwrap();
    if n <= 1 {
        println!("0");
        return;
    }
    let nums_line = lines.next().unwrap().unwrap();
    let nums: Vec<i32> = nums_line.split_whitespace()
                                  .map(|x| x.parse().unwrap())
                                  .collect();
    let mut jumps = 0;
    let mut cur_end = 0;
    let mut cur_far = 0;
    for i in 0..(n - 1) {
        cur_far = std::cmp::max(cur_far, i + nums[i] as usize);
        if i == cur_end {
            jumps += 1;
            cur_end = cur_far;
            if cur_end >= n - 1 {
                break;
            }
        }
    }
    println!("{}", jumps);
}`,
        },
    },

    // ==================== MEDIUM #3: Gas Station ====================
    {
        title: 'Gas Station',
        description:
            "There are n gas stations along a circular route, where the amount of gas at the i-th station is gas[i].\n\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the i-th station to its next (i + 1)-th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.\n\n**Input Format:**\n- First line: integer n (the number of gas stations)\n- Second line: n space-separated integers representing the gas array\n- Third line: n space-separated integers representing the cost array\n\n**Output Format:**\n- A single integer: the starting gas station's index (0-indexed), or -1",
        difficulty: 'MEDIUM',
        tags: ['greedy'],
        constraints:
            'n == gas.length == cost.length\\n1 <= n <= 10^5\\n0 <= gas[i], cost[i] <= 10^4',
        hints: "If the total gas is less than the total cost, it's impossible to complete the circuit. Otherwise, if you start at a station and run out of gas at station i, you can start the search from station i + 1.",
        editorial:
            '**Approach: Greedy One-pass**\n\nFirst, check if the sum of gas is at least the sum of cost. If not, return -1. Otherwise, a solution is guaranteed to exist. We start at index 0 and simulate the trip. If the gas tank becomes negative at station i, it means any station from our start to i cannot be the starting point. We reset the starting point to i + 1 and reset our tank to 0.\n\n**Complexity:**\n- Time Complexity: O(n) in one pass.\n- Space Complexity: O(1).',
        examples: [
            {
                title: 'Example 1',
                input: '5\n1 2 3 4 5\n3 4 5 1 2',
                output: '3',
                explanation:
                    'Start at station 3 (index 3) and fill up with 4 units of gas. Tank = 4. Drive to station 4. Tank = 4 - 1 + 5 = 8. Drive to station 0. Tank = 8 - 2 + 1 = 7. Drive to station 1. Tank = 7 - 3 + 2 = 6. Drive to station 2. Tank = 6 - 4 + 3 = 5. Drive to station 3. Cost is 5. We have exactly 5, so we can return to 3. Index 3 is valid.',
            },
            {
                title: 'Example 2',
                input: '3\n2 3 4\n3 4 3',
                output: '-1',
                explanation:
                    'Total gas is 9, total cost is 10. Since we need 10 gas but only have 9, it is impossible to complete the circuit. Return -1.',
            },
        ],
        testcases: [
            { input: '5\n1 2 3 4 5\n3 4 5 1 2', output: '3' },
            { input: '3\n2 3 4\n3 4 3', output: '-1' },
            { input: '1\n5\n4', output: '0' },
            { input: '1\n4\n5', output: '-1' },
            { input: '2\n2 3\n3 2', output: '1' },
            { input: '2\n3 2\n3 2', output: '0' },
            { input: '4\n1 1 3 1\n2 2 1 1', output: '2' },
            { input: '4\n5 1 2 8\n6 2 4 3', output: '3' },
            { input: '5\n4 5 2 6 3\n3 2 7 3 6', output: '-1' },
            { input: '8\n1 2 3 4 5 6 7 8\n8 7 6 5 4 3 2 1', output: '4' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        vector<int> gas(n);
        for (int i = 0; i < n; i++) cin >> gas[i];
        vector<int> cost(n);
        for (int i = 0; i < n; i++) cin >> cost[i];
        
        // Solve and print starting index
    }
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    gas = [int(x) for x in data[1:n+1]]
    cost = [int(x) for x in data[n+1:2*n+1]]
    
    # Solve and print starting index

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] gas = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        for (int i = 0; i < n; i++) gas[i] = Integer.parseInt(st.nextToken());
        int[] cost = new int[n];
        st = new StringTokenizer(br.readLine().trim());
        for (int i = 0; i < n; i++) cost[i] = Integer.parseInt(st.nextToken());
        
        // Solve and print starting index
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
    if (!(cin >> n)) return 0;
    vector<int> gas(n), cost(n);
    long long total_gas = 0, total_cost = 0;
    for (int i = 0; i < n; i++) {
        cin >> gas[i];
        total_gas += gas[i];
    }
    for (int i = 0; i < n; i++) {
        cin >> cost[i];
        total_cost += cost[i];
    }
    if (total_gas < total_cost) {
        cout << -1 << "\\n";
        return 0;
    }
    int start = 0;
    long long tank = 0;
    for (int i = 0; i < n; i++) {
        tank += (gas[i] - cost[i]);
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    cout << start << "\\n";
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    gas = [int(x) for x in data[1:n+1]]
    cost = [int(x) for x in data[n+1:2*n+1]]
    
    if sum(gas) < sum(cost):
        print(-1)
        return
    
    start = 0
    tank = 0
    for i in range(n):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1
            tank = 0
    print(start)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] gas = new int[n];
        long totalGas = 0;
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        for (int i = 0; i < n; i++) {
            gas[i] = Integer.parseInt(st.nextToken());
            totalGas += gas[i];
        }
        int[] cost = new int[n];
        long totalCost = 0;
        st = new StringTokenizer(br.readLine().trim());
        for (int i = 0; i < n; i++) {
            cost[i] = Integer.parseInt(st.nextToken());
            totalCost += cost[i];
        }
        if (totalGas < totalCost) {
            System.out.println(-1);
            return;
        }
        int start = 0;
        long tank = 0;
        for (int i = 0; i < n; i++) {
            tank += (gas[i] - cost[i]);
            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }
        System.out.println(start);
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let n_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = n_line.trim().parse().unwrap();
    
    let gas_line = lines.next().unwrap().unwrap();
    let gas: Vec<i32> = gas_line.split_whitespace()
                                .map(|x| x.parse().unwrap())
                                .collect();
                                
    let cost_line = lines.next().unwrap().unwrap();
    let cost: Vec<i32> = cost_line.split_whitespace()
                                  .map(|x| x.parse().unwrap())
                                  .collect();
                                  
    let total_gas: i64 = gas.iter().map(|&x| x as i64).sum();
    let total_cost: i64 = cost.iter().map(|&x| x as i64).sum();
    
    if total_gas < total_cost {
        println!("-1");
        return;
    }
    
    let mut start = 0;
    let mut tank = 0i64;
    for i in 0..n {
        tank += (gas[i] - cost[i]) as i64;
        if tank < 0 {
            start = i + 1;
            tank = 0;
        }
    }
    println!("{}", start);
}`,
        },
    },

    // ==================== MEDIUM #4: Task Scheduler ====================
    {
        title: 'Task Scheduler',
        description:
            "You are given an array of CPU tasks, each represented by a letter from A to Z, and a cooling interval n. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical tasks must be separated by at least n intervals due to cooling. This means there must be a local quarantine of at least n units of time between any two identical tasks.\n\nReturn the minimum number of intervals required to complete all the given tasks.\n\n**Input Format:**\n- First line: space-separated integers k (number of tasks) and n (cooling interval)\n- Second line: k space-separated uppercase characters representing the tasks\n\n**Output Format:**\n- A single integer: the minimum number of intervals needed",
        difficulty: 'MEDIUM',
        tags: ['greedy', 'sorting-greedy'],
        constraints: '1 <= k <= 10^4\\n0 <= n <= 100\\ntasks[i] is an uppercase English letter',
        hints: 'Identify the task with the highest frequency. This task will determine the minimum number of slots needed, as it requires n cooling intervals between its occurrences.',
        editorial:
            "**Approach: Frequency-based Greedy**\n\nFind the maximum frequency of any task, let it be max_f. The number of tasks with this maximum frequency is num_max_f. The formula (max_f - 1) * (n + 1) + num_max_f gives the minimum slots needed if idles are required. If the total number of tasks is greater than this value, we don't need any idle time, so the answer is the total tasks.\n\n**Complexity:**\n- Time Complexity: O(k) to count frequencies.\n- Space Complexity: O(1) since we only use a size-26 frequency table.",
        examples: [
            {
                title: 'Example 1',
                input: '6 2\nA A A B B B',
                output: '8',
                explanation:
                    'A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B. Total intervals = 8.',
            },
            {
                title: 'Example 2',
                input: '6 0\nA A A B B B',
                output: '6',
                explanation:
                    'With a cooling interval of 0, any task can be performed in any cycle. Possible sequence is A -> A -> A -> B -> B -> B. Total intervals = 6.',
            },
        ],
        testcases: [
            { input: '6 2\nA A A B B B', output: '8' },
            { input: '6 0\nA A A B B B', output: '6' },
            { input: '6 3\nA A A B B B', output: '10' },
            { input: '12 2\nA A A A A A B C D E F G', output: '16' },
            { input: '1 5\nA', output: '1' },
            { input: '10 2\nA B C D E F G H I J', output: '10' },
            { input: '10 3\nA A A B B B C C D D', output: '10' },
            { input: '7 2\nA A A B B C D', output: '7' },
            { input: '8 2\nA A A B B B C C', output: '8' },
            { input: '15 3\nA A A A B B B B C C C C D D D', output: '15' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int k, n;
    if (cin >> k >> n) {
        vector<char> tasks(k);
        for (int i = 0; i < k; i++) cin >> tasks[i];
        
        // Solve and print minimum intervals
    }
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    k = int(data[0])
    n = int(data[1])
    tasks = data[2:]
    
    # Solve and print minimum intervals

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st = new StringTokenizer(line1.trim());
        int k = Integer.parseInt(st.nextToken());
        int n = Integer.parseInt(st.nextToken());
        char[] tasks = new char[k];
        st = new StringTokenizer(br.readLine().trim());
        for (int i = 0; i < k; i++) {
            tasks[i] = st.nextToken().charAt(0);
        }
        
        // Solve and print minimum intervals
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
    int k, n;
    if (!(cin >> k >> n)) return 0;
    vector<int> freq(26, 0);
    for (int i = 0; i < k; i++) {
        char ch;
        cin >> ch;
        freq[ch - 'A']++;
    }
    int max_f = 0;
    for (int i = 0; i < 26; i++) {
        max_f = max(max_f, freq[i]);
    }
    int num_max_f = 0;
    for (int i = 0; i < 26; i++) {
        if (freq[i] == max_f) {
            num_max_f++;
        }
    }
    int ans = (max_f - 1) * (n + 1) + num_max_f;
    cout << max(ans, k) << "\\n";
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    k = int(data[0])
    n = int(data[1])
    tasks = data[2:]
    
    freq = {}
    for t in tasks:
        freq[t] = freq.get(t, 0) + 1
    
    max_f = max(freq.values())
    num_max_f = sum(1 for v in freq.values() if v == max_f)
    
    ans = (max_f - 1) * (n + 1) + num_max_f
    print(max(ans, k))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st = new StringTokenizer(line1.trim());
        int k = Integer.parseInt(st.nextToken());
        int n = Integer.parseInt(st.nextToken());
        
        int[] freq = new int[26];
        st = new StringTokenizer(br.readLine().trim());
        for (int i = 0; i < k; i++) {
            char ch = st.nextToken().charAt(0);
            freq[ch - 'A']++;
        }
        int maxF = 0;
        for (int i = 0; i < 26; i++) {
            maxF = Math.max(maxF, freq[i]);
        }
        int numMaxF = 0;
        for (int i = 0; i < 26; i++) {
            if (freq[i] == maxF) {
                numMaxF++;
            }
        }
        int ans = (maxF - 1) * (n + 1) + numMaxF;
        System.out.println(Math.max(ans, k));
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let line1 = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let parts: Vec<i32> = line1.split_whitespace()
                               .map(|x| x.parse().unwrap())
                               .collect();
    let k = parts[0] as usize;
    let n = parts[1];
    
    let line2 = lines.next().unwrap().unwrap();
    let tasks: Vec<char> = line2.split_whitespace()
                                .map(|x| x.chars().next().unwrap())
                                .collect();
                                
    let mut freq = [0; 26];
    for &ch in &tasks {
        freq[(ch as usize) - ('A' as usize)] += 1;
    }
    
    let mut max_f = 0;
    for &f in &freq {
        if f > max_f {
            max_f = f;
        }
    }
    
    let mut num_max_f = 0;
    for &f in &freq {
        if f == max_f {
            num_max_f += 1;
        }
    }
    
    let ans = (max_f - 1) * (n + 1) + num_max_f;
    println!("{}", std::cmp::max(ans, k as i32));
}`,
        },
    },

    // ==================== HARD #1: Candy Distribution ====================
    {
        title: 'Candy Distribution',
        description:
            'There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.\n\nYou are giving candies to these children subjected to the following requirements:\n- Each child must have at least one candy.\n- Children with a higher rating get more candies than their neighbors.\n\nReturn the minimum number of candies you need to distribute.\n\n**Input Format:**\n- First line: integer n (the number of children)\n- Second line: n space-separated integers representing the ratings of the children\n\n**Output Format:**\n- A single integer: the minimum number of candies',
        difficulty: 'HARD',
        tags: ['greedy'],
        constraints: '1 <= n <= 2 * 10^4\\n0 <= ratings[i] <= 2 * 10^4',
        hints: "Try processing the ratings in two passes: one from left to right, and another from right to left. A child's candy count must satisfy constraints relative to both neighbors.",
        editorial:
            '**Approach: Two passes (Left & Right)**\n\nInitialize candies array with 1s. In the left-to-right pass, if rating[i] > rating[i-1], update candies[i] = candies[i-1] + 1. In the right-to-left pass, if rating[i] > rating[i+1], update candies[i] = max(candies[i], candies[i+1] + 1). Sum up the candies array for the final answer.\n\n**Complexity:**\n- Time Complexity: O(n) for two passes.\n- Space Complexity: O(n) for the candies array.',
        examples: [
            {
                title: 'Example 1',
                input: '3\n1 0 2',
                output: '5',
                explanation:
                    'You can allocate to the first, second and third child with 2, 1, 2 candies respectively.',
            },
            {
                title: 'Example 2',
                input: '3\n1 2 2',
                output: '4',
                explanation:
                    'You can allocate to the first, second and third child with 1, 2, 1 candies respectively. The third child gets 1 candy because it satisfies the above conditions.',
            },
        ],
        testcases: [
            { input: '3\n1 0 2', output: '5' },
            { input: '3\n1 2 2', output: '4' },
            { input: '1\n100', output: '1' },
            { input: '5\n1 2 3 4 5', output: '15' },
            { input: '5\n5 4 3 2 1', output: '15' },
            { input: '6\n1 3 2 1 2 3', output: '12' },
            { input: '10\n1 6 10 8 7 3 2 5 7 10', output: '27' },
            { input: '8\n2 2 2 2 2 2 2 2', output: '8' },
            { input: '4\n1 3 4 5', output: '10' },
            { input: '12\n10 10 10 9 8 7 6 5 10 10 10 10', output: '28' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        vector<int> ratings(n);
        for (int i = 0; i < n; i++) cin >> ratings[i];
        
        // Solve and print minimum candies
    }
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    ratings = [int(x) for x in data[1:]]
    
    # Solve and print minimum candies

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] ratings = new int[n];
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            for (int i = 0; i < n; i++) ratings[i] = Integer.parseInt(st.nextToken());
        }
        
        // Solve and print minimum candies
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
    if (!(cin >> n)) return 0;
    vector<int> ratings(n);
    for (int i = 0; i < n; i++) cin >> ratings[i];
    if (n <= 1) {
        cout << n << "\\n";
        return 0;
    }
    vector<int> candies(n, 1);
    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = max(candies[i], candies[i + 1] + 1);
        }
    }
    long long total = 0;
    for (int c : candies) total += c;
    cout << total << "\\n";
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    ratings = [int(x) for x in data[1:]]
    if n <= 1:
        print(n)
        return
    candies = [1] * n
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)
    print(sum(candies))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        if (n <= 1) {
            System.out.println(n);
            return;
        }
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        int[] ratings = new int[n];
        for (int i = 0; i < n; i++) {
            ratings[i] = Integer.parseInt(st.nextToken());
        }
        int[] candies = new int[n];
        Arrays.fill(candies, 1);
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }
        long total = 0;
        for (int c : candies) total += c;
        System.out.println(total);
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let n_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = n_line.trim().parse().unwrap();
    if n <= 1 {
        println!("{}", n);
        return;
    }
    let ratings_line = lines.next().unwrap().unwrap();
    let ratings: Vec<i32> = ratings_line.split_whitespace()
                                        .map(|x| x.parse().unwrap())
                                        .collect();
    let mut candies = vec![1; n];
    for i in 1..n {
        if ratings[i] > ratings[i - 1] {
            candies[i] = candies[i - 1] + 1;
        }
    }
    for i in (0..n-1).rev() {
        if ratings[i] > ratings[i + 1] {
            candies[i] = std::cmp::max(candies[i], candies[i + 1] + 1);
        }
    }
    let total: i64 = candies.iter().map(|&x| x as i64).sum();
    println!("{}", total);
}`,
        },
    },

    // ==================== HARD #2: Merge Intervals ====================
    {
        title: 'Merge Intervals',
        description:
            'Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\nTo make the output unique, print the merged intervals sorted by their start time.\n\n**Input Format:**\n- First line: integer n (the number of intervals)\n- Next n lines: each line contains two space-separated integers representing the start and end of the interval\n\n**Output Format:**\n- Each merged interval on a new line, containing two space-separated integers (start and end)',
        difficulty: 'HARD',
        tags: ['greedy', 'sorting-greedy', 'interval-scheduling'],
        constraints: '1 <= n <= 10^4\\n0 <= start_i <= end_i <= 10^4',
        hints: 'Sort the intervals by their start time. Iterate through the sorted intervals and merge overlapping ones.',
        editorial:
            '**Approach: Sort and Merge**\n\nBy sorting intervals by start times, overlapping intervals will be adjacent. We can build the merged list incrementally. For each interval, if it overlaps with the last merged interval, we merge them by updating the end of the last merged interval. Otherwise, we add it as a new interval.\n\n**Complexity:**\n- Time Complexity: O(n log n) due to sorting.\n- Space Complexity: O(n) to store the result.',
        examples: [
            {
                title: 'Example 1',
                input: '4\n1 3\n2 6\n8 10\n15 18',
                output: '1 6\n8 10\n15 18',
                explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].',
            },
            {
                title: 'Example 2',
                input: '2\n1 4\n4 5',
                output: '1 5',
                explanation:
                    'Intervals [1,4] and [4,5] are considered overlapping because they touch at 4.',
            },
        ],
        testcases: [
            { input: '4\n1 3\n2 6\n8 10\n15 18', output: '1 6\n8 10\n15 18' },
            { input: '2\n1 4\n4 5', output: '1 5' },
            { input: '1\n5 10', output: '5 10' },
            { input: '3\n1 10\n2 3\n4 5', output: '1 10' },
            { input: '5\n1 3\n4 6\n7 9\n10 12\n13 15', output: '1 3\n4 6\n7 9\n10 12\n13 15' },
            { input: '6\n2 3\n1 5\n8 12\n9 10\n11 14\n15 16', output: '1 5\n8 14\n15 16' },
            { input: '4\n1 4\n0 4\n3 5\n2 7', output: '0 7' },
            { input: '2\n1 4\n2 3', output: '1 4' },
            { input: '3\n1 4\n5 6\n3 5', output: '1 6' },
            {
                input: '8\n10 12\n1 2\n5 8\n2 3\n8 9\n15 20\n11 13\n0 1',
                output: '0 3\n5 9\n10 13\n15 20',
            },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        vector<pair<int, int>> intervals(n);
        for (int i = 0; i < n; i++) {
            cin >> intervals[i].first >> intervals[i].second;
        }
        
        // Solve and print merged intervals
    }
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    intervals = []
    idx = 1
    for _ in range(n):
        intervals.append((int(data[idx]), int(data[idx+1])))
        idx += 2
        
    # Solve and print merged intervals

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[][] intervals = new int[n][2];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            intervals[i][0] = Integer.parseInt(st.nextToken());
            intervals[i][1] = Integer.parseInt(st.nextToken());
        }
        
        // Solve and print merged intervals
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
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> intervals(n);
    for (int i = 0; i < n; i++) {
        cin >> intervals[i].first >> intervals[i].second;
    }
    if (n == 0) return 0;
    sort(intervals.begin(), intervals.end());
    vector<pair<int, int>> merged;
    merged.push_back(intervals[0]);
    for (int i = 1; i < n; i++) {
        if (intervals[i].first <= merged.back().second) {
            merged.back().second = max(merged.back().second, intervals[i].second);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    for (const auto& p : merged) {
        cout << p.first << " " << p.second << "\\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    intervals = []
    idx = 1
    for _ in range(n):
        intervals.append((int(data[idx]), int(data[idx+1])))
        idx += 2
        
    if not intervals:
        return
    
    intervals.sort()
    merged = [intervals[0]]
    for i in range(1, n):
        if intervals[i][0] <= merged[-1][1]:
            merged[-1] = (merged[-1][0], max(merged[-1][1], intervals[i][1]))
        else:
            merged.append(intervals[i])
            
    for start, end in merged:
        print(f"{start} {end}")

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Interval implements Comparable<Interval> {
        int start, end;
        Interval(int start, int end) {
            this.start = start;
            this.end = end;
        }
        public int compareTo(Interval other) {
            if (this.start != other.start) {
                return Integer.compare(this.start, other.start);
            }
            return Integer.compare(this.end, other.end);
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        if (n == 0) return;
        List<Interval> intervals = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine().trim());
            int s = Integer.parseInt(st.nextToken());
            int e = Integer.parseInt(st.nextToken());
            intervals.add(new Interval(s, e));
        }
        Collections.sort(intervals);
        List<Interval> merged = new ArrayList<>();
        merged.add(intervals.get(0));
        for (int i = 1; i < n; i++) {
            Interval curr = intervals.get(i);
            Interval last = merged.get(merged.size() - 1);
            if (curr.start <= last.end) {
                last.end = Math.max(last.end, curr.end);
            } else {
                merged.add(curr);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (Interval interval : merged) {
            sb.append(interval.start).append(" ").append(interval.end).append("\\n");
        }
        System.out.print(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let n_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = n_line.trim().parse().unwrap();
    if n == 0 {
        return;
    }
    let mut intervals = Vec::with_capacity(n);
    for _ in 0..n {
        let line = lines.next().unwrap().unwrap();
        let mut parts = line.split_whitespace();
        let start: i32 = parts.next().unwrap().parse().unwrap();
        let end: i32 = parts.next().unwrap().parse().unwrap();
        intervals.push((start, end));
    }
    
    intervals.sort_unstable_by_key(|k| (k.0, k.1));
    
    let mut merged: Vec<(i32, i32)> = Vec::new();
    merged.push(intervals[0]);
    for i in 1..n {
        let current = intervals[i];
        let last_idx = merged.len() - 1;
        if current.0 <= merged[last_idx].1 {
            merged[last_idx].1 = std::cmp::max(merged[last_idx].1, current.1);
        } else {
            merged.push(current);
        }
    }
    
    for interval in merged {
        println!("{} {}", interval.0, interval.1);
    }
}`,
        },
    },

    // ==================== HARD #3: Minimum Number of Refueling Stops ====================
    {
        title: 'Minimum Number of Refueling Stops',
        description:
            'A car travels from a starting position to a destination which is target miles east of the starting position.\n\nThere are gas stations along the way. The gas stations are represented as an array stations where stations[i] = [position_i, fuel_i] indicates that the i-th gas station is position_i miles east of the starting position, and has fuel_i liters of gas.\n\nThe car starts with an infinite tank of gas, which initially has startFuel liters of fuel in it. It uses one liter of gas per one mile that it drives. When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.\n\nReturn the minimum number of refueling stops the car must make in order to reach its destination. If it cannot reach the destination, return -1.\n\nNote that if the car reaches a gas station with 0 fuel left, the car can still stop there and refuel. If the car reaches the destination with 0 fuel left, it is still considered to have arrived.\n\n**Input Format:**\n- First line: two space-separated integers, target and startFuel\n- Second line: integer n (the number of stations)\n- Next n lines: each line contains two space-separated integers representing the position and fuel of a station\n\n**Output Format:**\n- A single integer: the minimum number of refueling stops, or -1',
        difficulty: 'HARD',
        tags: ['greedy'],
        constraints:
            '1 <= target, startFuel <= 10^9\\n0 <= n <= 500\\n0 < position_i < position_i+1 < target\\n1 <= fuel_i <= 10^9',
        hints: 'When you run out of fuel, you should greedily refuel at the gas station with the largest fuel that you have already passed. Use a max-heap to store the fuel capacity of passed stations.',
        editorial:
            "**Approach: Greedy with Max-Heap**\n\nAs we drive, we keep track of the maximum distance we can reach. Whenever we can't reach the next station (or target), we look at all the gas stations we have passed, and greedily choose the one with the largest fuel. We can use a max-heap to efficiently get the largest fuel. We repeat this until we can reach the next station/target.\n\n**Complexity:**\n- Time Complexity: O(n) or O(n log n) because each station is pushed and popped from the heap at most once.\n- Space Complexity: O(n) for the heap.",
        examples: [
            {
                title: 'Example 1',
                input: '1 1\n0',
                output: '0',
                explanation: 'We can reach the target without refueling at all.',
            },
            {
                title: 'Example 2',
                input: '100 1\n1\n10 100',
                output: '-1',
                explanation:
                    "We can't reach the station at position 10 because we only have 1 liter of fuel.",
            },
        ],
        testcases: [
            { input: '1 1\n0', output: '0' },
            { input: '100 1\n1\n10 100', output: '-1' },
            { input: '100 10\n4\n10 60\n20 30\n30 30\n60 40', output: '2' },
            { input: '100 50\n3\n25 25\n50 25\n75 25', output: '2' },
            { input: '100 25\n3\n25 25\n50 25\n75 25', output: '3' },
            { input: '100 10\n4\n10 10\n20 10\n30 10\n40 10', output: '-1' },
            { input: '1000 80\n4\n100 100\n200 200\n300 300\n400 400', output: '-1' },
            { input: '1000 100\n4\n100 100\n200 200\n300 300\n400 400', output: '4' },
            { input: '1000 100\n5\n100 100\n200 200\n300 300\n400 100\n800 100', output: '-1' },
            { input: '500 100\n4\n100 100\n200 100\n300 100\n400 100', output: '4' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long target, start_fuel;
    if (cin >> target >> start_fuel) {
        int n;
        cin >> n;
        vector<pair<long long, long long>> stations(n);
        for (int i = 0; i < n; i++) {
            cin >> stations[i].first >> stations[i].second;
        }
        
        // Solve and print minimum refueling stops
    }
    return 0;
}`,
            python: `import sys

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    target = int(data[0])
    start_fuel = int(data[1])
    n = int(data[2])
    stations = []
    idx = 3
    for _ in range(n):
        stations.append((int(data[idx]), int(data[idx+1])))
        idx += 2
        
    # Solve and print minimum stops

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st = new StringTokenizer(line1.trim());
        long target = Long.parseLong(st.nextToken());
        long startFuel = Long.parseLong(st.nextToken());
        int n = Integer.parseInt(br.readLine().trim());
        long[][] stations = new long[n][2];
        for (int i = 0; i < n; i++) {
            st = new StringTokenizer(br.readLine().trim());
            stations[i][0] = Long.parseLong(st.nextToken());
            stations[i][1] = Long.parseLong(st.nextToken());
        }
        
        // Solve and print minimum stops
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
    long long target, start_fuel;
    if (!(cin >> target >> start_fuel)) return 0;
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<long long, long long>> stations(n);
    for (int i = 0; i < n; i++) {
        cin >> stations[i].first >> stations[i].second;
    }
    
    priority_queue<long long> pq;
    long long curr_max_reach = start_fuel;
    int stops = 0;
    int idx = 0;
    
    while (curr_max_reach < target) {
        while (idx < n && stations[idx].first <= curr_max_reach) {
            pq.push(stations[idx].second);
            idx++;
        }
        if (pq.empty()) {
            stops = -1;
            break;
        }
        curr_max_reach += pq.top();
        pq.pop();
        stops++;
    }
    cout << stops << "\\n";
    return 0;
}`,
            python: `import sys
import heapq

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    target = int(data[0])
    start_fuel = int(data[1])
    n = int(data[2])
    stations = []
    idx = 3
    for _ in range(n):
        stations.append((int(data[idx]), int(data[idx+1])))
        idx += 2
        
    pq = []
    curr_max_reach = start_fuel
    stops = 0
    i = 0
    
    while curr_max_reach < target:
        while i < n and stations[i][0] <= curr_max_reach:
            heapq.heappush(pq, -stations[i][1])
            i += 1
        if not pq:
            stops = -1
            break
        curr_max_reach += -heapq.heappop(pq)
        stops += 1
        
    print(stops)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st = new StringTokenizer(line1.trim());
        long target = Long.parseLong(st.nextToken());
        long startFuel = Long.parseLong(st.nextToken());
        
        int n = Integer.parseInt(br.readLine().trim());
        long[][] stations = new long[n][2];
        for (int i = 0; i < n; i++) {
            st = new StringTokenizer(br.readLine().trim());
            stations[i][0] = Long.parseLong(st.nextToken());
            stations[i][1] = Long.parseLong(st.nextToken());
        }
        
        PriorityQueue<Long> pq = new PriorityQueue<>(Collections.reverseOrder());
        long currMaxReach = startFuel;
        int stops = 0;
        int idx = 0;
        
        while (currMaxReach < target) {
            while (idx < n && stations[idx][0] <= currMaxReach) {
                pq.add(stations[idx][1]);
                idx++;
            }
            if (pq.isEmpty()) {
                stops = -1;
                break;
            }
            currMaxReach += pq.poll();
            stops++;
        }
        System.out.println(stops);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let line1 = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let parts: Vec<i64> = line1.split_whitespace()
                               .map(|x| x.parse().unwrap())
                               .collect();
    let target = parts[0];
    let start_fuel = parts[1];
    
    let n_line = lines.next().unwrap().unwrap();
    let n: usize = n_line.trim().parse().unwrap();
    
    let mut stations = Vec::with_capacity(n);
    for _ in 0..n {
        let line = lines.next().unwrap().unwrap();
        let mut pts = line.split_whitespace();
        let pos: i64 = pts.next().unwrap().parse().unwrap();
        let fuel: i64 = pts.next().unwrap().parse().unwrap();
        stations.push((pos, fuel));
    }
    
    let mut pq = BinaryHeap::new();
    let mut curr_max_reach = start_fuel;
    let mut stops = 0;
    let mut idx = 0;
    
    while curr_max_reach < target {
        while idx < n && stations[idx].0 <= curr_max_reach {
            pq.push(stations[idx].1);
            idx += 1;
        }
        if pq.is_empty() {
            stops = -1;
            break;
        }
        if let Some(fuel) = pq.pop() {
            curr_max_reach += fuel;
            stops += 1;
        }
    }
    println!("{}", stops);
}`,
        },
    },
]
