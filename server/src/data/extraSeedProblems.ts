type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

type Testcase = {
    input: string
    output: string
}

type ProblemTemplate = {
    key: keyof typeof pythonSolutions
    title: string
    difficulty: Difficulty
    tags: string[]
    description: string
    constraints: string
    hints: string
    editorial: string
    testcases: Testcase[]
}

const starterPython = `def main():
    # Write your solution here.
    pass


if __name__ == "__main__":
    main()
`

const starterCpp = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Write your solution here.
    return 0;
}`

const starterJava = `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Write your solution here.
    }
}`

const pythonSolutions = {
    sumArray: `def main():
    n = int(input().strip())
    nums = list(map(int, input().split())) if n else []
    print(sum(nums))


if __name__ == "__main__":
    main()
`,
    maxArray: `def main():
    n = int(input().strip())
    nums = list(map(int, input().split()))
    print(max(nums))


if __name__ == "__main__":
    main()
`,
    secondLargest: `def main():
    n = int(input().strip())
    nums = list(map(int, input().split()))
    unique_nums = sorted(set(nums))
    print(unique_nums[-2] if len(unique_nums) >= 2 else -1)


if __name__ == "__main__":
    main()
`,
    binarySearch: `def main():
    n = int(input().strip())
    nums = list(map(int, input().split()))
    target = int(input().strip())
    left, right = 0, n - 1
    answer = -1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            answer = mid
            break
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    print(answer)


if __name__ == "__main__":
    main()
`,
    missingNumber: `def main():
    n = int(input().strip())
    nums = list(map(int, input().split())) if n > 1 else []
    expected = n * (n + 1) // 2
    print(expected - sum(nums))


if __name__ == "__main__":
    main()
`,
    validAnagram: `def main():
    first = input().strip()
    second = input().strip()
    print("true" if sorted(first) == sorted(second) else "false")


if __name__ == "__main__":
    main()
`,
    countWords: `def main():
    line = input().strip()
    print(0 if not line else len(line.split()))


if __name__ == "__main__":
    main()
`,
    gcd: `import math


def main():
    a, b = map(int, input().split())
    print(math.gcd(a, b))


if __name__ == "__main__":
    main()
`,
    fibonacci: `def main():
    n = int(input().strip())
    if n <= 1:
        print(n)
        return
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    print(b)


if __name__ == "__main__":
    main()
`,
    prefixSumQueries: `def main():
    n = int(input().strip())
    nums = list(map(int, input().split()))
    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)
    q = int(input().strip())
    answers = []
    for _ in range(q):
        left, right = map(int, input().split())
        answers.append(str(prefix[right + 1] - prefix[left]))
    print("\\n".join(answers))


if __name__ == "__main__":
    main()
