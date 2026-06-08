import type { SeedProblem } from './types.js'

export const hashmapsSetsProblems: SeedProblem[] = [
    // ==================== EASY #1: Two Sum with HashMap ====================
    {
        title: 'Two Sum with HashMap',
        description:
            'Given an array of integers `nums` and an integer `target`, find the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice.\n\nPrint the two indices in ascending order, separated by a space.\n\n**Input Format:**\n- First line: integer `n` (the size of the array)\n- Second line: `n` space-separated integers\n- Third line: integer `target`\n\n**Output Format:**\n- Two space-separated indices in ascending order.',
        difficulty: 'EASY',
        tags: ['hash-map', 'counting'],
        constraints:
            '2 <= n <= 10^5\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nExactly one solution exists.',
        hints: "Instead of checking all pairs, store each number's index in a hash map as you iterate. For the current number, check if target - num already exists in the map.",
        editorial:
            '**Approach: Single-pass Hash Map**\n\nWe iterate through the array once. At each step, we calculate the complement `complement = target - nums[i]`. If the complement exists in our hash map, it means we have found the two numbers. We print their indices. Otherwise, we add the current number and its index to the hash map.\n\n**Time Complexity:** O(n) time to traverse the array of size n.\n**Space Complexity:** O(n) space to store elements in the hash map.',
        examples: [
            {
                title: 'Example 1',
                input: '4\n2 7 11 15\n9',
                output: '0 1',
                explanation: "nums[0] + nums[1] == 2 + 7 == 9. Thus we print '0 1'.",
            },
            {
                title: 'Example 2',
                input: '3\n3 2 4\n6',
                output: '1 2',
                explanation: "nums[1] + nums[2] == 2 + 4 == 6. Thus we print '1 2'.",
            },
        ],
        testcases: [
            { input: '4\n2 7 11 15\n9', output: '0 1' },
            { input: '3\n3 2 4\n6', output: '1 2' },
            { input: '2\n3 3\n6', output: '0 1' },
            { input: '5\n-1 -2 -3 -4 -5\n-8', output: '2 4' },
            { input: '6\n10 20 30 40 50 60\n100', output: '3 5' },
            { input: '7\n1 5 8 9 12 15 20\n21', output: '0 6' },
            { input: '4\n0 4 3 0\n0', output: '0 3' },
            { input: '2\n-1000000000 1000000000\n0', output: '0 1' },
            { input: '6\n5 25 75 100 2 3\n103', output: '3 5' },
            { input: '10\n4 8 15 16 23 42 1 2 3 5\n47', output: '5 9' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n, nums, and target
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == '__main__':
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
    if (!(cin >> n)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    long long target;
    cin >> target;
    unordered_map<long long, int> m;
    for (int i = 0; i < n; i++) {
        long long complement = target - nums[i];
        if (m.count(complement)) {
            cout << m[complement] << " " << i << "\n";
            return 0;
        }
        m[nums[i]] = i;
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
    target = int(input_data[n+1])
    m = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in m:
            print(f"{m[complement]} {i}")
            return
        m[num] = i

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
        StringTokenizer st = new StringTokenizer(br.readLine());
        long[] nums = new long[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Long.parseLong(st.nextToken());
        }
        long target = Long.parseLong(br.readLine().trim());
        Map<Long, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            long complement = target - nums[i];
            if (map.containsKey(complement)) {
                System.out.println(map.get(complement) + " " + i);
                return;
            }
            map.put(nums[i], i);
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashMap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_str)) = lines.next() {
        let n: usize = n_str.trim().parse().unwrap();
        if let Some(Ok(nums_str)) = lines.next() {
            let nums: Vec<i64> = nums_str.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            if let Some(Ok(target_str)) = lines.next() {
                let target: i64 = target_str.trim().parse().unwrap();
                let mut map = HashMap::new();
                for i in 0..n {
                    let complement = target - nums[i];
                    if let Some(&prev_idx) = map.get(&complement) {
                        println!("{} {}", prev_idx, i);
                        return;
                    }
                    map.insert(nums[i], i);
                }
            }
        }
    }
}`,
        },
    },

    // ==================== EASY #2: Isomorphic Strings ====================
    {
        title: 'Isomorphic Strings',
        description:
            'Given two strings `s` and `t`, determine if they are isomorphic.\n\nTwo strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.\n\nAll occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.\n\n**Input Format:**\n- First line: string `s`\n- Second line: string `t`\n\n**Output Format:**\n- Print "true" if the strings are isomorphic, and "false" otherwise.',
        difficulty: 'EASY',
        tags: ['hash-map', 'frequency'],
        constraints:
            '1 <= |s| <= 10^5\n|s| == |t|\ns and t consist of printable non-whitespace ASCII characters.',
        hints: 'Map each character of s to t, and t to s. If you ever find a mismatch in the mappings, then the strings are not isomorphic.',
        editorial:
            '**Approach: Double Character Mapping**\n\nWe can track character maps using two arrays or hash maps: `mapS` maps characters in `s` to characters in `t`, and `mapT` maps characters in `t` to characters in `s`. If at any index `i`, the mapping does not match the previously stored values, then the strings are not isomorphic.\n\n**Time Complexity:** O(n) where n is the length of string `s`.\n**Space Complexity:** O(K) where K is the size of the character set (ASCII size = 256).',
        examples: [
            {
                title: 'Example 1',
                input: 'egg\nadd',
                output: 'true',
                explanation: 'e -> a, g -> d. The mappings are unique and consistent.',
            },
            {
                title: 'Example 2',
                input: 'foo\nbar',
                output: 'false',
                explanation: 'o maps to both a and r, which is invalid.',
            },
        ],
        testcases: [
            { input: 'egg\nadd', output: 'true' },
            { input: 'foo\nbar', output: 'false' },
            { input: 'paper\ntitle', output: 'true' },
            { input: 'a\na', output: 'true' },
            { input: 'ab\naa', output: 'false' },
            { input: 'badc\nbaba', output: 'false' },
            { input: '13\n42', output: 'true' },
            { input: 'same\nsame', output: 'true' },
            { input: 'abcdefghijklmnopqrstuvwxyz\nabcdefghijklmnopqrstuvwxyz', output: 'true' },
            { input: 'aba\nbaa', output: 'false' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read two strings and solve
    
    return 0;
}`,
            python: `def main():
    # Read two strings and solve
    pass

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read two strings and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read two strings and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s, t;
    if (!(cin >> s >> t)) return 0;
    if (s.length() != t.length()) {
        cout << "false\n";
        return 0;
    }
    int map_s[256], map_t[256];
    memset(map_s, -1, sizeof(map_s));
    memset(map_t, -1, sizeof(map_t));
    bool isomorphic = true;
    for (int i = 0; i < s.length(); i++) {
        int c1 = (unsigned char)s[i];
        int c2 = (unsigned char)t[i];
        if (map_s[c1] != -1 && map_s[c1] != c2) {
            isomorphic = false;
            break;
        }
        if (map_t[c2] != -1 && map_t[c2] != c1) {
            isomorphic = false;
            break;
        }
        map_s[c1] = c2;
        map_t[c2] = c1;
    }
    cout << (isomorphic ? "true" : "false") << "\n";
    return 0;
}`,
            python: `import sys

def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    s, t = lines[0], lines[1]
    if len(s) != len(t):
        print("false")
        return
    map_s = {}
    map_t = {}
    isomorphic = True
    for c1, c2 in zip(s, t):
        if c1 in map_s and map_s[c1] != c2:
            isomorphic = False
            break
        if c2 in map_t and map_t[c2] != c1:
            isomorphic = False
            break
        map_s[c1] = c2
        map_t[c2] = c1
    print("true" if isomorphic else "false")

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        String t = br.readLine();
        if (s == null || t == null) return;
        s = s.trim();
        t = t.trim();
        if (s.length() != t.length()) {
            System.out.println("false");
            return;
        }
        int[] mapS = new int[256];
        int[] mapT = new int[256];
        Arrays.fill(mapS, -1);
        Arrays.fill(mapT, -1);
        boolean isomorphic = true;
        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i);
            char c2 = t.charAt(i);
            if (mapS[c1] != -1 && mapS[c1] != c2) {
                isomorphic = false;
                break;
            }
            if (mapT[c2] != -1 && mapT[c2] != c1) {
                isomorphic = false;
                break;
            }
            mapS[c1] = c2;
            mapT[c2] = c1;
        }
        System.out.println(isomorphic ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let (Some(Ok(s_line)), Some(Ok(t_line))) = (lines.next(), lines.next()) {
        let s = s_line.trim();
        let t = t_line.trim();
        if s.len() != t.len() {
            println!("false");
            return;
        }
        let mut map_s = vec![256; 256];
        let mut map_t = vec![256; 256];
        let mut isomorphic = true;
        for (c1, c2) in s.bytes().zip(t.bytes()) {
            let u1 = c1 as usize;
            let u2 = c2 as usize;
            if map_s[u1] != 256 && map_s[u1] != u2 {
                isomorphic = false;
                break;
            }
            if map_t[u2] != 256 && map_t[u2] != u1 {
                isomorphic = false;
                break;
            }
            map_s[u1] = u2;
            map_t[u2] = u1;
        }
        if isomorphic {
            println!("true");
        } else {
            println!("false");
        }
    }
}`,
        },
    },

    // ==================== EASY #3: Happy Number Check ====================
    {
        title: 'Happy Number Check',
        description:
            'Determine if a positive integer `n` is a happy number.\n\nA happy number is a number defined by the following process:\n- Starting with any positive integer, replace the number by the sum of the squares of its digits.\n- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.\n- Those numbers for which this process ends in 1 are happy.\n\n**Input Format:**\n- A single line containing the positive integer `n`.\n\n**Output Format:**\n- Print "true" if `n` is happy, and "false" otherwise.',
        difficulty: 'EASY',
        tags: ['hash-set', 'counting'],
        constraints: '1 <= n <= 2^31 - 1',
        hints: "Simulate the sum of squares of digits. To detect loops, store each generated sum in a Hash Set. If a sum repeats itself, it's not a happy number.",
        editorial:
            '**Approach: Cycle Detection with Hash Set**\n\nWe calculate the next number by summing the squares of the digits of `n`. We keep repeating this process while inserting the intermediate values into a Hash Set. If the number becomes 1, it is happy. If the current number is already present in the Hash Set, it means we have entered a cycle that does not contain 1, so the number is not happy.\n\n**Time Complexity:** O(log n) as the numbers shrink rapidly to small values (sums of squares of digits of $2^{31}-1$ are small, e.g., max 729), then take at most a constant number of steps to cycle or reach 1.\n**Space Complexity:** O(log n) to store visited numbers.',
        examples: [
            {
                title: 'Example 1',
                input: '19',
                output: 'true',
                explanation:
                    '1^2 + 9^2 = 82\n8^2 + 2^2 = 68\n6^2 + 8^2 = 100\n1^2 + 0^2 + 0^2 = 1.',
            },
            {
                title: 'Example 2',
                input: '2',
                output: 'false',
                explanation:
                    '2 will enter a loop: 2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4.',
            },
        ],
        testcases: [
            { input: '19', output: 'true' },
            { input: '2', output: 'false' },
            { input: '1', output: 'true' },
            { input: '7', output: 'true' },
            { input: '4', output: 'false' },
            { input: '3', output: 'false' },
            { input: '100', output: 'true' },
            { input: '2147483647', output: 'false' },
            { input: '20', output: 'false' },
            { input: '10', output: 'true' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n and solve
    
    return 0;
}`,
            python: `def main():
    # Read n and solve
    pass

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

long long getNext(long long n) {
    long long sum = 0;
    while (n > 0) {
        long long d = n % 10;
        sum += d * d;
        n /= 10;
    }
    return sum;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    if (cin >> n) {
        unordered_set<long long> visited;
        while (n != 1 && !visited.count(n)) {
            visited.insert(n);
            n = getNext(n);
        }
        if (n == 1) cout << "true\n";
        else cout << "false\n";
    }
    return 0;
}`,
            python: `import sys

def get_next(n):
    total = 0
    while n > 0:
        d = n % 10
        total += d * d
        n //= 10
    return total

def main():
    line = sys.stdin.read().split()
    if not line:
        return
    n = int(line[0])
    visited = set()
    while n != 1 and n not in visited:
        visited.add(n)
        n = get_next(n)
    print("true" if n == 1 else "false")

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    private static long getNext(long n) {
        long sum = 0;
        while (n > 0) {
            long d = n % 10;
            sum += d * d;
            n /= 10;
        }
        return sum;
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        long n = Long.parseLong(line.trim());
        Set<Long> visited = new HashSet<>();
        while (n != 1 && !visited.contains(n)) {
            visited.add(n);
            n = getNext(n);
        }
        System.out.println(n == 1 ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashSet;

fn get_next(mut n: u64) -> u64 {
    let mut sum = 0;
    while n > 0 {
        let d = n % 10;
        sum += d * d;
        n /= 10;
    }
    sum
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let mut n: u64 = line.trim().parse().unwrap();
        let mut visited = HashSet::new();
        while n != 1 && !visited.contains(&n) {
            visited.insert(n);
            n = get_next(n);
        }
        if n == 1 {
            println!("true");
        } else {
            println!("false");
        }
    }
}`,
        },
    },

    // ==================== EASY #4: Ransom Note ====================
    {
        title: 'Ransom Note',
        description:
            'Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the characters from `magazine` and `false` otherwise.\n\nEach character in `magazine` can only be used once in `ransomNote`.\n\n**Input Format:**\n- First line: string `ransomNote`\n- Second line: string `magazine`\n\n**Output Format:**\n- Print "true" or "false".',
        difficulty: 'EASY',
        tags: ['hash-map', 'frequency'],
        constraints:
            '1 <= |ransomNote|, |magazine| <= 10^5\nBoth strings consist of lowercase English letters.',
        hints: 'Count the occurrences of each character in `magazine`. Then iterate through `ransomNote` and decrement counts. If a count drops below zero, return false.',
        editorial:
            "**Approach: Character Count Array**\n\nSince the characters are only lowercase English letters, we can use an integer array of size 26 (acting as a fixed-size Hash Map) to count the frequencies of characters in `magazine`. Next, we iterate through `ransomNote` and decrement the counts. If any character frequency becomes negative, it means we don't have enough characters in the magazine, so we output `false`.\n\n**Time Complexity:** O(N + M) where N = |ransomNote| and M = |magazine|.\n**Space Complexity:** O(1) space, since we use a fixed-size array of 26 integers.",
        examples: [
            {
                title: 'Example 1',
                input: 'a\nb',
                output: 'false',
                explanation: "The magazine 'b' cannot construct the ransom note 'a'.",
            },
            {
                title: 'Example 2',
                input: 'aa\naab',
                output: 'true',
                explanation: "The magazine 'aab' has two 'a's, which is enough to construct 'aa'.",
            },
        ],
        testcases: [
            { input: 'a\nb', output: 'false' },
            { input: 'aa\nab', output: 'false' },
            { input: 'aa\naab', output: 'true' },
            { input: 'a\na', output: 'true' },
            { input: 'hello\nolleh', output: 'true' },
            { input: 'hello\nollehworld', output: 'true' },
            { input: 'world\nworl', output: 'false' },
            { input: 'abc\ndef', output: 'false' },
            { input: 'abcde\nedcba', output: 'true' },
            { input: 'abcdefghijklmnopqrstuvwxyz\nabcdefghijklmnopqrstuvwxyz', output: 'true' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read ransomNote and magazine, and solve
    
    return 0;
}`,
            python: `def main():
    # Read ransomNote and magazine, and solve
    pass

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read ransomNote and magazine, and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read ransomNote and magazine, and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string r, m;
    if (cin >> r >> m) {
        vector<int> counts(26, 0);
        for (char c : m) {
            counts[c - 'a']++;
        }
        bool possible = true;
        for (char c : r) {
            if (--counts[c - 'a'] < 0) {
                possible = false;
                break;
            }
        }
        cout << (possible ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    r, m = lines[0], lines[1]
    counts = [0] * 26
    for c in m:
        counts[ord(c) - ord('a')] += 1
    possible = True
    for c in r:
        idx = ord(c) - ord('a')
        counts[idx] -= 1
        if counts[idx] < 0:
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
        String r = br.readLine();
        String m = br.readLine();
        if (r == null || m == null) return;
        r = r.trim();
        m = m.trim();
        int[] counts = new int[26];
        for (int i = 0; i < m.length(); i++) {
            counts[m.charAt(i) - 'a']++;
        }
        boolean possible = true;
        for (int i = 0; i < r.length(); i++) {
            int idx = r.charAt(i) - 'a';
            counts[idx]--;
            if (counts[idx] < 0) {
                possible = false;
                break;
            }
        }
        System.out.println(possible ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let (Some(Ok(r_line)), Some(Ok(m_line))) = (lines.next(), lines.next()) {
        let r = r_line.trim();
        let m = m_line.trim();
        let mut counts = vec![0; 26];
        for c in m.bytes() {
            counts[(c - b'a') as usize] += 1;
        }
        let mut possible = true;
        for c in r.bytes() {
            let idx = (c - b'a') as usize;
            counts[idx] -= 1;
            if counts[idx] < 0 {
                possible = false;
                break;
            }
        }
        if possible {
            println!("true");
        } else {
            println!("false");
        }
    }
}`,
        },
    },

    // ==================== EASY #5: Jewels and Stones ====================
    {
        title: 'Jewels and Stones',
        description:
            'You\'re given strings `jewels` representing the types of stones that are jewels, and `stones` representing the stones you have. Each character in `stones` is a type of stone you have. Find how many of the stones you have are also jewels.\n\nLetters are case sensitive, so "a" is considered a different type of stone from "A".\n\n**Input Format:**\n- First line: string `jewels`\n- Second line: string `stones`\n\n**Output Format:**\n- An integer representing the number of stones that are jewels.',
        difficulty: 'EASY',
        tags: ['hash-set', 'counting'],
        constraints:
            '1 <= |jewels|, |stones| <= 10^5\nAll characters in jewels are unique.\nBoth strings consist of English letters (case-sensitive).',
        hints: 'Store all the characters of `jewels` in a Hash Set. Then, iterate through `stones` and check if each stone is in the set.',
        editorial:
            '**Approach: Hash Set Lookup**\n\nWe insert all characters of `jewels` into a Hash Set. This allows us to verify if a character is a jewel in O(1) time. Then, we iterate through `stones` and count how many characters exist in the Hash Set.\n\n**Time Complexity:** O(J + S) where J = |jewels| and S = |stones|.\n**Space Complexity:** O(J) to store jewels in the Hash Set.',
        examples: [
            {
                title: 'Example 1',
                input: 'aA\naAAbbbb',
                output: '3',
                explanation:
                    "The jewels are 'a' and 'A'. Among 'aAAbbbb', there are 3 jewels: 'a', 'A', 'A'.",
            },
            {
                title: 'Example 2',
                input: 'z\nZZ',
                output: '0',
                explanation:
                    "The only jewel is 'z'. Since stones are uppercase 'Z', none are jewels.",
            },
        ],
        testcases: [
            { input: 'aA\naAAbbbb', output: '3' },
            { input: 'z\nZZ', output: '0' },
            { input: 'abc\nabc', output: '3' },
            { input: 'a\nbbbbb', output: '0' },
            { input: 'A\nAAAAA', output: '5' },
            { input: 'aA\na', output: '1' },
            { input: 'aB\nBaBa', output: '4' },
            { input: 'xY\nxyzXYZ', output: '2' },
            { input: 'abcde\nfghij', output: '0' },
            { input: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\nacegIKM', output: '7' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read jewels and stones, and solve
    
    return 0;
}`,
            python: `def main():
    # Read jewels and stones, and solve
    pass

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read jewels and stones, and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read jewels and stones, and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string j, s;
    if (cin >> j >> s) {
        unordered_set<char> jewels(j.begin(), j.end());
        int count = 0;
        for (char c : s) {
            if (jewels.count(c)) {
                count++;
            }
        }
        cout << count << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    j, s = lines[0], lines[1]
    jewels = set(j)
    count = sum(1 for c in s if c in jewels)
    print(count)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String j = br.readLine();
        String s = br.readLine();
        if (j == null || s == null) return;
        j = j.trim();
        s = s.trim();
        Set<Character> jewels = new HashSet<>();
        for (int i = 0; i < j.length(); i++) {
            jewels.add(j.charAt(i));
        }
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (jewels.contains(s.charAt(i))) {
                count++;
            }
        }
        System.out.println(count);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashSet;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let (Some(Ok(j_line)), Some(Ok(s_line))) = (lines.next(), lines.next()) {
        let j = j_line.trim();
        let s = s_line.trim();
        let mut jewels = HashSet::new();
        for c in j.chars() {
            jewels.insert(c);
        }
        let mut count = 0;
        for c in s.chars() {
            if jewels.contains(&c) {
                count += 1;
            }
        }
        println!("{}", count);
    }
}`,
        },
    },

    // ==================== MEDIUM #1: Group Anagrams ====================
    {
        title: 'Group Anagrams',
        description:
            'Given an array of strings `strs`, group the anagrams together.\n\nTo make the output deterministic and testable, you must:\n1. Sort the words within each group lexicographically.\n2. Sort the groups lexicographically based on their first words.\n3. Print each group on a new line with space-separated words.\n\n**Input Format:**\n- First line: integer `n` (number of strings)\n- Second line: `n` space-separated strings of lowercase English letters.\n\n**Output Format:**\n- Each group of anagrams on a new line, space-separated, formatted according to the rules.',
        difficulty: 'MEDIUM',
        tags: ['hash-map', 'sorting', 'frequency'],
        constraints:
            '1 <= n <= 10^4\n0 <= |strs[i]| <= 100\nAll strings consist of lowercase English letters.',
        hints: 'Anagrams have the same character counts. If you sort the characters of each string, anagrams will yield the identical sorted key. Use this key in a hash map.',
        editorial:
            '**Approach: Sorted String as Hash Map Key**\n\nWe iterate through the list of strings. For each string, we create a sorted copy of its characters. This sorted string is a unique key for its anagram group. We insert the original string into a hash map where the key is the sorted string. After grouping, we sort each group individually, then sort all the groups lexicographically based on their first word, ensuring deterministic output.\n\n**Time Complexity:** O(n * L log L + n log n) where n is the number of strings and L is the maximum length of a string.\n**Space Complexity:** O(n * L) to store the strings in the hash map.',
        examples: [
            {
                title: 'Example 1',
                input: '6\neat tea tan ate nat bat',
                output: 'ate eat tea\nbat\nnat tan',
                explanation:
                    "The sorted groups are: [ate, eat, tea] (first word 'ate'), [bat] (first word 'bat'), [nat, tan] (first word 'nat'). Sorting by first words gives: 'ate eat tea', then 'bat', then 'nat tan'.",
            },
            {
                title: 'Example 2',
                input: '1\na',
                output: 'a',
                explanation: 'Only one string, so it prints itself.',
            },
        ],
        testcases: [
            { input: '6\neat tea tan ate nat bat', output: 'ate eat tea\nbat\nnat tan' },
            { input: '1\na', output: 'a' },
            { input: '3\naba baa aab', output: 'aab aba baa' },
            { input: '4\na b a b', output: 'a a\nb b' },
            { input: '5\ncat dog tac god act', output: 'act cat tac\ndog god' },
            {
                input: '6\nlisten silent enlist google gogole oggleg',
                output: 'enlist listen silent\ngoogle gogole oggleg',
            },
            { input: '2\nxyz zyx', output: 'xyz zyx' },
            { input: '4\naaa aaa bbb bbb', output: 'aaa aaa\nbbb bbb' },
            { input: '3\nhello world olleh', output: 'hello olleh\nworld' },
            {
                input: '8\nrat tar art car arc rac abc cba',
                output: 'abc cba\narc car rac\nart rat tar',
            },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n and strings, solve and sort
    
    return 0;
}`,
            python: `def main():
    # Read n and strings, solve and sort
    pass

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input, solve and sort
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input, solve and sort
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
    vector<string> strs(n);
    for (int i = 0; i < n; i++) cin >> strs[i];
    unordered_map<string, vector<string>> groups;
    for (const string& s : strs) {
        string sorted_s = s;
        sort(sorted_s.begin(), sorted_s.end());
        groups[sorted_s].push_back(s);
    }
    vector<vector<string>> group_list;
    for (auto& pair : groups) {
        sort(pair.second.begin(), pair.second.end());
        group_list.push_back(pair.second);
    }
    sort(group_list.begin(), group_list.end(), [](const vector<string>& a, const vector<string>& b) {
        return a[0] < b[0];
    });
    for (const auto& group : group_list) {
        for (size_t i = 0; i < group.size(); i++) {
            if (i > 0) cout << " ";
            cout << group[i];
        }
        cout << "\n";
    }
    return 0;
}`,
            python: `import sys
from collections import defaultdict

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    strs = input_data[1:n+1]
    groups = defaultdict(list)
    for s in strs:
        sorted_s = "".join(sorted(s))
        groups[sorted_s].append(s)
    
    group_list = []
    for g in groups.values():
        g.sort()
        group_list.append(g)
    
    group_list.sort(key=lambda x: x[0])
    for g in group_list:
        print(" ".join(g))

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
        StringTokenizer st = new StringTokenizer(br.readLine());
        Map<String, List<String>> groups = new HashMap<>();
        for (int i = 0; i < n; i++) {
            String s = st.nextToken();
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        List<List<String>> groupList = new ArrayList<>();
        for (List<String> g : groups.values()) {
            Collections.sort(g);
            groupList.add(g);
        }
        groupList.sort((a, b) -> a.get(0).compareTo(b.get(0)));
        for (List<String> g : groupList) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < g.size(); i++) {
                if (i > 0) sb.append(" ");
                sb.append(g.get(i));
            }
            System.out.println(sb.toString());
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashMap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_line)) = lines.next() {
        let n: usize = n_line.trim().parse().unwrap();
        if let Some(Ok(strs_line)) = lines.next() {
            let strs: Vec<String> = strs_line.split_whitespace()
                .map(|s| s.to_string()).collect();
            let mut groups: HashMap<String, Vec<String>> = HashMap::new();
            for s in strs {
                let mut chars: Vec<char> = s.chars().collect();
                chars.sort();
                let key: String = chars.into_iter().collect();
                groups.entry(key).or_insert(Vec::new()).push(s);
            }
            let mut group_list: Vec<Vec<String>> = groups.into_values().collect();
            for g in &mut group_list {
                g.sort();
            }
            group_list.sort_by(|a, b| a[0].cmp(&b[0]));
            for g in group_list {
                println!("{}", g.join(" "));
            }
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #2: Longest Consecutive Sequence ====================
    {
        title: 'Longest Consecutive Sequence',
        description:
            'Given an unsorted array of integers `nums`, find the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in `O(n)` time complexity.\n\n**Input Format:**\n- First line: integer `n` (size of the array)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- A single integer: the length of the longest consecutive sequence.',
        difficulty: 'MEDIUM',
        tags: ['hash-set', 'counting'],
        constraints: '1 <= n <= 10^5\n-10^9 <= nums[i] <= 10^9',
        hints: 'Insert all numbers into a Hash Set. Then, iterate through the set. If `num - 1` is not in the set, it means `num` is the start of a sequence. Count forward from `num` to find the length of the sequence.',
        editorial:
            '**Approach: Hash Set Sequence Builder**\n\nBy storing all numbers in a Hash Set, we can check for the existence of any number in O(1) time. For each number `x`, we check if `x - 1` is in the set. If it is NOT, then `x` is the start of a consecutive sequence. We then count how many consecutive elements `x + 1`, `x + 2`, etc. exist in the set. By only checking sequences from their starting points, each element is visited at most twice.\n\n**Time Complexity:** O(n) because each number in the array is processed a constant number of times.\n**Space Complexity:** O(n) to store the numbers in the Hash Set.',
        examples: [
            {
                title: 'Example 1',
                input: '6\n100 4 200 1 3 2',
                output: '4',
                explanation:
                    'The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.',
            },
            {
                title: 'Example 2',
                input: '10\n0 3 7 2 5 8 4 6 0 1',
                output: '9',
                explanation:
                    'The longest consecutive sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]. Its length is 9.',
            },
        ],
        testcases: [
            { input: '6\n100 4 200 1 3 2', output: '4' },
            { input: '10\n0 3 7 2 5 8 4 6 0 1', output: '9' },
            { input: '1\n42', output: '1' },
            { input: '5\n1 2 3 4 5', output: '5' },
            { input: '5\n5 4 3 2 1', output: '5' },
            { input: '5\n10 20 30 40 50', output: '1' },
            { input: '6\n1 1 1 1 1 1', output: '1' },
            { input: '8\n10 -1 2 0 1 3 -2 -3', output: '7' },
            { input: '2\n-1000000000 1000000000', output: '1' },
            { input: '10\n2 1 99 100 3 101 4 102 5 103', output: '5' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read array and solve
    
    return 0;
}`,
            python: `def main():
    # Read array and solve
    pass

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read array and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read array and solve
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
    unordered_set<long long> s;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        s.insert(x);
    }
    int longest = 0;
    for (long long val : s) {
        if (!s.count(val - 1)) {
            long long current = val;
            int current_streak = 1;
            while (s.count(current + 1)) {
                current += 1;
                current_streak += 1;
            }
            longest = max(longest, current_streak);
        }
    }
    cout << longest << "\n";
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    s = set(nums)
    longest = 0
    for val in s:
        if (val - 1) not in s:
            current = val
            streak = 1
            while (current + 1) in s:
                current += 1
                streak += 1
            if streak > longest:
                longest = streak
    print(longest)

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
        StringTokenizer st = new StringTokenizer(br.readLine());
        Set<Long> set = new HashSet<>();
        for (int i = 0; i < n; i++) {
            set.add(Long.parseLong(st.nextToken()));
        }
        int longest = 0;
        for (long val : set) {
            if (!set.contains(val - 1)) {
                long current = val;
                int streak = 1;
                while (set.contains(current + 1)) {
                    current += 1;
                    streak += 1;
                }
                longest = Math.max(longest, streak);
            }
        }
        System.out.println(longest);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashSet;
use std::cmp;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_line)) = lines.next() {
        let n: usize = n_line.trim().parse().unwrap();
        if let Some(Ok(nums_line)) = lines.next() {
            let nums: Vec<i64> = nums_line.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut set = HashSet::new();
            for &x in &nums {
                set.insert(x);
            }
            let mut longest = 0;
            for &val in &set {
                if !set.contains(&(val - 1)) {
                    let mut current = val;
                    let mut streak = 1;
                    while set.contains(&(current + 1)) {
                        current += 1;
                        streak += 1;
                    }
                    longest = cmp::max(longest, streak);
                }
            }
            println!("{}", longest);
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #3: Subarray Sum Equals K ====================
    {
        title: 'Subarray Sum Equals K',
        description:
            'Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.\n\nA subarray is defined as a contiguous non-empty sequence of elements within an array.\n\n**Input Format:**\n- First line: two space-separated integers `n` (the size of the array) and `k`.\n- Second line: `n` space-separated integers.\n\n**Output Format:**\n- A single integer: the number of subarrays whose sum is `k`.',
        difficulty: 'MEDIUM',
        tags: ['hash-map', 'prefix-sum', 'counting'],
        constraints: '1 <= n <= 10^5\n-10^3 <= nums[i] <= 10^3\n-10^7 <= k <= 10^7',
        hints: 'If the cumulative sum up to index `i` is `S_i`, and cumulative sum up to index `j` is `S_j` (with `j < i`), then the sum of subarray `nums[j+1..i]` is `S_i - S_j`. If `S_i - S_j = k`, then `S_j = S_i - k`. Use a Hash Map to store the frequencies of prefix sums.',
        editorial:
            '**Approach: Prefix Sum Hash Map**\n\nWe traverse the array and maintain the running prefix sum `current_sum`. For each index, the subarray sum ending at this index will equal `k` if there exists a previous prefix sum equal to `current_sum - k`. We lookup `current_sum - k` in our Hash Map, add its frequency to the answer, and then insert the new prefix sum `current_sum` (or increment its frequency) in the map. The map is initialized with `0` having frequency `1` (representing an empty prefix).\n\n**Time Complexity:** O(n) as we traverse the array of size n exactly once.\n**Space Complexity:** O(n) to store prefix sums in the Hash Map.',
        examples: [
            {
                title: 'Example 1',
                input: '3 2\n1 1 1',
                output: '2',
                explanation: 'The subarrays are [1, 1] at index 0..1 and [1, 1] at index 1..2.',
            },
            {
                title: 'Example 2',
                input: '3 3\n1 2 3',
                output: '2',
                explanation: 'The subarrays are [1, 2] at index 0..1 and [3] at index 2..2.',
            },
        ],
        testcases: [
            { input: '3 2\n1 1 1', output: '2' },
            { input: '3 3\n1 2 3', output: '2' },
            { input: '1 0\n0', output: '1' },
            { input: '5 0\n0 0 0 0 0', output: '15' },
            { input: '4 5\n1 2 3 4', output: '1' },
            { input: '6 -1\n1 -1 2 -2 3 -3', output: '3' },
            { input: '4 2\n2 -2 2 -2', output: '3' },
            { input: '5 10\n1 2 3 4 5', output: '2' },
            { input: '3 10\n10 10 10', output: '3' },
            { input: '10 5\n1 2 3 -3 -2 -1 5 10 -5 5', output: '5' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n, k, and nums, then solve
    
    return 0;
}`,
            python: `def main():
    # Read n, k, and nums, then solve
    pass

if __name__ == '__main__':
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
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    unordered_map<long long, int> m;
    m[0] = 1;
    long long current_sum = 0;
    long long count = 0;
    for (int i = 0; i < n; i++) {
        current_sum += nums[i];
        if (m.count(current_sum - k)) {
            count += m[current_sum - k];
        }
        m[current_sum]++;
    }
    cout << count << "\n";
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    k = int(input_data[1])
    nums = [int(x) for x in input_data[2:n+2]]
    m = {0: 1}
    current_sum = 0
    count = 0
    for x in nums:
        current_sum += x
        if (current_sum - k) in m:
            count += m[current_sum - k]
        m[current_sum] = m.get(current_sum, 0) + 1
    print(count)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st1 = new StringTokenizer(line);
        int n = Integer.parseInt(st1.nextToken());
        long k = Long.parseLong(st1.nextToken());
        
        StringTokenizer st2 = new StringTokenizer(br.readLine());
        long[] nums = new long[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Long.parseLong(st2.nextToken());
        }
        
        Map<Long, Integer> m = new HashMap<>();
        m.put(0L, 1);
        long currentSum = 0;
        long count = 0;
        for (int i = 0; i < n; i++) {
            currentSum += nums[i];
            if (m.containsKey(currentSum - k)) {
                count += m.get(currentSum - k);
            }
            m.put(currentSum, m.getOrDefault(currentSum, 0) + 1);
        }
        System.out.println(count);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashMap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_k_line)) = lines.next() {
        let parts: Vec<&str> = n_k_line.split_whitespace().collect();
        let n: usize = parts[0].parse().unwrap();
        let k: i64 = parts[1].parse().unwrap();
        if let Some(Ok(nums_line)) = lines.next() {
            let nums: Vec<i64> = nums_line.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut m = HashMap::new();
            m.insert(0, 1);
            let mut current_sum = 0;
            let mut count = 0;
            for i in 0..n {
                current_sum += nums[i];
                if let Some(&cnt) = m.get(&(current_sum - k)) {
                    count += cnt;
                }
                *m.entry(current_sum).or_insert(0) += 1;
            }
            println!("{}", count);
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #4: Four Sum Count ====================
    {
        title: 'Four Sum Count',
        description:
            'Given four integer arrays `A`, `B`, `C`, and `D` of size `n`, return the number of tuples `(i, j, k, l)` such that:\n`A[i] + B[j] + C[k] + D[l] == 0`\n\n**Input Format:**\n- First line: integer `n` (the size of each array)\n- Second line: `n` space-separated integers representing array `A`\n- Third line: `n` space-separated integers representing array `B`\n- Fourth line: `n` space-separated integers representing array `C`\n- Fifth line: `n` space-separated integers representing array `D`\n\n**Output Format:**\n- A single integer representing the count of tuples summing to 0.',
        difficulty: 'MEDIUM',
        tags: ['hash-map', 'counting'],
        constraints: '1 <= n <= 200\n-10^9 <= A[i], B[i], C[i], D[i] <= 10^9',
        hints: 'Break the problem down into two halves. Find all possible sums of pairs from `A` and `B` and store their frequencies in a Hash Map. Then, iterate through all pairs in `C` and `D` and check if their negative sum exists in the map.',
        editorial:
            '**Approach: Split in Half (Meet-in-the-middle)**\n\nChecking all four combinations takes O(n^4), which is too slow. Instead, we can precompute the sum of elements from A and B: `sumAB = A[i] + B[j]` and store the frequencies of these sums in a Hash Map. Next, we iterate through every pair in C and D, calculating `sumCD = C[k] + D[l]`. If `-sumCD` exists in our Hash Map, we add its frequency to the total count. This reduces complexity to O(n^2).\n\n**Time Complexity:** O(n^2) to compute A+B and C+D combinations.\n**Space Complexity:** O(n^2) to store combinations of A and B in the Hash Map.',
        examples: [
            {
                title: 'Example 1',
                input: '2\n1 2\n-2 -1\n-1 2\n0 2',
                output: '2',
                explanation:
                    'The two tuples are:\n1. (0, 0, 0, 1) -> A[0]+B[0]+C[0]+D[1] = 1 + (-2) + (-1) + 2 = 0\n2. (1, 1, 0, 0) -> A[1]+B[1]+C[0]+D[0] = 2 + (-1) + (-1) + 0 = 0',
            },
            {
                title: 'Example 2',
                input: '1\n0\n0\n0\n0',
                output: '1',
                explanation: 'A[0]+B[0]+C[0]+D[0] = 0. One tuple: (0, 0, 0, 0).',
            },
        ],
        testcases: [
            { input: '2\n1 2\n-2 -1\n-1 2\n0 2', output: '2' },
            { input: '1\n0\n0\n0\n0', output: '1' },
            { input: '1\n1\n1\n1\n1', output: '0' },
            { input: '2\n0 0\n0 0\n0 0\n0 0', output: '16' },
            { input: '3\n1 2 3\n-1 -2 -3\n0 1 2\n0 -1 -2', output: '19' },
            { input: '2\n-1 1\n-1 1\n-1 1\n-1 1', output: '6' },
            { input: '3\n10 -5 2\n3 -10 5\n1 1 1\n-14 2 -2', output: '3' },
            { input: '3\n1 -1 0\n2 -2 0\n3 -3 0\n4 -4 0', output: '7' },
            { input: '2\n100 200\n-100 -200\n50 -50\n-50 50', output: '6' },
            { input: '4\n-1 -2 -3 -4\n1 2 3 4\n-1 -2 -3 -4\n1 2 3 4', output: '44' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n and the 4 arrays, then solve
    
    return 0;
}`,
            python: `def main():
    # Read n and the 4 arrays, then solve
    pass

if __name__ == '__main__':
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
    if (!(cin >> n)) return 0;
    vector<long long> a(n), b(n), c(n), d(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];
    for (int i = 0; i < n; i++) cin >> c[i];
    for (int i = 0; i < n; i++) cin >> d[i];
    unordered_map<long long, int> m;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            m[a[i] + b[j]]++;
        }
    }
    long long count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            long long target = -(c[i] + d[j]);
            if (m.count(target)) {
                count += m[target];
            }
        }
    }
    cout << count << "\n";
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    a = [int(x) for x in input_data[1:n+1]]
    b = [int(x) for x in input_data[n+1:2*n+1]]
    c = [int(x) for x in input_data[2*n+1:3*n+1]]
    d = [int(x) for x in input_data[3*n+1:4*n+1]]
    m = {}
    for x in a:
        for y in b:
            val = x + y
            m[val] = m.get(val, 0) + 1
    count = 0
    for x in c:
        for y in d:
            target = -(x + y)
            if target in m:
                count += m[target]
    print(count)

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
        
        long[] a = new long[n];
        long[] b = new long[n];
        long[] c = new long[n];
        long[] d = new long[n];
        
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) a[i] = Long.parseLong(st.nextToken());
        
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) b[i] = Long.parseLong(st.nextToken());
        
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) c[i] = Long.parseLong(st.nextToken());
        
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) d[i] = Long.parseLong(st.nextToken());
        
        Map<Long, Integer> m = new HashMap<>();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                long sum = a[i] + b[j];
                m.put(sum, m.getOrDefault(sum, 0) + 1);
            }
        }
        
        long count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                long target = -(c[i] + d[j]);
                count += m.getOrDefault(target, 0);
            }
        }
        System.out.println(count);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashMap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_line)) = lines.next() {
        let n: usize = n_line.trim().parse().unwrap();
        let mut arrays = Vec::new();
        for _ in 0..4 {
            if let Some(Ok(line)) = lines.next() {
                let arr: Vec<i64> = line.split_whitespace()
                    .map(|x| x.parse().unwrap()).collect();
                arrays.push(arr);
            }
        }
        let a = &arrays[0];
        let b = &arrays[1];
        let c = &arrays[2];
        let d = &arrays[3];
        
        let mut m = HashMap::new();
        for i in 0..n {
            for j in 0..n {
                let sum = a[i] + b[j];
                *m.entry(sum).or_insert(0) += 1;
            }
        }
        
        let mut count = 0;
        for i in 0..n {
            for j in 0..n {
                let target = -(c[i] + d[j]);
                if let Some(&cnt) = m.get(&target) {
                    count += cnt;
                }
            }
        }
        println!("{}", count);
    }
}`,
        },
    },

    // ==================== MEDIUM #5: Encode and Decode Strings ====================
    {
        title: 'Encode and Decode Strings',
        description:
            'Design an algorithm to encode a list of strings into a single string. The single string can then be sent over a network and decoded back into the original list of strings.\n\nTo make it testable, you must output:\n1. The length of the encoded string.\n2. The encoded string itself.\n3. The decoded list of strings (one per line) to verify they match the inputs.\n\n**Input Format:**\n- First line: integer `n` (number of strings)\n- Subsequent `n` lines: each line contains a string (which can be empty, or contain spaces, but no newlines).\n\n**Output Format:**\n- First line: the encoded string length\n- Second line: the encoded string\n- Next `n` lines: the decoded strings (one per line).',
        difficulty: 'MEDIUM',
        tags: ['hash-map', 'string'],
        constraints:
            '0 <= n <= 100\n0 <= |strs[i]| <= 100\nInput strings consist of printable ASCII characters (excluding newlines).',
        hints: "Use a length-prefix method. For each string `s`, encode it as `len(s) + '#' + s`. This ensures that we know exactly how many characters to read next, avoiding collisions with '#' itself.",
        editorial:
            '**Approach: Length-Prefix Serialization**\n\nTo safely encode strings of arbitrary content (even containing delimiter characters like `#`), we prepend the length of each string followed by a delimiter `#` before the string itself. For example, the list `["hello", "world"]` is serialized as `"5#hello5#world"`.\nDuring decoding, we read characters up to `#` to parse the length of the string, then read exactly `len` characters for the string, and repeat. This handles empty strings (`0#`) and strings with special symbols seamlessly.\n\n**Time Complexity:** O(N) where N is the total characters across all strings (linear time to serialize and deserialize).\n**Space Complexity:** O(N) to store the serialized string.',
        examples: [
            {
                title: 'Example 1',
                input: '2\nhello\nworld',
                output: '14\n5#hello5#world\nhello\nworld',
                explanation:
                    "The encoded string is '5#hello5#world', length is 14. Decoded strings match original inputs.",
            },
            {
                title: 'Example 2',
                input: '1\n',
                output: '2\n0#\n',
                explanation:
                    "An empty string is encoded as '0#'. The length is 2. The decoded string is empty.",
            },
        ],
        testcases: [
            { input: '2\nhello\nworld', output: '14\n5#hello5#world\nhello\nworld' },
            { input: '3\na\nab\nabc', output: '12\n1#a2#ab3#abc\na\nab\nabc' },
            { input: '1\n', output: '2\n0#\n' },
            {
                input: '4\ncode\n#is\n#fun\n!',
                output: '20\n4#code3##is4##fun1#!\ncode\n#is\n#fun\n!',
            },
            {
                input: '3\nhello world\n   spaces   \n   ',
                output: '34\n11#hello world12#   spaces   3#   \nhello world\n   spaces   \n   ',
            },
            {
                input: '2\n1234567890\n0987654321',
                output: '26\n10#123456789010#0987654321\n1234567890\n0987654321',
            },
            {
                input: '3\naaaaaaaaaa\nbbbbb\n',
                output: '22\n10#aaaaaaaaaa5#bbbbb0#\naaaaaaaaaa\nbbbbb\n',
            },
            {
                input: '10\n!\n@\n#\n$\n%\n^\n&\n*\n(\n)',
                output: '30\n1#!1#@1##1#$1#%1#^1#&1#*1#(1#)\n!\n@\n#\n$\n%\n^\n&\n*\n(\n)',
            },
            { input: '0', output: '0\n\n' },
            { input: '3\nsame\nsame\nsame', output: '18\n4#same4#same4#same\nsame\nsame\nsame' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n and the n strings line-by-line, solve
    
    return 0;
}`,
            python: `def main():
    # Read n and strings, solve
    pass

if __name__ == '__main__':
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

void trim_cr(string& s) {
    if (!s.empty() && s.back() == '\r') {
        s.pop_back();
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string line;
    if (!getline(cin, line)) return 0;
    trim_cr(line);
    if (line.empty()) return 0;
    int n = stoi(line);
    vector<string> strs(n);
    for (int i = 0; i < n; i++) {
        getline(cin, strs[i]);
        trim_cr(strs[i]);
    }
    string encoded = "";
    for (const string& s : strs) {
        encoded += to_string(s.length()) + "#" + s;
    }
    cout << encoded.length() << "\n";
    cout << encoded << "\n";
    
    // Decode
    vector<string> decoded;
    int i = 0;
    int total_len = encoded.length();
    while (i < total_len) {
        int j = i;
        while (j < total_len && encoded[j] != '#') {
            j++;
        }
        int len = stoi(encoded.substr(i, j - i));
        decoded.push_back(encoded.substr(j + 1, len));
        i = j + 1 + len;
    }
    for (const string& s : decoded) {
        cout << s << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    lines = sys.stdin.read().split('\\n')
    if not lines or not lines[0]:
        return
    n = int(lines[0])
    strs = []
    for i in range(1, n + 1):
        s = lines[i]
        if s.endswith('\\r'):
            s = s[:-1]
        strs.append(s)
    
    encoded = []
    for s in strs:
        encoded.append(f"{len(s)}#{s}")
    encoded_str = "".join(encoded)
    
    print(len(encoded_str))
    print(encoded_str)
    
    # Decode
    decoded = []
    i = 0
    total_len = len(encoded_str)
    while i < total_len:
        j = i
        while j < total_len and encoded_str[j] != '#':
            j += 1
        length = int(encoded_str[i:j])
        decoded.append(encoded_str[j+1 : j+1+length])
        i = j + 1 + length
        
    for s in decoded:
        print(s)

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
        List<String> strs = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String s = br.readLine();
            if (s == null) s = "";
            strs.add(s);
        }
        StringBuilder sb = new StringBuilder();
        for (String s : strs) {
            sb.append(s.length()).append("#").append(s);
        }
        String encoded = sb.toString();
        System.out.println(encoded.length());
        System.out.println(encoded);
        
        // Decode
        List<String> decoded = new ArrayList<>();
        int i = 0;
        int totalLen = encoded.length();
        while (i < totalLen) {
            int j = i;
            while (j < totalLen && encoded.charAt(j) != '#') {
                j++;
            }
            int len = Integer.parseInt(encoded.substring(i, j));
            decoded.add(encoded.substring(j + 1, j + 1 + len));
            i = j + 1 + len;
        }
        for (String s : decoded) {
            System.out.println(s);
        }
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_line)) = lines.next() {
        let n: usize = n_line.trim().parse().unwrap();
        let mut strs = Vec::new();
        for _ in 0..n {
            if let Some(Ok(mut s)) = lines.next() {
                if s.ends_with('\\r') {
                    s.pop();
                }
                strs.push(s);
            }
        }
        let mut encoded = String::new();
        for s in &strs {
            encoded.push_str(&format!("{}#{}", s.len(), s));
        }
        println!("{}", encoded.len());
        println!("{}", encoded);
        
        let mut decoded = Vec::new();
        let bytes = encoded.as_bytes();
        let mut i = 0;
        let total_len = bytes.len();
        while i < total_len {
            let mut j = i;
            while j < total_len && bytes[j] != b'#' {
                j += 1;
            }
            let len_str = std::str::from_utf8(&bytes[i..j]).unwrap();
            let len: usize = len_str.parse().unwrap();
            let s = std::str::from_utf8(&bytes[j+1..j+1+len]).unwrap();
            decoded.push(s.to_string());
            i = j + 1 + len;
        }
        for s in decoded {
            println!("{}", s);
        }
    }
}`,
        },
    },

    // ==================== HARD #1: Minimum Window Substring ====================
    {
        title: 'Minimum Window Substring',
        description:
            'Given two strings `s` and `t` of lengths `m` and `n` respectively, find the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.\n\nIf there is no such substring, print an empty line.\nIf there are multiple such windows, print the first one that appears in `s`.\n\n**Input Format:**\n- First line: string `s`\n- Second line: string `t`\n\n**Output Format:**\n- The minimum window substring (or an empty line if none exists).',
        difficulty: 'HARD',
        tags: ['hash-map', 'sliding-window', 'frequency'],
        constraints:
            '1 <= |s|, |t| <= 10^5\ns and t consist of uppercase and lowercase English letters.',
        hints: 'Use the sliding window technique. Keep two pointers, left and right. Expand right to find a valid window. Once a valid window is found, contract left to minimize it.',
        editorial:
            '**Approach: Sliding Window with Two Maps/Arrays**\n\nWe maintain the counts of characters required from `t` in `target_counts`. We then use a sliding window defined by two pointers `l` and `r` on `s`. We expand `r`, adding elements to our `window_counts`. When the window contains all characters of `t` in required frequencies, we try to shrink the window from the left by advancing `l` while maintaining validity. We keep track of the minimum window length and its starting index.\n\n**Time Complexity:** O(|s| + |t|) as each character is processed at most twice (once by right pointer, once by left pointer).\n**Space Complexity:** O(K) where K = 256 for the character set.',
        examples: [
            {
                title: 'Example 1',
                input: 'ADOBECODEBANC\nABC',
                output: 'BANC',
                explanation:
                    "The minimum window substring containing all 'A', 'B', 'C' is 'BANC' (length 4).",
            },
            {
                title: 'Example 2',
                input: 'a\naa',
                output: '',
                explanation:
                    "s has only one 'a' but t requires two 'a's, so no window is possible.",
            },
        ],
        testcases: [
            { input: 'ADOBECODEBANC\nABC', output: 'BANC' },
            { input: 'a\na', output: 'a' },
            { input: 'a\naa', output: '' },
            { input: 'ABAACBAB\nABC', output: 'ACB' },
            { input: 'A\nB', output: '' },
            { input: 'AAAAAA\nA', output: 'A' },
            { input: 'GEEKSFORGEEKS\nORK', output: 'KSFOR' },
            { input: 'XYZYX\nXYZ', output: 'XYZ' },
            { input: 'aabdec\nabc', output: 'abdec' },
            { input: 'bba\nab', output: 'ba' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read s and t, find the minimum window substring
    
    return 0;
}`,
            python: `def main():
    # Read s and t, find the minimum window substring
    pass

if __name__ == '__main__':
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
    string s, t;
    if (!(cin >> s >> t)) return 0;
    
    vector<int> target_counts(256, 0);
    for (char c : t) {
        target_counts[(unsigned char)c]++;
    }
    
    int required = 0;
    for (int i = 0; i < 256; i++) {
        if (target_counts[i] > 0) required++;
    }
    
    vector<int> window_counts(256, 0);
    int formed = 0;
    int l = 0, r = 0;
    int min_len = 1e9;
    int min_l = 0;
    
    while (r < s.length()) {
        char c = s[r];
        window_counts[(unsigned char)c]++;
        if (target_counts[(unsigned char)c] > 0 && window_counts[(unsigned char)c] == target_counts[(unsigned char)c]) {
            formed++;
        }
        
        while (l <= r && formed == required) {
            c = s[l];
            if (r - l + 1 < min_len) {
                min_len = r - l + 1;
                min_l = l;
            }
            window_counts[(unsigned char)c]--;
            if (target_counts[(unsigned char)c] > 0 && window_counts[(unsigned char)c] < target_counts[(unsigned char)c]) {
                formed--;
            }
            l++;
        }
        r++;
    }
    
    if (min_len == 1e9) {
        cout << "\n";
    } else {
        cout << s.substr(min_l, min_len) << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    s, t = lines[0], lines[1]
    
    dict_t = {}
    for c in t:
        dict_t[c] = dict_t.get(c, 0) + 1
        
    required = len(dict_t)
    l, r = 0, 0
    formed = 0
    window_counts = {}
    
    ans = float("inf"), None, None
    
    while r < len(s):
        character = s[r]
        window_counts[character] = window_counts.get(character, 0) + 1
        
        if character in dict_t and window_counts[character] == dict_t[character]:
            formed += 1
            
        while l <= r and formed == required:
            character = s[l]
            if r - l + 1 < ans[0]:
                ans = (r - l + 1, l, r)
                
            window_counts[character] -= 1
            if character in dict_t and window_counts[character] < dict_t[character]:
                formed -= 1
                
            l += 1
        r += 1
        
    if ans[0] == float("inf"):
        print("")
    else:
        print(s[ans[1] : ans[2] + 1])

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        String t = br.readLine();
        if (s == null || t == null) return;
        s = s.trim();
        t = t.trim();
        
        int[] targetCounts = new int[256];
        for (int i = 0; i < t.length(); i++) {
            targetCounts[t.charAt(i)]++;
        }
        
        int required = 0;
        for (int i = 0; i < 256; i++) {
            if (targetCounts[i] > 0) required++;
        }
        
        int[] windowCounts = new int[256];
        int formed = 0;
        int l = 0, r = 0;
        int minLen = Integer.MAX_VALUE;
        int minL = 0;
        
        while (r < s.length()) {
            char c = s.charAt(r);
            windowCounts[c]++;
            if (targetCounts[c] > 0 && windowCounts[c] == targetCounts[c]) {
                formed++;
            }
            
            while (l <= r && formed == required) {
                c = s.charAt(l);
                if (r - l + 1 < minLen) {
                    minLen = r - l + 1;
                    minL = l;
                }
                windowCounts[c]--;
                if (targetCounts[c] > 0 && windowCounts[c] < targetCounts[c]) {
                    formed--;
                }
                l++;
            }
            r++;
        }
        
        if (minLen == Integer.MAX_VALUE) {
            System.out.println("");
        } else {
            System.out.println(s.substring(minL, minL + minLen));
        }
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let (Some(Ok(s_line)), Some(Ok(t_line))) = (lines.next(), lines.next()) {
        let s = s_line.trim();
        let t = t_line.trim();
        let s_bytes = s.as_bytes();
        let t_bytes = t.as_bytes();
        
        let mut target_counts = vec![0; 256];
        for &b in t_bytes {
            target_counts[b as usize] += 1;
        }
        
        let mut required = 0;
        for i in 0..256 {
            if target_counts[i] > 0 {
                required += 1;
            }
        }
        
        let mut window_counts = vec![0; 256];
        let mut formed = 0;
        let mut l = 0;
        let mut r = 0;
        let mut min_len = usize::MAX;
        let mut min_l = 0;
        
        while r < s_bytes.len() {
            let c = s_bytes[r] as usize;
            window_counts[c] += 1;
            if target_counts[c] > 0 && window_counts[c] == target_counts[c] {
                formed += 1;
            }
            
            while l <= r && formed == required {
                let lc = s_bytes[l] as usize;
                if r - l + 1 < min_len {
                    min_len = r - l + 1;
                    min_l = l;
                }
                window_counts[lc] -= 1;
                if target_counts[lc] > 0 && window_counts[lc] < target_counts[lc] {
                    formed -= 1;
                }
                l += 1;
            }
            r += 1;
        }
        
        if min_len == usize::MAX {
            println!("");
        } else {
            println!("{}", &s[min_l..min_l + min_len]);
        }
    }
}`,
        },
    },

    // ==================== HARD #2: Substring Concatenation Indices ====================
    {
        title: 'Substring Concatenation Indices',
        description:
            'You are given a string `s` and an array of strings `words`. All strings in `words` are of the exact same length.\n\nA concatenated substring in `s` is a substring that contains all the strings of any permutation of `words` concatenated.\n\nFind all starting indices of concatenated substrings in `s`.\n\nPrint the starting indices in ascending order, separated by spaces. If no such indices exist, print an empty line.\n\n**Input Format:**\n- First line: string `s`\n- Second line: integer `m` (number of words in the array)\n- Next `m` lines: each line contains a word from the array `words`.\n\n**Output Format:**\n- A single line of space-separated indices in ascending order.',
        difficulty: 'HARD',
        tags: ['hash-map', 'sliding-window', 'frequency'],
        constraints:
            '1 <= |s| <= 10^4\n1 <= m <= 1000\n1 <= |words[i]| <= 30\nAll words are of the same length.\ns and words[i] consist of lowercase English letters.',
        hints: 'Let word_len be the length of each word. We can use a sliding window over the string. Since the starting index can shift from 0 to word_len - 1, we execute the sliding window word_len times.',
        editorial:
            "**Approach: Sliding Window over Word Boundaries**\n\nInstead of checking all substrings of size `word_len * m` from scratch, we can run a sliding window. Since word boundaries can start at any offset `i` from `0` to `word_len - 1`, we slide a window of size `word_len` at a time. We maintain a Hash Map of counts for words in the current window. If we encounter a word not in `words`, we reset the window. If a word's count exceeds the target count, we slide the left boundary of the window to the right until the count is valid. If we match all `m` words, the left boundary is added to the result.\n\n**Time Complexity:** O(|s| * word_len) as we run the sliding window `word_len` times, and each run processes at most |s| / word_len words.\n**Space Complexity:** O(m * word_len) to store the words in hash maps.",
        examples: [
            {
                title: 'Example 1',
                input: 'barfoothefoobarman\n2\nfoo\nbar',
                output: '0 9',
                explanation:
                    "Substring at index 0 is 'barfoo' (contains 'bar' then 'foo'). Substring at index 9 is 'foobar' (contains 'foo' then 'bar').",
            },
            {
                title: 'Example 2',
                input: 'wordgoodgoodgoodbestword\n4\nword\ngood\nbest\nword',
                output: '',
                explanation: 'No substring of length 16 contains all 4 words.',
            },
        ],
        testcases: [
            { input: 'barfoothefoobarman\n2\nfoo\nbar', output: '0 9' },
            { input: 'wordgoodgoodgoodbestword\n4\nword\ngood\nbest\nword', output: '' },
            { input: 'barfoofoobarthefoobarman\n3\nbar\nfoo\nthe', output: '6 9 12' },
            { input: 'wordgoodgoodgoodbestword\n4\nword\ngood\nbest\ngood', output: '8' },
            {
                input: 'lingmindraboofooowingdingbarrwingmonkeypoundcake\n5\nfooo\nbarr\nwing\nding\nwing',
                output: '13',
            },
            { input: 'a\n1\na', output: '0' },
            { input: 'ababaab\n2\nab\nba', output: '3' },
            { input: 'aaaaaaaaaaaa\n2\naa\naa', output: '0 1 2 3 4 5 6 7 8' },
            { input: 'mississippi\n2\nis\nip', output: '' },
            { input: 'foobarfoobar\n2\nfoo\nbar', output: '0 3 6' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read s, m, and words, then solve
    
    return 0;
}`,
            python: `def main():
    # Read s, m, and words, then solve
    pass

if __name__ == '__main__':
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
    string s;
    if (!(cin >> s)) return 0;
    int m;
    if (!(cin >> m)) return 0;
    vector<string> words(m);
    unordered_map<string, int> word_counts;
    for (int i = 0; i < m; i++) {
        cin >> words[i];
        word_counts[words[i]]++;
    }
    if (m == 0 || s.empty()) {
        cout << "\n";
        return 0;
    }
    int word_len = words[0].length();
    vector<int> res;
    
    for (int i = 0; i < word_len; i++) {
        int left = i;
        int right = i;
        unordered_map<string, int> curr_counts;
        int count = 0;
        while (right + word_len <= s.length()) {
            string w = s.substr(right, word_len);
            right += word_len;
            if (word_counts.count(w)) {
                curr_counts[w]++;
                count++;
                while (curr_counts[w] > word_counts[w]) {
                    string left_w = s.substr(left, word_len);
                    curr_counts[left_w]--;
                    count--;
                    left += word_len;
                }
                if (count == m) {
                    res.push_back(left);
                }
            } else {
                curr_counts.clear();
                count = 0;
                left = right;
            }
        }
    }
    sort(res.begin(), res.end());
    for (size_t i = 0; i < res.size(); i++) {
        if (i > 0) cout << " ";
        cout << res[i];
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
from collections import Counter

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    s = input_data[0]
    m = int(input_data[1])
    words = input_data[2:m+2]
    
    if not s or not words:
        print("")
        return
    
    word_len = len(words[0])
    num_words = len(words)
    word_counts = Counter(words)
    res = []
    
    for i in range(word_len):
        left = i
        right = i
        curr_counts = Counter()
        count = 0
        while right + word_len <= len(s):
            w = s[right:right+word_len]
            right += word_len
            if w in word_counts:
                curr_counts[w] += 1
                count += 1
                while curr_counts[w] > word_counts[w]:
                    left_w = s[left:left+word_len]
                    curr_counts[left_w] -= 1
                    count -= 1
                    left += word_len
                if count == num_words:
                    res.append(left)
            else:
                curr_counts.clear()
                count = 0
                left = right
    res.sort()
    print(" ".join(map(str, res)))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        String mLine = br.readLine();
        if (mLine == null) return;
        int m = Integer.parseInt(mLine.trim());
        String[] words = new String[m];
        Map<String, Integer> wordCounts = new HashMap<>();
        for (int i = 0; i < m; i++) {
            words[i] = br.readLine().trim();
            wordCounts.put(words[i], wordCounts.getOrDefault(words[i], 0) + 1);
        }
        
        if (s.isEmpty() || m == 0) {
            System.out.println("");
            return;
        }
        
        int wordLen = words[0].length();
        List<Integer> res = new ArrayList<>();
        
        for (int i = 0; i < wordLen; i++) {
            int left = i;
            int right = i;
            Map<String, Integer> currCounts = new HashMap<>();
            int count = 0;
            while (right + wordLen <= s.length()) {
                String w = s.substring(right, right + wordLen);
                right += wordLen;
                if (wordCounts.containsKey(w)) {
                    currCounts.put(w, currCounts.getOrDefault(w, 0) + 1);
                    count++;
                    while (currCounts.get(w) > wordCounts.get(w)) {
                        String leftW = s.substring(left, left + wordLen);
                        currCounts.put(leftW, currCounts.get(leftW) - 1);
                        count--;
                        left += wordLen;
                    }
                    if (count == m) {
                        res.add(left);
                    }
                } else {
                    currCounts.clear();
                    count = 0;
                    left = right;
                }
            }
        }
        Collections.sort(res);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(res.get(i));
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashMap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(s_line)) = lines.next() {
        let s = s_line.trim().to_string();
        if let Some(Ok(m_line)) = lines.next() {
            let m: usize = m_line.trim().parse().unwrap();
            let mut words = Vec::with_capacity(m);
            let mut word_counts = HashMap::new();
            for _ in 0..m {
                if let Some(Ok(w_line)) = lines.next() {
                    let w = w_line.trim().to_string();
                    *word_counts.entry(w.clone()).or_insert(0) += 1;
                    words.push(w);
                }
            }
            if s.is_empty() || m == 0 {
                println!("");
                return;
            }
            
            let word_len = words[0].len();
            let mut res = Vec::new();
            
            for i in 0..word_len {
                let mut left = i;
                let mut right = i;
                let mut curr_counts = HashMap::new();
                let mut count = 0;
                while right + word_len <= s.len() {
                    let w = &s[right..right+word_len];
                    right += word_len;
                    if word_counts.contains_key(w) {
                        *curr_counts.entry(w).or_insert(0) += 1;
                        count += 1;
                        while curr_counts.get(w).unwrap() > word_counts.get(w).unwrap() {
                            let left_w = &s[left..left+word_len];
                            if let Some(val) = curr_counts.get_mut(left_w) {
                                *val -= 1;
                            }
                            count -= 1;
                            left += word_len;
                        }
                        if count == m {
                            res.push(left);
                        }
                    } else {
                        curr_counts.clear();
                        count = 0;
                        left = right;
                    }
                }
            }
            res.sort();
            let strs: Vec<String> = res.iter().map(|x| x.to_string()).collect();
            println!("{}", strs.join(" "));
        }
    }
}`,
        },
    },

    // ==================== HARD #3: Longest Duplicate Substring ====================
    {
        title: 'Longest Duplicate Substring',
        description:
            'Given a string `s`, consider all duplicated substrings: substrings of `s` that occur 2 or more times. The occurrences may overlap.\n\nFind any duplicated substring that has the longest possible length. If `s` does not have a duplicated substring, print an empty line.\n\n**Input Format:**\n- A single line containing the string `s` consisting of lowercase English letters.\n\n**Output Format:**\n- A single string representing the longest duplicate substring (or empty line if none).',
        difficulty: 'HARD',
        tags: ['hash-map', 'binary-search', 'rolling-hash'],
        constraints: '2 <= |s| <= 10^5\ns consists of lowercase English letters.',
        hints: 'Use binary search on the length of the duplicate substring (range `1` to `len(s)`). For a fixed length `L`, we can use Rabin-Karp (rolling hash) to check if any substring of length `L` is duplicated in O(N) time.',
        editorial:
            "**Approach: Binary Search on Substring Length + Rolling Hash (Rabin-Karp)**\n\nThe length of the longest duplicate substring can be binary-searched between `1` and `n`. For a candidate length `L`:\n1. Compute the rolling hash of all substrings of length `L` using a base (e.g. `26`) and two modulos (e.g. `10^9+7` and `10^9+9`) to avoid collisions.\n2. Store the double hashes in a Hash Set.\n3. If a hash is seen again, we've found a duplicate substring of length `L` (return its start index). If no duplicate is found for `L`, we search shorter lengths.\n\n**Time Complexity:** O(n log n) because binary search takes O(log n) steps, and Rabin-Karp takes O(n) time per step.\n**Space Complexity:** O(n) to store substring hashes in the Hash Set.",
        examples: [
            {
                title: 'Example 1',
                input: 'banana',
                output: 'ana',
                explanation:
                    "The substring 'ana' appears twice: at index 1 ('banana') and index 3 ('banana').",
            },
            {
                title: 'Example 2',
                input: 'abcd',
                output: '',
                explanation: 'No substring appears more than once.',
            },
        ],
        testcases: [
            { input: 'banana', output: 'ana' },
            { input: 'abcd', output: '' },
            { input: 'aaaaa', output: 'aaaa' },
            { input: 'aab', output: 'a' },
            { input: 'majestical', output: 'a' },
            { input: 'babab', output: 'bab' },
            { input: 'leetcoder', output: 'e' },
            { input: 'tralalala', output: 'alala' },
            { input: 'mississippi', output: 'issi' },
            { input: 'doubletrouble', output: 'ouble' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read s, binary search on substring length using rolling hash
    
    return 0;
}`,
            python: `def main():
    # Read s, binary search on length using rolling hash
    pass

if __name__ == '__main__':
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

long long power(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2;
    }
    return res;
}

int search(int L, const string& s, const vector<int>& nums) {
    int n = s.length();
    long long MOD1 = 1000000007;
    long long MOD2 = 1000000009;
    long long BASE = 26;
    
    long long h1 = 0, h2 = 0;
    for (int i = 0; i < L; i++) {
        h1 = (h1 * BASE + nums[i]) % MOD1;
        h2 = (h2 * BASE + nums[i]) % MOD2;
    }
    
    unordered_set<unsigned long long> seen;
    seen.insert(((unsigned long long)h1 << 32) | h2);
    
    long long aL1 = power(BASE, L, MOD1);
    long long aL2 = power(BASE, L, MOD2);
    
    for (int start = 1; start <= n - L; start++) {
        h1 = (h1 * BASE - nums[start - 1] * aL1 + nums[start + L - 1]) % MOD1;
        h2 = (h2 * BASE - nums[start - 1] * aL2 + nums[start + L - 1]) % MOD2;
        
        if (h1 < 0) h1 += MOD1;
        if (h2 < 0) h2 += MOD2;
        
        unsigned long long key = ((unsigned long long)h1 << 32) | h2;
        if (seen.count(key)) {
            return start;
        }
        seen.insert(key);
    }
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    int n = s.length();
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        nums[i] = s[i] - 'a';
    }
    
    int left = 1, right = n;
    int start_idx = -1;
    int best_len = 0;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int idx = search(mid, s, nums);
        if (idx != -1) {
            start_idx = idx;
            best_len = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    if (best_len == 0) {
        cout << "\n";
    } else {
        cout << s.substr(start_idx, best_len) << "\n";
    }
    return 0;
}`,
            python: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s:
        return
    n = len(s)
    nums = [ord(c) - ord('a') for c in s]
    
    MOD1 = 10**9 + 7
    MOD2 = 10**9 + 9
    BASE = 26
    
    def search(L):
        h1, h2 = 0, 0
        for i in range(L):
            h1 = (h1 * BASE + nums[i]) % MOD1
            h2 = (h2 * BASE + nums[i]) % MOD2
            
        seen = {(h1, h2)}
        
        aL1 = pow(BASE, L, MOD1)
        aL2 = pow(BASE, L, MOD2)
        
        for start in range(1, n - L + 1):
            h1 = (h1 * BASE - nums[start - 1] * aL1 + nums[start + L - 1]) % MOD1
            h2 = (h2 * BASE - nums[start - 1] * aL2 + nums[start + L - 1]) % MOD2
            
            h1 = (h1 + MOD1) % MOD1
            h2 = (h2 + MOD2) % MOD2
            
            if (h1, h2) in seen:
                return start
            seen.add((h1, h2))
        return -1

    left, right = 1, n
    start_idx = -1
    best_len = 0
    
    while left <= right:
        mid = left + (right - left) // 2
        idx = search(mid)
        if idx != -1:
            start_idx = idx
            best_len = mid
            left = mid + 1
        else:
            right = mid - 1
            
    if best_len == 0:
        print("")
    else:
        print(s[start_idx : start_idx + best_len])

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    private static long power(long base, long exp, long mod) {
        long res = 1;
        base %= mod;
        while (exp > 0) {
            if (exp % 2 == 1) res = (res * base) % mod;
            base = (base * base) % mod;
            exp /= 2;
        }
        return res;
    }
    
    private static int search(int L, String s, int[] nums) {
        int n = s.length();
        long MOD1 = 1000000007;
        long MOD2 = 1000000009;
        long BASE = 26;
        
        long h1 = 0, h2 = 0;
        for (int i = 0; i < L; i++) {
            h1 = (h1 * BASE + nums[i]) % MOD1;
            h2 = (h2 * BASE + nums[i]) % MOD2;
        }
        
        Set<Long> seen = new HashSet<>();
        seen.add((h1 << 32) | h2);
        
        long aL1 = power(BASE, L, MOD1);
        long aL2 = power(BASE, L, MOD2);
        
        for (int start = 1; start <= n - L; start++) {
            h1 = (h1 * BASE - nums[start - 1] * aL1 + nums[start + L - 1]) % MOD1;
            h2 = (h2 * BASE - nums[start - 1] * aL2 + nums[start + L - 1]) % MOD2;
            
            if (h1 < 0) h1 += MOD1;
            if (h2 < 0) h2 += MOD2;
            
            long key = (h1 << 32) | h2;
            if (seen.contains(key)) {
                return start;
            }
            seen.add(key);
        }
        return -1;
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        int n = s.length();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = s.charAt(i) - 'a';
        }
        
        int left = 1, right = n;
        int startIdx = -1;
        int bestLen = 0;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int idx = search(mid, s, nums);
            if (idx != -1) {
                startIdx = idx;
                bestLen = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        if (bestLen == 0) {
            System.out.println("");
        } else {
            System.out.println(s.substring(startIdx, startIdx + bestLen));
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashSet;

fn power(mut base: u64, mut exp: u64, mod_val: u64) -> u64 {
    let mut res = 1;
    base %= mod_val;
    while exp > 0 {
        if exp % 2 == 1 {
            res = (res * base) % mod_val;
        }
        base = (base * base) % mod_val;
        exp /= 2;
    }
    res
}

fn search(l: usize, s: &str, nums: &[u32]) -> i32 {
    let n = s.len();
    let mod1 = 1000000007;
    let mod2 = 1000000009;
    let base = 26;
    
    let mut h1 = 0;
    let mut h2 = 0;
    for i in 0..l {
        h1 = (h1 * base + nums[i] as u64) % mod1;
        h2 = (h2 * base + nums[i] as u64) % mod2;
    }
    
    let mut seen = HashSet::new();
    seen.insert((h1 << 32) | h2);
    
    let al1 = power(base, l as u64, mod1);
    let al2 = power(base, l as u64, mod2);
    
    for start in 1..=n-l {
        let prev = nums[start - 1] as u64;
        let next = nums[start + l - 1] as u64;
        
        let term1 = (prev * al1) % mod1;
        h1 = (h1 * base + next + mod1 - term1) % mod1;
        
        let term2 = (prev * al2) % mod2;
        h2 = (h2 * base + next + mod2 - term2) % mod2;
        
        let key = (h1 << 32) | h2;
        if seen.contains(&key) {
            return start as i32;
        }
        seen.insert(key);
    }
    -1
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let s = line.trim();
        let n = s.len();
        let nums: Vec<u32> = s.bytes().map(|b| (b - b'a') as u32).collect();
        
        let mut left = 1;
        let mut right = n;
        let mut start_idx = -1;
        let mut best_len = 0;
        
        while left <= right {
            let mid = left + (right - left) / 2;
            let idx = search(mid, s, &nums);
            if idx != -1 {
                start_idx = idx;
                best_len = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        if best_len == 0 {
            println!("");
        } else {
            let start = start_idx as usize;
            println!("{}", &s[start..start + best_len]);
        }
    }
}`,
        },
    },

    // ==================== HARD #4: Alien Dictionary Order ====================
    {
        title: 'Alien Dictionary Order',
        description:
            'There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.\n\nYou are given a list of strings `words` from the alien language\'s dictionary, where the strings in `words` are sorted lexicographically according to the rules of this new language.\n\nReturn a string of the unique letters in the new alien language sorted in lexicographically increasing order of the alien language. If there is no consistent order of letters (e.g. there is a cycle), return `""`.\n\nIf there are multiple valid orders, return the one that is lexicographically smallest when compared as standard English strings.\n\n**Input Format:**\n- First line: integer `n` (number of words)\n- Next `n` lines: each line contains a word from the alien dictionary.\n\n**Output Format:**\n- A single string containing the sorted alien letters. If no valid order exists, print an empty line.',
        difficulty: 'HARD',
        tags: ['hash-map', 'graph', 'topological-sort'],
        constraints:
            '1 <= n <= 100\n1 <= |words[i]| <= 100\nwords consist of lowercase English letters.',
        hints: "Build a directed graph where an edge `u -> v` exists if letter `u` comes before letter `v`. Check for invalid prefix relationships (like 'abc' sorted before 'ab'). Run topological sort using Kahn's algorithm with a priority queue.",
        editorial:
            '**Approach: Directed Graph + Topological Sort (Kahn\'s BFS)**\n\n1. **Graph Construction:** Compare adjacent words to find the first differing character. If word1 is a prefix of word2 but comes after word2, the ordering is invalid (return `""`). Otherwise, the mismatched characters form a directed edge `c1 -> c2` representing the rule `c1` comes before `c2`.\n2. **Topological Sort:** We use Kahn\'s algorithm. To resolve ties deterministically and obtain the lexicographically smallest topological sort, we store nodes with in-degree 0 in a Min-Priority Queue. If the count of sorted nodes is less than the count of unique letters, a cycle exists, meaning no consistent ordering is possible.\n\n**Time Complexity:** O(N * L) where N is the number of words and L is the average length of a word.\n**Space Complexity:** O(U + E) where U is the number of unique letters (at most 26) and E is the number of relations.',
        examples: [
            {
                title: 'Example 1',
                input: '5\nwrt\nwrf\ner\nett\nrftt',
                output: 'wertf',
                explanation:
                    "From the sorted list, we can deduce:\n- 't' comes before 'f'\n- 'w' comes before 'e'\n- 'r' comes before 't'\n- 'e' comes before 'r'\nThis yields the ordering 'wertf'.",
            },
            {
                title: 'Example 2',
                input: '3\nz\nx\nz',
                output: '',
                explanation:
                    "'z' comes before 'x', but 'x' also comes before 'z'. This cycle makes it invalid.",
            },
        ],
        testcases: [
            { input: '5\nwrt\nwrf\ner\nett\nrftt', output: 'wertf' },
            { input: '3\nz\nx\nz', output: '' },
            { input: '3\nz\nx\ny', output: 'zxy' },
            { input: '2\nz\nz', output: 'z' },
            { input: '2\nabc\nab', output: '' },
            { input: '4\na\nb\nc\nd', output: 'abcd' },
            { input: '4\ncab\ncba\nabc\nabd', output: 'cabd' },
            { input: '2\nbaa\nabcd', output: 'bacd' },
            { input: '3\nza\nzb\nca', output: 'abzc' },
            { input: '4\nz\nx\na\nzb', output: '' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n and words, construct graph and topological sort
    
    return 0;
}`,
            python: `def main():
    # Read words, build graph, perform topological sort using priority queue
    pass

if __name__ == '__main__':
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
    if (!(cin >> n)) return 0;
    vector<string> words(n);
    for (int i = 0; i < n; i++) cin >> words[i];
    
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, int> in_degree;
    
    for (const string& w : words) {
        for (char c : w) {
            if (!adj.count(c)) adj[c] = unordered_set<char>();
            if (!in_degree.count(c)) in_degree[c] = 0;
        }
    }
    
    bool possible = true;
    for (int i = 0; i < n - 1; i++) {
        const string& w1 = words[i];
        const string& w2 = words[i+1];
        if (w1.length() > w2.length() && w1.compare(0, w2.length(), w2) == 0) {
            possible = false;
            break;
        }
        int min_len = min(w1.length(), w2.length());
        for (int j = 0; j < min_len; j++) {
            char c1 = w1[j];
            char c2 = w2[j];
            if (c1 != c2) {
                if (!adj[c1].count(c2)) {
                    adj[c1].insert(c2);
                    in_degree[c2]++;
                }
                break;
            }
        }
    }
    
    if (!possible) {
        cout << "\n";
        return 0;
    }
    
    priority_queue<char, vector<char>, greater<char>> pq;
    for (auto const& [c, count] : in_degree) {
        if (count == 0) {
            pq.push(c);
        }
    }
    
    string res = "";
    while (!pq.empty()) {
        char curr = pq.top();
        pq.pop();
        res += curr;
        for (char neighbor : adj[curr]) {
            in_degree[neighbor]--;
            if (in_degree[neighbor] == 0) {
                pq.push(neighbor);
            }
        }
    }
    
    if (res.length() < in_degree.size()) {
        cout << "\n";
    } else {
        cout << res << "\n";
    }
    return 0;
}`,
            python: `import sys
import heapq

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    words = input_data[1:n+1]
    
    adj = {}
    in_degree = {}
    
    for w in words:
        for c in w:
            if c not in adj:
                adj[c] = set()
            if c not in in_degree:
                in_degree[c] = 0
                
    possible = True
    for i in range(n - 1):
        w1, w2 = words[i], words[i+1]
        if len(w1) > len(w2) and w1.startswith(w2):
            possible = False
            break
        for j in range(min(len(w1), len(w2))):
            c1, c2 = w1[j], w2[j]
            if c1 != c2:
                if c2 not in adj[c1]:
                    adj[c1].add(c2)
                    in_degree[c2] += 1
                break
                
    if not possible:
        print("")
        return
        
    pq = []
    for c in in_degree:
        if in_degree[c] == 0:
            heapq.heappush(pq, c)
            
    res = []
    while pq:
        curr = heapq.heappop(pq)
        res.append(curr)
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                heapq.heappush(pq, neighbor)
                
    if len(res) < len(in_degree):
        print("")
    else:
        print("".join(res))

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
        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = br.readLine().trim();
        }
        
        Map<Character, Set<Character>> adj = new HashMap<>();
        Map<Character, Integer> inDegree = new HashMap<>();
        
        for (String w : words) {
            for (char c : w.toCharArray()) {
                adj.putIfAbsent(c, new HashSet<>());
                inDegree.putIfAbsent(c, 0);
            }
        }
        
        boolean possible = true;
        for (int i = 0; i < n - 1; i++) {
            String w1 = words[i];
            String w2 = words[i+1];
            if (w1.length() > w2.length() && w1.startsWith(w2)) {
                possible = false;
                break;
            }
            int minLen = Math.min(w1.length(), w2.length());
            for (int j = 0; j < minLen; j++) {
                char c1 = w1.charAt(j);
                char c2 = w2.charAt(j);
                if (c1 != c2) {
                    if (!adj.get(c1).contains(c2)) {
                        adj.get(c1).add(c2);
                        inDegree.put(c2, inDegree.get(c2) + 1);
                    }
                    break;
                }
            }
        }
        
        if (!possible) {
            System.out.println("");
            return;
        }
        
        PriorityQueue<Character> pq = new PriorityQueue<>();
        for (char c : inDegree.keySet()) {
            if (inDegree.get(c) == 0) {
                pq.add(c);
            }
        }
        
        StringBuilder sb = new StringBuilder();
        while (!pq.isEmpty()) {
            char curr = pq.poll();
            sb.append(curr);
            for (char neighbor : adj.get(curr)) {
                inDegree.put(neighbor, inDegree.get(neighbor) - 1);
                if (inDegree.get(neighbor) == 0) {
                    pq.add(neighbor);
                }
            }
        }
        
        if (sb.length() < inDegree.size()) {
            System.out.println("");
        } else {
            System.out.println(sb.toString());
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::{HashMap, HashSet, BinaryHeap};
use std::cmp::Ordering;

#[derive(Copy, Clone, Eq, PartialEq)]
struct MinChar(char);

impl Ord for MinChar {
    fn cmp(&self, other: &Self) -> Ordering {
        other.0.cmp(&self.0)
    }
}

impl PartialOrd for MinChar {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_line)) = lines.next() {
        let n: usize = n_line.trim().parse().unwrap();
        let mut words = Vec::with_capacity(n);
        for _ in 0..n {
            if let Some(Ok(line)) = lines.next() {
                words.push(line.trim().to_string());
            }
        }
        
        let mut adj: HashMap<char, HashSet<char>> = HashMap::new();
        let mut in_degree: HashMap<char, i32> = HashMap::new();
        
        for w in &words {
            for c in w.chars() {
                adj.entry(c).or_insert(HashSet::new());
                in_degree.entry(c).or_insert(0);
            }
        }
        
        let mut possible = true;
        for i in 0..n-1 {
            let w1 = &words[i];
            let w2 = &words[i+1];
            if w1.len() > w2.len() && w1.starts_with(w2) {
                possible = false;
                break;
            }
            let w1_chars: Vec<char> = w1.chars().collect();
            let w2_chars: Vec<char> = w2.chars().collect();
            let min_len = std::cmp::min(w1_chars.len(), w2_chars.len());
            for j in 0..min_len {
                let c1 = w1_chars[j];
                let c2 = w2_chars[j];
                if c1 != c2 {
                    if adj.get_mut(&c1).unwrap().insert(c2) {
                        *in_degree.get_mut(&c2).unwrap() += 1;
                    }
                    break;
                }
            }
        }
        
        if !possible {
            println!("");
            return;
        }
        
        let mut pq = BinaryHeap::new();
        for (&c, &deg) in &in_degree {
            if deg == 0 {
                pq.push(MinChar(c));
            }
        }
        
        let mut res = String::new();
        while let Some(MinChar(curr)) = pq.pop() {
            res.push(curr);
            if let Some(neighbors) = adj.get(&curr) {
                for &neighbor in neighbors {
                    let deg = in_degree.get_mut(&neighbor).unwrap();
                    *deg -= 1;
                    if *deg == 0 {
                        pq.push(MinChar(neighbor));
                    }
                }
            }
        }
        
        if res.len() < in_degree.len() {
            println!("");
        } else {
            println!("{}", res);
        }
    }
}`,
        },
    },

    // ==================== HARD #5: Grid Illumination ====================
    {
        title: 'Grid Illumination',
        description:
            'There is a 2D grid of size `n x n` where each cell is initially off (dark). You are given a list of lamp positions `lamps` where `lamps[i] = [r_i, c_i]` indicates that there is a lamp at cell `(r_i, c_i)` which is turned on. When a lamp is turned on, it illuminates its cell and all cells in the same row, column, and two diagonals.\n\nYou are also given a list of queries `queries` where `queries[j] = [r_j, c_j]`. For the `j`-th query, determine whether the cell `(r_j, c_j)` is illuminated or not. After answering the query, you must turn off the lamp at `(r_j, c_j)` and all lamps in the 8 adjacent cells (including diagonal neighbors and the cell itself).\n\nPrint the results of the queries (1 for illuminated, 0 for not illuminated), space-separated on a single line.\n\n**Input Format:**\n- First line: three space-separated integers: `n` (grid size), `L` (number of lamps), `Q` (number of queries)\n- Next `L` lines: each line contains two space-separated integers representing row and col of a lamp.\n- Next `Q` lines: each line contains two space-separated integers representing row and col of a query.\n\n**Output Format:**\n- A single line containing `Q` space-separated integers (either 0 or 1).',
        difficulty: 'HARD',
        tags: ['hash-map', 'hash-set'],
        constraints: '1 <= n <= 10^9\n1 <= L, Q <= 20000\n0 <= r_i, c_i < n',
        hints: 'Since grid size is up to 10^9, we cannot store the grid in a 2D array. Use Hash Maps to count the number of active lamps in each row, column, and diagonals. Also use a Hash Set to track active lamp coordinates to turn them off in O(1) time.',
        editorial:
            '**Approach: Frequency Counter Hash Maps + Unique Coordinates Hash Set**\n\nWe track active lamps using:\n- `row_count[r]`: number of active lamps in row `r`.\n- `col_count[c]`: number of active lamps in column `c`.\n- `diag1_count[r - c]`: number of active lamps on diagonal parallel to the main diagonal.\n- `diag2_count[r + c]`: number of active lamps on diagonal parallel to the anti-diagonal.\n- `lamps`: Hash Set of combined 64-bit coordinates representing active lamp positions.\n\nFor each query `(r, c)`:\n1. If `row_count[r] > 0`, `col_count[c] > 0`, `diag1_count[r-c] > 0`, or `diag2_count[r+c] > 0`, the query cell is illuminated (output 1); otherwise output 0.\n2. Iterate through the 3x3 grid centered at `(r, c)`. For each cell `(nr, nc)`, check if a lamp exists in the `lamps` set. If it does, remove it and decrement the corresponding row, column, and diagonal counts.\n\n**Time Complexity:** O(L + Q) since initialization takes O(L) and each query does at most 9 checks in O(1) time.\n**Space Complexity:** O(L) to store the lamps in the maps and set.',
        examples: [
            {
                title: 'Example 1',
                input: '5 1 1\n0 0\n4 4',
                output: '1',
                explanation:
                    'Lamp is at (0, 0). Query is at (4, 4). Since 4 - 4 == 0 - 0, they are on the same diagonal. It is illuminated, outputting 1.',
            },
            {
                title: 'Example 2',
                input: '6 2 2\n0 0\n4 4\n1 1\n1 2',
                output: '1 0',
                explanation:
                    'Query 1 at (1, 1) is illuminated by both lamps. Output 1. The lamp at (0, 0) is adjacent to (1, 1), so it is turned off. Query 2 at (1, 2) is no longer illuminated by any lamps. Output 0.',
            },
        ],
        testcases: [
            { input: '5 1 1\n0 0\n4 4', output: '1' },
            { input: '5 1 1\n0 0\n1 2', output: '0' },
            { input: '6 2 2\n0 0\n4 4\n1 1\n1 2', output: '1 0' },
            { input: '5 2 2\n0 0\n0 4\n0 4\n0 1', output: '1 1' },
            { input: '10 3 3\n0 0\n4 4\n8 8\n2 2\n4 4\n8 8', output: '1 1 1' },
            { input: '10 2 1\n1 1\n1 1\n1 1', output: '1' },
            { input: '10 2 2\n3 4\n4 3\n3 3\n4 4', output: '1 0' },
            { input: '8 2 2\n2 2\n5 5\n3 3\n3 3', output: '1 1' },
            { input: '5 2 2\n0 0\n4 4\n0 4\n4 0', output: '1 1' },
            { input: '100 1 3\n50 50\n0 0\n50 50\n99 99', output: '1 1 0' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n, L, Q, then lamps and queries
    
    return 0;
}`,
            python: `def main():
    # Read grid size, lamps, queries and solve
    pass

if __name__ == '__main__':
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
    long long n;
    int l, q;
    if (!(cin >> n >> l >> q)) return 0;
    
    unordered_map<int, int> row_count;
    unordered_map<int, int> col_count;
    unordered_map<int, int> diag1_count;
    unordered_map<int, int> diag2_count;
    unordered_set<long long> lamps;
    
    for (int i = 0; i < l; i++) {
        int r, c;
        cin >> r >> c;
        long long key = ((long long)r << 32) | (c & 0xFFFFFFFFLL);
        if (!lamps.count(key)) {
            lamps.insert(key);
            row_count[r]++;
            col_count[c]++;
            diag1_count[r - c]++;
            diag2_count[r + c]++;
        }
    }
    
    for (int i = 0; i < q; i++) {
        int r, c;
        cin >> r >> c;
        if (i > 0) cout << " ";
        
        if (row_count[r] > 0 || col_count[c] > 0 || diag1_count[r - c] > 0 || diag2_count[r + c] > 0) {
            cout << 1;
        } else {
            cout << 0;
        }
        
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                int nr = r + dr;
                int nc = c + dc;
                long long nkey = ((long long)nr << 32) | (nc & 0xFFFFFFFFLL);
                if (lamps.count(nkey)) {
                    lamps.erase(nkey);
                    row_count[nr]--;
                    col_count[nc]--;
                    diag1_count[nr - nc]--;
                    diag2_count[nr + nc]--;
                }
            }
        }
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    l = int(input_data[1])
    q = int(input_data[2])
    
    row_count = {}
    col_count = {}
    diag1_count = {}
    diag2_count = {}
    lamps = set()
    
    idx = 3
    for _ in range(l):
        r = int(input_data[idx])
        c = int(input_data[idx+1])
        idx += 2
        if (r, c) not in lamps:
            lamps.add((r, c))
            row_count[r] = row_count.get(r, 0) + 1
            col_count[c] = col_count.get(c, 0) + 1
            diag1_count[r - c] = diag1_count.get(r - c, 0) + 1
            diag2_count[r + c] = diag2_count.get(r + c, 0) + 1
            
    res = []
    for _ in range(q):
        r = int(input_data[idx])
        c = int(input_data[idx+1])
        idx += 2
        
        if (row_count.get(r, 0) > 0 or 
            col_count.get(c, 0) > 0 or 
            diag1_count.get(r - c, 0) > 0 or 
            diag2_count.get(r + c, 0) > 0):
            res.append("1")
        else:
            res.append("0")
            
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                nr, nc = r + dr, c + dc
                if (nr, nc) in lamps:
                    lamps.remove((nr, nc))
                    row_count[nr] -= 1
                    col_count[nc] -= 1
                    diag1_count[nr - nc] -= 1
                    diag2_count[nr + nc] -= 1
                    
    print(" ".join(res))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        long n = Long.parseLong(st.nextToken());
        int l = Integer.parseInt(st.nextToken());
        int q = Integer.parseInt(st.nextToken());
        
        Map<Integer, Integer> rowCount = new HashMap<>();
        Map<Integer, Integer> colCount = new HashMap<>();
        Map<Integer, Integer> diag1Count = new HashMap<>();
        Map<Integer, Integer> diag2Count = new HashMap<>();
        Set<Long> lamps = new HashSet<>();
        
        for (int i = 0; i < l; i++) {
            st = new StringTokenizer(br.readLine());
            int r = Integer.parseInt(st.nextToken());
            int c = Integer.parseInt(st.nextToken());
            long key = ((long)r << 32) | (c & 0xFFFFFFFFL);
            if (!lamps.contains(key)) {
                lamps.add(key);
                rowCount.put(r, rowCount.getOrDefault(r, 0) + 1);
                colCount.put(c, colCount.getOrDefault(c, 0) + 1);
                diag1Count.put(r - c, diag1Count.getOrDefault(r - c, 0) + 1);
                diag2Count.put(r + c, diag2Count.getOrDefault(r + c, 0) + 1);
            }
        }
        
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            st = new StringTokenizer(br.readLine());
            int r = Integer.parseInt(st.nextToken());
            int c = Integer.parseInt(st.nextToken());
            if (i > 0) sb.append(" ");
            
            if (rowCount.getOrDefault(r, 0) > 0 || 
                colCount.getOrDefault(c, 0) > 0 || 
                diag1Count.getOrDefault(r - c, 0) > 0 || 
                diag2Count.getOrDefault(r + c, 0) > 0) {
                sb.append(1);
            } else {
                sb.append(0);
            }
            
            for (int dr = -1; dr <= 1; dr++) {
                for (int dc = -1; dc <= 1; dc++) {
                    int nr = r + dr;
                    int nc = c + dc;
                    long nkey = ((long)nr << 32) | (nc & 0xFFFFFFFFL);
                    if (lamps.contains(nkey)) {
                        lamps.remove(nkey);
                        rowCount.put(nr, rowCount.get(nr) - 1);
                        colCount.put(nc, colCount.get(nc) - 1);
                        diag1Count.put(nr - nc, diag1Count.get(nr - nc) - 1);
                        diag2Count.put(nr + nc, diag2Count.get(nr + nc) - 1);
                    }
                }
            }
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::{HashMap, HashSet};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(first_line)) = lines.next() {
        let parts: Vec<&str> = first_line.split_whitespace().collect();
        let _n: i64 = parts[0].parse().unwrap();
        let l: usize = parts[1].parse().unwrap();
        let q: usize = parts[2].parse().unwrap();
        
        let mut row_count = HashMap::new();
        let mut col_count = HashMap::new();
        let mut diag1_count = HashMap::new();
        let mut diag2_count = HashMap::new();
        let mut lamps = HashSet::new();
        
        for _ in 0..l {
            if let Some(Ok(line)) = lines.next() {
                let coords: Vec<&str> = line.split_whitespace().collect();
                let r: i32 = coords[0].parse().unwrap();
                let c: i32 = coords[1].parse().unwrap();
                let key = ((r as u64) << 32) | ((c as u32) as u64);
                if lamps.insert(key) {
                    *row_count.entry(r).or_insert(0) += 1;
                    *col_count.entry(c).or_insert(0) += 1;
                    *diag1_count.entry(r - c).or_insert(0) += 1;
                    *diag2_count.entry(r + c).or_insert(0) += 1;
                }
            }
        }
        
        let mut res = Vec::with_capacity(q);
        for _ in 0..q {
            if let Some(Ok(line)) = lines.next() {
                let coords: Vec<&str> = line.split_whitespace().collect();
                let r: i32 = coords[0].parse().unwrap();
                let c: i32 = coords[1].parse().unwrap();
                
                let is_lit = *row_count.get(&r).unwrap_or(&0) > 0
                    || *col_count.get(&c).unwrap_or(&0) > 0
                    || *diag1_count.get(&(r - c)).unwrap_or(&0) > 0
                    || *diag2_count.get(&(r + c)).unwrap_or(&0) > 0;
                
                if is_lit {
                    res.push("1");
                } else {
                    res.push("0");
                }
                
                for dr in -1..=1 {
                    for dc in -1..=1 {
                        let nr = r + dr;
                        let nc = c + dc;
                        let nkey = ((nr as u64) << 32) | ((nc as u32) as u64);
                        if lamps.remove(&nkey) {
                            if let Some(val) = row_count.get_mut(&nr) { *val -= 1; }
                            if let Some(val) = col_count.get_mut(&nc) { *val -= 1; }
                            if let Some(val) = diag1_count.get_mut(&(nr - nc)) { *val -= 1; }
                            if let Some(val) = diag2_count.get_mut(&(nr + nc)) { *val -= 1; }
                        }
                    }
                }
            }
        }
        println!("{}", res.join(" "));
    }
}`,
        },
    },

    // ==================== EASY #6: Unique Number of Occurrences ====================
    {
        title: 'Unique Number of Occurrences',
        description:
            'Given an array of integers `arr`, return `true` if the number of occurrences of each value in the array is unique or `false` otherwise.\n\n**Input Format:**\n- First line: integer `n` (the size of the array)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- Print "true" if the number of occurrences of each value is unique, and "false" otherwise.',
        difficulty: 'EASY',
        tags: ['hash-map', 'hash-set', 'counting'],
        constraints: '1 <= n <= 1000\n-1000 <= arr[i] <= 1000',
        hints: 'First, count the occurrences of each number using a hash map. Then, insert all these occurrences into a hash set. If the size of the set is equal to the size of the map, it means all frequencies are unique.',
        editorial:
            '**Approach: Frequency Map and Set**\n\nWe first traverse the array and construct a frequency map (or Hash Map) to count the number of occurrences of each element.\nNext, we extract all values (frequencies) from the map and insert them into a Hash Set. Since a Hash Set only stores unique elements, we can compare the size of the Hash Set to the size of the Hash Map. If their sizes are equal, every element has a unique frequency. Otherwise, some elements have the same frequency, so we return `false`.\n\n**Time Complexity:** O(N) where N is the length of `arr`, as map operations and set insertions take O(1) on average.\n**Space Complexity:** O(N) to store the elements in the map and their frequencies in the set.',
        examples: [
            {
                title: 'Example 1',
                input: '6\n1 2 2 1 1 3',
                output: 'true',
                explanation:
                    'The value 1 has 3 occurrences, 2 has 2, and 3 has 1. No two values have the same number of occurrences.',
            },
            {
                title: 'Example 2',
                input: '2\n1 2',
                output: 'false',
                explanation: 'Both 1 and 2 occur 1 time. The count of occurrences is not unique.',
            },
        ],
        testcases: [
            { input: '6\n1 2 2 1 1 3', output: 'true' },
            { input: '2\n1 2', output: 'false' },
            { input: '10\n-3 0 1 -3 1 1 1 -3 10 0', output: 'true' },
            { input: '1\n5', output: 'true' },
            { input: '4\n1 1 2 2', output: 'false' },
            { input: '8\n2 3 3 4 4 4 5 5', output: 'false' },
            { input: '9\n10 20 20 30 30 30 40 40 40', output: 'false' },
            { input: '6\n-1 -1 -1 -2 -2 -3', output: 'true' },
            { input: '5\n10 10 10 10 10', output: 'true' },
            { input: '10\n1 2 3 4 5 6 7 8 9 10', output: 'false' },
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

if __name__ == '__main__':
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
    if (!(cin >> n)) return 0;
    unordered_map<int, int> counts;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        counts[x]++;
    }
    unordered_set<int> occurrences;
    bool unique = true;
    for (auto const& [val, count] : counts) {
        if (occurrences.count(count)) {
            unique = false;
            break;
        }
        occurrences.insert(count);
    }
    cout << (unique ? "true" : "false") << "\n";
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    arr = [int(x) for x in input_data[1:n+1]]
    counts = {}
    for x in arr:
        counts[x] = counts.get(x, 0) + 1
    occurrences = set()
    unique = True
    for count in counts.values():
        if count in occurrences:
            unique = False
            break
        occurrences.add(count)
    print("true" if unique else "false")

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
        StringTokenizer st = new StringTokenizer(br.readLine());
        Map<Integer, Integer> counts = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int x = Integer.parseInt(st.nextToken());
            counts.put(x, counts.getOrDefault(x, 0) + 1);
        }
        Set<Integer> occurrences = new HashSet<>();
        boolean unique = true;
        for (int count : counts.values()) {
            if (occurrences.contains(count)) {
                unique = false;
                break;
            }
            occurrences.add(count);
        }
        System.out.println(unique ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::{HashMap, HashSet};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_str)) = lines.next() {
        let n: usize = n_str.trim().parse().unwrap();
        if let Some(Ok(arr_str)) = lines.next() {
            let arr: Vec<i32> = arr_str.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut counts = HashMap::new();
            for &x in &arr {
                *counts.entry(x).or_insert(0) += 1;
            }
            let mut occurrences = HashSet::new();
            let mut unique = true;
            for &count in counts.values() {
                if !occurrences.insert(count) {
                    unique = false;
                    break;
                }
            }
            if unique {
                println!("true");
            } else {
                println!("false");
            }
        }
    }
}`,
        },
    },

    // ==================== EASY #7: First Unique Character ====================
    {
        title: 'First Unique Character',
        description:
            'Given a string `s`, find the first non-repeating character in it and print its index. If it does not exist, print -1.\n\n**Input Format:**\n- A single line containing the string `s`.\n\n**Output Format:**\n- Print the 0-based index of the first non-repeating character, or -1 if none exists.',
        difficulty: 'EASY',
        tags: ['hash-map', 'frequency'],
        constraints: '1 <= s.length <= 10^5\ns consists of lowercase English letters.',
        hints: 'Use a hash map or an array of size 26 to count the frequency of each character. Then iterate through the string a second time and return the index of the first character with a count of 1.',
        editorial:
            '**Approach: Two-pass Frequency Count**\n\nWe count the occurrences of each character in the string. Since the alphabet is lowercase English letters, we can use a frequency array of size 26 or a hash map. In the first pass, we populate the frequency table. In the second pass, we scan the string from left to right, checking the frequency of each character. The first character that has a frequency of 1 is the first non-repeating character, and we print its index. If we scan the entire string and find no such character, we print -1.\n\n**Time Complexity:** O(N) where N is the length of `s`, as we do two linear scans.\n**Space Complexity:** O(1) because the size of the alphabet is constant (26).',
        examples: [
            {
                title: 'Example 1',
                input: 'leetcode',
                output: '0',
                explanation: "The character 'l' is the first unique character, located at index 0.",
            },
            {
                title: 'Example 2',
                input: 'loveleetcode',
                output: '2',
                explanation: "The character 'v' is the first unique character, located at index 2.",
            },
        ],
        testcases: [
            { input: 'leetcode', output: '0' },
            { input: 'loveleetcode', output: '2' },
            { input: 'aabb', output: '-1' },
            { input: 'a', output: '0' },
            { input: 'abacaba', output: '3' },
            { input: 'abcdefg', output: '0' },
            { input: 'aabbccddeeffg', output: '12' },
            { input: 'hheelllloowwoorrlldd', output: '-1' },
            { input: 'xyzxy', output: '2' },
            { input: 'repetition', output: '0' },
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

if __name__ == '__main__':
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
    string s;
    if (!(cin >> s)) return 0;
    vector<int> counts(26, 0);
    for (char c : s) {
        counts[c - 'a']++;
    }
    int ans = -1;
    for (int i = 0; i < s.length(); i++) {
        if (counts[s[i] - 'a'] == 1) {
            ans = i;
            break;
        }
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    s = lines[0]
    counts = {}
    for c in s:
        counts[c] = counts.get(c, 0) + 1
    ans = -1
    for i, c in enumerate(s):
        if counts[c] == 1:
            ans = i
            break
    print(ans)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }
        int ans = -1;
        for (int i = 0; i < s.length(); i++) {
            if (counts[s.charAt(i) - 'a'] == 1) {
                ans = i;
                break;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let s = line.trim();
        let mut counts = vec![0; 26];
        for b in s.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        let mut ans = -1;
        for (i, b) in s.bytes().enumerate() {
            if counts[(b - b'a') as usize] == 1 {
                ans = i as i32;
                break;
            }
        }
        println!("{}", ans);
    }
}`,
        },
    },

    // ==================== MEDIUM #6: Max Length Equal Subarray ====================
    {
        title: 'Max Length Equal Subarray',
        description:
            'Given a binary array `nums` (containing only 0 and 1), find the maximum length of a contiguous subarray with an equal number of 0 and 1.\n\n**Input Format:**\n- First line: integer `n` (the size of the array)\n- Second line: `n` space-separated integers (either 0 or 1)\n\n**Output Format:**\n- Print the maximum length of such a contiguous subarray.',
        difficulty: 'MEDIUM',
        tags: ['hash-map', 'prefix-sum'],
        constraints: '1 <= n <= 10^5\nnums[i] is either 0 or 1.',
        hints: 'Change 0s in the array to -1s. The problem then reduces to finding the maximum length subarray with a sum of 0. You can solve this by storing the first occurrence of prefix sums in a hash map.',
        editorial:
            '**Approach: Prefix Sum and Hash Map**\n\nIf we treat 0 as -1, the problem becomes finding the longest subarray with sum 0.\nWe compute the prefix sums of this modified array. If a prefix sum value repeats at index `i` and index `j` (where `i > j`), it means the elements between `j + 1` and `i` sum up to 0 (meaning equal number of 0s and 1s).\nTo maximize this length, we store the first index where each prefix sum is encountered in a Hash Map. If we see the prefix sum again, we calculate the difference between the current index and the stored first index. The maximum of these differences is our answer.\nWe initialize our map with `0 -> -1` to handle subarrays starting from index 0.\n\n**Time Complexity:** O(N) as we traverse the array of size N once.\n**Space Complexity:** O(N) to store prefix sums in the map in the worst case.',
        examples: [
            {
                title: 'Example 1',
                input: '2\n0 1',
                output: '2',
                explanation:
                    '[0, 1] is the longest contiguous subarray with an equal number of 0 and 1.',
            },
            {
                title: 'Example 2',
                input: '3\n0 1 0',
                output: '2',
                explanation:
                    '[0, 1] or [1, 0] is a contiguous subarray with equal 0 and 1. The maximum length is 2.',
            },
        ],
        testcases: [
            { input: '2\n0 1', output: '2' },
            { input: '3\n0 1 0', output: '2' },
            { input: '7\n0 1 0 0 1 1 0', output: '6' },
            { input: '4\n1 1 1 1', output: '0' },
            { input: '1\n0', output: '0' },
            { input: '10\n0 0 1 0 0 0 1 1 1 0', output: '8' },
            { input: '8\n0 1 1 1 0 0 1 0', output: '8' },
            { input: '6\n0 0 0 1 1 1', output: '6' },
            { input: '6\n1 1 0 0 1 1', output: '4' },
            { input: '12\n0 1 0 1 0 1 0 1 0 1 0 1', output: '12' },
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

if __name__ == '__main__':
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
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    unordered_map<int, int> m;
    m[0] = -1;
    int max_len = 0;
    int curr_sum = 0;
    for (int i = 0; i < n; i++) {
        curr_sum += (nums[i] == 1 ? 1 : -1);
        if (m.count(curr_sum)) {
            max_len = max(max_len, i - m[curr_sum]);
        } else {
            m[curr_sum] = i;
        }
    }
    cout << max_len << "\n";
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    m = {0: -1}
    max_len = 0
    curr_sum = 0
    for i, num in enumerate(nums):
        curr_sum += 1 if num == 1 else -1
        if curr_sum in m:
            max_len = max(max_len, i - m[curr_sum])
        else:
            m[curr_sum] = i
    print(max_len)

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
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(st.nextToken());
        }
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int maxLen = 0;
        int currSum = 0;
        for (int i = 0; i < n; i++) {
            currSum += (nums[i] == 1 ? 1 : -1);
            if (map.containsKey(currSum)) {
                maxLen = Math.max(maxLen, i - map.get(currSum));
            } else {
                map.put(currSum, i);
            }
        }
        System.out.println(maxLen);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashMap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_str)) = lines.next() {
        let n: usize = n_str.trim().parse().unwrap();
        if let Some(Ok(nums_str)) = lines.next() {
            let nums: Vec<i32> = nums_str.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut map = HashMap::new();
            map.insert(0, -1);
            let mut max_len = 0;
            let mut curr_sum = 0;
            for i in 0..n {
                curr_sum += if nums[i] == 1 { 1 } else { -1 };
                if let Some(&prev_idx) = map.get(&curr_sum) {
                    let len = i as i32 - prev_idx;
                    if len > max_len {
                        max_len = len;
                    }
                } else {
                    map.insert(curr_sum, i as i32);
                }
            }
            println!("{}", max_len);
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #7: Subarray Sums Divisible by K ====================
    {
        title: 'Subarray Sums Divisible by K',
        description:
            'Given an integer array `nums` and an integer `k`, return the number of non-empty subarrays that have a sum divisible by `k`.\n\n**Input Format:**\n- First line: integer `n` (the size of the array)\n- Second line: `n` space-separated integers\n- Third line: integer `k`\n\n**Output Format:**\n- Print the number of subarrays whose sum is divisible by `k`.',
        difficulty: 'MEDIUM',
        tags: ['hash-map', 'prefix-sum'],
        constraints: '1 <= n <= 30000\n-10000 <= nums[i] <= 10000\n2 <= k <= 10000',
        hints: 'Store frequencies of prefix sums modulo k. Remember that modulo operations in languages like C++, Java, and Rust can yield negative numbers, so you need to adjust negative remainders by adding k.',
        editorial:
            '**Approach: Modulo Prefix Sum Frequency Map**\n\nWe track the running sum of the array, `curr_sum`. For any subarray `nums[i..j]` to have a sum divisible by `k`, the condition `(prefixSum[j] - prefixSum[i-1]) % k == 0` must hold. This is equivalent to `prefixSum[j] % k == prefixSum[i-1] % k`.\nThus, we can keep track of the occurrences of each remainder when the prefix sums are divided by `k`.\nAt each index, we compute `rem = curr_sum % k`. In C++, Java, and Rust, `curr_sum % k` can be negative. We normalize it to a positive value in `[0, k-1]` using `((curr_sum % k) + k) % k`.\nWe add the current frequency of `rem` to our result and then increment its count in our map. We initialize the map with `0 -> 1` to represent a prefix sum of 0 having been seen once.\n\n**Time Complexity:** O(N) since we perform a single pass through the array of size N.\n**Space Complexity:** O(min(N, K)) to store the frequencies of the remainders in the hash map.',
        examples: [
            {
                title: 'Example 1',
                input: '6\n4 5 0 -2 -3 1\n5',
                output: '7',
                explanation:
                    'There are 7 subarrays with a sum divisible by k = 5:\n[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]',
            },
            {
                title: 'Example 2',
                input: '1\n5\n9',
                output: '0',
                explanation: 'The only subarray is [5], whose sum 5 is not divisible by 9.',
            },
        ],
        testcases: [
            { input: '6\n4 5 0 -2 -3 1\n5', output: '7' },
            { input: '1\n5\n9', output: '0' },
            { input: '5\n-1 2 9 4 0\n2', output: '7' },
            { input: '3\n1 2 3\n3', output: '3' },
            { input: '5\n-1 -1 -1 -1 -1\n5', output: '1' },
            { input: '8\n1 1 1 1 1 1 1 1\n2', output: '16' },
            { input: '4\n1 2 3 4\n5', output: '2' },
            { input: '7\n1 -2 3 -4 5 -6 7\n1', output: '28' },
            { input: '10\n10 20 30 40 50 60 70 80 90 100\n7', output: '10' },
            { input: '12\n0 0 0 0 0 0 0 0 0 0 0 0\n13', output: '78' },
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

if __name__ == '__main__':
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
    if (!(cin >> n)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    long long k;
    cin >> k;
    unordered_map<long long, long long> counts;
    counts[0] = 1;
    long long curr_sum = 0;
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        curr_sum += nums[i];
        long long rem = ((curr_sum % k) + k) % k;
        ans += counts[rem];
        counts[rem]++;
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    k = int(input_data[n+1])
    counts = {0: 1}
    curr_sum = 0
    ans = 0
    for num in nums:
        curr_sum += num
        rem = curr_sum % k
        if rem in counts:
            ans += counts[rem]
            counts[rem] += 1
        else:
            counts[rem] = 1
    print(ans)

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
        StringTokenizer st = new StringTokenizer(br.readLine());
        long[] nums = new long[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Long.parseLong(st.nextToken());
        }
        long k = Long.parseLong(br.readLine().trim());
        Map<Long, Long> counts = new HashMap<>();
        counts.put(0L, 1L);
        long currSum = 0;
        long ans = 0;
        for (int i = 0; i < n; i++) {
            currSum += nums[i];
            long rem = ((currSum % k) + k) % k;
            ans += counts.getOrDefault(rem, 0L);
            counts.put(rem, counts.getOrDefault(rem, 0L) + 1);
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashMap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_str)) = lines.next() {
        let n: usize = n_str.trim().parse().unwrap();
        if let Some(Ok(nums_str)) = lines.next() {
            let nums: Vec<i64> = nums_str.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            if let Some(Ok(k_str)) = lines.next() {
                let k: i64 = k_str.trim().parse().unwrap();
                let mut counts = HashMap::new();
                counts.insert(0, 1);
                let mut curr_sum = 0;
                let mut ans = 0;
                for i in 0..n {
                    curr_sum += nums[i];
                    let mut rem = curr_sum % k;
                    if rem < 0 {
                        rem += k;
                    }
                    if let Some(&cnt) = counts.get(&rem) {
                        ans += cnt;
                        *counts.get_mut(&rem).unwrap() += 1;
                    } else {
                        counts.insert(rem, 1);
                    }
                }
                println!("{}", ans);
            }
        }
    }
}`,
        },
    },

    // ==================== HARD #6: Max Points on a Line ====================
    {
        title: 'Max Points on a Line',
        description:
            'Given an array of 2D points on a plane, find the maximum number of points that lie on the same straight line.\n\n**Input Format:**\n- First line: integer `n` (the number of points)\n- Next `n` lines: two space-separated integers `x` and `y` representing each point.\n\n**Output Format:**\n- Print the maximum number of points on a line.',
        difficulty: 'HARD',
        tags: ['hash-map', 'math', 'geometry'],
        constraints: '1 <= n <= 300\n-10^4 <= x, y <= 10^4\nAll points are unique.',
        hints: 'For each point, calculate the slopes to all other points. Use a hash map to count the frequency of each slope. Represent the slope as a simplified fraction (numerator and denominator after dividing by their GCD) to avoid precision errors.',
        editorial:
            '**Approach: Slope Hash Map with GCD**\n\nFor `n <= 2`, the answer is always `n` because any two points define a line.\nFor `n > 2`, we can iterate through each point `i` and calculate the slope of the line connecting `i` to every other point `j`. The slope of the line between `(x1, y1)` and `(x2, y2)` is `(y2 - y1) / (x2 - x1)`. However, floating-point divisions can suffer from precision errors.\nTo avoid this, we can store the slope in its simplified fraction form `(dy / g, dx / g)`, where `dy = y2 - y1`, `dx = x2 - x1`, and `g = gcd(dy, dx)`.\nTo ensure that negative slopes are represented uniquely, we can normalize the signs: if `dx < 0` or (`dx == 0` and `dy < 0`), we multiply both `dx` and `dy` by -1.\nFor each point `i`, we use a Hash Map to record the count of each normalized slope. The maximum count of a slope + 1 (representing the point `i` itself) gives the maximum number of points on a line passing through `i`. We take the maximum of this value over all points.\n\n**Time Complexity:** O(N^2 * log(MAX_COORD)) where N is the number of points. We pair every point with all other points, and calculating the GCD takes logarithmic time.\n**Space Complexity:** O(N) to store the slopes in the hash map for each point.',
        examples: [
            {
                title: 'Example 1',
                input: '3\n1 1\n2 2\n3 3',
                output: '3',
                explanation: 'All three points lie on the line y = x.',
            },
            {
                title: 'Example 2',
                input: '6\n1 1\n3 2\n5 3\n4 1\n2 3\n1 4',
                output: '4',
                explanation:
                    'The points (1, 4), (2, 3), (3, 2), and (4, 1) lie on the line y = -x + 5. The maximum number of points on a line is 4.',
            },
        ],
        testcases: [
            { input: '3\n1 1\n2 2\n3 3', output: '3' },
            { input: '6\n1 1\n3 2\n5 3\n4 1\n2 3\n1 4', output: '4' },
            { input: '1\n0 0', output: '1' },
            { input: '2\n0 0\n1 1', output: '2' },
            { input: '4\n1 1\n1 2\n1 3\n1 4', output: '4' },
            { input: '5\n1 1\n2 1\n3 1\n4 1\n5 1', output: '5' },
            { input: '9\n0 0\n1 1\n2 2\n3 3\n0 1\n1 2\n2 3\n0 2\n2 0', output: '4' },
            { input: '4\n0 0\n10 10\n-5 -5\n1 2', output: '3' },
            { input: '8\n0 0\n1 2\n2 4\n3 6\n1 1\n2 2\n3 3\n4 4', output: '5' },
            { input: '10\n0 0\n1 3\n2 6\n3 9\n4 12\n1 1\n2 2\n3 3\n4 4\n5 5', output: '6' },
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

if __name__ == '__main__':
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

int get_gcd(int a, int b) {
    a = abs(a);
    b = abs(b);
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> points(n);
    for (int i = 0; i < n; i++) {
        cin >> points[i].first >> points[i].second;
    }
    if (n <= 2) {
        cout << n << "\n";
        return 0;
    }
    int max_points = 0;
    for (int i = 0; i < n; i++) {
        map<pair<int, int>, int> slope_counts;
        int local_max = 0;
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            int dx = points[j].first - points[i].first;
            int dy = points[j].second - points[i].second;
            int g = get_gcd(dx, dy);
            dx /= g;
            dy /= g;
            if (dx < 0 || (dx == 0 && dy < 0)) {
                dx = -dx;
                dy = -dy;
            }
            slope_counts[{dx, dy}]++;
            local_max = max(local_max, slope_counts[{dx, dy}]);
        }
        max_points = max(max_points, local_max + 1);
    }
    cout << max_points << "\n";
    return 0;
}`,
            python: `import sys
import math

def get_gcd(a, b):
    return math.gcd(a, b)

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    points = []
    idx = 1
    for _ in range(n):
        x = int(input_data[idx])
        y = int(input_data[idx+1])
        points.append((x, y))
        idx += 2
    if n <= 2:
        print(n)
        return
    max_points = 0
    for i in range(n):
        slope_counts = {}
        local_max = 0
        for j in range(n):
            if i == j:
                continue
            dx = points[j][0] - points[i][0]
            dy = points[j][1] - points[i][1]
            g = get_gcd(dx, dy)
            dx //= g
            dy //= g
            if dx < 0 or (dx == 0 and dy < 0):
                dx = -dx
                dy = -dy
            slope_counts[(dx, dy)] = slope_counts.get((dx, dy), 0) + 1
            if slope_counts[(dx, dy)] > local_max:
                local_max = slope_counts[(dx, dy)]
        if local_max + 1 > max_points:
            max_points = local_max + 1
    print(max_points)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    private static int getGcd(int a, int b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b > 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] x = new int[n];
        int[] y = new int[n];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            x[i] = Integer.parseInt(st.nextToken());
            y[i] = Integer.parseInt(st.nextToken());
        }
        if (n <= 2) {
            System.out.println(n);
            return;
        }
        int maxPoints = 0;
        for (int i = 0; i < n; i++) {
            Map<String, Integer> slopeCounts = new HashMap<>();
            int localMax = 0;
            for (int j = 0; j < n; j++) {
                if (i == j) continue;
                int dx = x[j] - x[i];
                int dy = y[j] - y[i];
                int g = getGcd(dx, dy);
                dx /= g;
                dy /= g;
                if (dx < 0 || (dx == 0 && dy < 0)) {
                    dx = -dx;
                    dy = -dy;
                }
                String key = dx + "_" + dy;
                slopeCounts.put(key, slopeCounts.getOrDefault(key, 0) + 1);
                localMax = Math.max(localMax, slopeCounts.get(key));
            }
            maxPoints = Math.max(maxPoints, localMax + 1);
        }
        System.out.println(maxPoints);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashMap;

