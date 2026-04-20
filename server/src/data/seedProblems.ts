export const seedProblems = [
    {
        title: 'Two Sum',
        description: `Given an integer array and a target value, find the indices of the two numbers that add up to the target.

Write a program that reads the array and target from standard input and prints the two zero-based indices in ascending order.

Input format:
- First line: integer n
- Second line: n space separated integers
- Third line: target integer

Output format:
- Two space separated zero-based indices`,
        difficulty: 'EASY',
        tags: ['Array', 'Hash Table'],
        examples: [
            {
                title: 'Example 1',
                input: `4
2 7 11 15
9`,
                output: '0 1',
                explanation: 'nums[0] + nums[1] = 9',
            },
            {
                title: 'Example 2',
                input: `3
3 2 4
6`,
                output: '1 2',
            },
        ],
        constraints: `2 <= n <= 10^5
-10^9 <= nums[i], target <= 10^9
Exactly one valid answer exists.`,
        hints: 'Use a hash map to remember previously seen values and their indices.',
        editorial:
            'Scan the array once. For every number, check whether target - number has already been seen.',
        testcases: [
            { input: `4\n2 7 11 15\n9`, output: '0 1' },
            { input: `3\n3 2 4\n6`, output: '1 2' },
            { input: `2\n3 3\n6`, output: '0 1' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> solveTwoSum(const vector<int>& nums, int target) {
    // TODO: implement
    return {0, 0};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    int target;
    cin >> target;

    vector<int> ans = solveTwoSum(nums, target);
    cout << ans[0] << " " << ans[1];
    return 0;
}`,
            python: `def solve_two_sum(nums, target):
    # TODO: implement
    return [0, 0]


def main():
    n = int(input().strip())
    nums = list(map(int, input().split()))
    target = int(input().strip())
    ans = solve_two_sum(nums, target)
    print(ans[0], ans[1])


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static int[] solveTwoSum(int[] nums, int target) {
        // TODO: implement
        return new int[] {0, 0};
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[] nums = Arrays.stream(br.readLine().trim().split("\\\\s+"))
            .mapToInt(Integer::parseInt)
            .toArray();
        int target = Integer.parseInt(br.readLine().trim());
        int[] ans = solveTwoSum(nums, target);
        System.out.println(ans[0] + " " + ans[1]);
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> solveTwoSum(const vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); ++i) {
        int need = target - nums[i];
        if (seen.count(need)) {
            return {seen[need], i};
        }
        seen[nums[i]] = i;
    }
    return {-1, -1};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    int target;
    cin >> target;

    vector<int> ans = solveTwoSum(nums, target);
    cout << ans[0] << " " << ans[1];
    return 0;
}`,
            python: `def solve_two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        need = target - num
        if need in seen:
            return [seen[need], i]
        seen[num] = i
    return [-1, -1]


def main():
    _ = int(input().strip())
    nums = list(map(int, input().split()))
    target = int(input().strip())
    ans = solve_two_sum(nums, target)
    print(ans[0], ans[1])


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static int[] solveTwoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[] {seen.get(need), i};
            }
            seen.put(nums[i], i);
        }
        return new int[] {-1, -1};
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[] nums = Arrays.stream(br.readLine().trim().split("\\\\s+"))
            .mapToInt(Integer::parseInt)
            .toArray();
        int target = Integer.parseInt(br.readLine().trim());
        int[] ans = solveTwoSum(nums, target);
        System.out.println(ans[0] + " " + ans[1]);
    }
}`,
        },
    },
    {
        title: 'Valid Parentheses',
        description: `Given a string containing only the characters (), {}, and [], determine whether the input string is valid.

A string is valid if every opening bracket has a matching closing bracket of the same type and the brackets close in the correct order.

Input format:
- Single line containing the bracket string

Output format:
- Print true or false`,
        difficulty: 'EASY',
        tags: ['String', 'Stack'],
        examples: [
            { title: 'Example 1', input: '()[]{}', output: 'true' },
            { title: 'Example 2', input: '(]', output: 'false' },
        ],
        constraints: `1 <= s.length <= 10^5