`,
} as const

const cppSolutions: Record<keyof typeof pythonSolutions, string> = {
    sumArray: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    long long total = 0;
    for (int i = 0; i < n; ++i) {
        long long value;
        cin >> value;
        total += value;
    }
    cout << total;
    return 0;
}`,
    maxArray: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    long long answer = LLONG_MIN;
    for (int i = 0; i < n; ++i) {
        long long value;
        cin >> value;
        answer = max(answer, value);
    }
    cout << answer;
    return 0;
}`,
    secondLargest: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    set<long long> values;
    for (int i = 0; i < n; ++i) {
        long long value;
        cin >> value;
        values.insert(value);
    }
    if (values.size() < 2) {
        cout << -1;
        return 0;
    }
    auto it = values.end();
    --it;
    --it;
    cout << *it;
    return 0;
}`,
    binarySearch: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<long long> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    long long target;
    cin >> target;

    int left = 0;
    int right = n - 1;
    int answer = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            answer = mid;
            break;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    cout << answer;
    return 0;
}`,
    missingNumber: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    long long n;
    cin >> n;
    long long actual = 0;
    for (int i = 0; i < n - 1; ++i) {
        long long value;
        cin >> value;
        actual += value;
    }
    cout << (n * (n + 1) / 2 - actual);
    return 0;
}`,
    validAnagram: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string first, second;
    cin >> first >> second;
    sort(first.begin(), first.end());
    sort(second.begin(), second.end());
    cout << (first == second ? "true" : "false");
    return 0;
}`,
    countWords: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string line;
    getline(cin, line);
    stringstream ss(line);
    string word;
    int count = 0;
    while (ss >> word) {
        ++count;
    }
    cout << count;
    return 0;
}`,
    gcd: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    long long a, b;
    cin >> a >> b;
    cout << gcd(a, b);
    return 0;
}`,
    fibonacci: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    if (n <= 1) {
        cout << n;
        return 0;
    }
    long long a = 0;
    long long b = 1;
    for (int i = 2; i <= n; ++i) {
        long long next = a + b;
        a = b;
        b = next;
    }
    cout << b;
    return 0;
}`,
    prefixSumQueries: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<long long> prefix(n + 1, 0);
    for (int i = 0; i < n; ++i) {
        long long value;
        cin >> value;
        prefix[i + 1] = prefix[i] + value;
    }
    int q;
    cin >> q;
    for (int i = 0; i < q; ++i) {
        int left, right;
        cin >> left >> right;
        cout << prefix[right + 1] - prefix[left];
        if (i + 1 < q) cout << '\\n';
    }
    return 0;
}`,
}

const javaSolutions: Record<keyof typeof pythonSolutions, string> = {
    sumArray: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long total = 0;
        for (int i = 0; i < n; i++) {
            total += sc.nextLong();
        }
        System.out.print(total);
    }
}`,
    maxArray: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long answer = Long.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            answer = Math.max(answer, sc.nextLong());
        }
        System.out.print(answer);
    }
}`,
    secondLargest: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeSet<Long> values = new TreeSet<>();
        for (int i = 0; i < n; i++) {
            values.add(sc.nextLong());
        }
        if (values.size() < 2) {
            System.out.print(-1);
            return;
        }
        values.pollLast();
        System.out.print(values.last());
    }
}`,
    binarySearch: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] nums = new long[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextLong();
        }
        long target = sc.nextLong();
        int left = 0;
        int right = n - 1;
        int answer = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                answer = mid;
                break;
            }
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        System.out.print(answer);
    }
}`,
    missingNumber: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        long actual = 0;
        for (int i = 0; i < n - 1; i++) {
            actual += sc.nextLong();
        }
        System.out.print(n * (n + 1) / 2 - actual);
    }
}`,
    validAnagram: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        char[] first = br.readLine().trim().toCharArray();
        char[] second = br.readLine().trim().toCharArray();
        Arrays.sort(first);
        Arrays.sort(second);
        System.out.print(Arrays.equals(first, second) ? "true" : "false");
    }
}`,
    countWords: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.print(0);
            return;
        }
        System.out.print(line.trim().split("\\\\s+").length);
    }
}`,
    gcd: `import java.io.*;
import java.util.*;

public class Main {
    static long gcd(long a, long b) {
        while (b != 0) {
            long next = a % b;
            a = b;
            b = next;
        }
        return Math.abs(a);
    }

    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.print(gcd(a, b));
    }
}`,
    fibonacci: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n <= 1) {
            System.out.print(n);
            return;
        }
        long a = 0;
        long b = 1;
        for (int i = 2; i <= n; i++) {
            long next = a + b;
            a = b;
            b = next;
        }
        System.out.print(b);
    }
}`,
    prefixSumQueries: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + sc.nextLong();
        }
        int q = sc.nextInt();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < q; i++) {
            int left = sc.nextInt();
            int right = sc.nextInt();
            if (i > 0) out.append('\\n');
            out.append(prefix[right + 1] - prefix[left]);
        }
        System.out.print(out);
    }
}`,
}

