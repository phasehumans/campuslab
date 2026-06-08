import type { SeedProblem } from './types.js'

export const arraysStringsProblems: SeedProblem[] = [
    // ==================== EASY #1: Reverse Array ====================
    {
        title: 'Reverse Array',
        description:
            'Given an array of integers, reverse its elements and print the reversed array.\n\n**Input Format:**\n- First line: integer n (the size of the array)\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single line containing the reversed array with space-separated integers',
        difficulty: 'EASY',
        tags: ['arrays'],
        constraints: '1 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9',
        hints: 'Use two pointers starting at the beginning and the end of the array, swapping elements and moving towards the center. Alternatively, read the input into an array and iterate backwards.',
        editorial:
            '**Approach: Two Pointers or Reverse Iteration**\n\n1. Read the input of size n and the array.\n2. Print the elements starting from index n-1 down to 0, separated by spaces.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) or O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '5\n1 2 3 4 5',
                output: '5 4 3 2 1',
                explanation: 'The elements are reversed from [1, 2, 3, 4, 5] to [5, 4, 3, 2, 1].',
            },
            {
                title: 'Example 2',
                input: '3\n10 -1 20',
                output: '20 -1 10',
            },
        ],
        testcases: [
            {
                input: '5\n1 2 3 4 5',
                output: '5 4 3 2 1',
            },
            {
                input: '3\n10 -1 20',
                output: '20 -1 10',
            },
            {
                input: '1\n42',
                output: '42',
            },
            {
                input: '2\n1 2',
                output: '2 1',
            },
            {
                input: '4\n0 0 0 0',
                output: '0 0 0 0',
            },
            {
                input: '6\n-1 -2 -3 -4 -5 -6',
                output: '-6 -5 -4 -3 -2 -1',
            },
            {
                input: '10\n1 9 2 8 3 7 4 6 5 0',
                output: '0 5 6 4 7 3 8 2 9 1',
            },
            {
                input: '2\n1000000000 -1000000000',
                output: '-1000000000 1000000000',
            },
            {
                input: '8\n2 4 6 8 10 12 14 16',
                output: '16 14 12 10 8 6 4 2',
            },
            {
                input: '5\n9 9 8 8 7',
                output: '7 8 8 9 9',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    \n    int n;\n    if (cin >> n) {\n        // Read n elements and solve\n    }\n    \n    return 0;\n}',
            python: 'def main():\n    import sys\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    for (int i = n - 1; i >= 0; i--) {\n        cout << arr[i] << (i == 0 ? "" : " ");\n    }\n    cout << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = input_data[1:1+n]\n    print(*(arr[::-1]))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st = new StringTokenizer(line2);\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) {\n            arr[i] = Integer.parseInt(st.nextToken());\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = n - 1; i >= 0; i--) {\n            sb.append(arr[i]).append(i == 0 ? "" : " ");\n        }\n        System.out.println(sb.toString());\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: usize = line1.trim().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let arr: Vec<i32> = line2.split_whitespace()\n                .map(|x| x.parse().unwrap())\n                .collect();\n            for i in (0..n).rev() {\n                write!(out, "{}", arr[i]).unwrap();\n                if i > 0 {\n                    write!(out, " ").unwrap();\n                }\n            }\n            writeln!(out).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== EASY #2: Find Maximum Element ====================
    {
        title: 'Find Maximum Element',
        description:
            'Given an array of integers, find the maximum element in the array.\n\n**Input Format:**\n- First line: integer n (the size of the array)\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single integer: the maximum value',
        difficulty: 'EASY',
        tags: ['arrays'],
        constraints: '1 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9',
        hints: 'Initialize a variable to the smallest possible integer value (or the first element of the array) and iterate through the array, updating the variable whenever you find a larger element.',
        editorial:
            '**Approach: Single Scan**\n\nWe can maintain a variable `max_val` initialized to the first element or a very small number. Iterate through all elements, update `max_val` if the current element is larger.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '5\n1 5 3 9 2',
                output: '9',
                explanation: 'The maximum number in the array is 9.',
            },
            {
                title: 'Example 2',
                input: '3\n-10 -5 -20',
                output: '-5',
                explanation: '-5 is the largest among -10, -5, and -20.',
            },
        ],
        testcases: [
            {
                input: '5\n1 5 3 9 2',
                output: '9',
            },
            {
                input: '3\n-10 -5 -20',
                output: '-5',
            },
            {
                input: '1\n0',
                output: '0',
            },
            {
                input: '4\n100 100 100 100',
                output: '100',
            },
            {
                input: '6\n-1000000000 -500 -1000 -2 0 -1',
                output: '0',
            },
            {
                input: '8\n1 2 3 4 5 6 7 8',
                output: '8',
            },
            {
                input: '8\n8 7 6 5 4 3 2 1',
                output: '8',
            },
            {
                input: '2\n-2147483648 2147483647',
                output: '2147483647',
            },
            {
                input: '5\n12 45 78 34 56',
                output: '78',
            },
            {
                input: '10\n-3 -15 2 8 -1 0 7 -4 6 5',
                output: '8',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (cin >> n) {\n        // Find max element\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    long long max_val = -2e18;\n    for (int i = 0; i < n; i++) {\n        long long val;\n        cin >> val;\n        max_val = max(max_val, val);\n    }\n    cout << max_val << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    print(max(arr))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st = new StringTokenizer(line2);\n        long maxVal = Long.MIN_VALUE;\n        for (int i = 0; i < n; i++) {\n            long val = Long.parseLong(st.nextToken());\n            if (val > maxVal) {\n                maxVal = val;\n            }\n        }\n        System.out.println(maxVal);\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: usize = line1.trim().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let mut max_val = i64::MIN;\n            for token in line2.split_whitespace() {\n                let val: i64 = token.parse().unwrap();\n                if val > max_val {\n                    max_val = val;\n                }\n            }\n            writeln!(out, "{}", max_val).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== EASY #3: Count Occurrences ====================
    {
        title: 'Count Occurrences',
        description:
            'Given an array of integers and a target integer k, count the number of times k appears in the array.\n\n**Input Format:**\n- First line: two space-separated integers n and k\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single integer: the count of occurrences of k',
        difficulty: 'EASY',
        tags: ['arrays'],
        constraints: '1 <= n <= 10^5\n-10^9 <= k <= 10^9\n-10^9 <= arr[i] <= 10^9',
        hints: 'Iterate through the array and maintain a counter. Increment the counter every time you encounter an element equal to k.',
        editorial:
            '**Approach: Iterative Scan**\n\nScan through the array and increment a count variable whenever `arr[i] == k`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '6 3\n1 3 2 3 4 3',
                output: '3',
                explanation: 'The value 3 appears 3 times in the array.',
            },
            {
                title: 'Example 2',
                input: '5 10\n1 2 3 4 5',
                output: '0',
                explanation: '10 does not appear in the array.',
            },
        ],
        testcases: [
            {
                input: '6 3\n1 3 2 3 4 3',
                output: '3',
            },
            {
                input: '5 10\n1 2 3 4 5',
                output: '0',
            },
            {
                input: '1 5\n5',
                output: '1',
            },
            {
                input: '1 5\n6',
                output: '0',
            },
            {
                input: '10 2\n2 2 2 2 2 2 2 2 2 2',
                output: '10',
            },
            {
                input: '8 -1\n-1 0 -1 0 -1 0 -1 0',
                output: '4',
            },
            {
                input: '5 9\n9 9 9 9 9',
                output: '5',
            },
            {
                input: '4 1000000000\n1000000000 0 -1000000000 1000000000',
                output: '2',
            },
            {
                input: '6 0\n0 1 0 2 0 3',
                output: '3',
            },
            {
                input: '7 7\n1 2 3 4 5 6 8',
                output: '0',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    long long k;\n    if (cin >> n >> k) {\n        // Count occurrences of k\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    k = int(input_data[1])\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    long long k;\n    if (!(cin >> n >> k)) return 0;\n    int count = 0;\n    for (int i = 0; i < n; i++) {\n        long long val;\n        cin >> val;\n        if (val == k) count++;\n    }\n    cout << count << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    k = int(input_data[1])\n    arr = [int(x) for x in input_data[2:2+n]]\n    print(arr.count(k))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        StringTokenizer st1 = new StringTokenizer(line1);\n        int n = Integer.parseInt(st1.nextToken());\n        long k = Long.parseLong(st1.nextToken());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st2 = new StringTokenizer(line2);\n        int count = 0;\n        for (int i = 0; i < n; i++) {\n            long val = Long.parseLong(st2.nextToken());\n            if (val == k) count++;\n        }\n        System.out.println(count);\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let mut parts = line1.split_whitespace();\n        let n: usize = parts.next().unwrap().parse().unwrap();\n        let k: i64 = parts.next().unwrap().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let mut count = 0;\n            for token in line2.split_whitespace() {\n                let val: i64 = token.parse().unwrap();\n                if val == k {\n                    count += 1;\n                }\n            }\n            writeln!(out, "{}", count).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== EASY #4: Check Palindrome String ====================
    {
        title: 'Check Palindrome String',
        description:
            'Given a string s, determine if it is a palindrome. A string is a palindrome if it reads the same backward as forward. The string will consist only of lowercase English letters.\n\n**Input Format:**\n- A single line containing the string s\n\n**Output Format:**\n- Print "true" if s is a palindrome, "false" otherwise',
        difficulty: 'EASY',
        tags: ['strings'],
        constraints: '1 <= s.length <= 10^5\ns consists only of lowercase English letters',
        hints: 'Compare characters from both ends moving towards the center using two pointers.',
        editorial:
            '**Approach: Two Pointers**\n\nInitialize `left = 0` and `right = s.length() - 1`. If `s[left] != s[right]`, return false. Increment left and decrement right until they meet. If all characters match, return true.\n\n**Time Complexity:** O(s.length())\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: 'racecar',
                output: 'true',
                explanation: "'racecar' reads the same forward and backward.",
            },
            {
                title: 'Example 2',
                input: 'hello',
                output: 'false',
                explanation: "'hello' reversed is 'olleh', which is different.",
            },
        ],
        testcases: [
            {
                input: 'racecar',
                output: 'true',
            },
            {
                input: 'hello',
                output: 'false',
            },
            {
                input: 'a',
                output: 'true',
            },
            {
                input: 'ab',
                output: 'false',
            },
            {
                input: 'aba',
                output: 'true',
            },
            {
                input: 'abba',
                output: 'true',
            },
            {
                input: 'abcba',
                output: 'true',
            },
            {
                input: 'abac',
                output: 'false',
            },
            {
                input: 'xyzzyx',
                output: 'true',
            },
            {
                input: 'abcdefgfedcba',
                output: 'true',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string s;\n    if (cin >> s) {\n        // Check palindrome\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    s = sys.stdin.read().strip()\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string s;\n    if (!(cin >> s)) return 0;\n    bool is_palindrome = true;\n    int left = 0, right = (int)s.length() - 1;\n    while (left < right) {\n        if (s[left] != s[right]) {\n            is_palindrome = false;\n            break;\n        }\n        left++;\n        right--;\n    }\n    cout << (is_palindrome ? "true" : "false") << "\\n";\n    return 0;\n}',
            python: 'import sys\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    is_palindrome = s == s[::-1]\n    print("true" if is_palindrome else "false")\nif __name__ == \'__main__\':\n    main()',
            java: 'import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) return;\n        s = s.trim();\n        boolean isPalindrome = true;\n        int left = 0, right = s.length() - 1;\n        while (left < right) {\n            if (s.charAt(left) != s.charAt(right)) {\n                isPalindrome = false;\n                break;\n            }\n            left++;\n            right--;\n        }\n        System.out.println(isPalindrome ? "true" : "false");\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line)) = lines.next() {\n        let s = line.trim();\n        let bytes = s.as_bytes();\n        let mut is_palindrome = true;\n        let mut left = 0;\n        let mut right = bytes.len() as isize - 1;\n        while left < right {\n            if bytes[left as usize] != bytes[right as usize] {\n                is_palindrome = false;\n                break;\n            }\n            left += 1;\n            right -= 1;\n        }\n        writeln!(out, "{}", if is_palindrome { "true" } else { "false" }).unwrap();\n    }\n}',
        },
    },

    // ==================== EASY #5: Remove Duplicates from Sorted Array ====================
    {
        title: 'Remove Duplicates from Sorted Array',
        description:
            'Given a sorted array of integers, remove the duplicates in-place such that each element appears only once and return the new length m.\n\nPrint the new length m, followed by the first m elements of the modified array.\n\n**Input Format:**\n- First line: integer n\n- Second line: n space-separated sorted integers\n\n**Output Format:**\n- First line: a single integer representing the new length m\n- Second line: m space-separated integers representing the unique elements in the modified array',
        difficulty: 'EASY',
        tags: ['arrays'],
        constraints:
            '1 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9\narr is sorted in non-decreasing order',
        hints: 'Use a slow-runner pointer and a fast-runner pointer. The slow-runner pointer only advances when a new unique element is encountered.',
        editorial:
            '**Approach: Two Pointers**\n\nMaintain index `m = 1` for unique elements. Iterate `i` from 1 to n-1. If `arr[i] != arr[i-1]`, update `arr[m] = arr[i]` and increment `m`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '3\n1 1 2',
                output: '2\n1 2',
                explanation: 'Unique elements are [1, 2] with length 2.',
            },
            {
                title: 'Example 2',
                input: '10\n0 0 1 1 1 2 2 3 3 4',
                output: '5\n0 1 2 3 4',
                explanation: 'Unique elements are [0, 1, 2, 3, 4] with length 5.',
            },
        ],
        testcases: [
            {
                input: '3\n1 1 2',
                output: '2\n1 2',
            },
            {
                input: '10\n0 0 1 1 1 2 2 3 3 4',
                output: '5\n0 1 2 3 4',
            },
            {
                input: '1\n5',
                output: '1\n5',
            },
            {
                input: '5\n1 1 1 1 1',
                output: '1\n1',
            },
            {
                input: '6\n1 2 3 4 5 6',
                output: '6\n1 2 3 4 5 6',
            },
            {
                input: '8\n-2 -2 -1 0 0 1 2 2',
                output: '5\n-2 -1 0 1 2',
            },
            {
                input: '2\n10 20',
                output: '2\n10 20',
            },
            {
                input: '4\n-10 -10 -10 -5',
                output: '2\n-10 -5',
            },
            {
                input: '6\n-100 -100 -100 -100 -100 -100',
                output: '1\n-100',
            },
            {
                input: '9\n1 1 2 2 3 3 4 4 5',
                output: '5\n1 2 3 4 5',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (cin >> n) {\n        // Solve\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    if (n == 0) {\n        cout << 0 << "\\n\\n";\n        return 0;\n    }\n    int m = 1;\n    for (int i = 1; i < n; i++) {\n        if (arr[i] != arr[i - 1]) {\n            arr[m] = arr[i];\n            m++;\n        }\n    }\n    cout << m << "\\n";\n    for (int i = 0; i < m; i++) {\n        cout << arr[i] << (i == m - 1 ? "" : " ");\n    }\n    cout << "\\n";\n    return 0;\n}',
            python: 'import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    if n == 0:\n        print("0\\n")\n        return\n    unique = []\n    for x in arr:\n        if not unique or x != unique[-1]:\n            unique.append(x)\n    print(len(unique))\n    print(*(unique))\nif __name__ == \'__main__\':\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st = new StringTokenizer(line2);\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) {\n            arr[i] = Integer.parseInt(st.nextToken());\n        }\n        if (n == 0) {\n            System.out.println(0);\n            System.out.println();\n            return;\n        }\n        int m = 1;\n        for (int i = 1; i < n; i++) {\n            if (arr[i] != arr[i - 1]) {\n                arr[m] = arr[i];\n                m++;\n            }\n        }\n        System.out.println(m);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < m; i++) {\n            sb.append(arr[i]).append(i == m - 1 ? "" : " ");\n        }\n        System.out.println(sb.toString());\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: usize = line1.trim().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let mut arr: Vec<i32> = line2.split_whitespace()\n                .map(|x| x.parse().unwrap())\n                .collect();\n            if n == 0 {\n                writeln!(out, "0").unwrap();\n                writeln!(out).unwrap();\n                return;\n            }\n            let mut m = 1;\n            for i in 1..n {\n                if arr[i] != arr[i - 1] {\n                    arr[m] = arr[i];\n                    m += 1;\n                }\n            }\n            writeln!(out, "{}", m).unwrap();\n            for i in 0..m {\n                write!(out, "{}", arr[i]).unwrap();\n                if i < m - 1 {\n                    write!(out, " ").unwrap();\n                }\n            }\n            writeln!(out).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== EASY #6: Merge Two Sorted Arrays ====================
    {
        title: 'Merge Two Sorted Arrays',
        description:
            'Given two sorted arrays, merge them into a single sorted array.\n\n**Input Format:**\n- First line: two space-separated integers n and m (sizes of the two arrays)\n- Second line: n space-separated sorted integers (first array)\n- Third line: m space-separated sorted integers (second array)\n\n**Output Format:**\n- A single line containing n+m space-separated sorted integers representing the merged array',
        difficulty: 'EASY',
        tags: ['arrays'],
        constraints:
            '1 <= n, m <= 5 * 10^4\n-10^9 <= arr1[i], arr2[j] <= 10^9\nBoth arrays are sorted in non-decreasing order',
        hints: 'Use the two-pointer technique to traverse both arrays simultaneously, picking the smaller element from either array and placing it in the merged array.',
        editorial:
            '**Approach: Two Pointers**\n\nMaintain two pointers `i = 0` and `j = 0` for both arrays. Compare `arr1[i]` and `arr2[j]`, print the smaller one, and advance that pointer. If one array is exhausted, print the remaining elements of the other.\n\n**Time Complexity:** O(n + m)\n**Space Complexity:** O(1) auxiliary space if printed directly, or O(n + m) to store the result.',
        examples: [
            {
                title: 'Example 1',
                input: '3 3\n1 3 5\n2 4 6',
                output: '1 2 3 4 5 6',
                explanation: 'Merging [1, 3, 5] and [2, 4, 6] gives [1, 2, 3, 4, 5, 6].',
            },
            {
                title: 'Example 2',
                input: '2 3\n1 5\n2 3 4',
                output: '1 2 3 4 5',
                explanation: 'Merging [1, 5] and [2, 3, 4] gives [1, 2, 3, 4, 5].',
            },
        ],
        testcases: [
            {
                input: '3 3\n1 3 5\n2 4 6',
                output: '1 2 3 4 5 6',
            },
            {
                input: '2 3\n1 5\n2 3 4',
                output: '1 2 3 4 5',
            },
            {
                input: '1 1\n2\n1',
                output: '1 2',
            },
            {
                input: '4 4\n1 2 3 4\n5 6 7 8',
                output: '1 2 3 4 5 6 7 8',
            },
            {
                input: '4 4\n5 6 7 8\n1 2 3 4',
                output: '1 2 3 4 5 6 7 8',
            },
            {
                input: '3 3\n-5 0 5\n-10 -2 2',
                output: '-10 -5 -2 0 2 5',
            },
            {
                input: '5 1\n1 3 5 7 9\n6',
                output: '1 3 5 6 7 9',
            },
            {
                input: '2 2\n10 20\n10 20',
                output: '10 10 20 20',
            },
            {
                input: '6 3\n1 2 10 11 12 13\n3 4 5',
                output: '1 2 3 4 5 10 11 12 13',
            },
            {
                input: '4 2\n-100 0 100 200\n-50 50',
                output: '-100 -50 0 50 100 200',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    if (cin >> n >> m) {\n        // Read two sorted arrays and merge them\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    vector<int> a(n), b(m);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    for (int i = 0; i < m; i++) cin >> b[i];\n    int i = 0, j = 0;\n    bool first = true;\n    while (i < n || j < m) {\n        if (!first) cout << " ";\n        first = false;\n        if (i < n && (j >= m || a[i] <= b[j])) {\n            cout << a[i];\n            i++;\n        } else {\n            cout << b[j];\n            j++;\n        }\n    }\n    cout << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    m = int(input_data[1])\n    a = [int(x) for x in input_data[2:2+n]]\n    b = [int(x) for x in input_data[2+n:2+n+m]]\n    res = []\n    i, j = 0, 0\n    while i < n or j < m:\n        if i < n && (j >= m or a[i] <= b[j]):\n            res.append(a[i])\n            i += 1\n        else:\n            res.append(b[j])\n            j += 1\n    print(*(res))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        StringTokenizer st1 = new StringTokenizer(line1);\n        int n = Integer.parseInt(st1.nextToken());\n        int m = Integer.parseInt(st1.nextToken());\n        \n        int[] a = new int[n];\n        String line2 = br.readLine();\n        if (line2 != null) {\n            StringTokenizer st2 = new StringTokenizer(line2);\n            for (int i = 0; i < n; i++) a[i] = Integer.parseInt(st2.nextToken());\n        }\n        \n        int[] b = new int[m];\n        String line3 = br.readLine();\n        if (line3 != null) {\n            StringTokenizer st3 = new StringTokenizer(line3);\n            for (int i = 0; i < m; i++) b[i] = Integer.parseInt(st3.nextToken());\n        }\n        \n        StringBuilder sb = new StringBuilder();\n        int i = 0, j = 0;\n        while (i < n || j < m) {\n            if (i < n && (j >= m || a[i] <= b[j])) {\n                sb.append(a[i]);\n                i++;\n            } else {\n                sb.append(b[j]);\n                j++;\n            }\n            if (i < n || j < m) {\n                sb.append(" ");\n            }\n        }\n        System.out.println(sb.toString());\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let mut parts = line1.split_whitespace();\n        let n: usize = parts.next().unwrap().parse().unwrap();\n        let m: usize = parts.next().unwrap().parse().unwrap();\n        \n        let mut a = Vec::new();\n        if let Some(Ok(line2)) = lines.next() {\n            a = line2.split_whitespace().map(|x| x.parse::<i32>().unwrap()).collect();\n        }\n        let mut b = Vec::new();\n        if let Some(Ok(line3)) = lines.next() {\n            b = line3.split_whitespace().map(|x| x.parse::<i32>().unwrap()).collect();\n        }\n        \n        let mut i = 0;\n        let mut j = 0;\n        let mut first = true;\n        while i < n || j < m {\n            if !first {\n                write!(out, " ").unwrap();\n            }\n            first = false;\n            if i < n && (j >= m || a[i] <= b[j]) {\n                write!(out, "{}", a[i]).unwrap();\n                i += 1;\n            } else {\n                write!(out, "{}", b[j]).unwrap();\n                j += 1;\n            }\n        }\n        writeln!(out).unwrap();\n    }\n}',
        },
    },

    // ==================== EASY #7: Rotate Array by K ====================
    {
        title: 'Rotate Array by K',
        description:
            'Given an array of integers, rotate the array to the right by k steps, where k is non-negative.\n\n**Input Format:**\n- First line: two space-separated integers n and k\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single line containing the rotated array with space-separated integers',
        difficulty: 'EASY',
        tags: ['arrays'],
        constraints: '1 <= n <= 10^5\n0 <= k <= 10^5\n-10^9 <= arr[i] <= 10^9',
        hints: 'First reduce k modulo n. Then, rotating by k is equivalent to reversing the entire array, and then reversing the first k elements, and reversing the remaining n-k elements.',
        editorial:
            '**Approach: Reverse Parts**\n\n1. k = k % n\n2. Reverse the whole array.\n3. Reverse the first k elements.\n4. Reverse the remaining n-k elements.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '7 3\n1 2 3 4 5 6 7',
                output: '5 6 7 1 2 3 4',
                explanation:
                    'Rotate by 1: 7 1 2 3 4 5 6. Rotate by 2: 6 7 1 2 3 4 5. Rotate by 3: 5 6 7 1 2 3 4.',
            },
            {
                title: 'Example 2',
                input: '4 2\n-1 -100 3 99',
                output: '3 99 -1 -100',
                explanation: 'Rotate by 2: 3 99 -1 -100.',
            },
        ],
        testcases: [
            {
                input: '7 3\n1 2 3 4 5 6 7',
                output: '5 6 7 1 2 3 4',
            },
            {
                input: '4 2\n-1 -100 3 99',
                output: '3 99 -1 -100',
            },
            {
                input: '1 5\n42',
                output: '42',
            },
            {
                input: '5 0\n1 2 3 4 5',
                output: '1 2 3 4 5',
            },
            {
                input: '5 5\n1 2 3 4 5',
                output: '1 2 3 4 5',
            },
            {
                input: '5 7\n1 2 3 4 5',
                output: '4 5 1 2 3',
            },
            {
                input: '3 2\n10 20 30',
                output: '20 30 10',
            },
            {
                input: '6 100\n1 2 3 4 5 6',
                output: '3 4 5 6 1 2',
            },
            {
                input: '2 3\n100 -100',
                output: '-100 100',
            },
            {
                input: '8 4\n1 2 3 4 5 6 7 8',
                output: '5 6 7 8 1 2 3 4',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    long long k;\n    if (cin >> n >> k) {\n        // Rotate array by k\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    long long k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    if (n > 0) {\n        k = k % n;\n    }\n    vector<int> rotated(n);\n    for (int i = 0; i < n; i++) {\n        rotated[(i + k) % n] = arr[i];\n    }\n    for (int i = 0; i < n; i++) {\n        cout << rotated[i] << (i == n - 1 ? "" : " ");\n    }\n    cout << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    k = int(input_data[1])\n    arr = [int(x) for x in input_data[2:2+n]]\n    if n > 0:\n        k = k % n\n    rotated = arr[-k:] + arr[:-k] if k > 0 else arr\n    print(*(rotated))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        StringTokenizer st1 = new StringTokenizer(line1);\n        int n = Integer.parseInt(st1.nextToken());\n        long k = Long.parseLong(st1.nextToken());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st2 = new StringTokenizer(line2);\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st2.nextToken());\n        if (n > 0) {\n            k = k % n;\n        }\n        int steps = (int)k;\n        int[] rotated = new int[n];\n        for (int i = 0; i < n; i++) {\n            rotated[(i + steps) % n] = arr[i];\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            sb.append(rotated[i]).append(i == n - 1 ? "" : " ");\n        }\n        System.out.println(sb.toString());\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let mut parts = line1.split_whitespace();\n        let n: usize = parts.next().unwrap().parse().unwrap();\n        let k: usize = parts.next().unwrap().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let arr: Vec<i32> = line2.split_whitespace()\n                .map(|x| x.parse().unwrap())\n                .collect();\n            let steps = if n > 0 { k % n } else { 0 };\n            let mut rotated = vec![0; n];\n            for i in 0..n {\n                rotated[(i + steps) % n] = arr[i];\n            }\n            for i in 0..n {\n                write!(out, "{}", rotated[i]).unwrap();\n                if i < n - 1 {\n                    write!(out, " ").unwrap();\n                }\n            }\n            writeln!(out).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== EASY #8: Find Missing Number ====================
    {
        title: 'Find Missing Number',
        description:
            'Given an array containing n distinct numbers in the range [0, n], find the one number in the range that is missing from the array.\n\n**Input Format:**\n- First line: integer n (the size of the array)\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single integer: the missing number',
        difficulty: 'EASY',
        tags: ['arrays'],
        constraints:
            '1 <= n <= 10^5\nThe elements of the array are distinct and in the range [0, n]',
        hints: 'The sum of numbers from 0 to n is given by n*(n+1)/2. Find the sum of all elements in the array and subtract it from the expected sum.',
        editorial:
            '**Approach: Sum Formula**\n\n1. Compute the expected sum: `expected = n * (n + 1) / 2`.\n2. Compute the actual sum of the array elements.\n3. The missing number is `expected - actual`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '3\n3 0 1',
                output: '2',
                explanation: 'n=3, so range is [0,3]. 2 is missing.',
            },
            {
                title: 'Example 2',
                input: '9\n9 6 4 2 3 5 7 0 1',
                output: '8',
                explanation: 'n=9, so range is [0,9]. 8 is missing.',
            },
        ],
        testcases: [
            {
                input: '3\n3 0 1',
                output: '2',
            },
            {
                input: '9\n9 6 4 2 3 5 7 0 1',
                output: '8',
            },
            {
                input: '1\n0',
                output: '1',
            },
            {
                input: '1\n1',
                output: '0',
            },
            {
                input: '2\n0 1',
                output: '2',
            },
            {
                input: '2\n2 0',
                output: '1',
            },
            {
                input: '5\n0 1 2 3 4',
                output: '5',
            },
            {
                input: '6\n6 5 4 3 2 1',
                output: '0',
            },
            {
                input: '10\n10 9 8 7 6 5 4 3 1 0',
                output: '2',
            },
            {
                input: '8\n1 2 3 4 5 6 7 0',
                output: '8',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (cin >> n) {\n        // Find missing number\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    long long expected_sum = (long long)n * (n + 1) / 2;\n    long long actual_sum = 0;\n    for (int i = 0; i < n; i++) {\n        long long val;\n        cin >> val;\n        actual_sum += val;\n    }\n    cout << expected_sum - actual_sum << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    expected_sum = n * (n + 1) // 2\n    actual_sum = sum(arr)\n    print(expected_sum - actual_sum)\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st = new StringTokenizer(line2);\n        long expectedSum = (long)n * (n + 1) / 2;\n        long actualSum = 0;\n        for (int i = 0; i < n; i++) {\n            actualSum += Long.parseLong(st.nextToken());\n        }\n        System.out.println(expectedSum - actualSum);\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: u64 = line1.trim().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let expected_sum = n * (n + 1) / 2;\n            let mut actual_sum = 0u64;\n            for token in line2.split_whitespace() {\n                let val: u64 = token.parse().unwrap();\n                actual_sum += val;\n            }\n            writeln!(out, "{}", expected_sum - actual_sum).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== MEDIUM #9: Maximum Subarray (Kadane's Algorithm) ====================
    {
        title: "Maximum Subarray (Kadane's Algorithm)",
        description:
            'Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\nYou must implement a solution with O(n) time complexity.\n\n**Input Format:**\n- First line: integer n\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single integer representing the maximum subarray sum',
        difficulty: 'MEDIUM',
        tags: ['arrays', 'subarray'],
        constraints: '1 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9',
        hints: "Use Kadane's algorithm. Keep track of the maximum sum of a subarray ending at the current position, and the maximum sum found so far.",
        editorial:
            "**Approach: Kadane's Algorithm**\n\nIterate through the array and maintain `curr_max` (the maximum sum ending at the current index) and `max_so_far` (the overall maximum sum). At each step, update `curr_max = max(arr[i], curr_max + arr[i])` and `max_so_far = max(max_so_far, curr_max).\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
        examples: [
            {
                title: 'Example 1',
                input: '9\n-2 1 -3 4 -1 2 1 -5 4',
                output: '6',
                explanation: '[4, -1, 2, 1] has the largest sum = 6.',
            },
            {
                title: 'Example 2',
                input: '1\n1',
                output: '1',
                explanation: 'The only element has sum 1.',
            },
        ],
        testcases: [
            {
                input: '9\n-2 1 -3 4 -1 2 1 -5 4',
                output: '6',
            },
            {
                input: '1\n1',
                output: '1',
            },
            {
                input: '5\n5 4 -1 7 8',
                output: '23',
            },
            {
                input: '3\n-1 -2 -3',
                output: '-1',
            },
            {
                input: '4\n-100 -200 -300 -400',
                output: '-100',
            },
            {
                input: '8\n1 -1 1 -1 1 -1 1 -1',
                output: '1',
            },
            {
                input: '10\n10 -3 2 1 -8 5 4 -2 3 -1',
                output: '12',
            },
            {
                input: '6\n-2 1 -3 4 -1 21',
                output: '24',
            },
            {
                input: '2\n-5 5',
                output: '5',
            },
            {
                input: '7\n10 20 -40 30 10 -5 15',
                output: '50',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (cin >> n) {\n        // Solve\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    long long max_so_far = -2e18;\n    long long curr_max = 0;\n    bool has_element = false;\n    for (int i = 0; i < n; i++) {\n        long long val;\n        cin >> val;\n        if (!has_element) {\n            max_so_far = val;\n            curr_max = val;\n            has_element = true;\n        } else {\n            curr_max = max(val, curr_max + val);\n            max_so_far = max(max_so_far, curr_max);\n        }\n    }\n    cout << max_so_far << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    max_so_far = arr[0]\n    curr_max = arr[0]\n    for i in range(1, n):\n        curr_max = max(arr[i], curr_max + arr[i])\n        max_so_far = max(max_so_far, curr_max)\n    print(max_so_far)\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st = new StringTokenizer(line2);\n        long maxSoFar = Long.MIN_VALUE;\n        long currMax = 0;\n        boolean first = true;\n        for (int i = 0; i < n; i++) {\n            long val = Long.parseLong(st.nextToken());\n            if (first) {\n                maxSoFar = val;\n                currMax = val;\n                first = false;\n            } else {\n                currMax = Math.max(val, currMax + val);\n                maxSoFar = Math.max(maxSoFar, currMax);\n            }\n        }\n        System.out.println(maxSoFar);\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: usize = line1.trim().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let arr: Vec<i64> = line2.split_whitespace()\n                .map(|x| x.parse().unwrap())\n                .collect();\n            let mut max_so_far = arr[0];\n            let mut curr_max = arr[0];\n            for i in 1..n {\n                curr_max = std::cmp::max(arr[i], curr_max + arr[i]);\n                max_so_far = std::cmp::max(max_so_far, curr_max);\n            }\n            writeln!(out, "{}", max_so_far).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== MEDIUM #10: Product of Array Except Self ====================
    {
        title: 'Product of Array Except Self',
        description:
            'Given an array of n integers, return an array output such that output[i] is equal to the product of all the elements of the array except arr[i].\n\nYou must solve it in O(n) time and without using the division operation.\n\nSince the product values can be very large, print the output elements modulo 10^9 + 7. Ensure that negative modulo results are handled correctly (output must be non-negative).\n\n**Input Format:**\n- First line: integer n\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single line containing n space-separated integers representing the prefix-suffix products modulo 10^9 + 7.',
        difficulty: 'MEDIUM',
        tags: ['arrays', 'prefix-sum'],
        constraints: '2 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9',
        hints: 'We can use prefix and suffix products. Calculate the prefix products for each index and the suffix products for each index, then multiply them.',
        editorial:
            '**Approach: Prefix & Suffix Products**\n\n1. Create a `prefix` array where `prefix[i]` is the product of all elements to the left of `arr[i]`, modulo 10^9 + 7.\n2. Create a `suffix` array where `suffix[i]` is the product of all elements to the right of `arr[i]`, modulo 10^9 + 7.\n3. The answer for each index `i` is `(prefix[i] * suffix[i]) % MOD`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) space for prefix/suffix arrays.',
        examples: [
            {
                title: 'Example 1',
                input: '4\n1 2 3 4',
                output: '24 12 8 6',
                explanation:
                    'For index 0: 2*3*4=24. For index 1: 1*3*4=12. For index 2: 1*2*4=8. For index 3: 1*2*3=6.',
            },
            {
                title: 'Example 2',
                input: '5\n-1 1 0 -3 3',
                output: '0 0 9 0 0',
                explanation:
                    "The product except self at index 2 is (-1)*1*(-3)*3 = 9. For others, the product contains 0, so it's 0.",
            },
        ],
        testcases: [
            {
                input: '4\n1 2 3 4',
                output: '24 12 8 6',
            },
            {
                input: '5\n-1 1 0 -3 3',
                output: '0 0 9 0 0',
            },
            {
                input: '2\n10 20',
                output: '20 10',
            },
            {
                input: '3\n1000000 1000000 1000000',
                output: '999999937 999999937 999999937',
            },
            {
                input: '5\n1 1 1 1 1',
                output: '1 1 1 1 1',
            },
            {
                input: '6\n2 2 2 2 2 2',
                output: '32 32 32 32 32 32',
            },
            {
                input: '4\n-2 3 -4 5',
                output: '999999947 40 999999977 24',
            },
            {
                input: '5\n0 0 1 2 3',
                output: '0 0 0 0 0',
            },
            {
                input: '5\n0 5 0 2 3',
                output: '0 0 0 0 0',
            },
            {
                input: '8\n10 9 8 7 6 5 4 3',
                output: '1814400 2016000 2268000 2592000 3024000 3628800 4536000 6048000',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (cin >> n) {\n        // Solve\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<long long> arr(n);\n    long long MOD = 1000000007;\n    for (int i = 0; i < n; i++) {\n        long long val;\n        cin >> val;\n        arr[i] = (val % MOD + MOD) % MOD;\n    }\n    vector<long long> prefix(n, 1);\n    for (int i = 1; i < n; i++) {\n        prefix[i] = (prefix[i - 1] * arr[i - 1]) % MOD;\n    }\n    vector<long long> suffix(n, 1);\n    for (int i = n - 2; i >= 0; i--) {\n        suffix[i] = (suffix[i + 1] * arr[i + 1]) % MOD;\n    }\n    for (int i = 0; i < n; i++) {\n        long long ans = (prefix[i] * suffix[i]) % MOD;\n        cout << ans << (i == n - 1 ? "" : " ");\n    }\n    cout << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    MOD = 1000000007\n    arr = [(int(x) % MOD + MOD) % MOD for x in input_data[1:1+n]]\n    prefix = [1] * n\n    for i in range(1, n):\n        prefix[i] = (prefix[i-1] * arr[i-1]) % MOD\n    suffix = [1] * n\n    for i in range(n-2, -1, -1):\n        suffix[i] = (suffix[i+1] * arr[i+1]) % MOD\n    ans = [(prefix[i] * suffix[i]) % MOD for i in range(n)]\n    print(*(ans))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st = new StringTokenizer(line2);\n        long MOD = 1000000007;\n        long[] arr = new long[n];\n        for (int i = 0; i < n; i++) {\n            long val = Long.parseLong(st.nextToken());\n            arr[i] = (val % MOD + MOD) % MOD;\n        }\n        long[] prefix = new long[n];\n        prefix[0] = 1;\n        for (int i = 1; i < n; i++) {\n            prefix[i] = (prefix[i - 1] * arr[i - 1]) % MOD;\n        }\n        long[] suffix = new long[n];\n        suffix[n - 1] = 1;\n        for (int i = n - 2; i >= 0; i--) {\n            suffix[i] = (suffix[i + 1] * arr[i + 1]) % MOD;\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            long ans = (prefix[i] * suffix[i]) % MOD;\n            sb.append(ans).append(i == n - 1 ? "" : " ");\n        }\n        System.out.println(sb.toString());\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: usize = line1.trim().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let mod_val = 1000000007i64;\n            let mut arr = vec![0; n];\n            for (i, token) in line2.split_whitespace().enumerate() {\n                let val: i64 = token.parse().unwrap();\n                arr[i] = (val % mod_val + mod_val) % mod_val;\n            }\n            let mut prefix = vec![1i64; n];\n            for i in 1..n {\n                prefix[i] = (prefix[i - 1] * arr[i - 1]) % mod_val;\n            }\n            let mut suffix = vec![1i64; n];\n            for i in (0..n-1).rev() {\n                suffix[i] = (suffix[i + 1] * arr[i + 1]) % mod_val;\n            }\n            for i in 0..n {\n                let ans = (prefix[i] * suffix[i]) % mod_val;\n                write!(out, "{}", ans).unwrap();\n                if i < n - 1 {\n                    write!(out, " ").unwrap();\n                }\n            }\n            writeln!(out).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== MEDIUM #11: Next Permutation ====================
    {
        title: 'Next Permutation',
        description:
            'Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.\n\nIf such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).\n\n**Input Format:**\n- First line: integer n\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single line containing the next permutation, space-separated',
        difficulty: 'MEDIUM',
        tags: ['arrays'],
        constraints: '1 <= n <= 10^4\n-10^9 <= arr[i] <= 10^9',
        hints: '1. Find the first pair from right to left where arr[i] < arr[i+1]. This is the pivot.\n2. If no pivot is found, reverse the entire array.\n3. Otherwise, find the next greater element to the right of the pivot, swap them, and reverse the suffix.',
        editorial:
            '**Approach: Single Pass Scan**\n\n1. Traverse from right to left to find the first index `i` (pivot) such that `arr[i] < arr[i+1]`.\n2. If not found, reverse the whole array and return.\n3. If found, find the smallest element to the right of `i` that is strictly greater than `arr[i]`. Swap them.\n4. Reverse the subarray from `i+1` to the end.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '3\n1 2 3',
                output: '1 3 2',
                explanation:
                    'The next greater lexicographical permutation of [1, 2, 3] is [1, 3, 2].',
            },
            {
                title: 'Example 2',
                input: '3\n3 2 1',
                output: '1 2 3',
                explanation:
                    '[3, 2, 1] is sorted in descending order, so the next is the sorted order [1, 2, 3].',
            },
        ],
        testcases: [
            {
                input: '3\n1 2 3',
                output: '1 3 2',
            },
            {
                input: '3\n3 2 1',
                output: '1 2 3',
            },
            {
                input: '3\n1 1 5',
                output: '1 5 1',
            },
            {
                input: '1\n1',
                output: '1',
            },
            {
                input: '2\n1 2',
                output: '2 1',
            },
            {
                input: '2\n2 1',
                output: '1 2',
            },
            {
                input: '5\n1 3 5 4 2',
                output: '1 4 2 3 5',
            },
            {
                input: '6\n1 2 3 6 5 4',
                output: '1 2 4 3 5 6',
            },
            {
                input: '4\n2 3 1 4',
                output: '2 3 4 1',
            },
            {
                input: '8\n7 8 6 5 4 3 2 1',
                output: '8 1 2 3 4 5 6 7',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (cin >> n) {\n        // Next permutation\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    int pivot = -1;\n    for (int i = n - 2; i >= 0; i--) {\n        if (arr[i] < arr[i + 1]) {\n            pivot = i;\n            break;\n        }\n    }\n    if (pivot != -1) {\n        int swap_idx = -1;\n        for (int i = n - 1; i > pivot; i--) {\n            if (arr[i] > arr[pivot]) {\n                swap_idx = i;\n                break;\n            }\n        }\n        swap(arr[pivot], arr[swap_idx]);\n    }\n    reverse(arr.begin() + pivot + 1, arr.end());\n    for (int i = 0; i < n; i++) {\n        cout << arr[i] << (i == n - 1 ? "" : " ");\n    }\n    cout << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    pivot = -1\n    for i in range(n - 2, -1, -1):\n        if arr[i] < arr[i + 1]:\n            pivot = i\n            break\n    if pivot != -1:\n        swap_idx = -1\n        for i in range(n - 1, pivot, -1):\n            if arr[i] > arr[pivot]:\n                swap_idx = i\n                break\n        arr[pivot], arr[swap_idx] = arr[swap_idx], arr[pivot]\n    arr[pivot+1:] = reversed(arr[pivot+1:])\n    print(*(arr))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st = new StringTokenizer(line2);\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());\n        int pivot = -1;\n        for (int i = n - 2; i >= 0; i--) {\n            if (arr[i] < arr[i + 1]) {\n                pivot = i;\n                break;\n            }\n        }\n        if (pivot != -1) {\n            int swapIdx = -1;\n            for (int i = n - 1; i > pivot; i--) {\n                if (arr[i] > arr[pivot]) {\n                    swapIdx = i;\n                    break;\n                }\n            }\n            int temp = arr[pivot];\n            arr[pivot] = arr[swapIdx];\n            arr[swapIdx] = temp;\n        }\n        int l = pivot + 1, r = n - 1;\n        while (l < r) {\n            int temp = arr[l];\n            arr[l] = arr[r];\n            arr[r] = temp;\n            l++;\n            r--;\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            sb.append(arr[i]).append(i == n - 1 ? "" : " ");\n        }\n        System.out.println(sb.toString());\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: usize = line1.trim().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let mut arr: Vec<i32> = line2.split_whitespace()\n                .map(|x| x.parse().unwrap())\n                .collect();\n            let mut pivot = -1isize;\n            for i in (0..n-1).rev() {\n                if arr[i] < arr[i + 1] {\n                    pivot = i as isize;\n                    break;\n                }\n            }\n            if pivot != -1 {\n                let p = pivot as usize;\n                let mut swap_idx = p;\n                for i in (p+1..n).rev() {\n                    if arr[i] > arr[p] {\n                        swap_idx = i;\n                        break;\n                    }\n                }\n                arr.swap(p, swap_idx);\n            }\n            let start = (pivot + 1) as usize;\n            arr[start..n].reverse();\n            for i in 0..n {\n                write!(out, "{}", arr[i]).unwrap();\n                if i < n - 1 {\n                    write!(out, " ").unwrap();\n                }\n            }\n            writeln!(out).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== MEDIUM #12: Spiral Matrix Traversal ====================
    {
        title: 'Spiral Matrix Traversal',
        description:
            'Given an r x c matrix, return all elements of the matrix in spiral order.\n\n**Input Format:**\n- First line: two space-separated integers r and c (rows and columns)\n- Next r lines: each containing c space-separated integers\n\n**Output Format:**\n- A single line containing the elements in spiral order, space-separated',
        difficulty: 'MEDIUM',
        tags: ['matrix'],
        constraints: '1 <= r, c <= 100\n-100 <= matrix[i][j] <= 100',
        hints: 'Maintain boundaries for the spiral bounds: top, bottom, left, right. Loop and adjust the boundaries as you traverse.',
        editorial:
            '**Approach: Boundary Simulation**\n\nUse four pointers representing the matrix boundaries: `top`, `bottom`, `left`, and `right`. Traverse from left to right on `top`, then top to bottom on `right`, then right to left on `bottom`, and bottom to top on `left`. Update the boundary variables after each step.\n\n**Time Complexity:** O(r * c)\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '3 3\n1 2 3\n4 5 6\n7 8 9',
                output: '1 2 3 6 9 8 7 4 5',
                explanation: 'Traverse in a clockwise spiral direction.',
            },
            {
                title: 'Example 2',
                input: '3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12',
                output: '1 2 3 4 8 12 11 10 9 5 6 7',
            },
        ],
        testcases: [
            {
                input: '3 3\n1 2 3\n4 5 6\n7 8 9',
                output: '1 2 3 6 9 8 7 4 5',
            },
            {
                input: '3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12',
                output: '1 2 3 4 8 12 11 10 9 5 6 7',
            },
            {
                input: '1 1\n42',
                output: '42',
            },
            {
                input: '1 5\n1 2 3 4 5',
                output: '1 2 3 4 5',
            },
            {
                input: '5 1\n1\n2\n3\n4\n5',
                output: '1 2 3 4 5',
            },
            {
                input: '2 2\n1 2\n3 4',
                output: '1 2 4 3',
            },
            {
                input: '4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16',
                output: '1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10',
            },
            {
                input: '2 5\n1 2 3 4 5\n6 7 8 9 10',
                output: '1 2 3 4 5 10 9 8 7 6',
            },
            {
                input: '5 2\n1 2\n3 4\n5 6\n7 8\n9 10',
                output: '1 2 4 6 8 10 9 7 5 3',
            },
            {
                input: '3 3\n1 1 1\n2 2 2\n3 3 3',
                output: '1 1 1 2 3 3 3 2 2',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int r, c;\n    if (cin >> r >> c) {\n        // Traverse r x c matrix in spiral order\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int r, c;\n    if (!(cin >> r >> c)) return 0;\n    vector<vector<int>> mat(r, vector<int>(c));\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) cin >> mat[i][j];\n    }\n    vector<int> res;\n    int top = 0, bottom = r - 1, left = 0, right = c - 1;\n    while (top <= bottom && left <= right) {\n        for (int i = left; i <= right; i++) res.push_back(mat[top][i]);\n        top++;\n        for (int i = top; i <= bottom; i++) res.push_back(mat[i][right]);\n        right--;\n        if (top <= bottom) {\n            for (int i = right; i >= left; i--) res.push_back(mat[bottom][i]);\n            bottom--;\n        }\n        if (left <= right) {\n            for (int i = bottom; i >= top; i--) res.push_back(mat[i][left]);\n            left++;\n        }\n    }\n    for (size_t i = 0; i < res.size(); i++) {\n        cout << res[i] << (i == res.size() - 1 ? "" : " ");\n    }\n    cout << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    r = int(input_data[0])\n    c = int(input_data[1])\n    idx = 2\n    mat = []\n    for _ in range(r):\n        row = [int(x) for x in input_data[idx:idx+c]]\n        mat.append(row)\n        idx += c\n    res = []\n    top, bottom, left, right = 0, r - 1, 0, c - 1\n    while top <= bottom and left <= right:\n        for i in range(left, right + 1):\n            res.append(mat[top][i])\n        top += 1\n        for i in range(top, bottom + 1):\n            res.append(mat[i][right])\n        right -= 1\n        if top <= bottom:\n            for i in range(right, left - 1, -1):\n                res.append(mat[bottom][i])\n            bottom -= 1\n        if left <= right:\n            for i in range(bottom, top - 1, -1):\n                res.append(mat[i][left])\n            left += 1\n    print(*(res))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        StringTokenizer st1 = new StringTokenizer(line1);\n        int r = Integer.parseInt(st1.nextToken());\n        int c = Integer.parseInt(st1.nextToken());\n        int[][] mat = new int[r][c];\n        for (int i = 0; i < r; i++) {\n            String line = br.readLine();\n            StringTokenizer st = new StringTokenizer(line);\n            for (int j = 0; j < c; j++) {\n                mat[i][j] = Integer.parseInt(st.nextToken());\n            }\n        }\n        List<Integer> res = new ArrayList<>();\n        int top = 0, bottom = r - 1, left = 0, right = c - 1;\n        while (top <= bottom && left <= right) {\n            for (int i = left; i <= right; i++) res.add(mat[top][i]);\n            top++;\n            for (int i = top; i <= bottom; i++) res.add(mat[i][right]);\n            right--;\n            if (top <= bottom) {\n                for (int i = right; i >= left; i--) res.add(mat[bottom][i]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) res.add(mat[i][left]);\n                left++;\n            }\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.size(); i++) {\n            sb.append(res.get(i)).append(i == res.size() - 1 ? "" : " ");\n        }\n        System.out.println(sb.toString());\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let mut parts = line1.split_whitespace();\n        let r: usize = parts.next().unwrap().parse().unwrap();\n        let c: usize = parts.next().unwrap().parse().unwrap();\n        let mut mat = vec![vec![0; c]; r];\n        for i in 0..r {\n            if let Some(Ok(line)) = lines.next() {\n                let mut row_parts = line.split_whitespace();\n                for j in 0..c {\n                    mat[i][j] = row_parts.next().unwrap().parse::<i32>().unwrap();\n                }\n            }\n        }\n        let mut res = Vec::new();\n        let mut top = 0isize;\n        let mut bottom = r as isize - 1;\n        let mut left = 0isize;\n        let mut right = c as isize - 1;\n        while top <= bottom && left <= right {\n            for i in left..=right {\n                res.push(mat[top as usize][i as usize]);\n            }\n            top += 1;\n            for i in top..=bottom {\n                res.push(mat[i as usize][right as usize]);\n            }\n            right -= 1;\n            if top <= bottom {\n                for i in (left..=right).rev() {\n                    res.push(mat[bottom as usize][i as usize]);\n                }\n                bottom -= 1;\n            }\n            if left <= right {\n                for i in (top..=bottom).rev() {\n                    res.push(mat[i as usize][left as usize]);\n                }\n                left += 1;\n            }\n        }\n        for i in 0..res.len() {\n            write!(out, "{}", res[i]).unwrap();\n            if i < res.len() - 1 {\n                write!(out, " ").unwrap();\n            }\n        }\n        writeln!(out).unwrap();\n    }\n}',
        },
    },

    // ==================== MEDIUM #13: Rotate Image 90 Degrees ====================
    {
        title: 'Rotate Image 90 Degrees',
        description:
            'You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees (clockwise).\n\n**Input Format:**\n- First line: integer n\n- Next n lines: each containing n space-separated integers\n\n**Output Format:**\n- n lines, each containing n space-separated integers representing the rotated matrix',
        difficulty: 'MEDIUM',
        tags: ['matrix'],
        constraints: '1 <= n <= 100\n-1000 <= matrix[i][j] <= 1000',
        hints: 'The rotation can be done by first transposing the matrix (swapping element [i][j] with [j][i]) and then reversing each row.',
        editorial:
            '**Approach: Transpose and Reverse**\n\n1. Transpose the matrix: swap `matrix[i][j]` with `matrix[j][i]` for all `i < j`.\n2. Reverse each row of the matrix.\n\n**Time Complexity:** O(n^2)\n**Space Complexity:** O(1) auxiliary space if done in-place.',
        examples: [
            {
                title: 'Example 1',
                input: '3\n1 2 3\n4 5 6\n7 8 9',
                output: '7 4 1\n8 5 2\n9 6 3',
                explanation: 'Rotate by 90 degrees clockwise.',
            },
            {
                title: 'Example 2',
                input: '2\n1 2\n3 4',
                output: '3 1\n4 2',
            },
        ],
        testcases: [
            {
                input: '3\n1 2 3\n4 5 6\n7 8 9',
                output: '7 4 1\n8 5 2\n9 6 3',
            },
            {
                input: '2\n1 2\n3 4',
                output: '3 1\n4 2',
            },
            {
                input: '1\n5',
                output: '5',
            },
            {
                input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16',
                output: '13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4',
            },
            {
                input: '3\n0 0 0\n1 1 1\n2 2 2',
                output: '2 1 0\n2 1 0\n2 1 0',
            },
            {
                input: '3\n-1 -2 -3\n-4 -5 -6\n-7 -8 -9',
                output: '-7 -4 -1\n-8 -5 -2\n-9 -6 -3',
            },
            {
                input: '2\n10 20\n30 40',
                output: '30 10\n40 20',
            },
            {
                input: '4\n0 0 0 0\n0 1 1 0\n0 1 1 0\n0 0 0 0',
                output: '0 0 0 0\n0 1 1 0\n0 1 1 0\n0 0 0 0',
            },
            {
                input: '3\n1 2 1\n2 3 2\n1 2 1',
                output: '1 2 1\n2 3 2\n1 2 1',
            },
            {
                input: '5\n1 2 3 4 5\n6 7 8 9 10\n11 12 13 14 15\n16 17 18 19 20\n21 22 23 24 25',
                output: '21 16 11 6 1\n22 17 12 7 2\n23 18 13 8 3\n24 19 14 9 4\n25 20 15 10 5',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (cin >> n) {\n        // Rotate n x n matrix 90 degrees clockwise\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<vector<int>> mat(n, vector<int>(n));\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) cin >> mat[i][j];\n    }\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            swap(mat[i][j], mat[j][i]);\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        reverse(mat[i].begin(), mat[i].end());\n    }\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            cout << mat[i][j] << (j == n - 1 ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    idx = 1\n    mat = []\n    for _ in range(n):\n        mat.append([int(x) for x in input_data[idx:idx+n]])\n        idx += n\n    for i in range(n):\n        for j in range(i + 1, n):\n            mat[i][j], mat[j][i] = mat[j][i], mat[i][j]\n    for i in range(n):\n        mat[i].reverse()\n    for row in mat:\n        print(*(row))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        int[][] mat = new int[n][n];\n        for (int i = 0; i < n; i++) {\n            String line = br.readLine();\n            StringTokenizer st = new StringTokenizer(line);\n            for (int j = 0; j < n; j++) {\n                mat[i][j] = Integer.parseInt(st.nextToken());\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = mat[i][j];\n                mat[i][j] = mat[j][i];\n                mat[j][i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            int left = 0, right = n - 1;\n            while (left < right) {\n                int temp = mat[i][left];\n                mat[i][left] = mat[i][right];\n                mat[i][right] = temp;\n                left++;\n                right--;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            StringBuilder sb = new StringBuilder();\n            for (int j = 0; j < n; j++) {\n                sb.append(mat[i][j]).append(j == n - 1 ? "" : " ");\n            }\n            System.out.println(sb.toString());\n        }\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: usize = line1.trim().parse().unwrap();\n        let mut mat = vec![vec![0; n]; n];\n        for i in 0..n {\n            if let Some(Ok(line)) = lines.next() {\n                let mut row_parts = line.split_whitespace();\n                for j in 0..n {\n                    mat[i][j] = row_parts.next().unwrap().parse::<i32>().unwrap();\n                }\n            }\n        }\n        for i in 0..n {\n            for j in i+1..n {\n                let temp = mat[i][j];\n                mat[i][j] = mat[j][i];\n                mat[j][i] = temp;\n            }\n        }\n        for i in 0..n {\n            mat[i].reverse();\n        }\n        for i in 0..n {\n            for j in 0..n {\n                write!(out, "{}", mat[i][j]).unwrap();\n                if j < n - 1 {\n                    write!(out, " ").unwrap();\n                }\n            }\n            writeln!(out).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== MEDIUM #14: Set Matrix Zeroes ====================
    {
        title: 'Set Matrix Zeroes',
        description:
            'Given an r x c integer matrix, if an element is 0, set its entire row and column to 0.\n\n**Input Format:**\n- First line: two space-separated integers r and c\n- Next r lines: each containing c space-separated integers\n\n**Output Format:**\n- r lines, each containing c space-separated integers representing the modified matrix',
        difficulty: 'MEDIUM',
        tags: ['matrix'],
        constraints: '1 <= r, c <= 200\n-2^31 <= matrix[i][j] <= 2^31 - 1',
        hints: 'Use boolean arrays to record which rows and columns should be set to zero. Alternatively, use the first row and column of the matrix itself to store this information.',
        editorial:
            '**Approach: Flag Arrays**\n\n1. Use two arrays `rows[r]` and `cols[c]` initialized to false.\n2. Traverse the matrix; if `matrix[i][j] == 0`, set `rows[i] = true` and `cols[j] = true`.\n3. Traverse the matrix again and set `matrix[i][j] = 0` if `rows[i]` or `cols[j]` is true.\n\n**Time Complexity:** O(r * c)\n**Space Complexity:** O(r + c) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '3 3\n1 1 1\n1 0 1\n1 1 1',
                output: '1 0 1\n0 0 0\n1 0 1',
                explanation: 'Element at index (1,1) is 0, so row 1 and column 1 are set to 0.',
            },
            {
                title: 'Example 2',
                input: '3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5',
                output: '0 0 0 0\n0 4 5 0\n0 3 1 0',
            },
        ],
        testcases: [
            {
                input: '3 3\n1 1 1\n1 0 1\n1 1 1',
                output: '1 0 1\n0 0 0\n1 0 1',
            },
            {
                input: '3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5',
                output: '0 0 0 0\n0 4 5 0\n0 3 1 0',
            },
            {
                input: '1 1\n0',
                output: '0',
            },
            {
                input: '1 1\n5',
                output: '5',
            },
            {
                input: '2 2\n1 2\n3 4',
                output: '1 2\n3 4',
            },
            {
                input: '2 2\n0 1\n2 3',
                output: '0 0\n0 3',
            },
            {
                input: '3 3\n0 0 0\n0 1 0\n0 0 0',
                output: '0 0 0\n0 0 0\n0 0 0',
            },
            {
                input: '4 3\n1 2 3\n4 0 6\n7 8 9\n10 11 12',
                output: '1 0 3\n0 0 0\n7 0 9\n10 0 12',
            },
            {
                input: '2 3\n1 2 3\n4 5 0',
                output: '1 2 0\n0 0 0',
            },
            {
                input: '3 3\n1 0 3\n4 5 6\n7 0 9',
                output: '0 0 0\n4 0 6\n0 0 0',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int r, c;\n    if (cin >> r >> c) {\n        // Set zeroes in matrix\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int r, c;\n    if (!(cin >> r >> c)) return 0;\n    vector<vector<long long>> mat(r, vector<long long>(c));\n    vector<bool> rows(r, false);\n    vector<bool> cols(c, false);\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            cin >> mat[i][j];\n            if (mat[i][j] == 0) {\n                rows[i] = true;\n                cols[j] = true;\n            }\n        }\n    }\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            if (rows[i] || cols[j]) {\n                mat[i][j] = 0;\n            }\n        }\n    }\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            cout << mat[i][j] << (j == c - 1 ? "" : " ");\n        }\n        cout << "\\n";\n    }\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    r = int(input_data[0])\n    c = int(input_data[1])\n    idx = 2\n    mat = []\n    rows = [False] * r\n    cols = [False] * c\n    for i in range(r):\n        row = [int(x) for x in input_data[idx:idx+c]]\n        mat.append(row)\n        idx += c\n        for j in range(c):\n            if row[j] == 0:\n                rows[i] = True\n                cols[j] = True\n    for i in range(r):\n        for j in range(c):\n            if rows[i] or cols[j]:\n                mat[i][j] = 0\n    for row in mat:\n        print(*(row))\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        StringTokenizer st1 = new StringTokenizer(line1);\n        int r = Integer.parseInt(st1.nextToken());\n        int c = Integer.parseInt(st1.nextToken());\n        long[][] mat = new long[r][c];\n        boolean[] rows = new boolean[r];\n        boolean[] cols = new boolean[c];\n        for (int i = 0; i < r; i++) {\n            String line = br.readLine();\n            StringTokenizer st = new StringTokenizer(line);\n            for (int j = 0; j < c; j++) {\n                mat[i][j] = Long.parseLong(st.nextToken());\n                if (mat[i][j] == 0) {\n                    rows[i] = true;\n                    cols[j] = true;\n                }\n            }\n        }\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                if (rows[i] || cols[j]) {\n                    mat[i][j] = 0;\n                }\n            }\n        }\n        for (int i = 0; i < r; i++) {\n            StringBuilder sb = new StringBuilder();\n            for (int j = 0; j < c; j++) {\n                sb.append(mat[i][j]).append(j == c - 1 ? "" : " ");\n            }\n            System.out.println(sb.toString());\n        }\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let mut parts = line1.split_whitespace();\n        let r: usize = parts.next().unwrap().parse().unwrap();\n        let c: usize = parts.next().unwrap().parse().unwrap();\n        let mut mat = vec![vec![0i64; c]; r];\n        let mut rows = vec![false; r];\n        let mut cols = vec![false; c];\n        for i in 0..r {\n            if let Some(Ok(line)) = lines.next() {\n                let mut row_parts = line.split_whitespace();\n                for j in 0..c {\n                    let val: i64 = row_parts.next().unwrap().parse().unwrap();\n                    mat[i][j] = val;\n                    if val == 0 {\n                        rows[i] = true;\n                        cols[j] = true;\n                    }\n                }\n            }\n        }\n        for i in 0..r {\n            for j in 0..c {\n                if rows[i] || cols[j] {\n                    mat[i][j] = 0;\n                }\n            }\n        }\n        for i in 0..r {\n            for j in 0..c {\n                write!(out, "{}", mat[i][j]).unwrap();\n                if j < c - 1 {\n                    write!(out, " ").unwrap();\n                }\n            }\n            writeln!(out).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== MEDIUM #15: Longest Substring Without Repeating Characters ====================
    {
        title: 'Longest Substring Without Repeating Characters',
        description:
            'Given a string s, find the length of the longest substring without repeating characters.\n\n**Input Format:**\n- A single line containing the string s\n\n**Output Format:**\n- A single integer representing the length of the longest substring without repeating characters',
        difficulty: 'MEDIUM',
        tags: ['strings', 'subarray'],
        constraints:
            '0 <= s.length <= 10^5\ns consists of English letters, digits, symbols and spaces.',
        hints: 'Use a sliding window or a two-pointer technique. Maintain the indices of characters in a hash map or direct access array to quickly jump the left pointer when a duplicate is found.',
        editorial:
            '**Approach: Sliding Window**\n\nMaintain a sliding window `[start, i]`. For each character `c = s[i]`, if `c` has been seen within the current window (its stored index >= `start`), move `start` to `index + 1`. Update the last seen position of `c` to `i`, and compute the maximum length `i - start + 1`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(min(m, n)) where m is the alphabet size.',
        examples: [
            {
                title: 'Example 1',
                input: 'abcabcbb',
                output: '3',
                explanation:
                    "The longest substring without repeating characters is 'abc', with length 3.",
            },
            {
                title: 'Example 2',
                input: 'bbbbb',
                output: '1',
                explanation: "The longest substring is 'b', with length 1.",
            },
        ],
        testcases: [
            {
                input: 'abcabcbb',
                output: '3',
            },
            {
                input: 'bbbbb',
                output: '1',
            },
            {
                input: 'pwwkew',
                output: '3',
            },
            {
                input: 'a',
                output: '1',
            },
            {
                input: 'abcdefg',
                output: '7',
            },
            {
                input: 'aab',
                output: '2',
            },
            {
                input: 'dvdf',
                output: '3',
            },
            {
                input: 'tmmzuxt',
                output: '5',
            },
            {
                input: 'space space',
                output: '6',
            },
            {
                input: '1234567890aBcd!',
                output: '15',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string s;\n    if (getline(cin, s)) {\n        // Find longest substring without repeating chars\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string s;\n    if (!getline(cin, s)) {\n        cout << 0 << "\\n";\n        return 0;\n    }\n    int max_len = 0;\n    int start = 0;\n    vector<int> char_map(256, -1);\n    for (int i = 0; i < (int)s.length(); i++) {\n        unsigned char c = s[i];\n        if (char_map[c] >= start) {\n            start = char_map[c] + 1;\n        }\n        char_map[c] = i;\n        max_len = max(max_len, i - start + 1);\n    }\n    cout << max_len << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    s = sys.stdin.read()\n    if s.endswith('\\r\\n'):\n        s = s[:-2]\n    elif s.endswith('\\n'):\n        s = s[:-1]\n    max_len = 0\n    start = 0\n    char_map = {}\n    for i, c in enumerate(s):\n        if c in char_map and char_map[c] >= start:\n            start = char_map[c] + 1\n        char_map[c] = i\n        max_len = max(max_len, i - start + 1)\n    print(max_len)\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) {\n            System.out.println(0);\n            return;\n        }\n        int maxLen = 0;\n        int start = 0;\n        int[] charMap = new int[256];\n        java.util.Arrays.fill(charMap, -1);\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (c < 256) {\n                if (charMap[c] >= start) {\n                    start = charMap[c] + 1;\n                }\n                charMap[c] = i;\n            }\n            maxLen = Math.max(maxLen, i - start + 1);\n        }\n        System.out.println(maxLen);\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    let mut s = String::new();\n    if let Some(Ok(line)) = lines.next() {\n        s = line;\n    }\n    let mut max_len = 0;\n    let mut start = 0;\n    let mut char_map = vec![-1isize; 256];\n    let bytes = s.as_bytes();\n    for i in 0..bytes.len() {\n        let c = bytes[i] as usize;\n        if char_map[c] >= start {\n            start = char_map[c] + 1;\n        }\n        char_map[c] = i as isize;\n        max_len = std::cmp::max(max_len, i as isize - start + 1);\n    }\n    writeln!(out, "{}", max_len).unwrap();\n}',
        },
    },

    // ==================== HARD #16: Trapping Rain Water ====================
    {
        title: 'Trapping Rain Water',
        description:
            'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\n**Input Format:**\n- First line: integer n\n- Second line: n space-separated integers representing the height of each bar\n\n**Output Format:**\n- A single integer representing the total amount of water trapped',
        difficulty: 'HARD',
        tags: ['arrays'],
        constraints: '1 <= n <= 10^5\n0 <= height[i] <= 10^5',
        hints: 'Use a two-pointer approach. Maintain `left_max` and `right_max` boundaries, and compute the trapped water step-by-step from both ends.',
        editorial:
            '**Approach: Two Pointers**\n\n1. Maintain a `left` pointer at index 0 and a `right` pointer at index `n - 1`.\n2. Keep track of `left_max` and `right_max` representing the maximum heights seen so far from left and right respectively.\n3. At each step, if `height[left] < height[right]`, then the trapped water at the `left` position is determined by `left_max - height[left]`. Update `left_max` and increment `left`.\n4. Otherwise, the trapped water at the `right` position is determined by `right_max - height[right]`. Update `right_max` and decrement `right`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '12\n0 1 0 2 1 0 1 3 2 1 2 1',
                output: '6',
                explanation:
                    'The elevation map is [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]. In this case, 6 units of rain water are trapped.',
            },
            {
                title: 'Example 2',
                input: '6\n4 2 0 3 2 5',
                output: '9',
                explanation: '9 units of water are trapped.',
            },
        ],
        testcases: [
            {
                input: '12\n0 1 0 2 1 0 1 3 2 1 2 1',
                output: '6',
            },
            {
                input: '6\n4 2 0 3 2 5',
                output: '9',
            },
            {
                input: '1\n0',
                output: '0',
            },
            {
                input: '3\n2 0 2',
                output: '2',
            },
            {
                input: '5\n3 0 0 2 0',
                output: '2',
            },
            {
                input: '6\n5 4 3 2 1 0',
                output: '0',
            },
            {
                input: '6\n0 1 2 3 4 5',
                output: '0',
            },
            {
                input: '10\n1 1 1 1 1 1 1 1 1 1',
                output: '0',
            },
            {
                input: '8\n3 1 2 4 0 1 3 2',
                output: '8',
            },
            {
                input: '14\n0 3 0 2 0 4 0 2 0 3 0 1 0 2',
                output: '15',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (cin >> n) {\n        // Trapping rain water\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<long long> height(n);\n    for (int i = 0; i < n; i++) cin >> height[i];\n    int left = 0, right = n - 1;\n    long long left_max = 0, right_max = 0;\n    long long ans = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= left_max) {\n                left_max = height[left];\n            } else {\n                ans += (left_max - height[left]);\n            }\n            left++;\n        } else {\n            if (height[right] >= right_max) {\n                right_max = height[right];\n            } else {\n                ans += (right_max - height[right]);\n            }\n            right--;\n        }\n    }\n    cout << ans << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    height = [int(x) for x in input_data[1:1+n]]\n    left, right = 0, n - 1\n    left_max, right_max = 0, 0\n    ans = 0\n    while left < right:\n        if height[left] < height[right]:\n            if height[left] >= left_max:\n                left_max = height[left]\n            else:\n                ans += (left_max - height[left])\n            left += 1\n        else:\n            if height[right] >= right_max:\n                right_max = height[right]\n            else:\n                ans += (right_max - height[right])\n            right -= 1\n    print(ans)\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st = new StringTokenizer(line2);\n        long[] height = new long[n];\n        for (int i = 0; i < n; i++) {\n            height[i] = Long.parseLong(st.nextToken());\n        }\n        int left = 0, right = n - 1;\n        long leftMax = 0, rightMax = 0;\n        long ans = 0;\n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) {\n                    leftMax = height[left];\n                } else {\n                    ans += (leftMax - height[left]);\n                }\n                left++;\n            } else {\n                if (height[right] >= rightMax) {\n                    rightMax = height[right];\n                } else {\n                    ans += (rightMax - height[right]);\n                }\n                right--;\n            }\n        }\n        System.out.println(ans);\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: usize = line1.trim().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let height: Vec<i64> = line2.split_whitespace()\n                .map(|x| x.parse().unwrap())\n                .collect();\n            if n == 0 {\n                writeln!(out, "0").unwrap();\n                return;\n            }\n            let mut left = 0;\n            let mut right = n - 1;\n            let mut left_max = 0i64;\n            let mut right_max = 0i64;\n            let mut ans = 0i64;\n            while left < right {\n                if height[left] < height[right] {\n                    if height[left] >= left_max {\n                        left_max = height[left];\n                    } else {\n                        ans += left_max - height[left];\n                    }\n                    left += 1;\n                } else {\n                    if height[right] >= right_max {\n                        right_max = height[right];\n                    } else {\n                        ans += right_max - height[right];\n                    }\n                    right -= 1;\n                }\n            }\n            writeln!(out, "{}", ans).unwrap();\n        }\n    }\n}',
        },
    },

    // ==================== HARD #17: First Missing Positive ====================
    {
        title: 'First Missing Positive',
        description:
            'Given an unsorted integer array, find the smallest missing positive integer.\n\nYou must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.\n\n**Input Format:**\n- First line: integer n\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single integer representing the first missing positive integer',
        difficulty: 'HARD',
        tags: ['arrays'],
        constraints: '1 <= n <= 10^5\n-2^31 <= arr[i] <= 2^31 - 1',
        hints: 'Try placing each number in its correct position. For example, the number `x` should be placed at index `x - 1` if `1 <= x <= n`.',
        editorial:
            '**Approach: Index Cyclic Sort (In-place Swap)**\n\n1. Iterate through the array. For each element `arr[i]`, if it is in the range `[1, n]` and `arr[i] != arr[arr[i] - 1]`, swap it with the element at index `arr[i] - 1`.\n2. Repeat the swapping process until the current element cannot be swapped anymore.\n3. After sorting, make a second pass to find the first index `i` where `arr[i] != i + 1`. Return `i + 1`.\n4. If all positions are correct, return `n + 1`.\n\n**Time Complexity:** O(n) as each element is put into its correct spot at most once.\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '3\n1 2 0',
                output: '3',
                explanation: 'The smallest missing positive integer is 3.',
            },
            {
                title: 'Example 2',
                input: '4\n3 4 -1 1',
                output: '2',
                explanation: '1 is in the array, but 2 is missing.',
            },
        ],
        testcases: [
            {
                input: '3\n1 2 0',
                output: '3',
            },
            {
                input: '4\n3 4 -1 1',
                output: '2',
            },
            {
                input: '5\n7 8 9 11 12',
                output: '1',
            },
            {
                input: '1\n1',
                output: '2',
            },
            {
                input: '1\n2',
                output: '1',
            },
            {
                input: '2\n1 2',
                output: '3',
            },
            {
                input: '8\n2 3 4 5 6 7 8 9',
                output: '1',
            },
            {
                input: '6\n1 1 1 1 1 1',
                output: '2',
            },
            {
                input: '10\n1 2 3 4 5 6 7 8 9 10',
                output: '11',
            },
            {
                input: '10\n-5 -4 -3 100 200 4 3 2 1 5',
                output: '6',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (cin >> n) {\n        // First missing positive\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    for (int i = 0; i < n; i++) {\n        while (arr[i] > 0 && arr[i] <= n && arr[arr[i] - 1] != arr[i]) {\n            swap(arr[i], arr[arr[i] - 1]);\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        if (arr[i] != i + 1) {\n            cout << i + 1 << "\\n";\n            return 0;\n        }\n    }\n    cout << n + 1 << "\\n";\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    for i in range(n):\n        while 0 < arr[i] <= n and arr[arr[i] - 1] != arr[i]:\n            val = arr[i]\n            arr[i], arr[val - 1] = arr[val - 1], arr[i]\n    for i in range(n):\n        if arr[i] != i + 1:\n            print(i + 1)\n            return\n    print(n + 1)\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        int n = Integer.parseInt(line1.trim());\n        String line2 = br.readLine();\n        if (line2 == null) return;\n        StringTokenizer st = new StringTokenizer(line2);\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());\n        for (int i = 0; i < n; i++) {\n            while (arr[i] > 0 && arr[i] <= n && arr[arr[i] - 1] != arr[i]) {\n                int temp = arr[i];\n                arr[i] = arr[temp - 1];\n                arr[temp - 1] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            if (arr[i] != i + 1) {\n                System.out.println(i + 1);\n                return;\n            }\n        }\n        System.out.println(n + 1);\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let n: usize = line1.trim().parse().unwrap();\n        if let Some(Ok(line2)) = lines.next() {\n            let mut arr: Vec<i32> = line2.split_whitespace()\n                .map(|x| x.parse().unwrap())\n                .collect();\n            for i in 0..n {\n                while arr[i] > 0 && arr[i] <= n as i32 && arr[(arr[i] - 1) as usize] != arr[i] {\n                    let target_idx = (arr[i] - 1) as usize;\n                    arr.swap(i, target_idx);\n                }\n            }\n            let mut found = false;\n            for i in 0..n {\n                if arr[i] != (i + 1) as i32 {\n                    writeln!(out, "{}", i + 1).unwrap();\n                    found = true;\n                    break;\n                }\n            }\n            if !found {\n                writeln!(out, "{}", n + 1).unwrap();\n            }\n        }\n    }\n}',
        },
    },

    // ==================== HARD #18: Minimum Window Substring ====================
    {
        title: 'Minimum Window Substring',
        description:
            'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return an empty string.\n\n**Input Format:**\n- First line: string s\n- Second line: string t\n\n**Output Format:**\n- The minimum window substring (or empty line if no such substring exists)',
        difficulty: 'HARD',
        tags: ['strings'],
        constraints:
            '1 <= s.length, t.length <= 10^5\ns and t consist of uppercase and lowercase English letters.',
        hints: 'Use a sliding window with two pointers. Expand the right pointer to include characters until the window is valid, then contract the left pointer to minimize the window size.',
        editorial:
            '**Approach: Sliding Window (Two Pointers)**\n\n1. Maintain a frequency map `count_t` of characters in string `t`.\n2. Keep a sliding window `[left, right]` and a frequency map `count_w` of characters in the current window.\n3. Keep track of how many unique characters in `t` have their frequency requirements met in `count_w` (`formed` count).\n4. Expand `right` and update `formed`. When `formed` matches the total number of unique characters required, contract the window from the `left` while it remains valid, updating the minimum window length and start position.\n\n**Time Complexity:** O(|s| + |t|)\n**Space Complexity:** O(|s| + |t|) where space is used for the character frequency counts.',
        examples: [
            {
                title: 'Example 1',
                input: 'ADOBECODEBANC\nABC',
                output: 'BANC',
                explanation:
                    "The minimum window substring 'BANC' includes 'A', 'B', and 'C' from string t.",
            },
            {
                title: 'Example 2',
                input: 'a\na',
                output: 'a',
                explanation: 'The entire string is the minimum window.',
            },
        ],
        testcases: [
            {
                input: 'ADOBECODEBANC\nABC',
                output: 'BANC',
            },
            {
                input: 'a\na',
                output: 'a',
            },
            {
                input: 'a\naa',
                output: '',
            },
            {
                input: 'donutsandcoffee\ncafe',
                output: 'sandcof',
            },
            {
                input: 'A\nB',
                output: '',
            },
            {
                input: 'abcdef\nfedcba',
                output: 'abcdef',
            },
            {
                input: 'COMSCIENCE\nCC',
                output: 'CSCIENCE',
            },
            {
                input: 'aaaaaaaaaaa\naaa',
                output: 'aaa',
            },
            {
                input: 'XYZXYZXYZ\nXYZ',
                output: 'XYZ',
            },
            {
                input: 'BBAACCGG\nAAC',
                output: 'AAC',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string s, t;\n    if (cin >> s >> t) {\n        // Minimum Window Substring\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string s, t;\n    if (!(cin >> s >> t)) return 0;\n    vector<int> target(256, 0);\n    vector<int> current(256, 0);\n    for (char c : t) target[(unsigned char)c]++;\n    int required = 0;\n    for (int i = 0; i < 256; i++) {\n        if (target[i] > 0) required++;\n    }\n    int left = 0, right = 0;\n    int formed = 0;\n    int min_len = 1e9;\n    int best_left = 0;\n    while (right < (int)s.length()) {\n        char c = s[right];\n        current[(unsigned char)c]++;\n        if (target[(unsigned char)c] > 0 && current[(unsigned char)c] == target[(unsigned char)c]) {\n            formed++;\n        }\n        while (left <= right && formed == required) {\n            char cl = s[left];\n            if (right - left + 1 < min_len) {\n                min_len = right - left + 1;\n                best_left = left;\n            }\n            current[(unsigned char)cl]--;\n            if (target[(unsigned char)cl] > 0 && current[(unsigned char)cl] < target[(unsigned char)cl]) {\n                formed--;\n            }\n            left++;\n        }\n        right++;\n    }\n    if (min_len == 1e9) {\n        cout << "\\n";\n    } else {\n        cout << s.substr(best_left, min_len) << "\\n";\n    }\n    return 0;\n}',
            python: "import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if len(input_data) < 2:\n        print(\"\")\n        return\n    s = input_data[0]\n    t = input_data[1]\n    from collections import Counter\n    target = Counter(t)\n    required = len(target)\n    current = {}\n    formed = 0\n    left = 0\n    min_len = float('inf')\n    best_left = 0\n    for right, c in enumerate(s):\n        current[c] = current.get(c, 0) + 1\n        if c in target and current[c] == target[c]:\n            formed += 1\n        while left <= right and formed == required:\n            cl = s[left]\n            if right - left + 1 < min_len:\n                min_len = right - left + 1\n                best_left = left\n            current[cl] -= 1\n            if cl in target and current[cl] < target[cl]:\n                formed -= 1\n            left += 1\n    if min_len == float('inf'):\n        print(\"\")\n    else:\n        print(s[best_left:best_left+min_len])\nif __name__ == '__main__':\n    main()",
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        String t = br.readLine();\n        if (s == null || t == null) {\n            System.out.println();\n            return;\n        }\n        s = s.trim();\n        t = t.trim();\n        int[] target = new int[256];\n        int[] current = new int[256];\n        for (int i = 0; i < t.length(); i++) {\n            target[t.charAt(i)]++;\n        }\n        int required = 0;\n        for (int i = 0; i < 256; i++) {\n            if (target[i] > 0) required++;\n        }\n        int left = 0, right = 0;\n        int formed = 0;\n        int minLen = Integer.MAX_VALUE;\n        int bestLeft = 0;\n        while (right < s.length()) {\n            char c = s.charAt(right);\n            current[c]++;\n            if (target[c] > 0 && current[c] == target[c]) {\n                formed++;\n            }\n            while (left <= right && formed == required) {\n                char cl = s.charAt(left);\n                if (right - left + 1 < minLen) {\n                    minLen = right - left + 1;\n                    bestLeft = left;\n                }\n                current[cl]--;\n                if (target[cl] > 0 && current[cl] < target[cl]) {\n                    formed--;\n                }\n                left++;\n            }\n            right++;\n        }\n        if (minLen == Integer.MAX_VALUE) {\n            System.out.println();\n        } else {\n            System.out.println(s.substring(bestLeft, bestLeft + minLen));\n        }\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(s)) = lines.next() {\n        if let Some(Ok(t)) = lines.next() {\n            let s = s.trim();\n            let t = t.trim();\n            let mut target = [0; 256];\n            let mut current = [0; 256];\n            for &b in t.as_bytes() {\n                target[b as usize] += 1;\n            }\n            let mut required = 0;\n            for i in 0..256 {\n                if target[i] > 0 {\n                    required += 1;\n                }\n            }\n            let mut left = 0;\n            let mut formed = 0;\n            let mut min_len = usize::MAX;\n            let mut best_left = 0;\n            let s_bytes = s.as_bytes();\n            for right in 0..s_bytes.len() {\n                let c = s_bytes[right] as usize;\n                current[c] += 1;\n                if target[c] > 0 && current[c] == target[c] {\n                    formed += 1;\n                }\n                while left <= right && formed == required {\n                    let cl = s_bytes[left] as usize;\n                    if right - left + 1 < min_len {\n                        min_len = right - left + 1;\n                        best_left = left;\n                    }\n                    current[cl] -= 1;\n                    if target[cl] > 0 && current[cl] < target[cl] {\n                        formed -= 1;\n                    }\n                    left += 1;\n                }\n            }\n            if min_len == usize::MAX {\n                writeln!(out).unwrap();\n            } else {\n                writeln!(out, "{}", &s[best_left..best_left + min_len]).unwrap();\n            }\n        }\n    }\n}',
        },
    },

    // ==================== HARD #19: Text Justification ====================
    {
        title: 'Text Justification',
        description:
            "Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.\n\nYou should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.\n\nExtra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.\n\nFor the last line of text, it should be left-justified, and no extra space is inserted between words.\n\n**Input Format:**\n- First line: integer n (number of words) and maxWidth separated by space\n- Next n lines: each containing a single word\n\n**Output Format:**\n- The formatted lines of text",
        difficulty: 'HARD',
        tags: ['strings'],
        constraints: '1 <= n <= 300\n1 <= maxWidth <= 100\n1 <= words[i].length <= maxWidth',
        hints: 'For each line, determine how many words fit. Calculate the total spaces and distribute them. Handle the last line and single-word lines separately (left-justified).',
        editorial:
            '**Approach: Greedy Line Construction & Space Distribution**\n\n1. Iterate through words, finding the maximum number of words that can fit in a line of length `maxWidth` (including a minimum of one space between words).\n2. If it is the last line or a line with only one word, left-justify the words (separate by single spaces and pad the remaining spaces at the end).\n3. Otherwise, calculate the total spaces needed, `spaces_to_add = maxWidth - total_words_len`. Distribute these spaces as evenly as possible between words: `base_spaces = spaces_to_add / (num_words - 1)` and the first `spaces_to_add % (num_words - 1)` gaps get an extra space.\n\n**Time Complexity:** O(total characters of all words)\n**Space Complexity:** O(maxWidth) to construct each line.',
        examples: [
            {
                title: 'Example 1',
                input: '7 16\nThis\nis\nan\nexample\nof\ntext\njustification.',
                output: 'This    is    an\nexample  of text\njustification.  ',
                explanation: 'Formatting words into max 16 chars per line.',
            },
            {
                title: 'Example 2',
                input: '6 20\nWhat\nmust\nbe\nacknowledgment\nshall\nbe',
                output: 'What  must  be      \nacknowledgment      \nshall be            ',
            },
        ],
        testcases: [
            {
                input: '7 16\nThis\nis\nan\nexample\nof\ntext\njustification.',
                output: 'This    is    an\nexample  of text\njustification.  ',
            },
            {
                input: '6 20\nWhat\nmust\nbe\nacknowledgment\nshall\nbe',
                output: 'What  must  be      \nacknowledgment      \nshall be            ',
            },
            {
                input: '1 10\nHello',
                output: 'Hello     ',
            },
            {
                input: '2 10\nHello\nWorld',
                output: 'Hello     \nWorld     ',
            },
            {
                input: '2 11\nHello\nWorld',
                output: 'Hello World',
            },
            {
                input: '18 20\nScience\nis\nwhat\nwe\nunderstand\nwell\nenough\nto\nexplain\nto\na\ncomputer,\nart\nis\neverything\nelse\nwe\ndo',
                output: 'Science  is  what we\nunderstand      well\nenough   to  explain\nto  a  computer, art\nis  everything  else\nwe do               ',
            },
            {
                input: '3 12\na\nb\nc',
                output: 'a   b   c   ',
            },
            {
                input: '4 5\na\nb\nc\nd',
                output: 'a b  \nc d  ',
            },
            {
                input: '3 6\na\nlist\nof',
                output: 'a list\nof    ',
            },
            {
                input: '10 20\nGive\nme\nliberty\nor\ngive\nme\ndeath\nby\nchocolate\nplease',
                output: 'Give  me  liberty or\ngive   me  death  by\nchocolate please    ',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, maxWidth;\n    if (cin >> n >> maxWidth) {\n        // Text Justification\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, maxWidth;\n    if (!(cin >> n >> maxWidth)) return 0;\n    vector<string> words(n);\n    for (int i = 0; i < n; i++) cin >> words[i];\n    vector<string> result;\n    int i = 0;\n    while (i < n) {\n        int line_len = words[i].length();\n        int last = i + 1;\n        while (last < n) {\n            if (line_len + 1 + words[last].length() > (size_t)maxWidth) break;\n            line_len += 1 + words[last].length();\n            last++;\n        }\n        string line = "";\n        int num_words = last - i;\n        if (last == n || num_words == 1) {\n            for (int k = i; k < last; k++) {\n                line += words[k];\n                if (k < last - 1) line += " ";\n            }\n            while (line.length() < (size_t)maxWidth) line += " ";\n        } else {\n            int total_spaces = maxWidth - (line_len - (num_words - 1));\n            int base_spaces = total_spaces / (num_words - 1);\n            int extra_spaces = total_spaces % (num_words - 1);\n            for (int k = i; k < last - 1; k++) {\n                line += words[k];\n                int spaces_to_apply = base_spaces + (k - i < extra_spaces ? 1 : 0);\n                for (int s = 0; s < spaces_to_apply; s++) line += " ";\n            }\n            line += words[last - 1];\n        }\n        result.push_back(line);\n        i = last;\n    }\n    for (const auto& line : result) {\n        cout << line << "\\n";\n    }\n    return 0;\n}',
            python: 'import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    maxWidth = int(input_data[1])\n    words = input_data[2:2+n]\n    result = []\n    i = 0\n    while i < n:\n        line_len = len(words[i])\n        last = i + 1\n        while last < n:\n            if line_len + 1 + len(words[last]) > maxWidth:\n                break\n            line_len += 1 + len(words[last])\n            last += 1\n        num_words = last - i\n        line = ""\n        if last == n or num_words == 1:\n            line = " ".join(words[i:last])\n            line += " " * (maxWidth - len(line))\n        else:\n            total_spaces = maxWidth - sum(len(w) for w in words[i:last])\n            base_spaces = total_spaces // (num_words - 1)\n            extra_spaces = total_spaces % (num_words - 1)\n            for k in range(i, last - 1):\n                line += words[k]\n                spaces_to_apply = base_spaces + (1 if k - i < extra_spaces else 0)\n                line += " " * spaces_to_apply\n            line += words[last - 1]\n        result.append(line)\n        i = last\n    for line in result:\n        print(line)\nif __name__ == \'__main__\':\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        StringTokenizer st1 = new StringTokenizer(line1);\n        int n = Integer.parseInt(st1.nextToken());\n        int maxWidth = Integer.parseInt(st1.nextToken());\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < n; i++) {\n            String w = br.readLine();\n            if (w != null) words.add(w.trim());\n        }\n        List<String> result = new ArrayList<>();\n        int i = 0;\n        while (i < n) {\n            int lineLen = words.get(i).length();\n            int last = i + 1;\n            while (last < n) {\n                if (lineLen + 1 + words.get(last).length() > maxWidth) break;\n                lineLen += 1 + words.get(last).length();\n                last++;\n            }\n            StringBuilder sb = new StringBuilder();\n            int numWords = last - i;\n            if (last == n || numWords == 1) {\n                for (int k = i; k < last; k++) {\n                    sb.append(words.get(k));\n                    if (k < last - 1) sb.append(" ");\n                }\n                while (sb.length() < maxWidth) sb.append(" ");\n            } else {\n                int sumWordLen = 0;\n                for (int k = i; k < last; k++) {\n                    sumWordLen += words.get(k).length();\n                }\n                int totalSpaces = maxWidth - sumWordLen;\n                int baseSpaces = totalSpaces / (numWords - 1);\n                int extraSpaces = totalSpaces % (numWords - 1);\n                for (int k = i; k < last - 1; k++) {\n                    sb.append(words.get(k));\n                    int spacesToApply = baseSpaces + (k - i < extraSpaces ? 1 : 0);\n                    for (int s = 0; s < spacesToApply; s++) sb.append(" ");\n                }\n                sb.append(words.get(last - 1));\n            }\n            result.add(sb.toString());\n            i = last;\n        }\n        for (String line : result) {\n            System.out.println(line);\n        }\n    }\n}',
            rust: "use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let mut parts = line1.split_whitespace();\n        let n: usize = parts.next().unwrap().parse().unwrap();\n        let max_width: usize = parts.next().unwrap().parse().unwrap();\n        let mut words = Vec::new();\n        for _ in 0..n {\n            if let Some(Ok(line)) = lines.next() {\n                words.push(line.trim().to_string());\n            }\n        }\n        let mut result = Vec::new();\n        let mut i = 0;\n        while i < n {\n            let mut line_len = words[i].len();\n            let mut last = i + 1;\n            while last < n {\n                if line_len + 1 + words[last].len() > max_width {\n                    break;\n                }\n                line_len += 1 + words[last].len();\n                last += 1;\n            }\n            let mut line = String::new();\n            let num_words = last - i;\n            if last == n || num_words == 1 {\n                for k in i..last {\n                    line.push_str(&words[k]);\n                    if k < last - 1 {\n                        line.push(' ');\n                    }\n                }\n                while line.len() < max_width {\n                    line.push(' ');\n                }\n            } else {\n                let sum_word_len: usize = words[i..last].iter().map(|w| w.len()).sum();\n                let total_spaces = max_width - sum_word_len;\n                let base_spaces = total_spaces / (num_words - 1);\n                let extra_spaces = total_spaces % (num_words - 1);\n                for k in i..last - 1 {\n                    line.push_str(&words[k]);\n                    let spaces_to_apply = base_spaces + if k - i < extra_spaces { 1 } else { 0 };\n                    for _ in 0..spaces_to_apply {\n                        line.push(' ');\n                    }\n                }\n                line.push_str(&words[last - 1]);\n            }\n            result.push(line);\n            i = last;\n        }\n        for line in result {\n            writeln!(out, \"{}\", line).unwrap();\n        }\n    }\n}",
        },
    },

    // ==================== HARD #20: Median of Two Sorted Arrays ====================
    {
        title: 'Median of Two Sorted Arrays',
        description:
            'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\nTo ensure exact output match without float formatting issues, return the result as a string representation of a double value, rounded to 5 decimal places.\n\n**Input Format:**\n- First line: two integers m and n (sizes of the two arrays)\n- Second line: m space-separated integers representing nums1\n- Third line: n space-separated integers representing nums2\n\n**Output Format:**\n- A single decimal number representing the median, printed with exactly 5 decimal places',
        difficulty: 'HARD',
        tags: ['arrays'],
        constraints:
            '0 <= m, n <= 10^5\n1 <= m + n <= 2 * 10^5\n-10^6 <= nums1[i], nums2[j] <= 10^6',
        hints: 'Use binary search on the partition of the smaller array. Make sure the partitions on both arrays divide the merged array into two equal-sized halves.',
        editorial:
            '**Approach: Binary Search on Partition Index**\n\n1. Ensure that the first array `A` is the smaller array (length `m <= n`). If not, swap `A` and `B`.\n2. Do a binary search on the partition index of `A` in range `[0, m]`.\n3. For a partition index `i` in `A`, the partition index `j` in `B` is `(m + n + 1) / 2 - i`.\n4. Find the values left and right of the partitions: `maxLeftA`, `minRightA`, `maxLeftB`, `minRightB`.\n5. If `maxLeftA <= minRightB` and `maxLeftB <= minRightA`, the partition is correct. The median is:\n   - `max(maxLeftA, maxLeftB)` if `m + n` is odd.\n   - `(max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0` if `m + n` is even.\n\n**Time Complexity:** O(log(min(m, n)))\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '2 1\n1 3\n2',
                output: '2.00000',
                explanation: 'The merged array is [1, 2, 3] and median is 2.0.',
            },
            {
                title: 'Example 2',
                input: '2 2\n1 2\n3 4',
                output: '2.50000',
                explanation: 'The merged array is [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5.',
            },
        ],
        testcases: [
            {
                input: '2 1\n1 3\n2',
                output: '2.00000',
            },
            {
                input: '2 2\n1 2\n3 4',
                output: '2.50000',
            },
            {
                input: '0 2\n\n1 2',
                output: '1.50000',
            },
            {
                input: '2 0\n1 2\n',
                output: '1.50000',
            },
            {
                input: '1 1\n1\n2',
                output: '1.50000',
            },
            {
                input: '4 6\n1 3 5 7\n2 4 6 8 9 10',
                output: '5.50000',
            },
            {
                input: '5 5\n1 1 1 1 1\n1 1 1 1 1',
                output: '1.00000',
            },
            {
                input: '3 4\n-5 -3 -1\n2 4 6 8',
                output: '2.00000',
            },
            {
                input: '6 4\n1 2 15 20 25 30\n3 4 5 6',
                output: '5.50000',
            },
            {
                input: '3 3\n1 12 15\n2 13 17',
                output: '12.50000',
            },
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int m, n;\n    if (cin >> m >> n) {\n        // Median of Two Sorted Arrays\n    }\n    return 0;\n}',
            python: 'def main():\n    import sys\n    # Solve\n    \nif __name__ == "__main__":\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Read input and solve\n    }\n}',
            rust: 'use std::io::{self, BufRead};\n\nfn main() {\n    let stdin = io::stdin();\n    // Read input and solve\n}',
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<double> A(m);\n    for (int i = 0; i < m; i++) cin >> A[i];\n    vector<double> B(n);\n    for (int i = 0; i < n; i++) cin >> B[i];\n    if (m > n) {\n        swap(A, B);\n        swap(m, n);\n    }\n    int imin = 0, imax = m, half_len = (m + n + 1) / 2;\n    double median = 0.0;\n    while (imin <= imax) {\n        int i = (imin + imax) / 2;\n        int j = half_len - i;\n        if (i < m && B[j - 1] > A[i]) {\n            imin = i + 1;\n        } else if (i > 0 && A[i - 1] > B[j]) {\n            imax = i - 1;\n        } else {\n            double max_of_left;\n            if (i == 0) { max_of_left = B[j - 1]; }\n            else if (j == 0) { max_of_left = A[i - 1]; }\n            else { max_of_left = max(A[i - 1], B[j - 1]); }\n            if ((m + n) % 2 == 1) {\n                median = max_of_left;\n                break;\n            }\n            double min_of_right;\n            if (i == m) { min_of_right = B[j]; }\n            else if (j == n) { min_of_right = A[i]; }\n            else { min_of_right = min(A[i], B[j]); }\n            median = (max_of_left + min_of_right) / 2.0;\n            break;\n        }\n    }\n    cout << fixed << setprecision(5) << median << "\\n";\n    return 0;\n}',
            python: 'import sys\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    m = int(input_data[0])\n    n = int(input_data[1])\n    A = [float(x) for x in input_data[2:2+m]]\n    B = [float(x) for x in input_data[2+m:2+m+n]]\n    if m > n:\n        A, B = B, A\n        m, n = n, m\n    imin, imax, half_len = 0, m, (m + n + 1) // 2\n    median = 0.0\n    while imin <= imax:\n        i = (imin + imax) // 2\n        j = half_len - i\n        if i < m and B[j - 1] > A[i]:\n            imin = i + 1\n        elif i > 0 and A[i - 1] > B[j]:\n            imax = i - 1\n        else:\n            if i == 0:\n                max_of_left = B[j - 1]\n            elif j == 0:\n                max_of_left = A[i - 1]\n            else:\n                max_of_left = max(A[i - 1], B[j - 1])\n            if (m + n) % 2 == 1:\n                median = max_of_left\n                break\n            if i == m:\n                min_of_right = B[j]\n            elif j == n:\n                min_of_right = A[i]\n            else:\n                min_of_right = min(A[i], B[j])\n            median = (max_of_left + min_of_right) / 2.0\n            break\n    print(f"{median:.5f}")\nif __name__ == \'__main__\':\n    main()',
            java: 'import java.io.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        if (line1 == null) return;\n        StringTokenizer st1 = new StringTokenizer(line1);\n        int m = Integer.parseInt(st1.nextToken());\n        int n = Integer.parseInt(st1.nextToken());\n        double[] A = new double[m];\n        String line2 = br.readLine();\n        if (line2 != null && !line2.trim().isEmpty()) {\n            StringTokenizer st2 = new StringTokenizer(line2);\n            for (int i = 0; i < m; i++) A[i] = Double.parseDouble(st2.nextToken());\n        }\n        double[] B = new double[n];\n        String line3 = br.readLine();\n        if (line3 != null && !line3.trim().isEmpty()) {\n            StringTokenizer st3 = new StringTokenizer(line3);\n            for (int i = 0; i < n; i++) B[i] = Double.parseDouble(st3.nextToken());\n        }\n        if (m > n) {\n            double[] tempArr = A; A = B; B = tempArr;\n            int temp = m; m = n; n = temp;\n        }\n        int imin = 0, imax = m, halfLen = (m + n + 1) / 2;\n        double median = 0.0;\n        while (imin <= imax) {\n            int i = (imin + imax) / 2;\n            int j = halfLen - i;\n            if (i < m && B[j - 1] > A[i]) {\n                imin = i + 1;\n            } else if (i > 0 && A[i - 1] > B[j]) {\n                imax = i - 1;\n            } else {\n                double maxOfLeft;\n                if (i == 0) { maxOfLeft = B[j - 1]; }\n                else if (j == 0) { maxOfLeft = A[i - 1]; }\n                else { maxOfLeft = Math.max(A[i - 1], B[j - 1]); }\n                if ((m + n) % 2 == 1) {\n                    median = maxOfLeft;\n                    break;\n                }\n                double minOfRight;\n                if (i == m) { minOfRight = B[j]; }\n                else if (j == n) { minOfRight = A[i]; }\n                else { minOfRight = Math.min(A[i], B[j]); }\n                median = (maxOfLeft + minOfRight) / 2.0;\n                break;\n            }\n        }\n        System.out.printf(Locale.US, "%.5f\\n", median);\n    }\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\nfn main() {\n    let stdin = io::stdin();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    let mut lines = stdin.lock().lines();\n    if let Some(Ok(line1)) = lines.next() {\n        let mut parts = line1.split_whitespace();\n        let mut m: usize = parts.next().unwrap().parse().unwrap();\n        let mut n: usize = parts.next().unwrap().parse().unwrap();\n        let mut a = Vec::new();\n        if m > 0 {\n            if let Some(Ok(line2)) = lines.next() {\n                a = line2.split_whitespace()\n                    .map(|x| x.parse::<f64>().unwrap())\n                    .collect();\n            }\n        } else {\n            let _ = lines.next(); // Consume empty or skip\n        }\n        let mut b = Vec::new();\n        if n > 0 {\n            if let Some(Ok(line3)) = lines.next() {\n                b = line3.split_whitespace()\n                    .map(|x| x.parse::<f64>().unwrap())\n                    .collect();\n            }\n        }\n        if m > n {\n            std::mem::swap(&mut a, &mut b);\n            std::mem::swap(&mut m, &mut n);\n        }\n        let mut imin = 0;\n        let mut imax = m;\n        let half_len = (m + n + 1) / 2;\n        let mut median = 0.0;\n        while imin <= imax {\n            let i = (imin + imax) / 2;\n            let j = half_len - i;\n            if i < m && b[j - 1] > a[i] {\n                imin = i + 1;\n            } else if i > 0 && a[i - 1] > b[j] {\n                imax = i - 1;\n            } else {\n                let max_of_left = if i == 0 {\n                    b[j - 1]\n                } else if j == 0 {\n                    a[i - 1]\n                } else {\n                    a[i - 1].max(b[j - 1])\n                };\n                if (m + n) % 2 == 1 {\n                    median = max_of_left;\n                    break;\n                }\n                let min_of_right = if i == m {\n                    b[j]\n                } else if j == n {\n                    a[i]\n                } else {\n                    a[i].min(b[j])\n                };\n                median = (max_of_left + min_of_right) / 2.0;\n                break;\n            }\n        }\n        writeln!(out, "{:.5}", median).unwrap();\n    }\n}',
        },
    },
,

    // ==================== NEW PROBLEMS ====================
{
        title: 'Valid Anagram',
        description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.\\n\\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\\n\\n**Input Format:**\\n- First line: string s\\n- Second line: string t\\n\\n**Output Format:**\\n- Print "true" if the strings are anagrams, "false" otherwise.',
        difficulty: 'EASY',
        tags: [
            'strings'
        ],
        constraints: '1 <= s.length, t.length <= 10^5\\ns and t consist of lowercase English letters.',
        hints: 'Count the frequency of each character in both strings. If the frequencies are identical, the strings are anagrams.',
        editorial: '**Approach: Frequency Counting**\\n\\n1. If lengths of the two strings are different, they cannot be anagrams. Return false.\\n2. Count the occurrences of each character in the first string, and decrement the counts using the second string.\\n3. If all counts are zero, return true. Otherwise, return false.\\n\\n**Time Complexity:** O(N) where N is the length of the strings.\\n**Space Complexity:** O(1) auxiliary space as the character set size is fixed (26 lowercase English letters).',
        examples: [
            {
                title: 'Example 1',
                input: 'anagram\\nnagaram',
                output: 'true',
                explanation: '"nagaram" is an anagram of "anagram".'
            },
            {
                title: 'Example 2',
                input: 'rat\\ncar',
                output: 'false'
            }
        ],
        testcases: [
            {
                input: 'anagram\\nnagaram',
                output: 'true'
            },
            {
                input: 'rat\\ncar',
                output: 'false'
            },
            {
                input: 'a\\na',
                output: 'true'
            },
            {
                input: 'a\\nb',
                output: 'false'
            },
            {
                input: 'ab\\nba',
                output: 'true'
            },
            {
                input: 'awesome\\nmeaweso',
                output: 'true'
            },
            {
                input: 'anagram\\nnagaramm',
                output: 'false'
            },
            {
                input: 'ab\\na',
                output: 'false'
            },
            {
                input: 'longeststringever\\nstringeverlongest',
                output: 'true'
            },
            {
                input: 'abcdefg\\nabcdefh',
                output: 'false'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    string s, t;\\n    if (!(cin >> s >> t)) return 0;\\n    if (s.length() != t.length()) {\\n        cout << "false\\\\n";\\n        return 0;\\n    }\\n    vector<int> counts(26, 0);\\n    for (char c : s) counts[c - \\\'a\\\']++;\\n    for (char c : t) counts[c - \\\'a\\\']--;\\n    bool ok = true;\\n    for (int x : counts) {\\n        if (x != 0) { ok = false; break; }\\n    }\\n    cout << (ok ? "true" : "false") << "\\\\n";\\n    return 0;\\n}',
            python: 'import sys\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if len(input_data) < 2:\\n        return\\n    s = input_data[0]\\n    t = input_data[1]\\n    if len(s) != len(t):\\n        print("false")\\n        return\\n    counts = [0] * 26\\n    for c in s:\\n        counts[ord(c) - 97] += 1\\n    for c in t:\\n        counts[ord(c) - 97] -= 1\\n    if all(x == 0 for x in counts):\\n        print("true")\\n    else:\\n        print("false")\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String s = br.readLine();\\n        String t = br.readLine();\\n        if (s == null || t == null) return;\\n        s = s.trim();\\n        t = t.trim();\\n        if (s.length() != t.length()) {\\n            System.out.println("false");\\n            return;\\n        }\\n        int[] counts = new int[26];\\n        for (int i = 0; i < s.length(); i++) counts[s.charAt(i) - \\\'a\\\']++;\\n        for (int i = 0; i < t.length(); i++) counts[t.charAt(i) - \\\'a\\\']--;\\n        boolean ok = true;\\n        for (int x : counts) {\\n            if (x != 0) { ok = false; break; }\\n        }\\n        System.out.println(ok ? "true" : "false");\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(s)) = lines.next() {\\n        if let Some(Ok(t)) = lines.next() {\\n            let s = s.trim();\\n            let t = t.trim();\\n            if s.len() != t.len() {\\n                writeln!(out, "false").unwrap();\\n                return;\\n            }\\n            let mut counts = [0; 26];\\n            for &b in s.as_bytes() {\\n                counts[(b - b\\\'a\\\') as usize] += 1;\\n            }\\n            for &b in t.as_bytes() {\\n                counts[(b - b\\\'a\\\') as usize] -= 1;\\n            }\\n            let ok = counts.iter().all(|&x| x == 0);\\n            writeln!(out, "{}", if ok { "true" } else { "false" }).unwrap();\\n        }\\n    }\\n}'
        }
    },

{
        title: 'Two Sum',
        description: 'Given an array of integers arr and an integer target, return the 1-based indices of the two numbers such that they add up to target.\\n\\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. The output indices must be printed in ascending order.',
        difficulty: 'EASY',
        tags: [
            'arrays'
        ],
        constraints: '2 <= n <= 10^5\\n-10^9 <= arr[i] <= 10^9\\n-10^9 <= target <= 10^9\\nOnly one valid answer exists.',
        hints: 'Use a hash map to store the value and its index as you traverse the array. For each element, check if target minus element exists in the hash map.',
        editorial: '**Approach: Hash Map (Single Pass)**\\n\\n1. Initialize a hash map to store value-to-index mappings.\\n2. Iterate through the array. For each element, compute its complement: `target - arr[i]`.\\n3. Check if the complement exists in the hash map. If it does, we found the pair. Print the 1-based indices in ascending order.\\n4. Otherwise, add the current element and its index to the map.\\n\\n**Time Complexity:** O(N)\\n**Space Complexity:** O(N)',
        examples: [
            {
                title: 'Example 1',
                input: '4 9\\n2 7 11 15',
                output: '1 2',
                explanation: 'arr[0] + arr[1] == 2 + 7 == 9. Thus output is 1 2.'
            },
            {
                title: 'Example 2',
                input: '3 6\\n3 2 4',
                output: '2 3'
            }
        ],
        testcases: [
            {
                input: '4 9\\n2 7 11 15',
                output: '1 2'
            },
            {
                input: '3 6\\n3 2 4',
                output: '2 3'
            },
            {
                input: '2 10\\n5 5',
                output: '1 2'
            },
            {
                input: '4 -8\\n-3 -5 1 4',
                output: '1 2'
            },
            {
                input: '5 0\\n1 2 -3 4 3',
                output: '3 5'
            },
            {
                input: '6 100\\n10 20 30 40 50 60',
                output: '4 6'
            },
            {
                input: '3 -2\\n-1 -1 2',
                output: '1 2'
            },
            {
                input: '7 15\\n1 2 3 4 5 10 11',
                output: '5 6'
            },
            {
                input: '5 2000000000\\n1000000000 0 -5 1000000000 5',
                output: '1 4'
            },
            {
                input: '4 5\\n1 2 3 6',
                output: '2 3'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    int n;\\n    long long target;\\n    if (!(cin >> n >> target)) return 0;\\n    unordered_map<long long, int> val_to_idx;\\n    for (int i = 0; i < n; i++) {\\n        long long val;\\n        cin >> val;\\n        long long complement = target - val;\\n        if (val_to_idx.count(complement)) {\\n            cout << val_to_idx[complement] + 1 << " " << i + 1 << "\\\\n";\\n            return 0;\\n        }\\n        val_to_idx[val] = i;\\n    }\\n    return 0;\\n}',
            python: 'import sys\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if not input_data:\\n        return\\n    n = int(input_data[0])\\n    target = int(input_data[1])\\n    arr = [int(x) for x in input_data[2:2+n]]\\n    val_to_idx = {}\\n    for i, val in enumerate(arr):\\n        complement = target - val\\n        if complement in val_to_idx:\\n            print(f"{val_to_idx[complement] + 1} {i + 1}")\\n            return\\n        val_to_idx[val] = i\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String line1 = br.readLine();\\n        if (line1 == null) return;\\n        StringTokenizer st1 = new StringTokenizer(line1);\\n        int n = Integer.parseInt(st1.nextToken());\\n        long target = Long.parseLong(st1.nextToken());\\n        String line2 = br.readLine();\\n        if (line2 == null) return;\\n        StringTokenizer st2 = new StringTokenizer(line2);\\n        Map<Long, Integer> valToIdx = new HashMap<>();\\n        for (int i = 0; i < n; i++) {\\n            long val = Long.parseLong(st2.nextToken());\\n            long complement = target - val;\\n            if (valToIdx.containsKey(complement)) {\\n                System.out.println((valToIdx.get(complement) + 1) + " " + (i + 1));\\n                return;\\n            }\\n            valToIdx.put(val, i);\\n        }\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nuse std::collections::HashMap;\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(line1)) = lines.next() {\\n        let mut parts = line1.split_whitespace();\\n        let n: usize = parts.next().unwrap().parse().unwrap();\\n        let target: i64 = parts.next().unwrap().parse().unwrap();\\n        if let Some(Ok(line2)) = lines.next() {\\n            let mut val_to_idx = HashMap::new();\\n            for (i, token) in line2.split_whitespace().enumerate() {\\n                let val: i64 = token.parse().unwrap();\\n                let complement = target - val;\\n                if let Some(&prev_idx) = val_to_idx.get(&complement) {\\n                    writeln!(out, "{} {}", prev_idx + 1, i + 1).unwrap();\\n                    return;\\n                }\\n                val_to_idx.insert(val, i);\\n            }\\n        }\\n    }\\n}'
        }
    },

{
        title: 'Move Zeroes',
        description: 'Given an integer array arr, move all 0\\\'s to the end of it while maintaining the relative order of the non-zero elements.\\n\\nNote that you must do this in-place without making a copy of the array.',
        difficulty: 'EASY',
        tags: [
            'arrays'
        ],
        constraints: '1 <= n <= 10^5\\n-2^31 <= arr[i] <= 2^31 - 1',
        hints: 'Maintain a write pointer. Loop through the array, and whenever you find a non-zero element, write it to the write pointer position and increment the write pointer.',
        editorial: '**Approach: Two Pointers (In-place)**\\n\\n1. Maintain a pointer `write_idx` initialized to 0.\\n2. Traverse the array from left to right. If the current element is non-zero, swap or copy it to the `write_idx` and increment `write_idx`.\\n3. Fill the remaining positions from `write_idx` to `n - 1` with zeroes.\\n\\n**Time Complexity:** O(N)\\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '5\\n0 1 0 3 12',
                output: '1 3 12 0 0',
                explanation: 'All zeroes are moved to the end, while 1, 3, and 12 retain their order.'
            },
            {
                title: 'Example 2',
                input: '1\\n0',
                output: '0'
            }
        ],
        testcases: [
            {
                input: '5\\n0 1 0 3 12',
                output: '1 3 12 0 0'
            },
            {
                input: '1\\n0',
                output: '0'
            },
            {
                input: '1\\n42',
                output: '42'
            },
            {
                input: '6\\n0 0 0 1 2 3',
                output: '1 2 3 0 0 0'
            },
            {
                input: '5\\n1 2 3 0 0',
                output: '1 2 3 0 0'
            },
            {
                input: '4\\n0 0 0 0',
                output: '0 0 0 0'
            },
            {
                input: '8\\n1 0 2 0 3 0 4 0',
                output: '1 2 3 4 0 0 0 0'
            },
            {
                input: '2\\n2 1',
                output: '2 1'
            },
            {
                input: '7\\n-1 0 0 -2 3 0 4',
                output: '-1 -2 3 4 0 0 0'
            },
            {
                input: '10\\n0 5 0 8 0 9 0 10 0 11',
                output: '5 8 9 10 11 0 0 0 0 0'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    vector<long long> arr(n);\\n    for (int i = 0; i < n; i++) cin >> arr[i];\\n    int write_idx = 0;\\n    for (int i = 0; i < n; i++) {\\n        if (arr[i] != 0) {\\n            arr[write_idx++] = arr[i];\\n        }\\n    }\\n    while (write_idx < n) {\\n        arr[write_idx++] = 0;\\n    }\\n    for (int i = 0; i < n; i++) {\\n        cout << arr[i] << (i == n - 1 ? "" : " ");\\n    }\\n    cout << "\\\\n";\\n    return 0;\\n}',
            python: 'import sys\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if not input_data:\\n        return\\n    n = int(input_data[0])\\n    arr = [int(x) for x in input_data[1:1+n]]\\n    non_zeroes = [x for x in arr if x != 0]\\n    zeroes = [0] * (n - len(non_zeroes))\\n    result = non_zeroes + zeroes\\n    print(*(result))\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String line1 = br.readLine();\\n        if (line1 == null) return;\\n        int n = Integer.parseInt(line1.trim());\\n        String line2 = br.readLine();\\n        if (line2 == null) return;\\n        StringTokenizer st = new StringTokenizer(line2);\\n        long[] arr = new long[n];\\n        int writeIdx = 0;\\n        for (int i = 0; i < n; i++) {\\n            long val = Long.parseLong(st.nextToken());\\n            if (val != 0) {\\n                arr[writeIdx++] = val;\\n            }\\n        }\\n        while (writeIdx < n) {\\n            arr[writeIdx++] = 0;\\n        }\\n        StringBuilder sb = new StringBuilder();\\n        for (int i = 0; i < n; i++) {\\n            sb.append(arr[i]).append(i == n - 1 ? "" : " ");\\n        }\\n        System.out.println(sb.toString());\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(line1)) = lines.next() {\\n        let n: usize = line1.trim().parse().unwrap();\\n        if let Some(Ok(line2)) = lines.next() {\\n            let mut arr = vec![0i64; n];\\n            let mut write_idx = 0;\\n            for token in line2.split_whitespace() {\\n                let val: i64 = token.parse().unwrap();\\n                if val != 0 {\\n                    arr[write_idx] = val;\\n                    write_idx += 1;\\n                }\\n            }\\n            for i in 0..n {\\n                write!(out, "{}", arr[i]).unwrap();\\n                if i < n - 1 {\\n                    write!(out, " ").unwrap();\\n                }\\n            }\\n            writeln!(out).unwrap();\\n        }\\n    }\\n}'
        }
    },

{
        title: 'Is Subsequence',
        description: 'Given two strings s and t, return true if s is a subsequence of t, or false otherwise.\\n\\nA subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).',
        difficulty: 'EASY',
        tags: [
            'strings'
        ],
        constraints: '1 <= s.length, t.length <= 10^5\\ns and t consist only of lowercase English letters.',
        hints: 'Use two pointers, one for each string. Iterate through both strings, advancing the pointer for s only when characters match.',
        editorial: '**Approach: Two Pointers**\\n\\n1. Initialize pointer `i = 0` for `s` and pointer `j = 0` for `t`.\\n2. Loop while both pointers are within bounds. If `s[i] == t[j]`, increment `i`.\\n3. Always increment `j`.\\n4. After the loop, if `i` equals the length of `s`, it means all characters of `s` were matched in order. Return true, otherwise false.\\n\\n**Time Complexity:** O(T) where T is the length of string `t`.\\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: 'abc\\nahbgdc',
                output: 'true',
                explanation: '"abc" can be formed by taking characters \'a\', \'b\', \'c\' from "ahbgdc".'
            },
            {
                title: 'Example 2',
                input: 'axc\\nahbgdc',
                output: 'false'
            }
        ],
        testcases: [
            {
                input: 'abc\\nahbgdc',
                output: 'true'
            },
            {
                input: 'axc\\nahbgdc',
                output: 'false'
            },
            {
                input: 'a\\na',
                output: 'true'
            },
            {
                input: 'a\\nb',
                output: 'false'
            },
            {
                input: 'g\\nahbgdc',
                output: 'true'
            },
            {
                input: 'ahbgdc\\nahbgdc',
                output: 'true'
            },
            {
                input: 'ahbgdca\\nahbgdc',
                output: 'false'
            },
            {
                input: 'abc\\nacb',
                output: 'false'
            },
            {
                input: 'code\\ncomputer science and engineering',
                output: 'true'
            },
            {
                input: 'ace\\nabcde',
                output: 'true'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    string s, t;\\n    if (!(cin >> s >> t)) return 0;\\n    int i = 0, j = 0;\\n    while (i < (int)s.length() && j < (int)t.length()) {\\n        if (s[i] == t[j]) {\\n            i++;\\n        }\\n        j++;\\n    }\\n    cout << (i == (int)s.length() ? "true" : "false") << "\\\\n";\\n    return 0;\\n}',
            python: 'import sys\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if len(input_data) < 2:\\n        return\\n    s = input_data[0]\\n    t = input_data[1]\\n    i, j = 0, 0\\n    while i < len(s) and j < len(t):\\n        if s[i] == t[j]:\\n            i += 1\\n        j += 1\\n    print("true" if i == len(s) else "false")\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String s = br.readLine();\\n        String t = br.readLine();\\n        if (s == null || t == null) return;\\n        s = s.trim();\\n        t = t.trim();\\n        int i = 0, j = 0;\\n        while (i < s.length() && j < t.length()) {\\n            if (s.charAt(i) == t.charAt(j)) {\\n                i++;\\n            }\\n            j++;\\n        }\\n        System.out.println(i == s.length() ? "true" : "false");\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(s)) = lines.next() {\\n        if let Some(Ok(t)) = lines.next() {\\n            let s = s.trim();\\n            let t = t.trim();\\n            let s_bytes = s.as_bytes();\\n            let t_bytes = t.as_bytes();\\n            let mut i = 0;\\n            let mut j = 0;\\n            while i < s_bytes.len() && j < t_bytes.len() {\\n                if s_bytes[i] == t_bytes[j] {\\n                    i += 1;\\n                }\\n                j += 1;\\n            }\\n            writeln!(out, "{}", if i == s_bytes.len() { "true" } else { "false" }).unwrap();\\n        }\\n    }\\n}'
        }
    },

{
        title: 'Container With Most Water',
        description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]).\\n\\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\\n\\nReturn the maximum amount of water a container can store.',
        difficulty: 'MEDIUM',
        tags: [
            'arrays'
        ],
        constraints: '2 <= n <= 10^5\\n0 <= height[i] <= 10^4',
        hints: 'Use two pointers at the boundaries of the array. Compute the area, and move the pointer pointing to the smaller height inwards.',
        editorial: '**Approach: Two Pointers**\\n\\n1. Place one pointer at the start (0) and another at the end (n-1).\\n2. The water container capacity is determined by the minimum height of the two boundaries multiplied by the distance between them.\\n3. Update the maximum capacity.\\n4. Move the pointer with the smaller height inward since moving the larger height inward would only decrease the distance without any chance of increasing the height boundary.\\n\\n**Time Complexity:** O(N)\\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '9\\n1 8 6 2 5 4 8 3 7',
                output: '49',
                explanation: 'The maximum area is obtained between height 8 (index 1) and height 7 (index 8), holding min(8, 7) * (8 - 1) = 7 * 7 = 49 units of water.'
            },
            {
                title: 'Example 2',
                input: '2\\n1 1',
                output: '1'
            }
        ],
        testcases: [
            {
                input: '9\\n1 8 6 2 5 4 8 3 7',
                output: '49'
            },
            {
                input: '2\\n1 1',
                output: '1'
            },
            {
                input: '5\\n4 3 2 1 4',
                output: '16'
            },
            {
                input: '4\\n1 2 1 2',
                output: '4'
            },
            {
                input: '5\\n10 1 1 1 10',
                output: '40'
            },
            {
                input: '6\\n5 10 15 20 25 30',
                output: '30'
            },
            {
                input: '10\\n1 1 1 1 1 1 1 1 1 1',
                output: '9'
            },
            {
                input: '2\\n10000 10000',
                output: '10000'
            },
            {
                input: '7\\n1 2 3 4 3 2 1',
                output: '9'
            },
            {
                input: '8\\n3 1 2 4 5 1 2 3',
                output: '21'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    vector<long long> height(n);\\n    for (int i = 0; i < n; i++) cin >> height[i];\\n    long long max_water = 0;\\n    int left = 0, right = n - 1;\\n    while (left < right) {\\n        long long h = min(height[left], height[right]);\\n        max_water = max(max_water, h * (right - left));\\n        if (height[left] < height[right]) {\\n            left++;\\n        } else {\\n            right--;\\n        }\\n    }\\n    cout << max_water << "\\\\n";\\n    return 0;\\n}',
            python: 'import sys\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if not input_data:\\n        return\\n    n = int(input_data[0])\\n    height = [int(x) for x in input_data[1:1+n]]\\n    max_water = 0\\n    left, right = 0, n - 1\\n    while left < right:\\n        h = min(height[left], height[right])\\n        water = h * (right - left)\\n        if water > max_water:\\n            max_water = water\\n        if height[left] < height[right]:\\n            left += 1\\n        else:\\n            right -= 1\\n    print(max_water)\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String line1 = br.readLine();\\n        if (line1 == null) return;\\n        int n = Integer.parseInt(line1.trim());\\n        String line2 = br.readLine();\\n        if (line2 == null) return;\\n        StringTokenizer st = new StringTokenizer(line2);\\n        long[] height = new long[n];\\n        for (int i = 0; i < n; i++) {\\n            height[i] = Long.parseLong(st.nextToken());\\n        }\\n        long maxWater = 0;\\n        int left = 0, right = n - 1;\\n        while (left < right) {\\n            long h = Math.min(height[left], height[right]);\\n            long water = h * (right - left);\\n            if (water > maxWater) {\\n                maxWater = water;\\n            }\\n            if (height[left] < height[right]) {\\n                left++;\\n            } else {\\n                right--;\\n            }\\n        }\\n        System.out.println(maxWater);\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nuse std::cmp;\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(line1)) = lines.next() {\\n        let n: usize = line1.trim().parse().unwrap();\\n        if let Some(Ok(line2)) = lines.next() {\\n            let height: Vec<i64> = line2.split_whitespace()\\n                .map(|x| x.parse().unwrap())\\n                .collect();\\n            let mut max_water = 0i64;\\n            let mut left = 0;\\n            let mut right = n - 1;\\n            while left < right {\\n                let h = cmp::min(height[left], height[right]);\\n                let water = h * (right - left) as i64;\\n                if water > max_water {\\n                    max_water = water;\\n                }\\n                if height[left] < height[right] {\\n                    left += 1;\\n                } else {\\n                    right -= 1;\\n                }\\n            }\\n            writeln!(out, "{}", max_water).unwrap();\\n        }\\n    }\\n}'
        }
    },

{
        title: '3Sum',
        description: 'Given an integer array arr, return all unique triplets [arr[i], arr[j], arr[k]] such that i != j, i != k, and j != k, and arr[i] + arr[j] + arr[k] == 0.\\n\\nNotice that the solution set must not contain duplicate triplets.',
        difficulty: 'MEDIUM',
        tags: [
            'arrays'
        ],
        constraints: '3 <= n <= 3000\\n-10^5 <= arr[i] <= 10^5',
        hints: 'Sort the array first. Iterate through the array, and for each element, use the two-pointer approach to find pairs that sum to the negative of that element.',
        editorial: '**Approach: Sort and Two Pointers**\\n\\n1. Sort the array in non-decreasing order.\\n2. Loop through the array from index 0 to n-3. Skip duplicate values to avoid duplicate triplets.\\n3. For each element at index `i`, set `left = i + 1` and `right = n - 1`.\\n4. While `left < right`, check if `arr[i] + arr[left] + arr[right] == 0`.\\n5. If it is 0, print the triplet, and increment `left` and decrement `right`, skipping duplicates for both.\\n6. If the sum is less than 0, increment `left`. Otherwise, decrement `right`.\\n\\n**Time Complexity:** O(N^2)\\n**Space Complexity:** O(1) auxiliary space (excluding sorting space).',
        examples: [
            {
                title: 'Example 1',
                input: '6\\n-1 0 1 2 -1 -4',
                output: '-1 -1 2\\n-1 0 1',
                explanation: 'The unique triplets that sum to 0 are [-1, -1, 2] and [-1, 0, 1].'
            },
            {
                title: 'Example 2',
                input: '3\\n0 1 1',
                output: ''
            }
        ],
        testcases: [
            {
                input: '6\\n-1 0 1 2 -1 -4',
                output: '-1 -1 2\\n-1 0 1'
            },
            {
                input: '3\\n0 1 1',
                output: ''
            },
            {
                input: '3\\n0 0 0',
                output: '0 0 0'
            },
            {
                input: '5\\n-2 0 1 1 2',
                output: '-2 0 2\\n-2 1 1'
            },
            {
                input: '8\\n-1 0 1 2 -1 -4 2 -2',
                output: '-4 2 2\\n-2 0 2\\n-1 -1 2\\n-1 0 1'
            },
            {
                input: '4\\n-1 -1 2 5',
                output: '-1 -1 2'
            },
            {
                input: '4\\n1 2 3 4',
                output: ''
            },
            {
                input: '7\\n-3 -2 -1 0 1 2 3',
                output: '-3 0 3\\n-3 1 2\\n-2 -1 3\\n-2 0 2\\n-1 0 1'
            },
            {
                input: '5\\n-5 1 2 3 4 -1',
                output: '-5 1 4\\n-5 2 3'
            },
            {
                input: '5\\n-1 -1 -1 2 2',
                output: '-1 -1 2'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    vector<int> arr(n);\\n    for (int i = 0; i < n; i++) cin >> arr[i];\\n    sort(arr.begin(), arr.end());\\n    for (int i = 0; i < n; i++) {\\n        if (i > 0 && arr[i] == arr[i - 1]) continue;\\n        int left = i + 1, right = n - 1;\\n        while (left < right) {\\n            long long sum = (long long)arr[i] + arr[left] + arr[right];\\n            if (sum == 0) {\\n                cout << arr[i] << " " << arr[left] << " " << arr[right] << "\\\\n";\\n                while (left < right && arr[left] == arr[left + 1]) left++;\\n                while (left < right && arr[right] == arr[right - 1]) right--;\\n                left++;\\n                right--;\\n            } else if (sum < 0) {\\n                left++;\\n            } else {\\n                right--;\\n            }\\n        }\\n    }\\n    return 0;\\n}',
            python: 'import sys\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if not input_data:\\n        return\\n    n = int(input_data[0])\\n    arr = [int(x) for x in input_data[1:1+n]]\\n    arr.sort()\\n    for i in range(n):\\n        if i > 0 and arr[i] == arr[i - 1]:\\n            continue\\n        left, right = i + 1, n - 1\\n        while left < right:\\n            s = arr[i] + arr[left] + arr[right]\\n            if s == 0:\\n                print(f"{arr[i]} {arr[left]} {arr[right]}")\\n                while left < right and arr[left] == arr[left + 1]:\\n                    left += 1\\n                while left < right and arr[right] == arr[right - 1]:\\n                    right -= 1\\n                left += 1\\n                right -= 1\\n            elif s < 0:\\n                left += 1\\n            else:\\n                right -= 1\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String line1 = br.readLine();\\n        if (line1 == null) return;\\n        int n = Integer.parseInt(line1.trim());\\n        String line2 = br.readLine();\\n        if (line2 == null) return;\\n        StringTokenizer st = new StringTokenizer(line2);\\n        int[] arr = new int[n];\\n        for (int i = 0; i < n; i++) {\\n            arr[i] = Integer.parseInt(st.nextToken());\\n        }\\n        Arrays.sort(arr);\\n        StringBuilder sb = new StringBuilder();\\n        for (int i = 0; i < n; i++) {\\n            if (i > 0 && arr[i] == arr[i - 1]) continue;\\n            int left = i + 1, right = n - 1;\\n            while (left < right) {\\n                long sum = (long)arr[i] + arr[left] + arr[right];\\n                if (sum == 0) {\\n                    sb.append(arr[i]).append(" ").append(arr[left]).append(" ").append(arr[right]).append("\\\\n");\\n                    while (left < right && arr[left] == arr[left + 1]) left++;\\n                    while (left < right && arr[right] == arr[right - 1]) right--;\\n                    left++;\\n                    right--;\\n                } else if (sum < 0) {\\n                    left++;\\n                } else {\\n                    right--;\\n                }\\n            }\\n        }\\n        System.out.print(sb.toString());\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(line1)) = lines.next() {\\n        let n: usize = line1.trim().parse().unwrap();\\n        if let Some(Ok(line2)) = lines.next() {\\n            let mut arr: Vec<i32> = line2.split_whitespace()\\n                .map(|x| x.parse().unwrap())\\n                .collect();\\n            arr.sort();\\n            for i in 0..n {\\n                if i > 0 && arr[i] == arr[i - 1] {\\n                    continue;\\n                }\\n                let mut left = i + 1;\\n                let mut right = n - 1;\\n                while left < right {\\n                    let sum = arr[i] as i64 + arr[left] as i64 + arr[right] as i64;\\n                    if sum == 0 {\\n                        writeln!(out, "{} {} {}", arr[i], arr[left], arr[right]).unwrap();\\n                        while left < right && arr[left] == arr[left + 1] {\\n                            left += 1;\\n                        }\\n                        while left < right && arr[right] == arr[right - 1] {\\n                            right -= 1;\\n                        }\\n                        left += 1;\\n                        right -= 1;\\n                    } else if sum < 0 {\\n                        left += 1;\\n                    } else {\\n                        right -= 1;\\n                    }\\n                }\\n            }\\n        }\\n    }\\n}'
        }
    },

{
        title: 'Longest Palindromic Substring',
        description: 'Given a string s, return the longest palindromic substring in s. If there are multiple palindromic substrings with the maximum length, return the one that starts at the earliest index.',
        difficulty: 'MEDIUM',
        tags: [
            'strings'
        ],
        constraints: '1 <= s.length <= 1000\\ns consists of English letters (both uppercase and lowercase) and digits.',
        hints: 'A palindrome can be expanded from its center. There are 2n - 1 such centers: odd-length palindromes have 1 center character, even-length palindromes have 2 center characters.',
        editorial: '**Approach: Expand Around Center**\\n\\n1. For each index `i` in string `s`, treat it as the center of a potential palindromic substring.\\n2. Expand outwards for both odd-length (centered at `i`) and even-length (centered at `i` and `i+1`) palindromes.\\n3. Keep track of the longest palindromic substring. If a new palindrome is strictly longer than the current maximum, update the start position and length.\\n4. Print the longest palindromic substring.\\n\\n**Time Complexity:** O(N^2)\\n**Space Complexity:** O(1) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: 'babad',
                output: 'bab',
                explanation: '"bab" starts at index 0 and has length 3. "aba" is also a palindrome of length 3 but starts at index 1. We choose the one that starts earlier.'
            },
            {
                title: 'Example 2',
                input: 'cbbd',
                output: 'bb'
            }
        ],
        testcases: [
            {
                input: 'babad',
                output: 'bab'
            },
            {
                input: 'cbbd',
                output: 'bb'
            },
            {
                input: 'a',
                output: 'a'
            },
            {
                input: 'ac',
                output: 'a'
            },
            {
                input: 'bb',
                output: 'bb'
            },
            {
                input: 'racecar',
                output: 'racecar'
            },
            {
                input: 'abacaba',
                output: 'abacaba'
            },
            {
                input: 'abacdfgdcaba',
                output: 'aba'
            },
            {
                input: 'xabaxabbax',
                output: 'xabbax'
            },
            {
                input: 'abcdefgfedcba123454321',
                output: 'abcdefgfedcba'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    string s;\\n    if (!(cin >> s)) return 0;\\n    int n = s.length();\\n    if (n == 0) return 0;\\n    int start = 0, max_len = 1;\\n    auto expand = [&](int l, int r) {\\n        while (l >= 0 && r < n && s[l] == s[r]) {\\n            l--;\\n            r++;\\n        }\\n        return r - l - 1;\\n    };\\n    for (int i = 0; i < n; i++) {\\n        int len1 = expand(i, i);\\n        int len2 = expand(i, i + 1);\\n        int len = max(len1, len2);\\n        if (len > max_len) {\\n            max_len = len;\\n            start = i - (len - 1) / 2;\\n        }\\n    }\\n    cout << s.substr(start, max_len) << "\\\\n";\\n    return 0;\\n}',
            python: 'import sys\\ndef main():\\n    s = sys.stdin.read().strip()\\n    if not s:\\n        return\\n    n = len(s)\\n    start = 0\\n    max_len = 1\\n    def expand(l, r):\\n        while l >= 0 and r < n and s[l] == s[r]:\\n            l -= 1\\n            r += 1\\n        return r - l - 1\\n    for i in range(n):\\n        len1 = expand(i, i)\\n        len2 = expand(i, i + 1)\\n        length = max(len1, len2)\\n        if length > max_len:\\n            max_len = length\\n            start = i - (length - 1) // 2\\n    print(s[start:start+max_len])\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String s = br.readLine();\\n        if (s == null) return;\\n        s = s.trim();\\n        int n = s.length();\\n        if (n == 0) return;\\n        int start = 0;\\n        int maxLen = 1;\\n        for (int i = 0; i < n; i++) {\\n            int len1 = expand(s, i, i);\\n            int len2 = expand(s, i, i + 1);\\n            int len = Math.max(len1, len2);\\n            if (len > maxLen) {\\n                maxLen = len;\\n                start = i - (len - 1) / 2;\\n            }\\n        }\\n        System.out.println(s.substring(start, start + maxLen));\\n    }\\n    private static int expand(String s, int l, int r) {\\n        int n = s.length();\\n        while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {\\n            l--;\\n            r++;\\n        }\\n        return r - l - 1;\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nuse std::cmp;\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(line)) = lines.next() {\\n        let s = line.trim();\\n        let bytes = s.as_bytes();\\n        let n = bytes.len();\\n        if n == 0 {\\n            return;\\n        }\\n        let mut start = 0;\\n        let mut max_len = 1;\\n        let expand = |mut l: isize, mut r: isize| -> usize {\\n            while l >= 0 && r < n as isize && bytes[l as usize] == bytes[r as usize] {\\n                l -= 1;\\n                r += 1;\\n            }\\n            (r - l - 1) as usize\\n        };\\n        for i in 0..n {\\n            let len1 = expand(i as isize, i as isize);\\n            let len2 = expand(i as isize, (i + 1) as isize);\\n            let len = cmp::max(len1, len2);\\n            if len > max_len {\\n                max_len = len;\\n                start = i - (len - 1) / 2;\\n            }\\n        }\\n        writeln!(out, "{}", &s[start..start + max_len]).unwrap();\\n    }\\n}'
        }
    },

{
        title: 'Longest Consecutive Sequence',
        description: 'Given an unsorted array of integers arr, return the length of the longest consecutive elements sequence.\\n\\nYou must write an algorithm that runs in O(n) time.',
        difficulty: 'HARD',
        tags: [
            'arrays'
        ],
        constraints: '0 <= n <= 10^5\\n-10^9 <= arr[i] <= 10^9',
        hints: 'Insert all numbers into a hash set. For each number, check if it is the start of a sequence (i.e. number - 1 is not in the set). If it is, count the consecutive numbers starting from it.',
        editorial: '**Approach: Hash Set**\\n\\n1. Insert all elements of the array into a hash set.\\n2. Iterate through each element `x` in the set. Check if `x - 1` is present in the set. If not, it means `x` can be the start of a consecutive sequence.\\n3. From `x`, incrementally check if `x + 1, x + 2, ...` are in the set, keeping track of the sequence length.\\n4. Update the maximum length found.\\n\\n**Time Complexity:** O(N) because each element is visited at most twice (once in loop, once in inner while loop).\\n**Space Complexity:** O(N) for the hash set.',
        examples: [
            {
                title: 'Example 1',
                input: '6\\n100 4 200 1 3 2',
                output: '4',
                explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.'
            },
            {
                title: 'Example 2',
                input: '10\\n0 3 7 2 5 8 4 6 0 1',
                output: '9',
                explanation: 'The consecutive sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8].'
            }
        ],
        testcases: [
            {
                input: '6\\n100 4 200 1 3 2',
                output: '4'
            },
            {
                input: '10\\n0 3 7 2 5 8 4 6 0 1',
                output: '9'
            },
            {
                input: '0\\n',
                output: '0'
            },
            {
                input: '1\\n42',
                output: '1'
            },
            {
                input: '5\\n1 2 3 4 5',
                output: '5'
            },
            {
                input: '5\\n5 4 3 2 1',
                output: '5'
            },
            {
                input: '4\\n10 20 30 40',
                output: '1'
            },
            {
                input: '8\\n1 2 1 2 3 3 4 4',
                output: '4'
            },
            {
                input: '9\\n-1 -2 -3 10 11 12 -4 13 14',
                output: '5'
            },
            {
                input: '12\\n100 -2 2 200 -1 -3 1 300 0 4 3 400',
                output: '8'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    int n;\\n    if (!(cin >> n)) {\\n        cout << 0 << "\\\\n";\\n        return 0;\\n    }\\n    unordered_set<long long> s;\\n    for (int i = 0; i < n; i++) {\\n        long long val;\\n        cin >> val;\\n        s.insert(val);\\n    }\\n    int longest = 0;\\n    for (long long x : s) {\\n        if (!s.count(x - 1)) {\\n            int current_len = 1;\\n            long long current_val = x;\\n            while (s.count(current_val + 1)) {\\n                current_val++;\\n                current_len++;\\n            }\\n            longest = max(longest, current_len);\\n        }\\n    }\\n    cout << longest << "\\\\n";\\n    return 0;\\n}',
            python: 'import sys\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if not input_data:\\n        print(0)\\n        return\\n    n = int(input_data[0])\\n    arr = [int(x) for x in input_data[1:1+n]]\\n    s = set(arr)\\n    longest = 0\\n    for x in s:\\n        if (x - 1) not in s:\\n            current_val = x\\n            current_len = 1\\n            while (current_val + 1) in s:\\n                current_val += 1\\n                current_len += 1\\n            if current_len > longest:\\n                longest = current_len\\n    print(longest)\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String line1 = br.readLine();\\n        if (line1 == null || line1.trim().isEmpty()) {\\n            System.out.println(0);\\n            return;\\n        }\\n        int n = Integer.parseInt(line1.trim());\\n        if (n == 0) {\\n            System.out.println(0);\\n            return;\\n        }\\n        String line2 = br.readLine();\\n        if (line2 == null || line2.trim().isEmpty()) {\\n            System.out.println(0);\\n            return;\\n        }\\n        StringTokenizer st = new StringTokenizer(line2);\\n        Set<Long> set = new HashSet<>();\\n        for (int i = 0; i < n; i++) {\\n            set.add(Long.parseLong(st.nextToken()));\\n        }\\n        int longest = 0;\\n        for (long x : set) {\\n            if (!set.contains(x - 1)) {\\n                int currentLen = 1;\\n                long currentVal = x;\\n                while (set.contains(currentVal + 1)) {\\n                    currentVal++;\\n                    currentLen++;\\n                }\\n                longest = Math.max(longest, currentLen);\\n            }\\n        }\\n        System.out.println(longest);\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nuse std::collections::HashSet;\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(line1)) = lines.next() {\\n        let n_str = line1.trim();\\n        if n_str.is_empty() {\\n            writeln!(out, "0").unwrap();\\n            return;\\n        }\\n        let n: usize = n_str.parse().unwrap();\\n        if n == 0 {\\n            writeln!(out, "0").unwrap();\\n            return;\\n        }\\n        if let Some(Ok(line2)) = lines.next() {\\n            let mut set = HashSet::new();\\n            for token in line2.split_whitespace() {\\n                let val: i64 = token.parse().unwrap();\\n                set.insert(val);\\n            }\\n            let mut longest = 0;\\n            for &x in &set {\\n                if !set.contains(&(x - 1)) {\\n                    let mut current_len = 1;\\n                    let mut current_val = x;\\n                    while set.contains(&(current_val + 1)) {\\n                        current_val += 1;\\n                        current_len += 1;\\n                    }\\n                    if current_len > longest {\\n                        longest = current_len;\\n                    }\\n                }\\n            }\\n            writeln!(out, "{}", longest).unwrap();\\n        }\\n    }\\n}'
        }
    },

{
        title: 'Subarrays with K Different Integers',
        description: 'Given an integer array arr and an integer k, return the number of good subarrays of arr.\\n\\nA good subarray is a contiguous subarray where the number of different integers in that subarray is exactly k.\\n- For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.',
        difficulty: 'HARD',
        tags: [
            'arrays'
        ],
        constraints: '1 <= n <= 10^5\\n1 <= k <= n\\n1 <= arr[i] <= n',
        hints: 'The number of subarrays with exactly K different integers is equal to the number of subarrays with at most K different integers minus the number of subarrays with at most K-1 different integers.',
        editorial: '**Approach: Sliding Window (atMostK)**\\n\\n1. Define a helper function `atMostK(arr, K)` which returns the number of subarrays with at most `K` distinct integers.\\n2. Inside `atMostK`, use a sliding window with a frequency map. Expand the right pointer. If the distinct count exceeds `K`, shrink the left pointer until distinct count is `K` or less.\\n3. The number of valid subarrays ending at `right` is `right - left + 1`. Sum these up.\\n4. The final answer is `atMostK(arr, K) - atMostK(arr, K - 1)`.\\n\\n**Time Complexity:** O(N)\\n**Space Complexity:** O(N) for the frequency counts map.',
        examples: [
            {
                title: 'Example 1',
                input: '5 2\\n1 2 1 2 3',
                output: '7',
                explanation: 'Subarrays formed with exactly 2 different integers: [1, 2], [2, 1], [1, 2], [2, 3], [1, 2, 1], [2, 1, 2], [1, 2, 1, 2].'
            },
            {
                title: 'Example 2',
                input: '5 3\\n1 2 1 3 4',
                output: '3',
                explanation: 'Subarrays formed with exactly 3 different integers: [1, 2, 1, 3], [2, 1, 3], [1, 3, 4].'
            }
        ],
        testcases: [
            {
                input: '5 2\\n1 2 1 2 3',
                output: '7'
            },
            {
                input: '5 3\\n1 2 1 3 4',
                output: '3'
            },
            {
                input: '1 1\\n1',
                output: '1'
            },
            {
                input: '3 2\\n1 2 3',
                output: '2'
            },
            {
                input: '5 1\\n1 1 1 1 1',
                output: '15'
            },
            {
                input: '6 2\\n1 2 1 2 1 2',
                output: '15'
            },
            {
                input: '4 4\\n1 2 3 4',
                output: '1'
            },
            {
                input: '8 3\\n1 2 1 2 3 1 2 3',
                output: '14'
            },
            {
                input: '10 2\\n1 2 3 4 5 1 2 3 4 5',
                output: '9'
            },
            {
                input: '10 4\\n1 2 1 2 3 2 3 4 1 2',
                output: '20'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nlong long atMostK(const vector<int>& arr, int k) {\\n    int n = arr.size();\\n    unordered_map<int, int> counts;\\n    int left = 0;\\n    long long ans = 0;\\n    for (int right = 0; right < n; right++) {\\n        if (counts[arr[right]] == 0) {\\n            k--;\\n        }\\n        counts[arr[right]]++;\\n        while (k < 0) {\\n            counts[arr[left]]--;\\n            if (counts[arr[left]] == 0) {\\n                k++;\\n            }\\n            left++;\\n        }\\n        ans += (right - left + 1);\\n    }\\n    return ans;\\n}\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    int n, k;\\n    if (!(cin >> n >> k)) return 0;\\n    vector<int> arr(n);\\n    for (int i = 0; i < n; i++) cin >> arr[i];\\n    cout << atMostK(arr, k) - atMostK(arr, k - 1) << "\\\\n";\\n    return 0;\\n}',
            python: 'import sys\\ndef atMostK(arr, k):\\n    counts = {}\\n    left = 0\\n    ans = 0\\n    for right in range(len(arr)):\\n        val = arr[right]\\n        if counts.get(val, 0) == 0:\\n            k -= 1\\n        counts[val] = counts.get(val, 0) + 1\\n        while k < 0:\\n            left_val = arr[left]\\n            counts[left_val] -= 1\\n            if counts[left_val] == 0:\\n                k += 1\\n            left += 1\\n        ans += (right - left + 1)\\n    return ans\\n\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if not input_data:\\n        return\\n    n = int(input_data[0])\\n    k = int(input_data[1])\\n    arr = [int(x) for x in input_data[2:2+n]]\\n    print(atMostK(arr, k) - atMostK(arr, k - 1))\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String line1 = br.readLine();\\n        if (line1 == null) return;\\n        StringTokenizer st1 = new StringTokenizer(line1);\\n        int n = Integer.parseInt(st1.nextToken());\\n        int k = Integer.parseInt(st1.nextToken());\\n        String line2 = br.readLine();\\n        if (line2 == null) return;\\n        StringTokenizer st2 = new StringTokenizer(line2);\\n        int[] arr = new int[n];\\n        for (int i = 0; i < n; i++) {\\n            arr[i] = Integer.parseInt(st2.nextToken());\\n        }\\n        System.out.println(atMostK(arr, k) - atMostK(arr, k - 1));\\n    }\\n    private static long atMostK(int[] arr, int k) {\\n        int n = arr.length;\\n        Map<Integer, Integer> counts = new HashMap<>();\\n        int left = 0;\\n        long ans = 0;\\n        for (int right = 0; right < n; right++) {\\n            int rightVal = arr[right];\\n            counts.put(rightVal, counts.getOrDefault(rightVal, 0) + 1);\\n            if (counts.get(rightVal) == 1) {\\n                k--;\\n            }\\n            while (k < 0) {\\n                int leftVal = arr[left];\\n                counts.put(leftVal, counts.get(leftVal) - 1);\\n                if (counts.get(leftVal) == 0) {\\n                    k++;\\n                }\\n                left++;\\n            }\\n            ans += (right - left + 1);\\n        }\\n        return ans;\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nuse std::collections::HashMap;\\nfn at_most_k(arr: &[i32], mut k: i32) -> i64 {\\n    let n = arr.len();\\n    let mut counts = HashMap::new();\\n    let mut left = 0;\\n    let mut ans = 0i64;\\n    for right in 0..n {\\n        let right_val = arr[right];\\n        let entry = counts.entry(right_val).or_insert(0);\\n        if *entry == 0 {\\n            k -= 1;\\n        }\\n        *entry += 1;\\n        while k < 0 {\\n            let left_val = arr[left];\\n            if let Some(entry) = counts.get_mut(&left_val) {\\n                *entry -= 1;\\n                if *entry == 0 {\\n                    k += 1;\\n                }\\n            }\\n            left += 1;\\n        }\\n        ans += (right - left + 1) as i64;\\n    }\\n    ans\\n}\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(line1)) = lines.next() {\\n        let mut parts = line1.split_whitespace();\\n        let n: usize = parts.next().unwrap().parse().unwrap();\\n        let k: i32 = parts.next().unwrap().parse().unwrap();\\n        if let Some(Ok(line2)) = lines.next() {\\n            let arr: Vec<i32> = line2.split_whitespace()\\n                .map(|x| x.parse().unwrap())\\n                .collect();\\n            let result = at_most_k(&arr, k) - at_most_k(&arr, k - 1);\\n            writeln!(out, "{}", result).unwrap();\\n        }\\n    }\\n}'
        }
    },

{
        title: 'Sliding Window Maximum',
        description: 'You are given an array of integers arr, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\\n\\nReturn the max sliding window.',
        difficulty: 'HARD',
        tags: [
            'arrays'
        ],
        constraints: '1 <= n <= 10^5\\n1 <= k <= n\\n-10^4 <= arr[i] <= 10^4',
        hints: 'Use a monotonic queue (deque) to store indices of elements in the current window. Keep the deque in decreasing order of elements\' values.',
        editorial: '**Approach: Monotonic Deque**\\n\\n1. Initialize a double-ended queue (deque) which will store indices of array elements.\\n2. For each element `arr[i]`:\\n   - Remove indices from the front of the deque if they are out of the current window (i.e. `index + k <= i`).\\n   - Remove indices from the back of the deque if their corresponding value is less than or equal to the current element `arr[i]`.\\n   - Add the current index `i` to the back of the deque.\\n   - The maximum element for the current window is at the front of the deque. Add it to results if `i >= k - 1$.\\n\\n**Time Complexity:** O(N) because each element index is pushed and popped from the deque at most once.\\n**Space Complexity:** O(K) for the deque.',
        examples: [
            {
                title: 'Example 1',
                input: '8 3\\n1 3 -1 -3 5 3 6 7',
                output: '3 3 5 5 6 7',
                explanation: 'The maximum values in each sliding window of size 3 are 3, 3, 5, 5, 6, 7 respectively.'
            },
            {
                title: 'Example 2',
                input: '1 1\\n1',
                output: '1'
            }
        ],
        testcases: [
            {
                input: '8 3\\n1 3 -1 -3 5 3 6 7',
                output: '3 3 5 5 6 7'
            },
            {
                input: '1 1\\n1',
                output: '1'
            },
            {
                input: '6 1\\n1 2 3 4 5 6',
                output: '1 2 3 4 5 6'
            },
            {
                input: '6 6\\n1 2 3 4 5 6',
                output: '6'
            },
            {
                input: '5 2\\n5 4 3 2 1',
                output: '5 4 3 2'
            },
            {
                input: '7 3\\n10 10 10 10 10 10 10',
                output: '10 10 10 10 10'
            },
            {
                input: '4 2\\n-1 -2 -3 -4',
                output: '-1 -2 -3'
            },
            {
                input: '8 4\\n1 3 -1 -3 5 3 6 7',
                output: '3 5 5 6 7'
            },
            {
                input: '10 3\\n9 10 9 -7 -4 -8 2 -6 10 9',
                output: '10 10 9 -4 2 2 10 10'
            },
            {
                input: '10 5\\n1 2 3 1 2 3 1 2 3 10',
                output: '3 3 3 3 3 10'
            }
        ],
        codesnippets: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    \\n    // Read input and solve\\n    \\n    return 0;\\n}',
            python: 'def main():\\n    # Read input and solve\\n    pass\\n\\nif __name__ == "__main__":\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\n\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        // Read input and solve\\n    }\\n}',
            rust: 'use std::io::{self, BufRead};\\n\\nfn main() {\\n    let stdin = io::stdin();\\n    // Read input and solve\\n}'
        },
        referneceSolution: {
            cpp: '#include <bits/stdc++.h>\\nusing namespace std;\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n    int n, k;\\n    if (!(cin >> n >> k)) return 0;\\n    vector<int> arr(n);\\n    for (int i = 0; i < n; i++) cin >> arr[i];\\n    deque<int> dq;\\n    vector<int> result;\\n    for (int i = 0; i < n; i++) {\\n        if (!dq.empty() && dq.front() + k <= i) {\\n            dq.pop_front();\\n        }\\n        while (!dq.empty() && arr[dq.back()] <= arr[i]) {\\n            dq.pop_back();\\n        }\\n        dq.push_back(i);\\n        if (i >= k - 1) {\\n            result.push_back(arr[dq.front()]);\\n        }\\n    }\\n    for (int i = 0; i < (int)result.size(); i++) {\\n        cout << result[i] << (i == (int)result.size() - 1 ? "" : " ");\\n    }\\n    cout << "\\\\n";\\n    return 0;\\n}',
            python: 'import sys\\nfrom collections import deque\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if not input_data:\\n        return\\n    n = int(input_data[0])\\n    k = int(input_data[1])\\n    arr = [int(x) for x in input_data[2:2+n]]\\n    dq = deque()\\n    result = []\\n    for i in range(n):\\n        if dq and dq[0] + k <= i:\\n            dq.popleft()\\n        while dq and arr[dq[-1]] <= arr[i]:\\n            dq.pop()\\n        dq.append(i)\\n        if i >= k - 1:\\n            result.append(arr[dq[0]])\\n    print(*(result))\\nif __name__ == \\\'__main__\\\':\\n    main()',
            java: 'import java.io.*;\\nimport java.util.*;\\npublic class Main {\\n    public static void main(String[] args) throws Exception {\\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\\n        String line1 = br.readLine();\\n        if (line1 == null) return;\\n        StringTokenizer st1 = new StringTokenizer(line1);\\n        int n = Integer.parseInt(st1.nextToken());\\n        int k = Integer.parseInt(st1.nextToken());\\n        String line2 = br.readLine();\\n        if (line2 == null) return;\\n        StringTokenizer st2 = new StringTokenizer(line2);\\n        int[] arr = new int[n];\\n        for (int i = 0; i < n; i++) {\\n            arr[i] = Integer.parseInt(st2.nextToken());\\n        }\\n        Deque<Integer> dq = new ArrayDeque<>();\\n        StringBuilder sb = new StringBuilder();\\n        boolean first = true;\\n        for (int i = 0; i < n; i++) {\\n            if (!dq.isEmpty() && dq.peekFirst() + k <= i) {\\n                dq.pollFirst();\\n            }\\n            while (!dq.isEmpty() && arr[dq.peekLast()] <= arr[i]) {\\n                dq.pollLast();\\n            }\\n            dq.offerLast(i);\\n            if (i >= k - 1) {\\n                if (!first) {\\n                    sb.append(" ");\\n                }\\n                first = false;\\n                sb.append(arr[dq.peekFirst()]);\\n            }\\n        }\\n        System.out.println(sb.toString());\\n    }\\n}',
            rust: 'use std::io::{self, BufRead, Write, BufWriter};\\nuse std::collections::VecDeque;\\nfn main() {\\n    let stdin = io::stdin();\\n    let stdout = io::stdout();\\n    let mut out = BufWriter::new(stdout.lock());\\n    let mut lines = stdin.lock().lines();\\n    if let Some(Ok(line1)) = lines.next() {\\n        let mut parts = line1.split_whitespace();\\n        let n: usize = parts.next().unwrap().parse().unwrap();\\n        let k: usize = parts.next().unwrap().parse().unwrap();\\n        if let Some(Ok(line2)) = lines.next() {\\n            let arr: Vec<i32> = line2.split_whitespace()\\n                .map(|x| x.parse().unwrap())\\n                .collect();\\n            let mut dq = VecDeque::new();\\n            let mut first = true;\\n            for i in 0..n {\\n                if !dq.is_empty() && *dq.front().unwrap() + k <= i {\\n                    dq.pop_front();\\n                }\\n                while !dq.is_empty() && arr[*dq.back().unwrap()] <= arr[i] {\\n                    dq.pop_back();\\n                }\\n                dq.push_back(i);\\n                if i >= k - 1 {\\n                    if !first {\\n                        write!(out, " ").unwrap();\\n                    }\\n                    first = false;\\n                    write!(out, "{}", arr[*dq.front().unwrap()]).unwrap();\\n                }\\n            }\\n            writeln!(out).unwrap();\\n        }\\n    }\\n}'
        }
    }
]