fn get_gcd(mut a: i32, mut b: i32) -> i32 {
    a = a.abs();
    b = b.abs();
    while b > 0 {
        let temp = b;
        b = a % b;
        a = temp;
    }
    a
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(n_str)) = lines.next() {
        let n: usize = n_str.trim().parse().unwrap();
        let mut x = Vec::with_capacity(n);
        let mut y = Vec::with_capacity(n);
        for _ in 0..n {
            if let Some(Ok(line)) = lines.next() {
                let parts: Vec<&str> = line.split_whitespace().collect();
                x.push(parts[0].parse::<i32>().unwrap());
                y.push(parts[1].parse::<i32>().unwrap());
            }
        }
        if n <= 2 {
            println!("{}", n);
            return;
        }
        let mut max_points = 0;
        for i in 0..n {
            let mut slope_counts = HashMap::new();
            let mut local_max = 0;
            for j in 0..n {
                if i == j {
                    continue;
                }
                let mut dx = x[j] - x[i];
                let mut dy = y[j] - y[i];
                let g = get_gcd(dx, dy);
                dx /= g;
                dy /= g;
                if dx < 0 || (dx == 0 && dy < 0) {
                    dx = -dx;
                    dy = -dy;
                }
                let count = slope_counts.entry((dx, dy)).or_insert(0);
                *count += 1;
                if *count > local_max {
                    local_max = *count;
                }
            }
            if local_max + 1 > max_points {
                max_points = local_max + 1;
            }
        }
        println!("{}", max_points);
    }
}`,
        },
    },
]