const templateMeta = {
    sumArray: {
        tags: ['Array', 'Math'],
        constraints: `1 <= n <= 10^5
-10^9 <= nums[i] <= 10^9`,
        hints: 'Accumulate every number once.',
        editorial: 'A single pass over the array is enough because addition is associative.',
        testcases: [
            { input: `5\n1 2 3 4 5`, output: '15' },
            { input: `4\n-2 7 0 5`, output: '10' },
            { input: `1\n42`, output: '42' },
            { input: `6\n10 -10 20 -20 30 -30`, output: '0' },
            { input: `3\n1000000000 1000000000 -1`, output: '1999999999' },
            { input: `8\n3 3 3 3 3 3 3 3`, output: '24' },
        ],
    },
    maxArray: {
        tags: ['Array'],
        constraints: `1 <= n <= 10^5
-10^9 <= nums[i] <= 10^9`,
        hints: 'Keep the largest value seen so far.',
        editorial: 'Scan the array and update the answer whenever a larger value appears.',
        testcases: [
            { input: `5\n1 9 2 8 3`, output: '9' },
            { input: `4\n-7 -3 -10 -1`, output: '-1' },
            { input: `1\n5`, output: '5' },
            { input: `6\n4 4 4 4 4 4`, output: '4' },
            { input: `5\n100 -1 50 75 99`, output: '100' },
            { input: `3\n-1000000000 0 1000000000`, output: '1000000000' },
        ],
    },
    secondLargest: {
        tags: ['Array', 'Sorting'],
        constraints: `1 <= n <= 10^5
-10^9 <= nums[i] <= 10^9`,
        hints: 'Duplicate values should not count as a different largest value.',
        editorial: 'Track distinct values or sort the unique set, then take the second last value.',
        testcases: [
            { input: `5\n4 1 7 3 7`, output: '4' },
            { input: `3\n5 5 5`, output: '-1' },
            { input: `2\n1 2`, output: '1' },
            { input: `6\n-5 -1 -3 -2 -1 -4`, output: '-2' },
            { input: `7\n10 20 30 40 50 60 70`, output: '60' },
            { input: `4\n100 99 100 98`, output: '99' },
        ],
    },
    binarySearch: {
        tags: ['Array', 'Binary Search'],
        constraints: `1 <= n <= 10^5
-10^9 <= nums[i], target <= 10^9
The array is sorted in non-decreasing order.`,
        hints: 'Compare the target with the middle element.',
        editorial: 'Binary search halves the remaining search range after every comparison.',
        testcases: [
            { input: `5\n1 3 5 7 9\n7`, output: '3' },
            { input: `5\n1 3 5 7 9\n2`, output: '-1' },
            { input: `1\n10\n10`, output: '0' },
            { input: `6\n-5 -2 0 4 8 12\n-5`, output: '0' },
            { input: `6\n-5 -2 0 4 8 12\n12`, output: '5' },
            { input: `4\n2 4 6 8\n10`, output: '-1' },
        ],
    },
    missingNumber: {
        tags: ['Array', 'Math'],
        constraints: `2 <= n <= 10^5
The input contains n - 1 distinct integers from 1 to n.`,
        hints: 'Compare the expected sum with the actual sum.',
        editorial: 'The missing value is n * (n + 1) / 2 minus the sum of the provided values.',
        testcases: [
            { input: `5\n1 2 4 5`, output: '3' },
            { input: `2\n1`, output: '2' },
            { input: `6\n2 3 4 5 6`, output: '1' },
            { input: `7\n1 2 3 4 5 6`, output: '7' },
            { input: `10\n1 2 3 5 6 7 8 9 10`, output: '4' },
            { input: `4\n4 2 1`, output: '3' },
        ],
    },
    validAnagram: {
        tags: ['String', 'Hash Table', 'Sorting'],
        constraints: `1 <= s.length, t.length <= 10^5
Strings contain lowercase English letters.`,
        hints: 'Two anagrams have the same character counts.',
        editorial: 'Sort both strings or compare frequency maps.',
        testcases: [
            { input: `listen\nsilent`, output: 'true' },
            { input: `rat\ncar`, output: 'false' },
            { input: `a\na`, output: 'true' },
            { input: `abcd\nabc`, output: 'false' },
            { input: `anagram\nnagaram`, output: 'true' },
            { input: `hello\nbello`, output: 'false' },
        ],
    },
    countWords: {
        tags: ['String'],
        constraints: `0 <= line.length <= 10^5
Words are separated by one or more spaces.`,
        hints: 'Split the trimmed line on whitespace.',
        editorial: 'After trimming, the number of whitespace-separated tokens is the answer.',
        testcases: [
            { input: 'hello world', output: '2' },
            { input: 'campus lab practice', output: '3' },
            { input: 'single', output: '1' },
            { input: 'many small words in this sentence', output: '6' },
            { input: '   spaced   out   words   ', output: '3' },
            { input: '', output: '0' },
        ],
    },
    gcd: {
        tags: ['Math', 'Number Theory'],
        constraints: `1 <= a, b <= 10^9`,
        hints: 'Use Euclid’s algorithm.',
        editorial: 'Repeatedly replace the larger number by its remainder until one value becomes zero.',
        testcases: [
            { input: '12 18', output: '6' },
            { input: '17 13', output: '1' },
            { input: '100 10', output: '10' },
            { input: '81 27', output: '27' },
            { input: '270 192', output: '6' },
            { input: '1000000000 500000000', output: '500000000' },
        ],
    },
    fibonacci: {
        tags: ['Math', 'Dynamic Programming'],
        constraints: `0 <= n <= 45`,
        hints: 'Build the sequence from the first two values.',
        editorial: 'Iterative dynamic programming avoids exponential recursion.',
        testcases: [
            { input: '0', output: '0' },
            { input: '1', output: '1' },
            { input: '2', output: '1' },
            { input: '7', output: '13' },
            { input: '10', output: '55' },
            { input: '20', output: '6765' },
        ],
    },
    prefixSumQueries: {
        tags: ['Array', 'Prefix Sum'],
        constraints: `1 <= n, q <= 10^5
-10^9 <= nums[i] <= 10^9
0 <= left <= right < n`,
        hints: 'Store the sum before each index.',
        editorial: 'A prefix sum array answers each range sum as prefix[right + 1] - prefix[left].',
        testcases: [
            { input: `5\n1 2 3 4 5\n3\n0 2\n1 3\n2 4`, output: `6\n9\n12` },
            { input: `4\n-1 5 -2 3\n2\n0 3\n1 2`, output: `5\n3` },
            { input: `1\n10\n1\n0 0`, output: '10' },
            { input: `6\n2 2 2 2 2 2\n2\n0 5\n3 3`, output: `12\n2` },
            { input: `5\n10 -10 20 -20 30\n2\n0 1\n2 4`, output: `0\n30` },
            { input: `3\n1000000000 1000000000 1000000000\n1\n0 2`, output: '3000000000' },
        ],
    },
} as const

