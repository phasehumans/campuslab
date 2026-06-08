import type { SeedProblem } from './types.js'

export const sortingSearchingProblems: SeedProblem[] = [
    // ==================== EASY #1: Binary Search ====================
    {
        title: 'Binary Search',
        description:
            'Given a sorted array of N integers and a target value K, return the 0-indexed index of K if it exists. Otherwise, return -1.\n\nYou must implement a solution with O(log N) time complexity.\n\n**Input Format:**\n- First line: two space-separated integers N and K\n- Second line: N space-separated integers representing the sorted array\n\n**Output Format:**\n- A single integer: the index of K, or -1 if not found',
        difficulty: 'EASY',
        tags: ['binary-search'],
        constraints:
            '1 <= N <= 10^5\n-10^9 <= arr[i], K <= 10^9\nThe array is sorted in ascending order',
        hints: 'Use the divide and conquer approach of binary search. Maintain two pointers: low and high. Find the middle element and check if it is equal, smaller, or larger than K.',
        editorial:
            '**Approach: Binary Search**\n\nInitialize low = 0 and high = N - 1. In each step, calculate mid = low + (high - low) / 2. If arr[mid] == K, we found the element. If arr[mid] < K, narrow search space to the right half by setting low = mid + 1. Otherwise, narrow search space to the left half by setting high = mid - 1.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '6 9\n-1 0 3 5 9 12',
                output: '4',
                explanation: '9 exists in the array at index 4.',
            },
            {
                title: 'Example 2',
                input: '6 2\n-1 0 3 5 9 12',
                output: '-1',
                explanation: '2 does not exist in the array.',
            },
        ],
        testcases: [
            { input: '6 9\n-1 0 3 5 9 12', output: '4' },
            { input: '6 2\n-1 0 3 5 9 12', output: '-1' },
            { input: '1 5\n5', output: '0' },
            { input: '1 2\n5', output: '-1' },
            { input: '2 3\n3 5', output: '0' },
            { input: '2 5\n3 5', output: '1' },
            { input: '2 4\n3 5', output: '-1' },
            { input: '5 10\n2 4 6 8 10', output: '4' },
            { input: '5 2\n2 4 6 8 10', output: '0' },
            { input: '10 7\n1 2 3 4 5 6 7 8 9 10', output: '6' },
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
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    int ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == k) {
            ans = mid;
            break;
        } else if (arr[mid] < k) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    arr = [int(x) for x in data[2:]]
    low = 0
    high = n - 1
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == k:
            ans = mid
            break
        elif arr[mid] < k:
            low = mid + 1
        else:
            high = mid - 1
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
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        long k = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == k) {
                ans = mid;
                break;
            } else if (arr[mid] < k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let k: i64 = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            let mut ans = -1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] == k {
                    ans = mid;
                    break;
                } else if arr[mid as usize] < k {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`,
        },
    },

    // ==================== EASY #2: Count Sort Frequencies ====================
    {
        title: 'Count Sort Frequencies',
        description:
            'Given an array of N integers where all integers are between 0 and 100 (inclusive), count the frequency of each integer and output them in ascending order of the integer. Only print the integers that appear at least once, along with their frequencies.\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers\n\n**Output Format:**\n- For each unique integer present in the array (in ascending order), print the integer and its frequency separated by a space, each on a new line.',
        difficulty: 'EASY',
        tags: ['sorting'],
        constraints: '1 <= N <= 10^5\n0 <= arr[i] <= 100',
        hints: 'Since the elements are constrained to the range [0, 100], you can use an auxiliary array of size 101 to count the frequencies. This is the core concept of Counting Sort.',
        editorial:
            '**Approach: Counting Sort Frequency Array**\n\nCreate a frequency array of size 101 initialized to 0. Traverse the input array and increment the frequency for each number. Finally, iterate from 0 to 100, and for any index with a non-zero count, print the index (the number) and its frequency.\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(1) (since the size of the frequency array is fixed at 101)',
        examples: [
            {
                title: 'Example 1',
                input: '6\n4 3 4 3 1 3',
                output: '1 1\n3 3\n4 2',
                explanation: '1 appears 1 time, 3 appears 3 times, and 4 appears 2 times.',
            },
            {
                title: 'Example 2',
                input: '3\n100 0 100',
                output: '0 1\n100 2',
                explanation: '0 appears 1 time, 100 appears 2 times.',
            },
        ],
        testcases: [
            { input: '6\n4 3 4 3 1 3', output: '1 1\n3 3\n4 2' },
            { input: '3\n100 0 100', output: '0 1\n100 2' },
            { input: '1\n42', output: '42 1' },
            { input: '5\n10 10 10 10 10', output: '10 5' },
            { input: '8\n1 2 3 4 5 6 7 8', output: '1 1\n2 1\n3 1\n4 1\n5 1\n6 1\n7 1\n8 1' },
            { input: '10\n0 0 0 0 0 0 0 0 0 0', output: '0 10' },
            { input: '5\n50 60 50 60 70', output: '50 2\n60 2\n70 1' },
            { input: '4\n5 5 10 10', output: '5 2\n10 2' },
            { input: '7\n1 1 2 2 3 3 4', output: '1 2\n2 2\n3 2\n4 1' },
            { input: '2\n10 20', output: '10 1\n20 1' },
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
    if (!(cin >> n)) return 0;
    vector<int> freq(101, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        freq[x]++;
    }
    for (int i = 0; i <= 100; i++) {
        if (freq[i] > 0) {
            cout << i << " " << freq[i] << "\n";
        }
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
    freq = [0] * 101
    for x in data[1:]:
        freq[int(x)] += 1
    for i in range(101):
        if freq[i] > 0:
            print(f"{i} {freq[i]}")

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
        int[] freq = new int[101];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                int x = Integer.parseInt(st.nextToken());
                freq[x]++;
            }
        }
        for (int i = 0; i <= 100; i++) {
            if (freq[i] > 0) {
                System.out.println(i + " " + freq[i]);
            }
        }
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let _n: usize = line.trim().parse().unwrap();
        let mut freq = vec![0; 101];
        if let Some(Ok(line2)) = lines.next() {
            for token in line2.split_whitespace() {
                let x: usize = token.parse().unwrap();
                freq[x] += 1;
            }
        }
        for i in 0..=100 {
            if freq[i] > 0 {
                writeln!(out, "{} {}", i, freq[i]).unwrap();
            }
        }
    }
}`,
        },
    },

    // ==================== EASY #3: First and Last Position of Target ====================
    {
        title: 'First and Last Position of Target',
        description:
            'Given an array of integers sorted in non-decreasing order, find the starting and ending position of a given target value.\n\nIf the target is not found in the array, return [-1, -1] as two space-separated integers.\n\nYou must write an algorithm with O(log N) runtime complexity.\n\n**Input Format:**\n- First line: two space-separated integers N and target\n- Second line: N space-separated integers representing the sorted array\n\n**Output Format:**\n- Two space-separated integers: the start index and end index of the target',
        difficulty: 'EASY',
        tags: ['binary-search'],
        constraints:
            '1 <= N <= 10^5\n-10^9 <= arr[i], target <= 10^9\nall elements are sorted in non-decreasing order',
        hints: 'Run binary search twice: once to find the leftmost (first) index of the target, and once to find the rightmost (last) index.',
        editorial:
            '**Approach: Dual Binary Search**\n\nTo find the first occurrence, perform binary search. When arr[mid] == target, save the index and search the left half (high = mid - 1) to find an even earlier occurrence. For the last occurrence, when arr[mid] == target, save the index and search the right half (low = mid + 1).\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '6 8\n5 7 7 8 8 10',
                output: '3 4',
                explanation: 'The target 8 is found at index 3 and index 4.',
            },
            {
                title: 'Example 2',
                input: '6 6\n5 7 7 8 8 10',
                output: '-1 -1',
                explanation: 'The target 6 is not found in the array.',
            },
        ],
        testcases: [
            { input: '6 8\n5 7 7 8 8 10', output: '3 4' },
            { input: '6 6\n5 7 7 8 8 10', output: '-1 -1' },
            { input: '1 5\n5', output: '0 0' },
            { input: '1 4\n5', output: '-1 -1' },
            { input: '2 3\n3 3', output: '0 1' },
            { input: '2 3\n3 5', output: '0 0' },
            { input: '2 5\n3 5', output: '1 1' },
            { input: '10 8\n1 2 3 4 5 6 7 8 8 8', output: '7 9' },
            { input: '10 1\n1 1 1 1 1 1 1 1 1 1', output: '0 9' },
            { input: '5 2\n1 2 3 4 5', output: '1 1' },
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
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int first = -1, last = -1;
    
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            first = mid;
            high = mid - 1;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            last = mid;
            low = mid + 1;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    cout << first << " " << last << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    target = int(data[1])
    arr = [int(x) for x in data[2:]]
    
    first, last = -1, -1
    low, high = 0, n - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            first = mid
            high = mid - 1
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    low, high = 0, n - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            last = mid
            low = mid + 1
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    print(f"{first} {last}")

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
        int n = Integer.parseInt(st.nextToken());
        long target = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int first = -1, last = -1;
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                first = mid;
                high = mid - 1;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        low = 0; high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                last = mid;
                low = mid + 1;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        System.out.println(first + " " + last);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let target: i64 = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut first = -1;
            let mut last = -1;
            
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] == target {
                    first = mid;
                    high = mid - 1;
                } else if arr[mid as usize] < target {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] == target {
                    last = mid;
                    low = mid + 1;
                } else if arr[mid as usize] < target {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            writeln!(out, "{} {}", first, last).unwrap();
        }
    }
}`,
        },
    },

    // ==================== EASY #4: Search Insert Position ====================
    {
        title: 'Search Insert Position',
        description:
            'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log N) runtime complexity.\n\n**Input Format:**\n- First line: two space-separated integers N and target\n- Second line: N space-separated integers representing the sorted array of distinct integers\n\n**Output Format:**\n- A single integer: the insert index',
        difficulty: 'EASY',
        tags: ['binary-search'],
        constraints:
            '1 <= N <= 10^5\n-10^9 <= arr[i], target <= 10^9\nall elements are distinct and sorted in ascending order',
        hints: 'Find the first index where arr[index] >= target. If no such element exists, the insert position is at the end of the array (index N).',
        editorial:
            '**Approach: Binary Search for Lower Bound**\n\nWe want to find the first index mid where arr[mid] >= target. If we find such an element, we search left (high = mid - 1) to find a smaller index that still satisfies the condition. If arr[mid] < target, we search right (low = mid + 1). The answer is the smallest index that satisfies the condition.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4 5\n1 3 5 6',
                output: '2',
                explanation: '5 is found at index 2.',
            },
            {
                title: 'Example 2',
                input: '4 2\n1 3 5 6',
                output: '1',
                explanation: '2 is not present, it would be inserted at index 1.',
            },
        ],
        testcases: [
            { input: '4 5\n1 3 5 6', output: '2' },
            { input: '4 2\n1 3 5 6', output: '1' },
            { input: '4 7\n1 3 5 6', output: '4' },
            { input: '4 0\n1 3 5 6', output: '0' },
            { input: '1 0\n5', output: '0' },
            { input: '1 6\n5', output: '1' },
            { input: '1 5\n5', output: '0' },
            { input: '5 3\n1 2 4 5 6', output: '2' },
            { input: '5 4\n1 2 5 6 7', output: '2' },
            { input: '6 10\n2 4 6 8 12 14', output: '4' },
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
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    int ans = n;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    target = int(data[1])
    arr = [int(x) for x in data[2:]]
    low, high = 0, n - 1
    ans = n
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] >= target:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
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
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        long target = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        int ans = n;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] >= target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let target: i64 = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            let mut ans = n;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] >= target {
                    ans = mid as usize;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`,
        },
    },

    // ==================== EASY #5: Find Peak Element ====================
    {
        title: 'Find Peak Element',
        description:
            'A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array, find a peak element, and return its index.\n\nYou may imagine that arr[-1] = arr[N] = -infinity. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.\n\nYou must write an algorithm with O(log N) runtime complexity. All test cases will have a unique peak index (i.e., the array is unimodal).\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers\n\n**Output Format:**\n- A single integer: the index of the peak element',
        difficulty: 'EASY',
        tags: ['binary-search'],
        constraints:
            '1 <= N <= 10^5\n-2^31 <= arr[i] <= 2^31 - 1\narr[i] != arr[i+1] for all valid i',
        hints: 'If arr[mid] < arr[mid + 1], then a peak must exist to the right of mid. Otherwise, a peak must exist to the left (including mid).',
        editorial:
            '**Approach: Binary Search**\n\nIf arr[mid] < arr[mid + 1], then we are in an ascending slope. The peak must be on the right side, so we set low = mid + 1. Otherwise, we are in a descending slope, meaning a peak must be at mid or to its left, so we set high = mid. The search converges when low == high.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4\n1 2 3 1',
                output: '2',
                explanation: '3 is a peak element and its index is 2.',
            },
            {
                title: 'Example 2',
                input: '5\n1 3 5 4 2',
                output: '2',
                explanation: '5 is a peak element and its index is 2.',
            },
        ],
        testcases: [
            { input: '4\n1 2 3 1', output: '2' },
            { input: '5\n1 3 5 4 2', output: '2' },
            { input: '1\n10', output: '0' },
            { input: '2\n3 2', output: '0' },
            { input: '2\n1 4', output: '1' },
            { input: '3\n1 5 2', output: '1' },
            { input: '5\n10 8 6 4 2', output: '0' },
            { input: '5\n2 4 6 8 10', output: '4' },
            { input: '6\n1 2 3 4 5 2', output: '4' },
            { input: '7\n-10 -5 0 5 10 2 -3', output: '4' },
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
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] < arr[mid + 1]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    cout << low << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    low, high = 0, n - 1
    while low < high:
        mid = (low + high) // 2
        if arr[mid] < arr[mid + 1]:
            low = mid + 1
        else:
            high = mid
    print(low)

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
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] < arr[mid + 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        System.out.println(low);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0usize;
            let mut high = n - 1;
            while low < high {
                let mid = low + (high - low) / 2;
                if arr[mid] < arr[mid + 1] {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            writeln!(out, "{}", low).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #6: Search in Rotated Sorted Array ====================
    {
        title: 'Search in Rotated Sorted Array',
        description:
            'There is an integer array sorted in ascending order (with distinct values). Prior to being passed to your function, the array is possibly rotated at an unknown pivot index.\n\nGiven the array after the possible rotation and an integer target, return the index of target if it is in the array, or -1 if it is not in the array.\n\nYou must write an algorithm with O(log N) runtime complexity.\n\n**Input Format:**\n- First line: two space-separated integers N and target\n- Second line: N space-separated integers representing the rotated sorted array\n\n**Output Format:**\n- A single integer: the index of target (0-indexed), or -1 if not found',
        difficulty: 'MEDIUM',
        tags: ['binary-search'],
        constraints:
            '1 <= N <= 10^5\n-10^9 <= arr[i], target <= 10^9\nAll elements of the array are unique\nThe array is sorted and possibly rotated',
        hints: 'In a rotated sorted array, one half (either left or right) is always sorted. Identify which half is sorted, and check if the target falls within that sorted half.',
        editorial:
            '**Approach: Rotated Binary Search**\n\nFor any mid, at least one of the halves [low, mid] or [mid, high] is sorted.\n- If arr[low] <= arr[mid], the left half is sorted. If target lies within [arr[low], arr[mid]), search left (high = mid - 1); otherwise search right (low = mid + 1).\n- If the right half is sorted, and target lies within (arr[mid], arr[high]], search right (low = mid + 1); otherwise search left (high = mid - 1).\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '7 0\n4 5 6 7 0 1 2',
                output: '4',
                explanation: '0 is at index 4.',
            },
            {
                title: 'Example 2',
                input: '7 3\n4 5 6 7 0 1 2',
                output: '-1',
                explanation: '3 is not in the array.',
            },
        ],
        testcases: [
            { input: '7 0\n4 5 6 7 0 1 2', output: '4' },
            { input: '7 3\n4 5 6 7 0 1 2', output: '-1' },
            { input: '1 0\n0', output: '0' },
            { input: '1 3\n0', output: '-1' },
            { input: '2 3\n3 1', output: '0' },
            { input: '2 1\n3 1', output: '1' },
            { input: '5 5\n5 1 2 3 4', output: '0' },
            { input: '5 2\n5 1 2 3 4', output: '2' },
            { input: '5 4\n5 1 2 3 4', output: '4' },
            { input: '8 10\n12 15 20 1 3 5 8 10', output: '7' },
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
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    int ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            ans = mid;
            break;
        }
        if (arr[low] <= arr[mid]) {
            if (target >= arr[low] && target < arr[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (target > arr[mid] && target <= arr[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    target = int(data[1])
    arr = [int(x) for x in data[2:]]
    low, high = 0, n - 1
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            ans = mid
            break
        if arr[low] <= arr[mid]:
            if arr[low] <= target < arr[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            if arr[mid] < target <= arr[high]:
                low = mid + 1
            else:
                high = mid - 1
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
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        long target = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                ans = mid;
                break;
            }
            if (arr[low] <= arr[mid]) {
                if (target >= arr[low] && target < arr[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (target > arr[mid] && target <= arr[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let target: i64 = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            let mut ans = -1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] == target {
                    ans = mid;
                    break;
                }
                if arr[low as usize] <= arr[mid as usize] {
                    if target >= arr[low as usize] && target < arr[mid as usize] {
                        high = mid - 1;
                    } else {
                        low = mid + 1;
                    }
                } else {
                    if target > arr[mid as usize] && target <= arr[high as usize] {
                        low = mid + 1;
                    } else {
                        high = mid - 1;
                    }
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #7: Find Minimum in Rotated Sorted Array ====================
    {
        title: 'Find Minimum in Rotated Sorted Array',
        description:
            'Suppose an array of length N sorted in ascending order is rotated between 1 and N times.\n\nGiven the sorted rotated array of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log N) time.\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers representing the rotated sorted array\n\n**Output Format:**\n- A single integer: the minimum element in the array',
        difficulty: 'MEDIUM',
        tags: ['binary-search'],
        constraints:
            '1 <= N <= 10^5\n-10^9 <= arr[i] <= 10^9\nAll elements of the array are unique\nThe array is sorted and rotated',
        hints: 'If arr[mid] > arr[high], then the minimum element must be to the right of mid (low = mid + 1). Otherwise, the minimum element is at mid or to its left (high = mid).',
        editorial:
            '**Approach: Binary Search**\n\nCompare arr[mid] with arr[high].\n- If arr[mid] > arr[high], it means the pivot (and thus the minimum) is in the right half. So set low = mid + 1.\n- Otherwise, the minimum element must be in the left half, including mid. So set high = mid.\nWhen low == high, we have found the minimum element.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '5\n3 4 5 1 2',
                output: '1',
                explanation: 'The minimum element is 1.',
            },
            {
                title: 'Example 2',
                input: '7\n4 5 6 7 0 1 2',
                output: '0',
                explanation: 'The minimum element is 0.',
            },
        ],
        testcases: [
            { input: '5\n3 4 5 1 2', output: '1' },
            { input: '7\n4 5 6 7 0 1 2', output: '0' },
            { input: '1\n10', output: '10' },
            { input: '2\n2 1', output: '1' },
            { input: '2\n1 2', output: '1' },
            { input: '3\n3 1 2', output: '1' },
            { input: '3\n2 3 1', output: '1' },
            { input: '5\n10 20 30 40 5', output: '5' },
            { input: '8\n8 9 10 1 2 3 4 5', output: '1' },
            { input: '6\n6 7 8 9 10 5', output: '5' },
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
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] > arr[high]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    cout << arr[low] << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    low, high = 0, n - 1
    while low < high:
        mid = (low + high) // 2
        if arr[mid] > arr[high]:
            low = mid + 1
        else:
            high = mid
    print(arr[low])

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
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] > arr[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        System.out.println(arr[low]);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0usize;
            let mut high = n - 1;
            while low < high {
                let mid = low + (high - low) / 2;
                if arr[mid] > arr[high] {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            writeln!(out, "{}", arr[low]).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #8: H-Index ====================
    {
        title: 'H-Index',
        description:
            "Given an array of integers citations where citations[i] is the number of citations a researcher received for their i-th paper, return the researcher's h-index.\n\nThe h-index is defined as the maximum value of h such that the given researcher has published at least h papers that have each been cited at least h times.\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers representing citations\n\n**Output Format:**\n- A single integer representing the researcher's h-index",
        difficulty: 'MEDIUM',
        tags: ['sorting'],
        constraints: '1 <= N <= 10^5\n0 <= citations[i] <= 10^9',
        hints: 'Sort the citations array in ascending order. If citations[i] >= N - i, then we have at least N - i papers with citations >= citations[i].',
        editorial:
            '**Approach: Sorting**\n\nSort citations in ascending order. For each paper at index i, the number of papers with at least citations[i] citations is N - i. We find the maximum value of N - i such that citations[i] >= N - i.\n\n**Time Complexity:** O(N log N)\n**Space Complexity:** O(1) or O(N) depending on the sort algorithm',
        examples: [
            {
                title: 'Example 1',
                input: '5\n3 0 6 1 5',
                output: '3',
                explanation:
                    'The researcher has 5 papers in total. 3 papers have at least 3 citations each (3, 5, 6).',
            },
            {
                title: 'Example 2',
                input: '3\n1 3 1',
                output: '1',
                explanation: 'Only 1 paper has at least 1 citation.',
            },
        ],
        testcases: [
            { input: '5\n3 0 6 1 5', output: '3' },
            { input: '3\n1 3 1', output: '1' },
            { input: '1\n0', output: '0' },
            { input: '1\n100', output: '1' },
            { input: '5\n10 8 5 4 3', output: '4' },
            { input: '4\n0 0 0 0', output: '0' },
            { input: '6\n10 10 10 10 10 10', output: '6' },
            { input: '5\n1 1 1 1 1', output: '1' },
            { input: '5\n2 2 2 2 2', output: '2' },
            { input: '7\n4 0 5 1 6 3 2', output: '3' },
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
    if (!(cin >> n)) return 0;
    vector<int> citations(n);
    for (int i = 0; i < n; i++) cin >> citations[i];
    sort(citations.begin(), citations.end());
    int h = 0;
    for (int i = 0; i < n; i++) {
        if (citations[i] >= n - i) {
            h = max(h, n - i);
        }
    }
    cout << h << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    citations = [int(x) for x in data[1:]]
    citations.sort()
    h = 0
    for i in range(n):
        if citations[i] >= n - i:
            h = max(h, n - i)
    print(h)

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
        int[] citations = new int[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                citations[i] = Integer.parseInt(st.nextToken());
            }
        }
        Arrays.sort(citations);
        int h = 0;
        for (int i = 0; i < n; i++) {
            if (citations[i] >= n - i) {
                h = Math.max(h, n - i);
            }
        }
        System.out.println(h);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let mut citations: Vec<i32> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            citations.sort_unstable();
            let mut h = 0;
            for i in 0..n {
                if citations[i] >= (n - i) as i32 {
                    h = std::cmp::max(h, (n - i) as i32);
                }
            }
            writeln!(out, "{}", h).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #9: Book Allocation Problem ====================
    {
        title: 'Book Allocation Problem',
        description:
            'Given N books, the i-th book has A[i] pages. There are M students. The task is to allocate all books to the M students such that:\n1. Each student gets at least one book.\n2. Each book is allocated to exactly one student.\n3. The allocation is contiguous; i.e., a student can only be allocated books that are adjacent in the list.\n\nAllocate the books such that the maximum number of pages allocated to a student is minimized. Return this minimized maximum. If it is impossible to allocate books (e.g. if M > N), return -1.\n\n**Input Format:**\n- First line: two space-separated integers N and M\n- Second line: N space-separated integers representing pages of each book\n\n**Output Format:**\n- A single integer: the minimized maximum number of pages, or -1 if impossible',
        difficulty: 'MEDIUM',
        tags: ['binary-search'],
        constraints: '1 <= N <= 10^5\n1 <= M <= 10^5\n1 <= A[i] <= 10^9',
        hints: 'The answer lies in the range [max(A), sum(A)]. Use binary search on this range. For a middle value, check if it is possible to allocate books such that no student gets more pages than that value.',
        editorial:
            '**Approach: Binary Search on Answer**\n\nWe define search space: low = max(A) (since a student must take the largest book), high = sum(A) (if 1 student takes all books). For each mid, check if we can allocate books using at most M students. If yes, search left for a smaller maximum (high = mid - 1). If no, search right (low = mid + 1).\n\n**Time Complexity:** O(N log(sum(A)))\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4 2\n12 34 67 90',
                output: '113',
                explanation:
                    'Minimizing maximum pages allocated yields 113 by assigning [12, 34, 67] and [90].',
            },
            {
                title: 'Example 2',
                input: '3 4\n10 20 30',
                output: '-1',
                explanation: 'Impossible since students M > books N.',
            },
        ],
        testcases: [
            { input: '4 2\n12 34 67 90', output: '113' },
            { input: '3 4\n10 20 30', output: '-1' },
            { input: '1 1\n50', output: '50' },
            { input: '2 1\n10 20', output: '30' },
            { input: '2 2\n10 20', output: '20' },
            { input: '5 2\n10 20 30 40 50', output: '90' },
            { input: '6 3\n15 20 10 35 15 20', output: '45' },
            { input: '4 3\n5 10 15 20', output: '20' },
            { input: '4 4\n5 10 15 20', output: '20' },
            { input: '5 1\n100 200 300 400 500', output: '1500' },
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
bool isPossible(const vector<long long>& A, int n, int m, long long maxPages) {
    int students = 1;
    long long currentPages = 0;
    for (int i = 0; i < n; i++) {
        if (A[i] > maxPages) return false;
        if (currentPages + A[i] > maxPages) {
            students++;
            currentPages = A[i];
            if (students > m) return false;
        } else {
            currentPages += A[i];
        }
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<long long> A(n);
    long long low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        cin >> A[i];
        low = max(low, A[i]);
        high += A[i];
    }
    if (m > n) {
        cout << -1 << "\n";
        return 0;
    }
    long long ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (isPossible(A, n, m, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys
def is_possible(A, n, m, max_pages):
    students = 1
    current_pages = 0
    for i in range(n):
        if A[i] > max_pages:
            return False
        if current_pages + A[i] > max_pages:
            students += 1
            current_pages = A[i]
            if students > m:
                return False
        else:
            current_pages += A[i]
    return True

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    m = int(data[1])
    A = [int(x) for x in data[2:]]
    if m > n:
        print(-1)
        return
    low = max(A)
    high = sum(A)
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if is_possible(A, n, m, mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    print(ans)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static boolean isPossible(long[] A, int n, int m, long maxPages) {
        int students = 1;
        long currentPages = 0;
        for (int i = 0; i < n; i++) {
            if (A[i] > maxPages) return false;
            if (currentPages + A[i] > maxPages) {
                students++;
                currentPages = A[i];
                if (students > m) return false;
            } else {
                currentPages += A[i];
            }
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        long[] A = new long[n];
        line = br.readLine();
        long low = 0, high = 0;
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                A[i] = Long.parseLong(st.nextToken());
                low = Math.max(low, A[i]);
                high += A[i];
            }
        }
        if (m > n) {
            System.out.println(-1);
            return;
        }
        long ans = -1;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (isPossible(A, n, m, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn is_possible(arr: &[i64], m: usize, max_pages: i64) -> bool {
    let mut students = 1;
    let mut current_pages = 0;
    for &val in arr {
        if val > max_pages { return false; }
        if current_pages + val > max_pages {
            students += 1;
            current_pages = val;
            if students > m { return false; }
        } else {
            current_pages += val;
        }
    }
    true
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let m: usize = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            if m > n {
                writeln!(out, "-1").unwrap();
                return;
            }
            let mut low = *arr.iter().max().unwrap();
            let mut high: i64 = arr.iter().sum();
            let mut ans = -1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if is_possible(&arr, m, mid) {
                    ans = mid;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #10: Sort Colors ====================
    {
        title: 'Sort Colors',
        description:
            "Given an array nums with N objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function, in O(N) time complexity and O(1) space complexity.\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers (each is 0, 1, or 2)\n\n**Output Format:**\n- A single line with N space-separated integers representing the sorted array",
        difficulty: 'MEDIUM',
        tags: ['sorting'],
        constraints: '1 <= N <= 10^5\nnums[i] is 0, 1, or 2',
        hints: 'Use the Dutch National Flag algorithm. Maintain three pointers: low, mid, and high. Keep 0s before low, 1s between low and mid, and 2s after high.',
        editorial:
            '**Approach: Dutch National Flag (Three-way Partitioning)**\n\nMaintain low (for 0s), mid (for 1s), and high (for 2s). Traverse the array with mid:\n- If nums[mid] == 0: swap(nums[low], nums[mid]), increment low and mid.\n- If nums[mid] == 1: increment mid.\n- If nums[mid] == 2: swap(nums[mid], nums[high]), decrement high.\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '6\n2 0 2 1 1 0',
                output: '0 0 1 1 2 2',
                explanation: 'The 0s, 1s, and 2s are grouped together.',
            },
            {
                title: 'Example 2',
                input: '3\n2 0 1',
                output: '0 1 2',
                explanation: 'Output is sorted.',
            },
        ],
        testcases: [
            { input: '6\n2 0 2 1 1 0', output: '0 0 1 1 2 2' },
            { input: '3\n2 0 1', output: '0 1 2' },
            { input: '1\n0', output: '0' },
            { input: '1\n1', output: '1' },
            { input: '1\n2', output: '2' },
            { input: '4\n2 2 2 2', output: '2 2 2 2' },
            { input: '5\n0 0 0 0 0', output: '0 0 0 0 0' },
            { input: '3\n1 1 1', output: '1 1 1' },
            { input: '5\n2 1 0 2 1', output: '0 1 1 2 2' },
            { input: '8\n2 0 1 2 0 1 2 0', output: '0 0 0 1 1 2 2 2' },
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
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (arr[mid] == 0) {
            swap(arr[low], arr[mid]);
            low++;
            mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            swap(arr[mid], arr[high]);
            high--;
        }
    }
    for (int i = 0; i < n; i++) {
        cout << arr[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    low, mid = 0, 0
    high = n - 1
    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 1:
            mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
    print(" ".join(map(str, arr)))

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
        int[] arr = new int[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        int low = 0, mid = 0, high = n - 1;
        while (mid <= high) {
            if (arr[mid] == 0) {
                int temp = arr[low];
                arr[low] = arr[mid];
                arr[mid] = temp;
                low++;
                mid++;
            } else if (arr[mid] == 1) {
                mid++;
            } else {
                int temp = arr[mid];
                arr[mid] = arr[high];
                arr[high] = temp;
                high--;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(arr[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let mut arr: Vec<i32> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0isize;
            let mut mid = 0isize;
            let mut high = (n as isize) - 1;
            while mid <= high {
                if arr[mid as usize] == 0 {
                    arr.swap(low as usize, mid as usize);
                    low += 1;
                    mid += 1;
                } else if arr[mid as usize] == 1 {
                    mid += 1;
                } else {
                    arr.swap(mid as usize, high as usize);
                    high -= 1;
                }
            }
            let strs: Vec<String> = arr.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`,
        },
    },

    // ==================== HARD #11: Find Median from Data Stream ====================
    {
        title: 'Find Median from Data Stream',
        description:
            'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement a system that receives a stream of integers and prints the median after each insertion.\n\nIf the median is a whole number, print it as an integer (e.g., 3). If the median has a fractional part, print it with exactly one decimal place (e.g., 2.5).\n\n**Input Format:**\n- First line: integer N, the number of elements in the stream\n- Second line: N space-separated integers representing the stream of elements as they arrive\n\n**Output Format:**\n- A single line with N space-separated values representing the median after each insertion',
        difficulty: 'HARD',
        tags: ['sorting'],
        constraints: '1 <= N <= 10^5\n-10^9 <= arr[i] <= 10^9',
        hints: 'Use two heaps (priority queues): a max-heap to store the smaller half of the numbers, and a min-heap to store the larger half. Keep the sizes balanced.',
        editorial:
            "**Approach: Two Heaps (Max-Heap & Min-Heap)**\n\nWe maintain two heaps:\n1. max_heap: stores the smaller half of numbers (size is either equal to or 1 greater than min_heap).\n2. min_heap: stores the larger half of numbers.\n\nFor each number, add to max_heap if it is smaller than max_heap's peak, otherwise add to min_heap. Rebalance the heaps so their size difference is at most 1. The median is either the peak of max_heap (if odd size) or the average of both peaks (if even size).\n\n**Time Complexity:** O(N log N)\n**Space Complexity:** O(N)",
        examples: [
            {
                title: 'Example 1',
                input: '3\n2 3 4',
                output: '2 2.5 3',
                explanation: 'Insert 2 (median 2); insert 3 (median 2.5); insert 4 (median 3).',
            },
            {
                title: 'Example 2',
                input: '4\n5 15 1 3',
                output: '5 10 5 4',
                explanation: '5 (median 5); 15 (median 10); 1 (median 5); 3 (median 4).',
            },
        ],
        testcases: [
            { input: '3\n2 3 4', output: '2 2.5 3' },
            { input: '4\n5 15 1 3', output: '5 10 5 4' },
            { input: '1\n10', output: '10' },
            { input: '2\n-1 -2', output: '-1 -1.5' },
            { input: '5\n1 2 3 4 5', output: '1 1.5 2 2.5 3' },
            { input: '6\n6 5 4 3 2 1', output: '6 5.5 5 4.5 4 3.5' },
            { input: '5\n10 -10 20 -20 30', output: '10 0 10 0 10' },
            { input: '8\n1 3 -1 -3 5 7 -5 -7', output: '1 2 1 0 1 2 1 0' },
            { input: '4\n100 100 100 100', output: '100 100 100 100' },
            { input: '5\n0 0 0 0 0', output: '0 0 0 0 0' },
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
    if (!(cin >> n)) return 0;
    priority_queue<long long> max_heap; // stores left half
    priority_queue<long long, vector<long long>, greater<long long>> min_heap; // stores right half
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        if (max_heap.empty() || x <= max_heap.top()) {
            max_heap.push(x);
        } else {
            min_heap.push(x);
        }
        
        // Rebalance
        if (max_heap.size() > min_heap.size() + 1) {
            min_heap.push(max_heap.top());
            max_heap.pop();
        } else if (min_heap.size() > max_heap.size()) {
            max_heap.push(min_heap.top());
            max_heap.pop();
        }
        
        if (i > 0) cout << " ";
        // Output median
        if (max_heap.size() > min_heap.size()) {
            cout << max_heap.top();
        } else {
            long long sum = max_heap.top() + min_heap.top();
            if (sum % 2 == 0) {
                cout << sum / 2;
            } else {
                cout << (sum / 2.0);
            }
        }
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
import heapq

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    stream = [int(x) for x in data[1:]]
    
    max_heap = [] # left (max heap, store negative values)
    min_heap = [] # right (min heap, store positive values)
    
    ans = []
    for x in stream:
        if not max_heap or x <= -max_heap[0]:
            heapq.heappush(max_heap, -x)
        else:
            heapq.heappush(min_heap, x)
            
        # balance
        if len(max_heap) > len(min_heap) + 1:
            heapq.heappush(min_heap, -heapq.heappop(max_heap))
        elif len(min_heap) > len(max_heap):
            heapq.heappush(max_heap, -heapq.heappop(min_heap))
            
        if len(max_heap) > len(min_heap):
            ans.append(str(-max_heap[0]))
        else:
            s = -max_heap[0] + min_heap[0]
            if s % 2 == 0:
                ans.append(str(s // 2))
            else:
                ans.append(str(s / 2))
    print(" ".join(ans))

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
        line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        PriorityQueue<Long> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        PriorityQueue<Long> minHeap = new PriorityQueue<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            long x = Long.parseLong(st.nextToken());
            if (maxHeap.isEmpty() || x <= maxHeap.peek()) {
                maxHeap.add(x);
            } else {
                minHeap.add(x);
            }
            
            if (maxHeap.size() > minHeap.size() + 1) {
                minHeap.add(maxHeap.poll());
            } else if (minHeap.size() > maxHeap.size()) {
                maxHeap.add(minHeap.poll());
            }
            
            if (i > 0) sb.append(" ");
            if (maxHeap.size() > minHeap.size()) {
                sb.append(maxHeap.peek());
            } else {
                long sum = maxHeap.peek() + minHeap.peek();
                if (sum % 2 == 0) {
                    sb.append(sum / 2);
                } else {
                    sb.append(sum / 2.0);
                }
            }
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let mut max_heap = BinaryHeap::new();
            let mut min_heap = BinaryHeap::new();
            
            let mut tokens = line2.split_whitespace();
            for i in 0..n {
                let x: i64 = tokens.next().unwrap().parse().unwrap();
                if max_heap.is_empty() || x <= *max_heap.peek().unwrap() {
                    max_heap.push(x);
                } else {
                    min_heap.push(Reverse(x));
                }
                
                if max_heap.len() > min_heap.len() + 1 {
                    let top = max_heap.pop().unwrap();
                    min_heap.push(Reverse(top));
                } else if min_heap.len() > max_heap.len() {
                    let Reverse(top) = min_heap.pop().unwrap();
                    max_heap.push(top);
                }
                
                if i > 0 {
                    write!(out, " ").unwrap();
                }
                if max_heap.len() > min_heap.len() {
                    write!(out, "{}", max_heap.peek().unwrap()).unwrap();
                } else {
                    let left = *max_heap.peek().unwrap();
                    let Reverse(right) = *min_heap.peek().unwrap();
                    let sum = left + right;
                    if sum % 2 == 0 {
                        write!(out, "{}", sum / 2).unwrap();
                    } else {
                        write!(out, "{}", (sum as f64) / 2.0).unwrap();
                    }
                }
            }
            writeln!(out).unwrap();
        }
    }
}`,
        },
    },

    // ==================== HARD #12: Count Smaller Numbers After Self ====================
    {
        title: 'Count Smaller Numbers After Self',
        description:
            'Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers\n\n**Output Format:**\n- A single line containing N space-separated integers representing the counts',
        difficulty: 'HARD',
        tags: ['sorting', 'divide-and-conquer', 'merge-sort'],
        constraints: '1 <= N <= 10^5\n-10^4 <= nums[i] <= 10^4',
        hints: 'Process from right to left. Use a Binary Indexed Tree (Fenwick Tree) or Segment Tree after coordinate compression to count how many elements smaller than the current element have been processed so far.',
        editorial:
            '**Approach: Fenwick Tree (Binary Indexed Tree) + Coordinate Compression**\n\nIterate from right to left. We map each number to its rank in sorted unique elements (coordinate compression). We query the sum in the Fenwick Tree up to rank - 1 to find how many processed elements are strictly smaller, and then increment the count of the current rank in the Fenwick Tree.\n\n**Time Complexity:** O(N log N)\n**Space Complexity:** O(N)',
        examples: [
            {
                title: 'Example 1',
                input: '4\n5 2 6 1',
                output: '2 1 1 0',
                explanation:
                    'For 5, there are 2 smaller elements to the right (2 and 1). For 2, 1 is smaller. For 6, 1 is smaller. For 1, 0 smaller.',
            },
            {
                title: 'Example 2',
                input: '4\n-1 -1 0 0',
                output: '0 0 0 0',
                explanation: 'No elements strictly smaller to the right.',
            },
        ],
        testcases: [
            { input: '4\n5 2 6 1', output: '2 1 1 0' },
            { input: '4\n-1 -1 0 0', output: '0 0 0 0' },
            { input: '1\n10', output: '0' },
            { input: '5\n5 4 3 2 1', output: '4 3 2 1 0' },
            { input: '5\n1 2 3 4 5', output: '0 0 0 0 0' },
            { input: '6\n1 3 2 3 1 2', output: '0 3 1 2 0 0' },
            { input: '2\n10 -10', output: '1 0' },
            { input: '3\n2 0 1', output: '2 0 0' },
            { input: '5\n-5 -2 -3 -1 -4', output: '0 2 1 1 0' },
            { input: '7\n7 5 6 3 4 1 2', output: '6 4 4 2 2 0 0' },
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

struct Fenwick {
    int size;
    vector<int> tree;
    Fenwick(int n) : size(n), tree(n + 1, 0) {}
    void add(int i, int delta) {
        for (; i <= size; i += i & -i) tree[i] += delta;
    }
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & -i) sum += tree[i];
        return sum;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<int> sorted_nums = nums;
    sort(sorted_nums.begin(), sorted_nums.end());
    sorted_nums.erase(unique(sorted_nums.begin(), sorted_nums.end()), sorted_nums.end());
    
    auto get_rank = [&](int val) {
        return lower_bound(sorted_nums.begin(), sorted_nums.end(), val) - sorted_nums.begin() + 1;
    };
    
    Fenwick bit(sorted_nums.size());
    vector<int> ans(n);
    for (int i = n - 1; i >= 0; i--) {
        int rank = get_rank(nums[i]);
        ans[i] = bit.query(rank - 1);
        bit.add(rank, 1);
    }
    
    for (int i = 0; i < n; i++) {
        cout << ans[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
import bisect

class Fenwick:
    def __init__(self, size):
        self.size = size
        self.tree = [0] * (size + 1)
        
    def add(self, i, delta):
        while i <= self.size:
            self.tree[i] += delta
            i += i & -i
            
    def query(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:]]
    
    sorted_nums = sorted(list(set(nums)))
    def get_rank(val):
        return bisect.bisect_left(sorted_nums, val) + 1
        
    bit = Fenwick(len(sorted_nums))
    ans = [0] * n
    for i in range(n - 1, -1, -1):
        rank = get_rank(nums[i])
        ans[i] = bit.query(rank - 1)
        bit.add(rank, 1)
        
    print(" ".join(map(str, ans)))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Fenwick {
        int size;
        int[] tree;
        Fenwick(int n) {
            this.size = n;
            this.tree = new int[n + 1];
        }
        void add(int i, int delta) {
            for (; i <= size; i += i & -i) tree[i] += delta;
        }
        int query(int i) {
            int sum = 0;
            for (; i > 0; i -= i & -i) sum += tree[i];
            return sum;
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] nums = new int[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                nums[i] = Integer.parseInt(st.nextToken());
            }
        }
        int[] sortedNums = nums.clone();
        Arrays.sort(sortedNums);
        int uniqueCount = 0;
        for (int i = 0; i < n; i++) {
            if (i == 0 || sortedNums[i] != sortedNums[i - 1]) {
                sortedNums[uniqueCount++] = sortedNums[i];
            }
        }
        int[] uniqueSorted = Arrays.copyOf(sortedNums, uniqueCount);
        
        Fenwick bit = new Fenwick(uniqueCount);
        int[] ans = new int[n];
        for (int i = n - 1; i >= 0; i--) {
            int rank = Arrays.binarySearch(uniqueSorted, nums[i]) + 1;
            ans[i] = bit.query(rank - 1);
            bit.add(rank, 1);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(ans[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

struct Fenwick {
    size: usize,
    tree: Vec<i32>,
}

impl Fenwick {
    fn new(n: usize) -> Self {
        Fenwick {
            size: n,
            tree: vec![0; n + 1],
        }
    }
    fn add(&mut self, mut i: usize, delta: i32) {
        while i <= self.size {
            self.tree[i] += delta;
            i += i & (i.wrapping_neg());
        }
    }
    fn query(&self, mut i: usize) -> i32 {
        let mut sum = 0;
        while i > 0 {
            sum += self.tree[i];
            i -= i & (i.wrapping_neg());
        }
        sum
    }
}

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let nums: Vec<i32> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut sorted_nums = nums.clone();
            sorted_nums.sort_unstable();
            sorted_nums.dedup();
            
            let mut bit = Fenwick::new(sorted_nums.len());
            let mut ans = vec![0; n];
            for i in (0..n).rev() {
                let val = nums[i];
                let rank = sorted_nums.binary_search(&val).unwrap() + 1;
                ans[i] = bit.query(rank - 1);
                bit.add(rank, 1);
            }
            let strs: Vec<String> = ans.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`,
        },
    },

    // ==================== HARD #13: Split Array Largest Sum ====================
    {
        title: 'Split Array Largest Sum',
        description:
            'Given an integer array nums and an integer k, split nums into k non-empty contiguous subarrays such that the largest sum of any subarray is minimized.\n\nReturn the minimized largest sum of the split.\n\n**Input Format:**\n- First line: two space-separated integers N and K\n- Second line: N space-separated integers\n\n**Output Format:**\n- A single integer representing the minimized largest sum',
        difficulty: 'HARD',
        tags: ['binary-search'],
        constraints: '1 <= N <= 10^5\n1 <= K <= min(N, 100)\n0 <= nums[i] <= 10^9',
        hints: 'This is another binary search on answer problem. The search space is [max(nums), sum(nums)]. Write a helper function to verify if it is possible to split the array into at most K subarrays with a max sum limit.',
        editorial:
            '**Approach: Binary Search on Answer**\n\nDefine low = max(nums) and high = sum(nums). For a target sum mid, traverse the array and greedily group elements. If the current subarray sum exceeds mid, we must start a new subarray. If the total number of subarrays exceeds K, then mid is too small. Otherwise, we try a smaller maximum.\n\n**Time Complexity:** O(N log(sum(nums)))\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '5 2\n7 2 5 10 8',
                output: '18',
                explanation:
                    'Split into [7, 2, 5] and [10, 8]. The largest sum of the subarrays is 18.',
            },
            {
                title: 'Example 2',
                input: '5 3\n1 2 3 4 5',
                output: '6',
                explanation:
                    'Split into [1, 2, 3], [4], and [5]. The largest sum of the subarrays is 6.',
            },
        ],
        testcases: [
            { input: '5 2\n7 2 5 10 8', output: '18' },
            { input: '5 3\n1 2 3 4 5', output: '6' },
            { input: '1 1\n100', output: '100' },
            { input: '2 1\n10 20', output: '30' },
            { input: '2 2\n10 20', output: '20' },
            { input: '6 3\n1 2 3 4 5 6', output: '9' },
            { input: '5 2\n1 2 10 3 4', output: '13' },
            { input: '4 2\n10 20 30 40', output: '60' },
            { input: '4 3\n10 20 30 40', output: '40' },
            { input: '5 5\n100 200 300 400 500', output: '500' },
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
bool canSplit(const vector<long long>& nums, int k, long long max_sum) {
    long long current_sum = 0;
    int count = 1;
    for (long long num : nums) {
        if (current_sum + num > max_sum) {
            count++;
            current_sum = num;
            if (count > k) return false;
        } else {
            current_sum += num;
        }
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> nums(n);
    long long low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
        low = max(low, nums[i]);
        high += nums[i];
    }
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (canSplit(nums, k, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys
def can_split(nums, k, max_sum):
    current_sum = 0
    count = 1
    for num in nums:
        if current_sum + num > max_sum:
            count += 1
            current_sum = num
            if count > k:
                return False
        else:
            current_sum += num
    return True

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    nums = [int(x) for x in data[2:]]
    low = max(nums)
    high = sum(nums)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        if can_split(nums, k, mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    print(ans)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static boolean canSplit(long[] nums, int k, long max_sum) {
        long current_sum = 0;
        int count = 1;
        for (long num : nums) {
            if (current_sum + num > max_sum) {
                count++;
                current_sum = num;
                if (count > k) return false;
            } else {
                current_sum += num;
            }
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        long[] nums = new long[n];
        line = br.readLine();
        long low = 0, high = 0;
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                nums[i] = Long.parseLong(st.nextToken());
                low = Math.max(low, nums[i]);
                high += nums[i];
            }
        }
        long ans = high;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (canSplit(nums, k, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn can_split(nums: &[i64], k: usize, max_sum: i64) -> bool {
    let mut current_sum = 0;
    let mut count = 1;
    for &num in nums {
        if current_sum + num > max_sum {
            count += 1;
            current_sum = num;
            if count > k { return false; }
        } else {
            current_sum += num;
        }
    }
    true
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let k: usize = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let nums: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = *nums.iter().max().unwrap();
            let mut high: i64 = nums.iter().sum();
            let mut ans = high;
            while low <= high {
                let mid = low + (high - low) / 2;
                if can_split(&nums, k, mid) {
                    ans = mid;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`,
        },
    },

    // ==================== HARD #14: Russian Doll Envelopes ====================
    {
        title: 'Russian Doll Envelopes',
        description:
            "You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope.\n\nOne envelope can fit into another if and only if both the width and height of one envelope are strictly greater than the other envelope's width and height.\n\nReturn the maximum number of envelopes you can Russian doll (i.e., put one inside another).\n\nNote: You cannot rotate the envelopes.\n\n**Input Format:**\n- First line: integer N\n- Next N lines: each line contains two space-separated integers wi and hi\n\n**Output Format:**\n- A single integer representing the maximum number of envelopes",
        difficulty: 'HARD',
        tags: ['sorting', 'binary-search'],
        constraints: '1 <= N <= 10^5\n1 <= wi, hi <= 10^9',
        hints: 'Sort the envelopes. Width in ascending order, and height in descending order for envelopes with the same width. Then, find the length of the Longest Increasing Subsequence (LIS) on the heights.',
        editorial:
            '**Approach: LIS in O(N log N)**\n\n1. Sort envelopes by width ascending. If widths are equal, sort height descending.\n2. This sorting ensures that for the same width, we cannot choose more than one envelope because we are looking for a strictly increasing subsequence of heights.\n3. Run the standard LIS algorithm using binary search (patience sorting) on the heights.\n\n**Time Complexity:** O(N log N)\n**Space Complexity:** O(N)',
        examples: [
            {
                title: 'Example 1',
                input: '4\n5 4\n6 4\n6 7\n2 3',
                output: '3',
                explanation:
                    'The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).',
            },
            {
                title: 'Example 2',
                input: '3\n1 1\n1 1\n1 1',
                output: '1',
                explanation:
                    'We cannot put any envelope inside another because they are identical size.',
            },
        ],
        testcases: [
            { input: '4\n5 4\n6 4\n6 7\n2 3', output: '3' },
            { input: '3\n1 1\n1 1\n1 1', output: '1' },
            { input: '1\n10 10', output: '1' },
            { input: '4\n1 2\n2 3\n3 4\n3 5', output: '3' },
            { input: '4\n1 3\n3 5\n2 4\n4 6', output: '4' },
            { input: '5\n2 10\n3 20\n4 30\n5 5\n6 40', output: '4' },
            { input: '6\n10 20\n15 25\n12 22\n14 24\n18 28\n16 26', output: '6' },
            { input: '5\n1 1\n2 2\n3 3\n2 1\n1 2', output: '3' },
            { input: '3\n5 4\n6 4\n6 5', output: '2' },
            {
                input: '10\n10 8\n1 12\n6 15\n2 18\n11 19\n17 2\n14 5\n12 15\n10 13\n12 19',
                output: '3',
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
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> envelopes(n);
    for (int i = 0; i < n; i++) {
        cin >> envelopes[i].first >> envelopes[i].second;
    }
    sort(envelopes.begin(), envelopes.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
        if (a.first == b.first) return a.second > b.second;
        return a.first < b.first;
    });
    vector<int> tails;
    for (int i = 0; i < n; i++) {
        int h = envelopes[i].second;
        auto it = lower_bound(tails.begin(), tails.end(), h);
        if (it == tails.end()) {
            tails.push_back(h);
        } else {
            *it = h;
        }
    }
    cout << tails.size() << "\n";
    return 0;
}`,
            python: `import sys
import bisect

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    envelopes = []
    idx = 1
    for _ in range(n):
        w = int(data[idx])
        h = int(data[idx+1])
        envelopes.append((w, h))
        idx += 2
        
    envelopes.sort(key=lambda x: (x[0], -x[1]))
    
    tails = []
    for _, h in envelopes:
        pos = bisect.bisect_left(tails, h)
        if pos == len(tails):
            tails.append(h)
        else:
            tails[pos] = h
            
    print(len(tails))

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
        int[][] envelopes = new int[n][2];
        for (int i = 0; i < n; i++) {
            line = br.readLine();
            if (line != null) {
                StringTokenizer st = new StringTokenizer(line);
                envelopes[i][0] = Integer.parseInt(st.nextToken());
                envelopes[i][1] = Integer.parseInt(st.nextToken());
            }
        }
        Arrays.sort(envelopes, (a, b) -> {
            if (a[0] == b[0]) return b[1] - a[1];
            return a[0] - b[0];
        });
        ArrayList<Integer> tails = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int h = envelopes[i][1];
            int idx = Collections.binarySearch(tails, h);
            if (idx < 0) {
                idx = -(idx + 1);
            }
            if (idx == tails.size()) {
                tails.add(h);
            } else {
                tails.set(idx, h);
            }
        }
        System.out.println(tails.size());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        let mut envelopes = Vec::with_capacity(n);
        for _ in 0..n {
            if let Some(Ok(line_env)) = lines.next() {
                let parts: Vec<i32> = line_env.split_whitespace()
                    .map(|x| x.parse().unwrap()).collect();
                envelopes.push((parts[0], parts[1]));
            }
        }
        envelopes.sort_by(|a, b| {
            if a.0 == b.0 {
                b.1.cmp(&a.1)
            } else {
                a.0.cmp(&b.0)
            }
        });
        let mut tails = Vec::new();
        for (_, h) in envelopes {
            match tails.binary_search(&h) {
                Ok(idx) => tails[idx] = h,
                Err(idx) => {
                    if idx == tails.len() {
                        tails.push(h);
                    } else {
                        tails[idx] = h;
                    }
                }
            }
        }
        writeln!(out, "{}", tails.len()).unwrap();
    }
}`,
        },
    },

    // ==================== HARD #15: Merge K Sorted Arrays ====================
    {
        title: 'Merge K Sorted Arrays',
        description:
            'Given K sorted arrays, each of size N, merge them and print the sorted output as a single array.\n\n**Input Format:**\n- First line: two space-separated integers K and N\n- Next K lines: each line contains N space-separated integers representing a sorted array\n\n**Output Format:**\n- A single line containing K * N space-separated integers representing the merged sorted array',
        difficulty: 'HARD',
        tags: ['sorting', 'divide-and-conquer', 'merge-sort'],
        constraints: '1 <= K <= 500\n1 <= N <= 500\n-10^9 <= arr[i][j] <= 10^9',
        hints: 'Use a min-heap to keep track of the smallest element among the current elements of all K arrays. Pop the minimum element, output it, and push the next element from that array.',
        editorial:
            '**Approach: Min-Heap (Priority Queue)**\n\nCreate a min-heap that stores elements of the form (value, array_index, element_index). Push the first element of each of the K arrays into the heap. In each step, extract the minimum element, output it, and if there are more elements in the corresponding array, push the next element into the heap.\n\n**Time Complexity:** O(K * N * log K)\n**Space Complexity:** O(K) auxiliary space',
        examples: [
            {
                title: 'Example 1',
                input: '3 4\n1 5 6 8\n2 4 10 12\n3 7 9 11',
                output: '1 2 3 4 5 6 7 8 9 10 11 12',
                explanation: 'All 3 sorted arrays are merged into one sorted array.',
            },
            {
                title: 'Example 2',
                input: '2 3\n1 3 5\n2 4 6',
                output: '1 2 3 4 5 6',
                explanation: 'Merged into a single sorted array.',
            },
        ],
        testcases: [
            { input: '3 4\n1 5 6 8\n2 4 10 12\n3 7 9 11', output: '1 2 3 4 5 6 7 8 9 10 11 12' },
            { input: '2 3\n1 3 5\n2 4 6', output: '1 2 3 4 5 6' },
            { input: '1 1\n42', output: '42' },
            { input: '2 1\n10\n5', output: '5 10' },
            { input: '3 2\n10 20\n5 15\n2 8', output: '2 5 8 10 15 20' },
            { input: '4 1\n4\n3\n2\n1', output: '1 2 3 4' },
            { input: '2 5\n1 2 3 4 5\n6 7 8 9 10', output: '1 2 3 4 5 6 7 8 9 10' },
            { input: '2 5\n6 7 8 9 10\n1 2 3 4 5', output: '1 2 3 4 5 6 7 8 9 10' },
            { input: '3 3\n1 1 1\n2 2 2\n3 3 3', output: '1 1 1 2 2 2 3 3 3' },
            { input: '4 2\n-10 -5\n-8 -3\n-6 -1\n0 5', output: '-10 -8 -6 -5 -3 -1 0 5' },
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
struct Element {
    long long val;
    int arrIdx;
    int eleIdx;
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k, n;
    if (!(cin >> k >> n)) return 0;
    vector<vector<long long>> arrays(k, vector<long long>(n));
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    for (int i = 0; i < k; i++) {
        for (int j = 0; j < n; j++) {
            cin >> arrays[i][j];
        }
        pq.push({arrays[i][0], i, 0});
    }
    vector<long long> result;
    while (!pq.empty()) {
        Element curr = pq.top();
        pq.pop();
        result.push_back(curr.val);
        if (curr.eleIdx + 1 < n) {
            pq.push({arrays[curr.arrIdx][curr.eleIdx + 1], curr.arrIdx, curr.eleIdx + 1});
        }
    }
    for (int i = 0; i < result.size(); i++) {
        cout << result[i] << (i == result.size() - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
import heapq

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    k = int(data[0])
    n = int(data[1])
    arrays = []
    idx = 2
    for _ in range(k):
        arrays.append([int(x) for x in data[idx:idx+n]])
        idx += n
        
    pq = []
    for i in range(k):
        heapq.heappush(pq, (arrays[i][0], i, 0))
        
    result = []
    while pq:
        val, arr_idx, ele_idx = heapq.heappop(pq)
        result.append(val)
        if ele_idx + 1 < n:
            heapq.heappush(pq, (arrays[arr_idx][ele_idx + 1], arr_idx, ele_idx + 1))
            
    print(" ".join(map(str, result)))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Element implements Comparable<Element> {
        long val;
        int arrIdx;
        int eleIdx;
        Element(long val, int arrIdx, int eleIdx) {
            this.val = val;
            this.arrIdx = arrIdx;
            this.eleIdx = eleIdx;
        }
        public int compareTo(Element other) {
            return Long.compare(this.val, other.val);
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int k = Integer.parseInt(st.nextToken());
        int n = Integer.parseInt(st.nextToken());
        long[][] arrays = new long[k][n];
        PriorityQueue<Element> pq = new PriorityQueue<>();
        for (int i = 0; i < k; i++) {
            line = br.readLine();
            if (line != null) {
                st = new StringTokenizer(line);
                for (int j = 0; j < n; j++) {
                    arrays[i][j] = Long.parseLong(st.nextToken());
                }
                pq.add(new Element(arrays[i][0], i, 0));
            }
        }
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        while (!pq.isEmpty()) {
            Element curr = pq.poll();
            if (!first) sb.append(" ");
            first = false;
            sb.append(curr.val);
            if (curr.eleIdx + 1 < n) {
                pq.add(new Element(arrays[curr.arrIdx][curr.eleIdx + 1], curr.arrIdx, curr.eleIdx + 1));
            }
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::BinaryHeap;
use std::cmp::Ordering;

#[derive(Copy, Clone, Eq, PartialEq)]
struct Element {
    val: i64,
    arr_idx: usize,
    ele_idx: usize,
}

impl Ord for Element {
    fn cmp(&self, other: &Self) -> Ordering {
        other.val.cmp(&self.val)
    }
}

impl PartialOrd for Element {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let k: usize = parts[0].parse().unwrap();
        let n: usize = parts[1].parse().unwrap();
        let mut arrays = vec![vec![0i64; n]; k];
        let mut pq = BinaryHeap::new();
        for i in 0..k {
            if let Some(Ok(line_arr)) = lines.next() {
                let row: Vec<i64> = line_arr.split_whitespace()
                    .map(|x| x.parse().unwrap()).collect();
                for j in 0..n {
                    arrays[i][j] = row[j];
                }
                pq.push(Element { val: arrays[i][0], arr_idx: i, ele_idx: 0 });
            }
        }
        let mut result = Vec::with_capacity(k * n);
        while let Some(Element { val, arr_idx, ele_idx }) = pq.pop() {
            result.push(val);
            if ele_idx + 1 < n {
                pq.push(Element { val: arrays[arr_idx][ele_idx + 1], arr_idx, ele_idx: ele_idx + 1 });
            }
        }
        let strs: Vec<String> = result.iter().map(|x| x.to_string()).collect();
        writeln!(out, "{}", strs.join(" ")).unwrap();
    }
}`,
        },
    },
    // ==================== EASY #16: Squares of a Sorted Array ====================
    {
        title: 'Squares of a Sorted Array',
        description:
            'Given an integer array sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers sorted in non-decreasing order\n\n**Output Format:**\n- A single line containing N space-separated integers representing the sorted squares',
        difficulty: 'EASY',
        tags: ['sorting', 'two-pointers'],
        constraints: '1 <= N <= 10^5\n-10^4 <= arr[i] <= 10^4\nThe array is sorted in non-decreasing order',
        hints: 'Since the input array can contain negative numbers, squaring them might make them larger than squares of positive numbers. Use a two-pointer approach starting from both ends of the array to build the result from largest to smallest.',
        editorial:
            '**Approach: Two Pointers**\n\nSince the array is sorted, the squares of the numbers at the ends (extremely negative or extremely positive) will be the largest. Initialize two pointers: `left = 0` and `right = N - 1`. Compare `arr[left] * arr[left]` and `arr[right] * arr[right]`. Place the larger square at the end of the result array and move the respective pointer inward. Repeat until the result array is filled.\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(N) to store the result',
        examples: [
            {
                title: 'Example 1',
                input: '5\n-4 -1 0 3 10',
                output: '0 1 9 16 100',
                explanation: 'After squaring, the array becomes [16, 1, 0, 9, 100]. After sorting, it becomes [0, 1, 9, 16, 100].',
            },
            {
                title: 'Example 2',
                input: '4\n-7 -3 2 3',
                output: '4 9 9 49',
                explanation: 'Squares are 49, 9, 4, 9. Sorted: 4, 9, 9, 49.',
            },
        ],
        testcases: [
            { input: '5\n-4 -1 0 3 10', output: '0 1 9 16 100' },
            { input: '4\n-7 -3 2 3', output: '4 9 9 49' },
            { input: '1\n-5', output: '25' },
            { input: '3\n-3 -2 -1', output: '1 4 9' },
            { input: '3\n1 2 3', output: '1 4 9' },
            { input: '6\n-5 -4 -3 1 2 5', output: '1 4 9 16 25 25' },
            { input: '8\n-10 -9 -8 0 1 2 3 4', output: '0 1 4 9 16 64 81 100' },
            { input: '2\n-1 1', output: '1 1' },
            { input: '10\n-5 -4 -3 -2 -1 0 1 2 3 4', output: '0 1 1 4 4 9 9 16 16 25' },
            { input: '7\n-100 -50 0 10 20 30 40', output: '0 100 400 900 1600 2500 10000' },
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
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    vector<long long> ans(n);
    int left = 0, right = n - 1;
    for (int i = n - 1; i >= 0; i--) {
        if (abs(arr[left]) > abs(arr[right])) {
            ans[i] = arr[left] * arr[left];
            left++;
        } else {
            ans[i] = arr[right] * arr[right];
            right--;
        }
    }
    for (int i = 0; i < n; i++) {
        cout << ans[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    ans = [0] * n
    left, right = 0, n - 1
    for i in range(n - 1, -1, -1):
        if abs(arr[left]) > abs(arr[right]):
            ans[i] = arr[left] * arr[left]
            left += 1
        else:
            ans[i] = arr[right] * arr[right]
            right -= 1
    print(" ".join(map(str, ans)))

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
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        long[] ans = new long[n];
        int left = 0, right = n - 1;
        for (int i = n - 1; i >= 0; i--) {
            if (Math.abs(arr[left]) > Math.abs(arr[right])) {
                ans[i] = arr[left] * arr[left];
                left++;
            } else {
                ans[i] = arr[right] * arr[right];
                right--;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(ans[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut ans = vec![0i64; n];
            let mut left = 0usize;
            let mut right = n - 1;
            for i in (0..n).rev() {
                if arr[left].abs() > arr[right].abs() {
                    ans[i] = arr[left] * arr[left];
                    left += 1;
                } else {
                    ans[i] = arr[right] * arr[right];
                    right -= 1;
                }
            }
            let strs: Vec<String> = ans.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`,
        },
    },

    // ==================== EASY #17: Two Sum II - Sorted Array ====================
    {
        title: 'Two Sum II - Sorted Array',
        description:
            'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.\n\nReturn the 1-based indices index1 and index2 as two space-separated integers, where 1 <= index1 < index2 <= N.\n\nYou must design an algorithm that runs in O(N) or O(N log N) time and uses O(1) auxiliary space.\n\n**Input Format:**\n- First line: two space-separated integers N and target\n- Second line: N space-separated integers sorted in non-decreasing order\n\n**Output Format:**\n- Two space-separated integers representing index1 and index2',
        difficulty: 'EASY',
        tags: ['binary-search', 'two-pointers'],
        constraints: '2 <= N <= 10^5\n-10^9 <= numbers[i] <= 10^9\n-10^9 <= target <= 10^9\nThe tests are generated such that there is exactly one solution.',
        hints: 'Since the array is sorted, we can use two pointers: one starting at the beginning (left) and one at the end (right). If their sum is less than target, move left pointer to the right. If their sum is greater than target, move right pointer to the left.',
        editorial:
            '**Approach: Two Pointers**\n\nInitialize `left = 0` and `right = N - 1`. In each step, calculate the sum of elements at these pointers: `current_sum = numbers[left] + numbers[right]`.\n- If `current_sum == target`, output `left + 1` and `right + 1` (since the output is 1-indexed).\n- If `current_sum < target`, increment `left` to increase the sum.\n- If `current_sum > target`, decrement `right` to decrease the sum.\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4 9\n2 7 11 15',
                output: '1 2',
                explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.',
            },
            {
                title: 'Example 2',
                input: '3 6\n2 3 4',
                output: '1 3',
                explanation: 'The sum of 2 and 4 is 6. Therefore, index1 = 1, index2 = 3.',
            },
        ],
        testcases: [
            { input: '4 9\n2 7 11 15', output: '1 2' },
            { input: '3 6\n2 3 4', output: '1 3' },
            { input: '2 -1\n-1 0', output: '1 2' },
            { input: '5 100\n5 10 25 75 90', output: '3 4' },
            { input: '6 0\n-5 -3 -1 1 3 5', output: '1 6' },
            { input: '8 20\n1 3 5 7 11 13 15 17', output: '2 8' },
            { input: '5 8\n1 2 4 6 9', output: '2 4' },
            { input: '4 -8\n-10 -5 -3 2', output: '2 3' },
            { input: '10 10\n1 2 3 4 5 6 7 8 9 10', output: '1 9' },
            { input: '7 15\n1 2 3 4 5 10 20', output: '5 6' },
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
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int left = 0, right = n - 1;
    while (left < right) {
        long long sum = arr[left] + arr[right];
        if (sum == target) {
            cout << (left + 1) << " " << (right + 1) << "\n";
            break;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
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
    target = int(data[1])
    arr = [int(x) for x in data[2:]]
    left, right = 0, n - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            print(f"{left + 1} {right + 1}")
            break
        elif s < target:
            left += 1
        else:
            right -= 1

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
        int n = Integer.parseInt(st.nextToken());
        long target = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int left = 0, right = n - 1;
        while (left < right) {
            long sum = arr[left] + arr[right];
            if (sum == target) {
                System.out.println((left + 1) + " " + (right + 1));
                break;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let target: i64 = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut left = 0usize;
            let mut right = n - 1;
            while left < right {
                let sum = arr[left] + arr[right];
                if sum == target {
                    writeln!(out, "{} {}", left + 1, right + 1).unwrap();
                    break;
                } else if sum < target {
                    left += 1;
                } else {
                    right -= 1;
                }
            }
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #18: Single Element in a Sorted Array ====================
    {
        title: 'Single Element in a Sorted Array',
        description:
            'You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.\n\nFind this single element that appears only once.\n\nYour solution must run in O(log N) time complexity and O(1) space complexity.\n\n**Input Format:**\n- First line: integer N (always odd)\n- Second line: N space-separated integers representing the sorted array\n\n**Output Format:**\n- A single integer representing the unique element',
        difficulty: 'MEDIUM',
        tags: ['binary-search'],
        constraints: '1 <= N <= 10^5\nN is always odd\n0 <= arr[i] <= 10^9\nEvery element appears exactly twice, except one element which appears once.\nThe array is sorted in non-decreasing order.',
        hints: 'Use binary search. Observe the index pairing. For a pair starting at an even index `i`, its duplicate should be at `i + 1`. If it is, the single element is to the right. Otherwise, it is to the left.',
        editorial:
            '**Approach: Binary Search**\n\nSince the array is sorted and all elements except one appear twice, the array length `N` is always odd. We can use binary search.\nFor any index `mid`:\n- If `mid` is even, and `arr[mid] == arr[mid + 1]`, the single element must be on the right side. So set `low = mid + 2`.\n- If `mid` is even, and `arr[mid] != arr[mid + 1]`, the single element is either at `mid` or on the left side. So set `high = mid`.\n- If `mid` is odd, we can compare it with `arr[mid - 1]` to reduce this case to an even index.\nSpecifically, we can do `mid = mid ^ 1`. If `arr[mid] == arr[mid ^ 1]`, it means the pairing is correct up to `mid`, so search the right side: `low = mid + 1`. Otherwise, search the left side: `high = mid`.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '9\n1 1 2 3 3 4 4 8 8',
                output: '2',
                explanation: '2 only appears once in the sorted array.',
            },
            {
                title: 'Example 2',
                input: '7\n3 3 7 7 10 11 11',
                output: '10',
                explanation: '10 only appears once in the sorted array.',
            },
        ],
        testcases: [
            { input: '9\n1 1 2 3 3 4 4 8 8', output: '2' },
            { input: '7\n3 3 7 7 10 11 11', output: '10' },
            { input: '1\n5', output: '5' },
            { input: '3\n1 2 2', output: '1' },
            { input: '3\n1 1 2', output: '2' },
            { input: '5\n1 1 2 2 3', output: '3' },
            { input: '5\n1 2 2 3 3', output: '1' },
            { input: '11\n1 1 2 2 3 3 4 4 5 6 6', output: '5' },
            { input: '9\n10 10 20 20 30 40 40 50 50', output: '30' },
            { input: '13\n1 1 2 2 3 3 4 5 5 6 6 7 7', output: '4' },
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
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == arr[mid ^ 1]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    cout << arr[low] << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    low = 0
    high = n - 1
    while low < high:
        mid = (low + high) // 2
        if arr[mid] == arr[mid ^ 1]:
            low = mid + 1
        else:
            high = mid
    print(arr[low])

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
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == arr[mid ^ 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        System.out.println(arr[low]);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0usize;
            let mut high = n - 1;
            while low < high {
                let mid = low + (high - low) / 2;
                if arr[mid] == arr[mid ^ 1] {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            writeln!(out, "{}", arr[low]).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #19: Merge Intervals ====================
    {
        title: 'Merge Intervals',
        description:
            'Given a collection of intervals, merge all overlapping intervals and output the sorted list of merged intervals.\n\n**Input Format:**\n- First line: integer N, the number of intervals\n- Next N lines: each contains two space-separated integers representing the start and end of an interval\n\n**Output Format:**\n- First line: integer M, the number of merged intervals\n- Next M lines: each contains two space-separated integers representing the merged intervals sorted by their start times',
        difficulty: 'MEDIUM',
        tags: ['sorting'],
        constraints: '1 <= N <= 10^5\n0 <= start <= end <= 10^9',
        hints: 'First, sort the intervals based on their start times. Then, iterate through the sorted intervals. If the current interval overlaps with the last merged interval, merge them by updating the end time. Otherwise, add the current interval as a new merged interval.',
        editorial:
            '**Approach: Sorting**\n\n1. Sort the intervals in ascending order based on their start times.\n2. Initialize a list of merged intervals. Push the first interval to this list.\n3. For each subsequent interval, compare its start time with the end time of the last interval in the merged list:\n   - If `start_i <= end_last`, they overlap. Update `end_last = max(end_last, end_i)`.\n   - If `start_i > end_last`, they do not overlap. Push the current interval to the merged list.\n\n**Time Complexity:** O(N log N) due to sorting\n**Space Complexity:** O(N) to store the merged intervals',
        examples: [
            {
                title: 'Example 1',
                input: '4\n1 3\n2 6\n8 10\n15 18',
                output: '3\n1 6\n8 10\n15 18',
                explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].',
            },
            {
                title: 'Example 2',
                input: '2\n1 4\n4 5',
                output: '1\n1 5',
                explanation: 'Intervals [1,4] and [4,5] are considered overlapping.',
            },
        ],
        testcases: [
            { input: '4\n1 3\n2 6\n8 10\n15 18', output: '3\n1 6\n8 10\n15 18' },
            { input: '2\n1 4\n4 5', output: '1\n1 5' },
            { input: '1\n10 20', output: '1\n10 20' },
            { input: '3\n1 5\n6 8\n9 10', output: '3\n1 5\n6 8\n9 10' },
            { input: '5\n1 10\n2 3\n4 5\n6 7\n8 9', output: '1\n1 10' },
            { input: '4\n1 4\n0 4\n8 10\n15 18', output: '3\n0 4\n8 10\n15 18' },
            { input: '4\n2 3\n4 5\n6 7\n1 10', output: '1\n1 10' },
            { input: '3\n5 8\n3 4\n1 2', output: '3\n1 2\n3 4\n5 8' },
            { input: '6\n1 4\n2 5\n3 6\n7 8\n8 10\n9 12', output: '2\n1 6\n7 12' },
            { input: '5\n0 0\n1 2\n2 3\n0 1\n5 5', output: '2\n0 3\n5 5' },
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
struct Interval {
    long long start;
    long long end;
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<Interval> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i].start >> arr[i].end;
    }
    sort(arr.begin(), arr.end(), [](const Interval& a, const Interval& b) {
        if (a.start == b.start) return a.end < b.end;
        return a.start < b.start;
    });
    vector<Interval> merged;
    for (int i = 0; i < n; i++) {
        if (merged.empty() || arr[i].start > merged.back().end) {
            merged.push_back(arr[i]);
        } else {
            merged.back().end = max(merged.back().end, arr[i].end);
        }
    }
    cout << merged.size() << "\n";
    for (const auto& interval : merged) {
        cout << interval.start << " " << interval.end << "\n";
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
        s = int(data[idx])
        e = int(data[idx+1])
        intervals.append([s, e])
        idx += 2
    intervals.sort(key=lambda x: (x[0], x[1]))
    merged = []
    for interval in intervals:
        if not merged or interval[0] > merged[-1][1]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    print(len(merged))
    for m in merged:
        print(f"{m[0]} {m[1]}")

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Interval {
        long start, end;
        Interval(long start, long end) {
            this.start = start;
            this.end = end;
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        List<Interval> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            line = br.readLine();
            if (line != null) {
                StringTokenizer st = new StringTokenizer(line);
                long s = Long.parseLong(st.nextToken());
                long e = Long.parseLong(st.nextToken());
                list.add(new Interval(s, e));
            }
        }
        list.sort((a, b) -> {
            if (a.start == b.start) {
                return Long.compare(a.end, b.end);
            }
            return Long.compare(a.start, b.start);
        });
        List<Interval> merged = new ArrayList<>();
        for (Interval curr : list) {
            if (merged.isEmpty() || curr.start > merged.get(merged.size() - 1).end) {
                merged.add(curr);
            } else {
                Interval last = merged.get(merged.size() - 1);
                last.end = Math.max(last.end, curr.end);
            }
        }
        System.out.println(merged.size());
        for (Interval m : merged) {
            System.out.println(m.start + " " + m.end);
        }
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
#[derive(Copy, Clone, Eq, PartialEq)]
struct Interval {
    start: i64,
    end: i64,
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        let mut arr = Vec::with_capacity(n);
        for _ in 0..n {
            if let Some(Ok(line_arr)) = lines.next() {
                let parts: Vec<i64> = line_arr.split_whitespace()
                    .map(|x| x.parse().unwrap()).collect();
                arr.push(Interval { start: parts[0], end: parts[1] });
            }
        }
        arr.sort_by(|a, b| {
            if a.start == b.start {
                a.end.cmp(&b.end)
            } else {
                a.start.cmp(&b.start)
            }
        });
        let mut merged: Vec<Interval> = Vec::new();
        for item in arr {
            if merged.is_empty() || item.start > merged.last().unwrap().end {
                merged.push(item);
            } else {
                let last = merged.last_mut().unwrap();
                last.end = last.end.max(item.end);
            }
        }
        writeln!(out, "{}", merged.len()).unwrap();
        for item in merged {
            writeln!(out, "{} {}", item.start, item.end).unwrap();
        }
    }
}`,
        },
    },

    // ==================== HARD #20: Median of Two Sorted Arrays ====================
    {
        title: 'Median of Two Sorted Arrays',
        description:
            'Given two sorted arrays nums1 and nums2 of sizes M and N respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log(M + N)).\n\nIf the median is a whole number, print it as an integer. If it has a fractional part, print it with exactly one decimal place.\n\n**Input Format:**\n- First line: two space-separated integers M and N\n- Second line: M space-separated integers representing nums1 (can be empty, in which case the second line is blank/empty)\n- Third line: N space-separated integers representing nums2 (can be empty)\n\n**Output Format:**\n- A single number representing the median',
        difficulty: 'HARD',
        tags: ['binary-search'],
        constraints: '0 <= M, N <= 10^5\n1 <= M + N <= 2 * 10^5\n-10^9 <= nums1[i], nums2[i] <= 10^9\nnums1 and nums2 are sorted in ascending order',
        hints: 'To solve this in O(log(min(M, N))), perform a binary search on the partition of the smaller array. Partition both arrays such that the left half has (M + N + 1) / 2 elements. Ensure the largest element in the left partition is less than or equal to the smallest element in the right partition.',
        editorial:
            '**Approach: Binary Search on Partitioning**\n\nTo find the median, we can partition `nums1` and `nums2` into two halves such that the left half contains `(M + N + 1) / 2` elements.\nLet `i` be the partition index in `nums1`, and `j = (M + N + 1) / 2 - i` be the partition index in `nums2`. We binary search for `i` in `[0, M]` (ensuring `M <= N` by swapping arrays if necessary).\nWe want to find partition index `i` such that:\n`maxLeft1 <= minRight2` and `maxLeft2 <= minRight1`\nwhere:\n- `maxLeft1 = (i == 0) ? -infinity : nums1[i-1]`\n- `minRight1 = (i == M) ? +infinity : nums1[i]`\n- `maxLeft2 = (j == 0) ? -infinity : nums2[j-1]`\n- `minRight2 = (j == N) ? +infinity : nums2[j]`\n\nOnce found:\n- If `(M + N)` is odd, the median is `max(maxLeft1, maxLeft2)`.\n- If `(M + N)` is even, the median is `(max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0`.\n\n**Time Complexity:** O(log(min(M, N)))\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '2 1\n1 3\n2',
                output: '2',
                explanation: 'Merged array is [1, 2, 3] and median is 2.',
            },
            {
                title: 'Example 2',
                input: '2 2\n1 2\n3 4',
                output: '2.5',
                explanation: 'Merged array is [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5.',
            },
        ],
        testcases: [
            { input: '2 1\n1 3\n2', output: '2' },
            { input: '2 2\n1 2\n3 4', output: '2.5' },
            { input: '0 1\n\n5', output: '5' },
            { input: '1 0\n10\n', output: '10' },
            { input: '4 3\n1 3 5 7\n2 4 6', output: '4' },
            { input: '5 5\n1 2 3 4 5\n6 7 8 9 10', output: '5.5' },
            { input: '3 3\n-10 -5 -3\n-9 -7 -6', output: '-7' },
            { input: '5 6\n-100 -50 0 50 100\n-75 -25 25 75 125 150', output: '25' },
            { input: '2 3\n10 20\n1 2 3', output: '3' },
            { input: '2 4\n1 3\n2 4 5 6', output: '3.5' },
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
    if (!(cin >> m >> n)) return 0;
    vector<long long> nums1(m);
    for (int i = 0; i < m; i++) cin >> nums1[i];
    vector<long long> nums2(n);
    for (int i = 0; i < n; i++) cin >> nums2[i];
    if (m > n) {
        swap(nums1, nums2);
        swap(m, n);
    }
    int low = 0, high = m;
    int half_len = (m + n + 1) / 2;
    while (low <= high) {
        int i = low + (high - low) / 2;
        int j = half_len - i;
        long long maxLeft1 = (i == 0) ? LLONG_MIN : nums1[i - 1];
        long long minRight1 = (i == m) ? LLONG_MAX : nums1[i];
        long long maxLeft2 = (j == 0) ? LLONG_MIN : nums2[j - 1];
        long long minRight2 = (j == n) ? LLONG_MAX : nums2[j];
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 == 1) {
                cout << max(maxLeft1, maxLeft2) << "\n";
            } else {
                long long sum = max(maxLeft1, maxLeft2) + min(minRight1, minRight2);
                if (sum % 2 == 0) {
                    cout << sum / 2 << "\n";
                } else {
                    cout << sum / 2.0 << "\n";
                }
            }
            return 0;
        } else if (maxLeft1 > minRight2) {
            high = i - 1;
        } else {
            low = i + 1;
        }
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
    nums1 = [int(x) for x in input_data[2:2+m]]
    nums2 = [int(x) for x in input_data[2+m:2+m+n]]
    if m > n:
        nums1, nums2 = nums2, nums1
        m, n = n, m
    low, high = 0, m
    half_len = (m + n + 1) // 2
    INF = float('inf')
    while low <= high:
        i = (low + high) // 2
        j = half_len - i
        maxLeft1 = -INF if i == 0 else nums1[i - 1]
        minRight1 = INF if i == m else nums1[i]
        maxLeft2 = -INF if j == 0 else nums2[j - 1]
        minRight2 = INF if j == n else nums2[j]
        if maxLeft1 <= minRight2 && maxLeft2 <= minRight1:
            if (m + n) % 2 == 1:
                print(max(maxLeft1, maxLeft2))
            else:
                s = max(maxLeft1, maxLeft2) + min(minRight1, minRight2)
                if s % 2 == 0:
                    print(s // 2)
                else:
                    print(s / 2)
            return
        elif maxLeft1 > minRight2:
            high = i - 1
        else:
            low = i + 1
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<String> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                tokens.add(st.nextToken());
            }
        }
        if (tokens.isEmpty()) return;
        int m = Integer.parseInt(tokens.get(0));
        int n = Integer.parseInt(tokens.get(1));
        long[] nums1 = new long[m];
        for (int i = 0; i < m; i++) {
            nums1[i] = Long.parseLong(tokens.get(2 + i));
        }
        long[] nums2 = new long[n];
        for (int i = 0; i < n; i++) {
            nums2[i] = Long.parseLong(tokens.get(2 + m + i));
        }
        if (m > n) {
            long[] tempArr = nums1;
            nums1 = nums2;
            nums2 = tempArr;
            int tempVal = m;
            m = n;
            n = tempVal;
        }
        int low = 0, high = m;
        int halfLen = (m + n + 1) / 2;
        while (low <= high) {
            int i = low + (high - low) / 2;
            int j = halfLen - i;
            long maxLeft1 = (i == 0) ? Long.MIN_VALUE : nums1[i - 1];
            long minRight1 = (i == m) ? Long.MAX_VALUE : nums1[i];
            long maxLeft2 = (j == 0) ? Long.MIN_VALUE : nums2[j - 1];
            long minRight2 = (j == n) ? Long.MAX_VALUE : nums2[j];
            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                if ((m + n) % 2 == 1) {
                    System.out.println(Math.max(maxLeft1, maxLeft2));
                } else {
                    long sum = Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2);
                    if (sum % 2 == 0) {
                        System.out.println(sum / 2);
                    } else {
                        System.out.println(sum / 2.0);
                    }
                }
                return;
            } else if (maxLeft1 > minRight2) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut tokens = Vec::new();
    for line in stdin.lock().lines() {
        if let Ok(l) = line {
            for word in l.split_whitespace() {
                tokens.push(word.to_string());
            }
        }
    }
    if tokens.is_empty() { return; }
    let mut m: usize = tokens[0].parse().unwrap();
    let mut n: usize = tokens[1].parse().unwrap();
    let mut nums1 = Vec::with_capacity(m);
    for i in 0..m {
        nums1.push(tokens[2 + i].parse::<i64>().unwrap());
    }
    let mut nums2 = Vec::with_capacity(n);
    for i in 0..n {
        nums2.push(tokens[2 + m + i].parse::<i64>().unwrap());
    }
    if m > n {
        std::mem::swap(&mut nums1, &mut nums2);
        std::mem::swap(&mut m, &mut n);
    }
    let mut low = 0usize;
    let mut high = m;
    let half_len = (m + n + 1) / 2;
    while low <= high {
        let i = low + (high - low) / 2;
        let j = half_len - i;
        let max_left1 = if i == 0 { i64::MIN } else { nums1[i - 1] };
        let min_right1 = if i == m { i64::MAX } else { nums1[i] };
        let max_left2 = if j == 0 { i64::MIN } else { nums2[j - 1] };
        let min_right2 = if j == n { i64::MAX } else { nums2[j] };
        if max_left1 <= min_right2 && max_left2 <= min_right1 {
            if (m + n) % 2 == 1 {
                writeln!(out, "{}", std::cmp::max(max_left1, max_left2)).unwrap();
            } else {
                let sum = std::cmp::max(max_left1, max_left2) + std::cmp::min(min_right1, min_right2);
                if sum % 2 == 0 {
                    writeln!(out, "{}", sum / 2).unwrap();
                } else {
                    writeln!(out, "{}", (sum as f64) / 2.0).unwrap();
                }
            }
            return;
        } else if max_left1 > min_right2 {
            high = i - 1;
        } else {
            low = i + 1;
        }
    }
}`,
        },
    },
    // ==================== EASY #21: Intersection of Two Sorted Arrays ====================
    {
        title: 'Intersection of Two Sorted Arrays',
        description:
            'Given two sorted arrays of integers A and B, find their intersection. The intersection should contain only unique elements that are present in both arrays, sorted in ascending order. If there is no intersection, output a blank/empty line.\n\n**Input Format:**\n- First line: two space-separated integers M and N, representing the sizes of array A and array B respectively.\n- Second line: M space-separated integers representing array A (sorted in non-decreasing order).\n- Third line: N space-separated integers representing array B (sorted in non-decreasing order).\n\n**Output Format:**\n- A single line containing the space-separated unique elements present in both arrays, sorted in ascending order. If no elements are present, output an empty line.',
        difficulty: 'EASY',
        tags: ['sorting', 'two-pointers'],
        constraints: '1 <= M, N <= 10^5\n-10^9 <= A[i], B[i] <= 10^9',
        hints: 'Use a two-pointer approach since the arrays are already sorted. Keep one pointer for each array and compare elements.',
        editorial:
            '**Approach: Two Pointers**\n\nInitialize two pointers `i = 0` (for array A) and `j = 0` (for array B). Compare `A[i]` and `B[j]`:\n- If `A[i] == B[j]`, then we found a common element. To ensure uniqueness, check if this element is already in our intersection list. If not, add it. Then increment both `i` and `j`.\n- If `A[i] < B[j]`, increment `i` to find a larger element in A.\n- If `A[i] > B[j]`, increment `j` to find a larger element in B.\n\n**Time Complexity:** O(M + N)\n**Space Complexity:** O(min(M, N)) to store the output intersection.',
        examples: [
            {
                title: 'Example 1',
                input: '5 5\n1 2 2 3 4\n2 2 3 5 6',
                output: '2 3',
                explanation: 'The common elements are 2 and 3. The duplicate 2 is only printed once.',
            },
            {
                title: 'Example 2',
                input: '3 3\n1 3 5\n2 4 6',
                output: '',
                explanation: 'There are no common elements, so the output is an empty line.',
            },
        ],
        testcases: [
            { input: '5 5\n1 2 2 3 4\n2 2 3 5 6', output: '2 3' },
            { input: '3 3\n1 3 5\n2 4 6', output: '' },
            { input: '1 1\n5\n5', output: '5' },
            { input: '1 1\n3\n5', output: '' },
            { input: '4 4\n1 1 1 1\n1 1 1 1', output: '1' },
            { input: '5 6\n-10 -5 0 5 10\n-5 0 2 10 12 15', output: '-5 0 10' },
            { input: '6 3\n1 2 3 4 5 6\n1 3 5', output: '1 3 5' },
            { input: '2 5\n10 20\n1 2 10 15 20', output: '10 20' },
            { input: '3 4\n1 2 3\n4 5 6 7', output: '' },
            { input: '10 10\n-100 -90 -80 -70 -60 -50 -40 -30 -20 -10\n-50 -40 -30 -20 -10 0 10 20 30 40', output: '-50 -40 -30 -20 -10' },
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
    if (!(cin >> m >> n)) return 0;
    vector<long long> a(m);
    for (int i = 0; i < m; i++) cin >> a[i];
    vector<long long> b(n);
    for (int i = 0; i < n; i++) cin >> b[i];
    int i = 0, j = 0;
    vector<long long> ans;
    while (i < m && j < n) {
        if (a[i] == b[j]) {
            if (ans.empty() || ans.back() != a[i]) {
                ans.push_back(a[i]);
            }
            i++;
            j++;
        } else if (a[i] < b[j]) {
            i++;
        } else {
            j++;
        }
    }
    for (int k = 0; k < (int)ans.size(); k++) {
        cout << ans[k] << (k == (int)ans.size() - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    m = int(input_data[0])
    n = int(input_data[1])
    a = [int(x) for x in input_data[2:2+m]]
    b = [int(x) for x in input_data[2+m:2+m+n]]
    i = 0
    j = 0
    ans = []
    while i < m and j < n:
        if a[i] == b[j]:
            if not ans or ans[-1] != a[i]:
                ans.append(a[i])
            i += 1
            j += 1
        elif a[i] < b[j]:
            i += 1
        else:
            j += 1
    print(" ".join(map(str, ans)))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<String> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                tokens.add(st.nextToken());
            }
        }
        if (tokens.isEmpty()) return;
        int m = Integer.parseInt(tokens.get(0));
        int n = Integer.parseInt(tokens.get(1));
        long[] a = new long[m];
        for (int i = 0; i < m; i++) {
            a[i] = Long.parseLong(tokens.get(2 + i));
        }
        long[] b = new long[n];
        for (int i = 0; i < n; i++) {
            b[i] = Long.parseLong(tokens.get(2 + m + i));
        }
        int i = 0, j = 0;
        List<Long> ans = new ArrayList<>();
        while (i < m && j < n) {
            if (a[i] == b[j]) {
                if (ans.isEmpty() || ans.get(ans.size() - 1) != a[i]) {
                    ans.add(a[i]);
                }
                i++;
                j++;
            } else if (a[i] < b[j]) {
                i++;
            } else {
                j++;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int k = 0; k < ans.size(); k++) {
            sb.append(ans.get(k));
            if (k != ans.size() - 1) {
                sb.append(" ");
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
    let mut tokens = Vec::new();
    for line in stdin.lock().lines() {
        if let Ok(l) = line {
            for word in l.split_whitespace() {
                tokens.push(word.to_string());
            }
        }
    }
    if tokens.is_empty() { return; }
    let m: usize = tokens[0].parse().unwrap();
    let n: usize = tokens[1].parse().unwrap();
    let mut a = Vec::with_capacity(m);
    for i in 0..m {
        a.push(tokens[2 + i].parse::<i64>().unwrap());
    }
    let mut b = Vec::with_capacity(n);
    for i in 0..n {
        b.push(tokens[2 + m + i].parse::<i64>().unwrap());
    }
    let mut i = 0;
    let mut j = 0;
    let mut ans = Vec::new();
    while i < m && j < n {
        if a[i] == b[j] {
            if ans.is_empty() || *ans.last().unwrap() != a[i] {
                ans.push(a[i]);
            }
            i += 1;
            j += 1;
        } else if a[i] < b[j] {
            i += 1;
        } else {
            j += 1;
        }
    }
    let strs: Vec<String> = ans.iter().map(|x| x.to_string()).collect();
    writeln!(out, "{}", strs.join(" ")).unwrap();
}`,
        },
    },

    // ==================== EASY #22: Merge Two Sorted Arrays ====================
    {
        title: 'Merge Two Sorted Arrays',
        description:
            'Given two sorted integer arrays A and B of sizes M and N respectively, merge them into a single sorted array. Do not use a built-in sorting function; instead, merge them in O(M + N) time complexity.\n\n**Input Format:**\n- First line: two space-separated integers M and N, representing the sizes of A and B.\n- Second line: M space-separated integers representing array A (sorted in non-decreasing order).\n- Third line: N space-separated integers representing array B (sorted in non-decreasing order).\n\n**Output Format:**\n- A single line containing M + N space-separated integers, representing the merged sorted array.',
        difficulty: 'EASY',
        tags: ['sorting', 'two-pointers'],
        constraints: '1 <= M, N <= 10^5\n-10^9 <= A[i], B[i] <= 10^9',
        hints: 'Since both arrays are already sorted, we can build the merged sorted array using two pointers pointing to the current elements of both arrays.',
        editorial:
            '**Approach: Two Pointers**\n\nInitialize two pointers `i = 0` (for array A) and `j = 0` (for array B). Compare elements at `A[i]` and `B[j]`:\n- If `A[i] <= B[j]`, append `A[i]` to the merged array and increment `i`.\n- Otherwise, append `B[j]` to the merged array and increment `j`.\nOnce we reach the end of one array, append all remaining elements of the other array.\n\n**Time Complexity:** O(M + N)\n**Space Complexity:** O(M + N) to store the merged array.',
        examples: [
            {
                title: 'Example 1',
                input: '3 3\n1 3 5\n2 4 6',
                output: '1 2 3 4 5 6',
            },
            {
                title: 'Example 2',
                input: '4 3\n1 2 3 5\n2 4 6',
                output: '1 2 2 3 4 5 6',
            },
        ],
        testcases: [
            { input: '3 3\n1 3 5\n2 4 6', output: '1 2 3 4 5 6' },
            { input: '4 3\n1 2 3 5\n2 4 6', output: '1 2 2 3 4 5 6' },
            { input: '1 1\n5\n3', output: '3 5' },
            { input: '2 1\n1 2\n3', output: '1 2 3' },
            { input: '1 2\n3\n1 2', output: '1 2 3' },
            { input: '5 5\n-10 -5 0 5 10\n-8 -3 1 6 11', output: '-10 -8 -5 -3 0 1 5 6 10 11' },
            { input: '4 4\n1 1 1 1\n2 2 2 2', output: '1 1 1 1 2 2 2 2' },
            { input: '3 5\n1 4 9\n2 3 5 7 8', output: '1 2 3 4 5 7 8 9' },
            { input: '6 1\n2 4 6 8 10 12\n5', output: '2 4 5 6 8 10 12' },
            { input: '10 2\n-50 -40 -30 -20 -10 0 10 20 30 40\n-25 25', output: '-50 -40 -30 -25 -20 -10 0 10 20 25 30 40' },
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
    if (!(cin >> m >> n)) return 0;
    vector<long long> a(m);
    for (int i = 0; i < m; i++) cin >> a[i];
    vector<long long> b(n);
    for (int i = 0; i < n; i++) cin >> b[i];
    int i = 0, j = 0;
    vector<long long> ans;
    ans.reserve(m + n);
    while (i < m || j < n) {
        if (i < m && (j == n || a[i] <= b[j])) {
            ans.push_back(a[i]);
            i++;
        } else {
            ans.push_back(b[j]);
            j++;
        }
    }
    for (int k = 0; k < m + n; k++) {
        cout << ans[k] << (k == m + n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    m = int(input_data[0])
    n = int(input_data[1])
    a = [int(x) for x in input_data[2:2+m]]
    b = [int(x) for x in input_data[2+m:2+m+n]]
    i = 0
    j = 0
    ans = []
    while i < m or j < n:
        if i < m and (j == n or a[i] <= b[j]):
            ans.append(a[i])
            i += 1
        else:
            ans.append(b[j])
            j += 1
    print(" ".join(map(str, ans)))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<String> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                tokens.add(st.nextToken());
            }
        }
        if (tokens.isEmpty()) return;
        int m = Integer.parseInt(tokens.get(0));
        int n = Integer.parseInt(tokens.get(1));
        long[] a = new long[m];
        for (int i = 0; i < m; i++) {
            a[i] = Long.parseLong(tokens.get(2 + i));
        }
        long[] b = new long[n];
        for (int i = 0; i < n; i++) {
            b[i] = Long.parseLong(tokens.get(2 + m + i));
        }
        int i = 0, j = 0;
        long[] ans = new long[m + n];
        int idx = 0;
        while (i < m || j < n) {
            if (i < m && (j == n || a[i] <= b[j])) {
                ans[idx++] = a[i];
                i++;
            } else {
                ans[idx++] = b[j];
                j++;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int k = 0; k < m + n; k++) {
            sb.append(ans[k]);
            if (k != m + n - 1) {
                sb.append(" ");
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
    let mut tokens = Vec::new();
    for line in stdin.lock().lines() {
        if let Ok(l) = line {
            for word in l.split_whitespace() {
                tokens.push(word.to_string());
            }
        }
    }
    if tokens.is_empty() { return; }
    let m: usize = tokens[0].parse().unwrap();
    let n: usize = tokens[1].parse().unwrap();
    let mut a = Vec::with_capacity(m);
    for i in 0..m {
        a.push(tokens[2 + i].parse::<i64>().unwrap());
    }
    let mut b = Vec::with_capacity(n);
    for i in 0..n {
        b.push(tokens[2 + m + i].parse::<i64>().unwrap());
    }
    let mut i = 0;
    let mut j = 0;
    let mut ans = Vec::with_capacity(m + n);
    while i < m || j < n {
        if i < m && (j == n || a[i] <= b[j]) {
            ans.push(a[i]);
            i += 1;
        } else {
            ans.push(b[j]);
            j += 1;
        }
    }
    let strs: Vec<String> = ans.iter().map(|x| x.to_string()).collect();
    writeln!(out, "{}", strs.join(" ")).unwrap();
}`,
        },
    },

    // ==================== MEDIUM #21: Koko Eating Bananas ====================
    {
        title: 'Koko Eating Bananas',
        description:
            'Koko loves to eat bananas. There are N piles of bananas, the i-th pile has piles[i] bananas. The guards have gone and will come back in H hours.\n\nKoko can decide her bananas-per-hour eating speed of K. Each hour, she chooses some pile of bananas and eats K bananas from that pile. If the pile has less than K bananas, she eats all of them instead and will not eat any more bananas during this hour.\n\nKoko likes to eat slowly but still wants to finish eating all the bananas before the guards return.\n\nReturn the minimum integer K such that she can eat all the bananas within H hours.\n\n**Input Format:**\n- First line: two space-separated integers N and H.\n- Second line: N space-separated integers representing the bananas in each pile.\n\n**Output Format:**\n- A single integer representing the minimum eating speed K.',
        difficulty: 'MEDIUM',
        tags: ['binary-search'],
        constraints: '1 <= N <= 10^5\nN <= H <= 10^9\n1 <= piles[i] <= 10^9',
        hints: 'Use binary search on the eating speed K. The search range is from 1 to the maximum size of a pile in piles.',
        editorial:
            '**Approach: Binary Search on Answer**\n\nThe speed K is at least 1 and at most the maximum elements in `piles`. We can binary search K in the range `[1, max(piles)]`.\nFor a candidate speed `mid`:\n- Calculate total hours required to finish all bananas: `total = sum(ceil(pile / mid))`.\n- If `total <= H`, Koko can finish all bananas at speed `mid`. This speed is feasible, so we record it and search for a smaller speed (`high = mid - 1`).\n- If `total > H`, the speed is too slow, so we need a larger speed (`low = mid + 1`).\n\nTo compute `ceil(pile / mid)` without floats, use `(pile + mid - 1) / mid`.\n\n**Time Complexity:** O(N log(max(piles)))\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4 8\n3 6 7 11',
                output: '4',
                explanation: 'If speed K = 4, she can eat pile 1 (3 bananas) in 1 hour, pile 2 (6 bananas) in 2 hours, pile 3 (7 bananas) in 2 hours, pile 4 (11 bananas) in 3 hours. Total hours = 1 + 2 + 2 + 3 = 8.',
            },
            {
                title: 'Example 2',
                input: '5 5\n30 11 23 4 20',
                output: '30',
                explanation: 'With speed 30, Koko eats all bananas in 5 hours (1 + 1 + 1 + 1 + 1). If she eats at speed 29, she would need 2 hours for the first pile, totaling 6 hours.',
            },
        ],
        testcases: [
            { input: '4 8\n3 6 7 11', output: '4' },
            { input: '5 5\n30 11 23 4 20', output: '30' },
            { input: '5 6\n30 11 23 4 20', output: '23' },
            { input: '1 100\n100', output: '1' },
            { input: '1 1\n100', output: '100' },
            { input: '6 1000000000\n100 200 300 400 500 600', output: '1' },
            { input: '5 5\n1 1 1 1 1', output: '1' },
            { input: '3 10\n1000000000 1000000000 1000000000', output: '333333334' },
            { input: '3 4\n100 200 300', output: '200' },
            { input: '3 5\n100 200 300', output: '150' },
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
    long long h;
    if (!(cin >> n >> h)) return 0;
    vector<long long> piles(n);
    long long max_pile = 0;
    for (int i = 0; i < n; i++) {
        cin >> piles[i];
        max_pile = max(max_pile, piles[i]);
    }
    long long low = 1, high = max_pile;
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        long long total = 0;
        for (int i = 0; i < n; i++) {
            total += (piles[i] + mid - 1) / mid;
        }
        if (total <= h) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
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
    h = int(input_data[1])
    piles = [int(x) for x in input_data[2:]]
    low = 1
    high = max(piles)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        total = 0
        for p in piles:
            total += (p + mid - 1) // mid
        if total <= h:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    print(ans)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<String> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                tokens.add(st.nextToken());
            }
        }
        if (tokens.isEmpty()) return;
        int n = Integer.parseInt(tokens.get(0));
        long h = Long.parseLong(tokens.get(1));
        long[] piles = new long[n];
        long maxPile = 0;
        for (int i = 0; i < n; i++) {
            piles[i] = Long.parseLong(tokens.get(2 + i));
            if (piles[i] > maxPile) {
                maxPile = piles[i];
            }
        }
        long low = 1, high = maxPile;
        long ans = high;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            long total = 0;
            for (int i = 0; i < n; i++) {
                total += (piles[i] + mid - 1) / mid;
            }
            if (total <= h) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut tokens = Vec::new();
    for line in stdin.lock().lines() {
        if let Ok(l) = line {
            for word in l.split_whitespace() {
                tokens.push(word.to_string());
            }
        }
    }
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let h: i64 = tokens[1].parse().unwrap();
    let mut piles = Vec::with_capacity(n);
    let mut max_pile = 0i64;
    for i in 0..n {
        let val: i64 = tokens[2 + i].parse().unwrap();
        piles.push(val);
        if val > max_pile {
            max_pile = val;
        }
    }
    let mut low = 1i64;
    let mut high = max_pile;
    let mut ans = high;
    while low <= high {
        let mid = low + (high - low) / 2;
        let mut total = 0i64;
        for &p in &piles {
            total += (p + mid - 1) / mid;
        }
        if total <= h {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    writeln!(out, "{}", ans).unwrap();
}`,
        },
    },

    // ==================== MEDIUM #22: Search a 2D Matrix II ====================
    {
        title: 'Search a 2D Matrix II',
        description:
            'Write an efficient algorithm that searches for a target value in an M x N integer matrix. This matrix has the following properties:\n- Integers in each row are sorted in ascending from left to right.\n- Integers in each column are sorted in ascending from top to bottom.\n\nOutput `true` if the target is found in the matrix, and `false` otherwise.\n\n**Input Format:**\n- First line: three space-separated integers M, N, and target, representing the number of rows, the number of columns, and the target value.\n- Next M lines: each contains N space-separated integers representing the matrix.\n\n**Output Format:**\n- Print `true` if the target exists in the matrix, otherwise print `false`.',
        difficulty: 'MEDIUM',
        tags: ['searching', 'two-pointers'],
        constraints: '1 <= M, N <= 1000\n-10^9 <= matrix[i][j], target <= 10^9',
        hints: 'Start search from the top-right corner of the matrix. If target is smaller than the current element, move left. If target is larger, move down.',
        editorial:
            '**Approach: Search from Corner (Top-Right or Bottom-Left)**\n\nWe can solve this problem in O(M + N) time by starting from the top-right corner `(r, c) = (0, N - 1)`:\n- If `matrix[r][c] == target`, we found the target, so output `true`.\n- If `matrix[r][c] > target`, then all elements in the current column below `(r, c)` must also be greater than target since the columns are sorted. Thus, we can safely move left: `c = c - 1`.\n- If `matrix[r][c] < target`, then all elements in the current row to the left of `(r, c)` must also be smaller than target. Thus, we can safely move down: `r = r + 1`.\n\nRepeat this until we go out of bounds of the matrix, in which case target is not present, so output `false`.\n\n**Time Complexity:** O(M + N) since in each step we either decrement `c` or increment `r`.\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '5 5 5\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30',
                output: 'true',
                explanation: '5 is present in the second row, second column.',
            },
            {
                title: 'Example 2',
                input: '5 5 20\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30',
                output: 'false',
                explanation: '20 is not present in the matrix.',
            },
        ],
        testcases: [
            { input: '5 5 5\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30', output: 'true' },
            { input: '5 5 20\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30', output: 'false' },
            { input: '1 1 5\n5', output: 'true' },
            { input: '1 1 4\n5', output: 'false' },
            { input: '3 3 9\n1 2 3\n4 5 6\n7 8 9', output: 'true' },
            { input: '3 3 10\n1 2 3\n4 5 6\n7 8 9', output: 'false' },
            { input: '2 4 11\n1 3 5 7\n2 4 8 11', output: 'true' },
            { input: '4 2 -5\n-10 -5\n-8 -3\n-6 -1\n0 2', output: 'true' },
            { input: '4 2 -4\n-10 -5\n-8 -3\n-6 -1\n0 2', output: 'false' },
            { input: '3 4 100\n1 10 20 30\n5 15 25 35\n10 20 30 40', output: 'false' },
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
    long long target;
    if (!(cin >> m >> n >> target)) return 0;
    vector<vector<long long>> matrix(m, vector<long long>(n));
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    int r = 0, c = n - 1;
    bool found = false;
    while (r < m && c >= 0) {
        if (matrix[r][c] == target) {
            found = true;
            break;
        } else if (matrix[r][c] > target) {
            c--;
        } else {
            r++;
        }
    }
    cout << (found ? "true" : "false") << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    m = int(input_data[0])
    n = int(input_data[1])
    target = int(input_data[2])
    matrix = []
    idx = 3
    for i in range(m):
        row = [int(x) for x in input_data[idx : idx + n]]
        matrix.append(row)
        idx += n
    r = 0
    c = n - 1
    found = False
    while r < m and c >= 0:
        if matrix[r][c] == target:
            found = True
            break
        elif matrix[r][c] > target:
            c -= 1
        else:
            r += 1
    print("true" if found else "false")

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<String> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                tokens.add(st.nextToken());
            }
        }
        if (tokens.isEmpty()) return;
        int m = Integer.parseInt(tokens.get(0));
        int n = Integer.parseInt(tokens.get(1));
        long target = Long.parseLong(tokens.get(2));
        long[][] matrix = new long[m][n];
        int idx = 3;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = Long.parseLong(tokens.get(idx++));
            }
        }
        int r = 0, c = n - 1;
        boolean found = false;
        while (r < m && c >= 0) {
            if (matrix[r][c] == target) {
                found = true;
                break;
            } else if (matrix[r][c] > target) {
                c--;
            } else {
                r++;
            }
        }
        System.out.println(found ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut tokens = Vec::new();
    for line in stdin.lock().lines() {
        if let Ok(l) = line {
            for word in l.split_whitespace() {
                tokens.push(word.to_string());
            }
        }
    }
    if tokens.is_empty() { return; }
    let m: usize = tokens[0].parse().unwrap();
    let n: usize = tokens[1].parse().unwrap();
    let target: i64 = tokens[2].parse().unwrap();
    let mut matrix = vec![vec![0i64; n]; m];
    let mut idx = 3;
    for i in 0..m {
        for j in 0..n {
            matrix[i][j] = tokens[idx].parse().unwrap();
            idx += 1;
        }
    }
    let mut r = 0usize;
    let mut c = n as isize - 1;
    let mut found = false;
    while r < m && c >= 0 {
        let val = matrix[r][c as usize];
        if val == target {
            found = true;
            break;
        } else if val > target {
            c -= 1;
        } else {
            r += 1;
        }
    }
    writeln!(out, "{}", if found { "true" } else { "false" }).unwrap();
}`,
        },
    },

    // ==================== HARD #21: K-th Smallest Distance Pair ====================
    {
        title: 'K-th Smallest Distance Pair',
        description:
            'The distance of a value pair (A, B) is defined as the absolute difference between A and B, i.e., |A - B|.\n\nGiven an integer array nums of size N and an integer K, return the K-th smallest distance among all the pairs nums[i] and nums[j] where 0 <= i < j < N.\n\n**Input Format:**\n- First line: two space-separated integers N and K.\n- Second line: N space-separated integers representing the array nums.\n\n**Output Format:**\n- A single integer representing the K-th smallest distance.',
        difficulty: 'HARD',
        tags: ['binary-search', 'two-pointers'],
        constraints: '2 <= N <= 5 * 10^4\n0 <= nums[i] <= 10^6\n1 <= K <= N * (N - 1) / 2',
        hints: 'Sort the array first. Then, binary search for the distance value. For each candidate distance, count how many pairs have a distance less than or equal to it using a sliding window.',
        editorial:
            '**Approach: Binary Search on Distance + Sliding Window**\n\n1. Sort the input array `nums`. The minimum possible pair distance is `0`, and the maximum possible pair distance is `nums[N-1] - nums[0]`. This defines our binary search range `[low, high]`.\n2. In each step, we calculate `mid = low + (high - low) / 2` and check the number of pairs with distance <= `mid`.\n3. To count pairs with distance <= `mid` in O(N):\n   - Use a sliding window with two pointers `l` and `r`.\n   - For each right endpoint `r` from 0 to N - 1, advance the left pointer `l` until `nums[r] - nums[l] <= mid`.\n   - The number of valid pairs ending at `r` is `r - l`. Sum these counts up across all `r`.\n4. If the total count of pairs with distance <= `mid` is greater than or equal to `K`, it means the K-th smallest distance is at most `mid` (we search left: `high = mid`). Otherwise, the target distance is greater than `mid` (we search right: `low = mid + 1`).\n\n**Time Complexity:** O(N log N + N log(max_dist)) where `max_dist = nums[N-1] - nums[0]`.\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '3 1\n1 3 1',
                output: '0',
                explanation: 'The pairs are (1,3), (1,1), and (3,1). Their distances are 2, 0, and 2. The 1st smallest distance is 0.',
            },
            {
                title: 'Example 2',
                input: '3 3\n1 1 3',
                output: '2',
                explanation: 'The sorted distances are 0, 2, 2. The 3rd smallest distance is 2.',
            },
        ],
        testcases: [
            { input: '3 1\n1 3 1', output: '0' },
            { input: '3 3\n1 1 3', output: '2' },
            { input: '2 1\n1 5', output: '4' },
            { input: '4 6\n1 2 3 4', output: '3' },
            { input: '4 1\n1 2 3 4', output: '1' },
            { input: '4 3\n1 2 3 4', output: '1' },
            { input: '4 4\n1 2 3 4', output: '2' },
            { input: '5 10\n1 5 10 15 20', output: '19' },
            { input: '5 5\n1 5 10 15 20', output: '9' },
            { input: '6 15\n1 3 6 10 15 21', output: '20' },
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
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums.begin(), nums.end());
    int low = 0;
    int high = nums.back() - nums[0];
    while (low < high) {
        int mid = low + (high - low) / 2;
        long long count = 0;
        int l = 0;
        for (int r = 0; r < n; r++) {
            while (nums[r] - nums[l] > mid) {
                l++;
            }
            count += (r - l);
        }
        if (count >= k) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    cout << low << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    k = int(input_data[1])
    nums = [int(x) for x in input_data[2:]]
    nums.sort()
    low = 0
    high = nums[-1] - nums[0]
    while low < high:
        mid = (low + high) // 2
        count = 0
        l = 0
        for r in range(n):
            while nums[r] - nums[l] > mid:
                l += 1
            count += (r - l)
        if count >= k:
            high = mid
        else:
            low = mid + 1
    print(low)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<String> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                tokens.add(st.nextToken());
            }
        }
        if (tokens.isEmpty()) return;
        int n = Integer.parseInt(tokens.get(0));
        long k = Long.parseLong(tokens.get(1));
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(tokens.get(2 + i));
        }
        Arrays.sort(nums);
        int low = 0;
        int high = nums[n - 1] - nums[0];
        while (low < high) {
            int mid = low + (high - low) / 2;
            long count = 0;
            int l = 0;
            for (int r = 0; r < n; r++) {
                while (nums[r] - nums[l] > mid) {
                    l++;
                }
                count += (r - l);
            }
            if (count >= k) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        System.out.println(low);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut tokens = Vec::new();
    for line in stdin.lock().lines() {
        if let Ok(l) = line {
            for word in l.split_whitespace() {
                tokens.push(word.to_string());
            }
        }
    }
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let k: i64 = tokens[1].parse().unwrap();
    let mut nums = Vec::with_capacity(n);
    for i in 0..n {
        nums.push(tokens[2 + i].parse::<i32>().unwrap());
    }
    nums.sort_unstable();
    let mut low = 0;
    let mut high = nums[n - 1] - nums[0];
    while low < high {
        let mid = low + (high - low) / 2;
        let mut count = 0i64;
        let mut l = 0usize;
        for r in 0..n {
            while nums[r] - nums[l] > mid {
                l += 1;
            }
            count += (r - l) as i64;
        }
        if count >= k {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    writeln!(out, "{}", low).unwrap();
}`,
        },
    },
]