s contains only the characters ()[]{}.`,
        hints: 'Use a stack and match closing brackets against the most recent opening bracket.',
        editorial:
            'Push opening brackets. When you see a closing bracket, it must match the stack top.',
        testcases: [
            { input: '()[]{}', output: 'true' },
            { input: '(]', output: 'false' },
            { input: '([{}])', output: 'true' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

bool isValid(const string& s) {
    // TODO: implement
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;
    cout << (isValid(s) ? "true" : "false");
    return 0;
}`,
            python: `def is_valid(s):
    # TODO: implement
    return False


def main():
    s = input().strip()
    print("true" if is_valid(s) else "false")


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static boolean isValid(String s) {
        // TODO: implement
        return false;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine().trim();
        System.out.println(isValid(s) ? "true" : "false");
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

bool isValid(const string& s) {
    unordered_map<char, char> closing = {{')', '('}, {'}', '{'}, {']', '['}};
    stack<char> st;
    for (char ch : s) {
        if (!closing.count(ch)) {
            st.push(ch);
            continue;
        }
        if (st.empty() || st.top() != closing[ch]) {
            return false;
        }
        st.pop();
    }
    return st.empty();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;
    cout << (isValid(s) ? "true" : "false");
    return 0;
}`,
            python: `def is_valid(s):
    closing = {')': '(', '}': '{', ']': '['}
    stack = []
    for ch in s:
        if ch not in closing:
            stack.append(ch)
            continue
        if not stack or stack[-1] != closing[ch]:
            return False
        stack.pop()
    return not stack


def main():
    s = input().strip()
    print("true" if is_valid(s) else "false")


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static boolean isValid(String s) {
        Map<Character, Character> closing = new HashMap<>();
        closing.put(')', '(');
        closing.put('}', '{');
        closing.put(']', '[');
        Deque<Character> stack = new ArrayDeque<>();

        for (char ch : s.toCharArray()) {
            if (!closing.containsKey(ch)) {
                stack.push(ch);
                continue;
            }
            if (stack.isEmpty() || stack.peek() != closing.get(ch)) {
                return false;
            }
            stack.pop();
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine().trim();
        System.out.println(isValid(s) ? "true" : "false");
    }
}`,
        },
    },
    {
        title: 'Maximum Subarray',
        description: `Given an integer array, find the contiguous subarray with the largest sum and print that sum.

Input format:
- First line: integer n
- Second line: n space separated integers

Output format:
- Maximum subarray sum`,
        difficulty: 'MEDIUM',
        tags: ['Array', 'Dynamic Programming'],
        examples: [
            {
                title: 'Example 1',
                input: `9
-2 1 -3 4 -1 2 1 -5 4`,
                output: '6',
                explanation: 'The subarray [4, -1, 2, 1] has sum 6.',
            },
            { title: 'Example 2', input: `1\n1`, output: '1' },
        ],
        constraints: `1 <= n <= 2 * 10^5
-10^4 <= nums[i] <= 10^4`,
        hints: 'Track the best subarray ending at each position.',
        editorial: 'Kadane’s algorithm keeps a rolling best prefix and works in linear time.',
        testcases: [
            { input: `9\n-2 1 -3 4 -1 2 1 -5 4`, output: '6' },
            { input: `5\n5 4 -1 7 8`, output: '23' },
            { input: `1\n-3`, output: '-3' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

long long maxSubarraySum(const vector<long long>& nums) {
    // TODO: implement
    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<long long> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    cout << maxSubarraySum(nums);
    return 0;
}`,
            python: `def max_subarray_sum(nums):
    # TODO: implement
    return 0


def main():
    _ = int(input().strip())
    nums = list(map(int, input().split()))
    print(max_subarray_sum(nums))


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static long maxSubarraySum(long[] nums) {
        // TODO: implement
        return 0L;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        long[] nums = Arrays.stream(br.readLine().trim().split("\\\\s+"))
            .mapToLong(Long::parseLong)
            .toArray();
        System.out.println(maxSubarraySum(nums));
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

long long maxSubarraySum(const vector<long long>& nums) {
    long long best = nums[0];
    long long current = nums[0];
    for (int i = 1; i < (int)nums.size(); ++i) {
        current = max(nums[i], current + nums[i]);
        best = max(best, current);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<long long> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    cout << maxSubarraySum(nums);
    return 0;
}`,
            python: `def max_subarray_sum(nums):
    best = nums[0]
    current = nums[0]
    for num in nums[1:]:
        current = max(num, current + num)
        best = max(best, current)
    return best


def main():
    _ = int(input().strip())
    nums = list(map(int, input().split()))
    print(max_subarray_sum(nums))


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static long maxSubarraySum(long[] nums) {
        long best = nums[0];
        long current = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        long[] nums = Arrays.stream(br.readLine().trim().split("\\\\s+"))
            .mapToLong(Long::parseLong)
            .toArray();
        System.out.println(maxSubarraySum(nums));
    }
}`,
        },
    },
    {
        title: 'Search in Rotated Sorted Array',
        description: `You are given a rotated sorted array with distinct integers and a target value. Print the index of the target or -1 if it does not exist.

Input format:
- First line: integer n
- Second line: n space separated integers
- Third line: target integer

Output format:
- Zero-based index of the target, or -1`,
        difficulty: 'MEDIUM',
        tags: ['Array', 'Binary Search'],
        examples: [
            {
                title: 'Example 1',
                input: `7
4 5 6 7 0 1 2
0`,
                output: '4',
            },
            {
                title: 'Example 2',
                input: `7
4 5 6 7 0 1 2
3`,
                output: '-1',
            },
        ],
        constraints: `1 <= n <= 10^5
-10^9 <= nums[i], target <= 10^9
All values in nums are distinct.`,
        hints: 'At each step one half of the array is still sorted.',
        editorial:
            'Use binary search and determine whether the left or right half is sorted before discarding one side.',
        testcases: [
            { input: `7\n4 5 6 7 0 1 2\n0`, output: '4' },
            { input: `7\n4 5 6 7 0 1 2\n3`, output: '-1' },
            { input: `1\n1\n0`, output: '-1' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int searchRotated(const vector<int>& nums, int target) {
    // TODO: implement
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    int target;
    cin >> target;
    cout << searchRotated(nums, target);
    return 0;
}`,
            python: `def search_rotated(nums, target):
    # TODO: implement
    return -1


def main():
    _ = int(input().strip())
    nums = list(map(int, input().split()))
    target = int(input().strip())
    print(search_rotated(nums, target))


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static int searchRotated(int[] nums, int target) {
        // TODO: implement
        return -1;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[] nums = Arrays.stream(br.readLine().trim().split("\\\\s+"))
            .mapToInt(Integer::parseInt)
            .toArray();
        int target = Integer.parseInt(br.readLine().trim());
        System.out.println(searchRotated(nums, target));
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int searchRotated(const vector<int>& nums, int target) {
    int left = 0;
    int right = (int)nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;

        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    int target;
    cin >> target;
    cout << searchRotated(nums, target);
    return 0;
}`,
            python: `def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1


def main():
    _ = int(input().strip())
    nums = list(map(int, input().split()))
    target = int(input().strip())
    print(search_rotated(nums, target))


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static int searchRotated(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;

            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int[] nums = Arrays.stream(br.readLine().trim().split("\\\\s+"))
            .mapToInt(Integer::parseInt)
            .toArray();
        int target = Integer.parseInt(br.readLine().trim());
        System.out.println(searchRotated(nums, target));
    }
}`,
        },
    },
    {
        title: 'Longest Substring Without Repeating Characters',
        description: `Given a string s, print the length of the longest substring without repeating characters.

Input format:
- Single line containing s

Output format:
- Integer length of the answer`,
        difficulty: 'MEDIUM',
        tags: ['String', 'Hash Table', 'Sliding Window'],
        examples: [
            { title: 'Example 1', input: 'abcabcbb', output: '3' },
            { title: 'Example 2', input: 'bbbbb', output: '1' },
        ],
        constraints: `0 <= s.length <= 10^5
s consists of printable ASCII characters.`,
        hints: 'Maintain a moving window and the last index of each character.',
        editorial:
            'A sliding window lets you move the left pointer only when a duplicate enters the window.',
        testcases: [
            { input: 'abcabcbb', output: '3' },
            { input: 'bbbbb', output: '1' },
            { input: 'pwwkew', output: '3' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int longestUniqueSubstring(const string& s) {
    // TODO: implement
    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    getline(cin, s);
    cout << longestUniqueSubstring(s);
    return 0;
}`,
            python: `def longest_unique_substring(s):
    # TODO: implement
    return 0


def main():
    s = input()
    print(longest_unique_substring(s))


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static int longestUniqueSubstring(String s) {
        // TODO: implement
        return 0;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        System.out.println(longestUniqueSubstring(s));
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int longestUniqueSubstring(const string& s) {
    unordered_map<char, int> lastSeen;
    int left = 0;
    int best = 0;
    for (int right = 0; right < (int)s.size(); ++right) {
        if (lastSeen.count(s[right])) {
            left = max(left, lastSeen[s[right]] + 1);
        }
        lastSeen[s[right]] = right;
        best = max(best, right - left + 1);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    getline(cin, s);
    cout << longestUniqueSubstring(s);
    return 0;
}`,
            python: `def longest_unique_substring(s):
    last_seen = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in last_seen:
            left = max(left, last_seen[ch] + 1)
        last_seen[ch] = right
        best = max(best, right - left + 1)
    return best


def main():
    s = input()
    print(longest_unique_substring(s))


if __name__ == "__main__":
    main()
`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static int longestUniqueSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            if (lastSeen.containsKey(ch)) {
                left = Math.max(left, lastSeen.get(ch) + 1);
            }
            lastSeen.put(ch, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        System.out.println(longestUniqueSubstring(s));
    }
}`,
        },
    },
]