const variants: ProblemTemplate[] = [
    ...[
        ['sumArray', 'Array Sum Basics', 'Print the sum of all integers in the array.'],
        ['sumArray', 'Total Score Calculator', 'Given student scores, print the total score.'],
        ['sumArray', 'Net Balance After Transactions', 'Given signed transactions, print the final balance.'],
        ['sumArray', 'Daily Step Counter Total', 'Given daily step counts, print the weekly total.'],
        ['sumArray', 'Warehouse Item Count', 'Given counts from shelves, print the total inventory.'],
        ['maxArray', 'Find the Maximum Element', 'Print the largest integer in the array.'],
        ['maxArray', 'Highest Exam Score', 'Given exam scores, print the highest score.'],
        ['maxArray', 'Peak Temperature Reading', 'Given temperature readings, print the maximum reading.'],
        ['maxArray', 'Largest Donation Amount', 'Given donation amounts, print the largest donation.'],
        ['maxArray', 'Maximum Stock Price', 'Given stock prices, print the maximum price.'],
        ['secondLargest', 'Second Largest Distinct Number', 'Print the second largest distinct value, or -1 if it does not exist.'],
        ['secondLargest', 'Runner Up Score', 'Given scores, print the runner up distinct score.'],
        ['secondLargest', 'Second Highest Bid', 'Given auction bids, print the second highest distinct bid.'],
        ['secondLargest', 'Second Tallest Building', 'Given building heights, print the second tallest distinct height.'],
        ['secondLargest', 'Backup Server Capacity', 'Given capacities, print the second largest distinct capacity.'],
        ['binarySearch', 'Binary Search Index', 'Given a sorted array and target, print the target index or -1.'],
        ['binarySearch', 'Find Roll Number', 'Given sorted roll numbers, print the index of a queried roll number.'],
        ['binarySearch', 'Locate Book ID', 'Given sorted book IDs, print the index of a requested ID.'],
        ['binarySearch', 'Search Price Point', 'Given sorted prices, print the index of the target price.'],
        ['binarySearch', 'Find Sensor Reading', 'Given sorted readings, print the index of the target reading.'],
        ['missingNumber', 'Missing Number from One to N', 'One number from 1 to n is missing. Print it.'],
        ['missingNumber', 'Missing Attendance Roll', 'Given present roll numbers from 1 to n, print the absent roll number.'],
        ['missingNumber', 'Missing Ticket ID', 'Given issued ticket IDs from 1 to n except one, print the missing ID.'],
        ['missingNumber', 'Lost Page Number', 'Given page numbers from 1 to n except one, print the lost page number.'],
        ['missingNumber', 'Skipped Queue Token', 'Given queue tokens from 1 to n except one, print the skipped token.'],
        ['validAnagram', 'Valid Anagram', 'Print true if the two strings are anagrams, otherwise false.'],
        ['validAnagram', 'Scrambled Word Check', 'Print true if the second word is a rearrangement of the first.'],
        ['validAnagram', 'Inventory Label Match', 'Print true if two labels use exactly the same letters.'],
        ['validAnagram', 'Password Rearrangement', 'Print true if two lowercase passwords are rearrangements.'],
        ['validAnagram', 'Anagram Pair Validator', 'Validate whether two lowercase words are an anagram pair.'],
        ['countWords', 'Count Words in a Sentence', 'Print the number of words in the given line.'],
        ['countWords', 'Message Word Counter', 'Given a chat message, print its word count.'],
        ['countWords', 'Article Title Word Count', 'Given a title line, print how many words it has.'],
        ['countWords', 'Search Query Token Count', 'Given a search query, print the number of tokens.'],
        ['countWords', 'Announcement Word Count', 'Given an announcement line, print its word count.'],
        ['gcd', 'Greatest Common Divisor', 'Given two integers, print their greatest common divisor.'],
        ['gcd', 'Largest Equal Ribbon Length', 'Given two ribbon lengths, print the largest equal cutting length.'],
        ['gcd', 'Common Package Size', 'Given two item counts, print the greatest common package size.'],
        ['gcd', 'Shared Training Cycle', 'Given two cycle lengths, print their greatest common cycle.'],
        ['gcd', 'Simplify Ratio Helper', 'Given two ratio values, print their greatest common divisor.'],
        ['fibonacci', 'Nth Fibonacci Number', 'Print the nth Fibonacci number using zero-based indexing.'],
        ['fibonacci', 'Climbing Pattern Count', 'For this sequence task, print the nth Fibonacci value.'],
        ['fibonacci', 'Rabbit Sequence Term', 'Print the nth term of the Fibonacci sequence.'],
        ['fibonacci', 'Dynamic Sequence Value', 'Given n, print the nth value where f(0)=0, f(1)=1.'],
        ['fibonacci', 'Fibonacci Practice Drill', 'Compute the nth Fibonacci number iteratively.'],
        ['prefixSumQueries', 'Range Sum Queries', 'Answer each inclusive range sum query on the array.'],
        ['prefixSumQueries', 'Score Segment Sum', 'Given scores and queries, print each segment sum.'],
        ['prefixSumQueries', 'Transaction Range Totals', 'Given transactions and queries, print each range total.'],
        ['prefixSumQueries', 'Temperature Window Sum', 'Given readings and windows, print each window sum.'],
        ['prefixSumQueries', 'Prefix Sum Practice', 'Use prefix sums to answer multiple range sum queries.'],
        ['sumArray', 'Total Marks Aggregator', 'Given marks from several subjects, print the total marks.'],
        ['sumArray', 'Monthly Expense Total', 'Given expenses for a month, print the total expense.'],
        ['sumArray', 'Team Points Sum', 'Given points scored by players, print the team total.'],
        ['sumArray', 'Class Attendance Total', 'Given attendance counts from sections, print the total attendance.'],
        ['sumArray', 'Store Revenue Sum', 'Given daily revenues, print the total revenue.'],
        ['maxArray', 'Best Quiz Score', 'Given quiz scores, print the best score.'],
        ['maxArray', 'Maximum Battery Level', 'Given battery readings, print the maximum level.'],
        ['maxArray', 'Largest File Size', 'Given file sizes, print the largest size.'],
        ['maxArray', 'Highest Vote Count', 'Given vote counts, print the highest count.'],
        ['maxArray', 'Maximum Route Distance', 'Given route distances, print the maximum distance.'],
        ['secondLargest', 'Second Best Quiz Score', 'Given quiz scores, print the second highest distinct score.'],
        ['secondLargest', 'Second Largest File Size', 'Given file sizes, print the second largest distinct size.'],
        ['secondLargest', 'Second Highest Vote Count', 'Given vote counts, print the second highest distinct count.'],
        ['secondLargest', 'Second Maximum Route Distance', 'Given route distances, print the second largest distinct distance.'],
        ['secondLargest', 'Second Largest Inventory Batch', 'Given batch sizes, print the second largest distinct batch size.'],
        ['binarySearch', 'Search Student Rank', 'Given sorted ranks, print the index of the requested rank.'],
        ['binarySearch', 'Find Train Platform', 'Given sorted platform numbers, print the index of a requested platform.'],
        ['binarySearch', 'Locate Appointment Slot', 'Given sorted slot IDs, print the index of the requested slot.'],
        ['binarySearch', 'Find Product Code', 'Given sorted product codes, print the index of the target code.'],
        ['binarySearch', 'Search Classroom Number', 'Given sorted classroom numbers, print the index of the target room.'],
        ['missingNumber', 'Missing Lab Seat', 'Given occupied lab seats from 1 to n except one, print the missing seat.'],
        ['missingNumber', 'Missing Submission ID', 'Given submission IDs from 1 to n except one, print the missing ID.'],
        ['missingNumber', 'Missing Locker Number', 'Given locker numbers from 1 to n except one, print the missing number.'],
        ['missingNumber', 'Missing Certificate Number', 'Given certificate numbers from 1 to n except one, print the missing number.'],
        ['missingNumber', 'Missing Bus Stop ID', 'Given bus stop IDs from 1 to n except one, print the missing ID.'],
        ['validAnagram', 'Course Code Anagram', 'Print true if two course-code strings are anagrams.'],
        ['validAnagram', 'Name Badge Letter Check', 'Print true if two badge strings contain the same letters.'],
        ['validAnagram', 'Sorted Letters Match', 'Print true when two strings become equal after sorting letters.'],
        ['validAnagram', 'Reordered Username Check', 'Print true if one username is a reorder of the other.'],
        ['validAnagram', 'Library Tag Anagram', 'Print true if two library tags are anagrams.'],
        ['countWords', 'Feedback Word Count', 'Given a feedback line, print its word count.'],
        ['countWords', 'Resume Summary Word Count', 'Given a resume summary line, print its word count.'],
        ['countWords', 'Event Description Word Count', 'Given an event description, print the number of words.'],
        ['countWords', 'Notification Word Count', 'Given a notification message, print its word count.'],
        ['countWords', 'Question Prompt Word Count', 'Given a prompt line, print how many words it contains.'],
        ['gcd', 'Greatest Shared Group Size', 'Given two class sizes, print the greatest equal group size.'],
        ['gcd', 'Common Interval Finder', 'Given two intervals, print their greatest common interval.'],
        ['gcd', 'Largest Tile Size', 'Given two side lengths, print the largest square tile size.'],
        ['gcd', 'Shared Batch Divider', 'Given two batch counts, print the greatest common divider.'],
        ['gcd', 'Common Measurement Unit', 'Given two measurements, print their greatest common unit.'],
        ['fibonacci', 'Fibonacci Index Query', 'Given n, print the Fibonacci value at that index.'],
        ['fibonacci', 'Growth Sequence Term', 'Print the nth term of the Fibonacci-style growth sequence.'],
        ['fibonacci', 'DP Warmup Fibonacci', 'Solve the Fibonacci warmup using iteration.'],
        ['fibonacci', 'Sequence Milestone Value', 'Given n, print the nth milestone value in the Fibonacci sequence.'],
        ['fibonacci', 'Memoization Drill Output', 'Print the nth Fibonacci number for the drill input.'],
        ['prefixSumQueries', 'Attendance Range Sum', 'Given attendance counts and ranges, print each range sum.'],
        ['prefixSumQueries', 'Revenue Window Total', 'Given revenues and query windows, print each window total.'],
        ['prefixSumQueries', 'Marks Range Queries', 'Given marks and queries, print each queried range sum.'],
        ['prefixSumQueries', 'Inventory Segment Totals', 'Given inventory counts and ranges, print each segment total.'],
        ['prefixSumQueries', 'Prefix Query Challenge', 'Answer all inclusive range sum queries efficiently.'],
    ].map(([key, title, description]) => {
        const meta = templateMeta[key as keyof typeof templateMeta]
        const difficulty: Difficulty =
            key === 'prefixSumQueries' || key === 'secondLargest' ? 'MEDIUM' : 'EASY'

        return {
            key: key as keyof typeof pythonSolutions,
            title,
            difficulty,
            tags: [...meta.tags],
            description: `${description}

Input format:
- Follow the format shown in the examples for this problem.

Output format:
- Print the required answer exactly as specified.`,
            constraints: meta.constraints,
            hints: meta.hints,
            editorial: meta.editorial,
            testcases: [...meta.testcases],
        }
    }),
]

export const extraSeedProblems = variants.map((problem) => ({
    title: problem.title,
    description: problem.description,
    difficulty: problem.difficulty,
    tags: problem.tags,
    examples: problem.testcases.slice(0, 2).map((testcase, index) => ({
        title: `Example ${index + 1}`,
        input: testcase.input,
        output: testcase.output,
    })),
    constraints: problem.constraints,
    hints: problem.hints,
    editorial: problem.editorial,
    testcases: problem.testcases,
    codesnippets: {
        cpp: starterCpp,
        python: starterPython,
        java: starterJava,
    },
    referneceSolution: {
        cpp: cppSolutions[problem.key],
        python: pythonSolutions[problem.key],
        java: javaSolutions[problem.key],
    },
}))
