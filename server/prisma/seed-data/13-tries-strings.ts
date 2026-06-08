import type { SeedProblem } from './types.js'

export const triesStringsProblems: SeedProblem[] = [
    // ==================== EASY #1: Longest Common Prefix ====================
    {
        title: 'Longest Common Prefix',
        description:
            'Write a program to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string.\n\n**Input Format:**\n- First line: integer n, the number of strings.\n- Next n lines: each containing a string s_i.\n\n**Output Format:**\n- The longest common prefix. If there is no common prefix, output an empty line.',
        difficulty: 'EASY',
        tags: ['trie', 'strings'],
        constraints:
            '1 <= n <= 1000\n1 <= |s_i| <= 1000\ns_i consists only of lowercase English letters.',
        hints: 'You can compare characters index by index across all strings, or insert them into a Trie and find the common path.',
        editorial:
            '**Approach: Character by Character Comparison**\n\nCompare the characters of all strings at each index until a mismatch is found or any string is exhausted.\n\n**Time Complexity:** O(N * L) where N is the number of strings and L is the length of the shortest string.\n**Space Complexity:** O(1).',
        examples: [
            {
                title: 'Example 1',
                input: '3\nflower\nflow\nflight',
                output: 'fl',
                explanation: "The longest common prefix is 'fl'.",
            },
            {
                title: 'Example 2',
                input: '3\ndog\nracecar\ncar',
                output: '',
                explanation: 'There is no common prefix among the input strings.',
            },
        ],
        testcases: [
            { input: '3\nflower\nflow\nflight', output: 'fl' },
            { input: '3\ndog\nracecar\ncar', output: '' },
            { input: '1\napple', output: 'apple' },
            { input: '4\nabc\nabcde\nab\nabcd', output: 'ab' },
            { input: '3\napple\nbanana\ncherry', output: '' },
            { input: '2\nsame\nsame', output: 'same' },
            { input: '5\na\na\na\na\na', output: 'a' },
            { input: '2\npre\nprefix', output: 'pre' },
            { input: '3\nxyz\nxy\nx', output: 'x' },
            { input: '4\ninterspecies\ninterstellar\ninterstate\ninterest', output: 'inter' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        vector<string> strs(n);
        for (int i = 0; i < n; i++) {
            cin >> strs[i];
        }
        // Solve and print the longest common prefix
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    n = int(lines[0].strip())
    strs = [lines[i].strip() for i in range(1, n+1)]
    # Solve and print longest common prefix
    pass

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
        String[] strs = new String[n];
        for (int i = 0; i < n; i++) {
            strs[i] = br.readLine().trim();
        }
        // Solve and print longest common prefix
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        // Read lines and solve
    }
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
    vector<string> s(n);
    for (int i = 0; i < n; i++) cin >> s[i];
    if (n == 0) {
        cout << "\n";
        return 0;
    }
    string pref = s[0];
    for (int i = 1; i < n; i++) {
        while (s[i].find(pref) != 0) {
            pref = pref.substr(0, pref.length() - 1);
            if (pref.empty()) break;
        }
    }
    cout << pref << "\n";
    return 0;
}`,
            python: `import sys
def main():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    n = int(lines[0].strip())
    strings = [lines[i].strip() for i in range(1, n+1)]
    if not strings:
        print("")
        return
    pref = strings[0]
    for s in strings[1:]:
        while not s.startswith(pref):
            pref = pref[:-1]
            if not pref:
                break
    print(pref)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        String[] strings = new String[n];
        for (int i = 0; i < n; i++) {
            strings[i] = br.readLine().trim();
        }
        if (n == 0) {
            System.out.println("");
            return;
        }
        String pref = strings[0];
        for (int i = 1; i < n; i++) {
            while (!strings[i].startsWith(pref)) {
                pref = pref.substring(0, pref.length() - 1);
                if (pref.isEmpty()) break;
            }
        }
        System.out.println(pref);
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
        let mut strings = Vec::new();
        for _ in 0..n {
            if let Some(Ok(l)) = lines.next() {
                strings.push(l.trim().to_string());
            }
        }
        if strings.is_empty() {
            writeln!(out, "").unwrap();
            return;
        }
        let mut pref = strings[0].clone();
        for s in &strings[1..] {
            while !s.starts_with(&pref) {
                pref.pop();
                if pref.is_empty() {
                    break;
                }
            }
        }
        writeln!(out, "{}", pref).unwrap();
    }
}`,
        },
    },

    // ==================== EASY #2: Valid Palindrome II ====================
    {
        title: 'Valid Palindrome II',
        description:
            'Given a string s, return "true" if the s can be palindrome after deleting at most one character from it. Otherwise, return "false".\n\n**Input Format:**\n- A single line containing the string s.\n\n**Output Format:**\n- "true" if s can be a palindrome after deleting at most one character, else "false".',
        difficulty: 'EASY',
        tags: ['strings'],
        constraints: '1 <= |s| <= 10^5\ns consists of lowercase English letters.',
        hints: 'Use a two-pointer approach comparing letters from both ends. Upon mismatch, check both possible single deletions.',
        editorial:
            '**Approach: Two Pointers with Choice**\n\nStart two pointers, left = 0 and right = |s| - 1. When characters match, increment left and decrement right. If they mismatch, check if deleting s[left] or s[right] creates a palindrome. Checking either substring takes O(N) time.\n\n**Time Complexity:** O(N) where N is the length of s.\n**Space Complexity:** O(1).',
        examples: [
            {
                title: 'Example 1',
                input: 'aba',
                output: 'true',
                explanation: 'Already a palindrome.',
            },
            {
                title: 'Example 2',
                input: 'abca',
                output: 'true',
                explanation: "Deleting character 'c' results in 'aba', which is a palindrome.",
            },
        ],
        testcases: [
            { input: 'aba', output: 'true' },
            { input: 'abca', output: 'true' },
            { input: 'abc', output: 'false' },
            { input: 'a', output: 'true' },
            { input: 'ab', output: 'true' },
            { input: 'abcba', output: 'true' },
            { input: 'abccba', output: 'true' },
            { input: 'abcbca', output: 'true' },
            { input: 'teebbccbbeet', output: 'true' },
            { input: 'abcdeca', output: 'false' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    string s;
    if (cin >> s) {
        // Solve and print true or false
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    s = sys.stdin.read().strip()
    # Solve and print true or false
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        // Solve and print true or false
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read s and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
bool isPalindrome(const string& s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++;
        r--;
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        int l = 0, r = s.length() - 1;
        bool possible = true;
        while (l < r) {
            if (s[l] != s[r]) {
                possible = isPalindrome(s, l + 1, r) || isPalindrome(s, l, r - 1);
                break;
            }
            l++;
            r--;
        }
        cout << (possible ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
def is_palindrome(s, l, r):
    while l < r:
        if s[l] != s[r]:
            return False
        l += 1
        r -= 1
    return True

def main():
    s = sys.stdin.read().strip()
    if not s:
        return
    l, r = 0, len(s) - 1
    possible = True
    while l < r:
        if s[l] != s[r]:
            possible = is_palindrome(s, l + 1, r) or is_palindrome(s, l, r - 1)
            break
        l += 1
        r -= 1
    print("true" if possible else "false")

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
public class Main {
    private static boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) return false;
            l++;
            r--;
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        int l = 0, r = s.length() - 1;
        boolean possible = true;
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                possible = isPalindrome(s, l + 1, r) || isPalindrome(s, l, r - 1);
                break;
            }
            l++;
            r--;
        }
        System.out.println(possible ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn is_palindrome(s: &[u8], mut l: usize, mut r: usize) -> bool {
    while l < r {
        if s[l] != s[r] {
            return false;
        }
        l += 1;
        r -= 1;
    }
    true
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let s = line.trim().as_bytes();
        if s.is_empty() {
            return;
        }
        let mut l = 0;
        let mut r = s.len() - 1;
        let mut possible = true;
        while l < r {
            if s[l] != s[r] {
                possible = is_palindrome(s, l + 1, r) || (r > 0 && is_palindrome(s, l, r - 1));
                break;
            }
            l += 1;
            r -= 1;
        }
        if possible {
            writeln!(out, "true").unwrap();
        } else {
            writeln!(out, "false").unwrap();
        }
    }
}`,
        },
    },

    // ==================== EASY #3: Length of Last Word ====================
    {
        title: 'Length of Last Word',
        description:
            'Given a string s consisting of words and spaces, return the length of the last word in the string.\n\nA word is a maximal substring consisting of non-space characters only.\n\n**Input Format:**\n- A single line containing the string s.\n\n**Output Format:**\n- The length of the last word.',
        difficulty: 'EASY',
        tags: ['strings'],
        constraints:
            "1 <= |s| <= 10^5\ns consists of only English letters and spaces ' '.\nThere will be at least one word in s.",
        hints: 'Start scanning the string from the end. Ignore any trailing spaces, then count characters until you reach a space or the start of the string.',
        editorial:
            '**Approach: Backward Traversal**\n\nStart at index |s| - 1. Loop backward to skip all trailing spaces. Once you find a non-space character, continue backward counting each character until you hit a space or the start of the string. Return this count.\n\n**Time Complexity:** O(N) where N is the length of s.\n**Space Complexity:** O(1).',
        examples: [
            {
                title: 'Example 1',
                input: 'Hello World',
                output: '5',
                explanation: "The last word is 'World' of length 5.",
            },
            {
                title: 'Example 2',
                input: '   fly me   to   the moon  ',
                output: '4',
                explanation: "The last word is 'moon' of length 4.",
            },
        ],
        testcases: [
            { input: 'Hello World', output: '5' },
            { input: '   fly me   to   the moon  ', output: '4' },
            { input: 'luffy is still joyboy', output: '6' },
            { input: 'a', output: '1' },
            { input: 'a ', output: '1' },
            { input: ' a', output: '1' },
            { input: '   hello   ', output: '5' },
            { input: 'longestwordisthisone', output: '20' },
            { input: 'multiple   spaces   between   words', output: '5' },
            { input: 'this is a test of a very long sentence with many words indeed', output: '6' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    string s;
    if (getline(cin, s)) {
        // Solve and print the length of the last word
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    s = sys.stdin.read().strip('\\r\\n')
    # Solve and print length of the last word
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        // Solve and print length of the last word
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read the line and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (getline(cin, s)) {
        int len = 0;
        int i = s.length() - 1;
        while (i >= 0 && s[i] == ' ') i--;
        while (i >= 0 && s[i] != ' ') {
            len++;
            i--;
        }
        cout << len << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    s = sys.stdin.read().strip('\\r\\n')
    words = s.split()
    if words:
        print(len(words[-1]))
    else:
        print(0)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        int len = 0;
        int i = s.length() - 1;
        while (i >= 0 && s.charAt(i) == ' ') i--;
        while (i >= 0 && s.charAt(i) != ' ') {
            len++;
            i--;
        }
        System.out.println(len);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut s = String::new();
    if stdin.lock().read_line(&mut s).is_ok() {
        let s = s.trim_end_matches(|c| c == '\\r' || c == '\\n');
        let words: Vec<&str> = s.split_whitespace().collect();
        if let Some(last) = words.last() {
            writeln!(out, "{}", last.len()).unwrap();
        } else {
            writeln!(out, "0").unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #1: Implement Trie (Prefix Tree) ====================
    {
        title: 'Implement Trie (Prefix Tree)',
        description:
            "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.\n\nImplement a Trie with the following operations:\n- `insert <word>`: Inserts the string `word` into the trie.\n- `search <word>`: Returns `true` if the string `word` is in the trie, and `false` otherwise.\n- `startsWith <prefix>`: Returns `true` if there is a previously inserted string that has the prefix `prefix`, and `false` otherwise.\n\n**Input Format:**\n- First line: integer q, the number of operations.\n- Next q lines: each contains an operation in one of the formats:\n  - `insert <word>`\n  - `search <word>`\n  - `startsWith <prefix>`\n\n**Output Format:**\n- For each `search` and `startsWith` operation, print `true` or `false` on a new line.",
        difficulty: 'MEDIUM',
        tags: ['trie', 'prefix-tree', 'strings'],
        constraints:
            '1 <= q <= 10^5\nWords and prefixes consist of lowercase English letters.\n1 <= |word|, |prefix| <= 100',
        hints: 'Use a tree structure where each node contains an array of 26 pointers for children and a boolean flag isEnd.',
        editorial:
            "**Approach: Node Tree Representation**\n\nCreate a node structure representing characters. Each node holds an array of size 26 for children pointers pointing to downstream characters, along with an indicator flag `isEnd`. Traversal maps letters to indices (0-25) by subtracting 'a'.\n\n**Time Complexity:** O(L) per operation, where L is the word/prefix length.\n**Space Complexity:** O(U * 26) where U is the total number of unique prefixes inserted.",
        examples: [
            {
                title: 'Example 1',
                input: '5\ninsert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app\nsearch app',
                output: 'true\nfalse\ntrue\ntrue',
                explanation:
                    "Trie holds 'apple'. Searching 'apple' is true. Searching 'app' is false. StartsWith 'app' is true because 'apple' begins with 'app'. After inserting 'app', searching 'app' becomes true.",
            },
            {
                title: 'Example 2',
                input: '4\ninsert hello\nstartsWith hell\nsearch helloa\nsearch hello',
                output: 'true\nfalse\ntrue',
            },
        ],
        testcases: [
            {
                input: '5\ninsert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app\nsearch app',
                output: 'true\nfalse\ntrue\ntrue',
            },
            {
                input: '4\ninsert hello\nstartsWith hell\nsearch helloa\nsearch hello',
                output: 'true\nfalse\ntrue',
            },
            { input: '2\ninsert a\nsearch a', output: 'true' },
            { input: '2\nstartsWith a\nsearch a', output: 'false\nfalse' },
            {
                input: '6\ninsert apple\nstartsWith a\nstartsWith ap\nstartsWith app\nstartsWith appl\nstartsWith apple',
                output: 'true\ntrue\ntrue\ntrue\ntrue',
            },
            { input: '3\ninsert a\ninsert a\nsearch a', output: 'true' },
            {
                input: '8\ninsert car\ninsert card\ninsert cart\nsearch car\nsearch card\nsearch cart\nsearch cat\nstartsWith ca',
                output: 'true\ntrue\ntrue\nfalse\ntrue',
            },
            {
                input: '4\ninsert helper\nstartsWith helper\nsearch helper\nsearch help',
                output: 'true\ntrue\nfalse',
            },
            { input: '2\ninsert a\nsearch b', output: 'false' },
            {
                input: '12\ninsert abc\ninsert def\nsearch abc\nsearch def\nstartsWith ab\nstartsWith de\nsearch ab\nsearch de\nstartsWith abc\nstartsWith def\nsearch a\nsearch d',
                output: 'true\ntrue\ntrue\ntrue\nfalse\nfalse\ntrue\ntrue\nfalse\nfalse',
            },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int q;
    if (cin >> q) {
        // Handle operations
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    # Implement Trie and process input operations
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Parse operations and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    bool isEnd = false;
    TrieNode* children[26] = {nullptr};
};
class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    void insert(const string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
        }
        curr->isEnd = true;
    }
    bool search(const string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return curr->isEnd;
    }
    bool startsWith(const string& prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return true;
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    if (!(cin >> q)) return 0;
    Trie trie;
    for (int i = 0; i < q; i++) {
        string op, arg;
        cin >> op >> arg;
        if (op == "insert") {
            trie.insert(arg);
        } else if (op == "search") {
            cout << (trie.search(arg) ? "true" : "false") << "\n";
        } else if (op == "startsWith") {
            cout << (trie.startsWith(arg) ? "true" : "false") << "\n";
        }
    }
    return 0;
}`,
            python: `import sys
class TrieNode:
    def __init__(self):
        self.is_end = False
        self.children = {}

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str):
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.is_end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for c in word:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return curr.is_end

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for c in prefix:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return True

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    q = int(data[0])
    trie = Trie()
    idx = 1
    out = []
    for _ in range(q):
        if idx >= len(data):
            break
        op = data[idx]
        arg = data[idx+1]
        idx += 2
        if op == "insert":
            trie.insert(arg)
        elif op == "search":
            out.append("true" if trie.search(arg) else "false")
        elif op == "startsWith":
            out.append("true" if trie.startsWith(arg) else "false")
    print('\\n'.join(out))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class TrieNode {
        boolean isEnd = false;
        TrieNode[] children = new TrieNode[26];
    }
    static class Trie {
        TrieNode root = new TrieNode();
        void insert(String word) {
            TrieNode curr = root;
            for (int i = 0; i < word.length(); i++) {
                int idx = word.charAt(i) - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
            }
            curr.isEnd = true;
        }
        boolean search(String word) {
            TrieNode curr = root;
            for (int i = 0; i < word.length(); i++) {
                int idx = word.charAt(i) - 'a';
                if (curr.children[idx] == null) return false;
                curr = curr.children[idx];
            }
            return curr.isEnd;
        }
        boolean startsWith(String prefix) {
            TrieNode curr = root;
            for (int i = 0; i < prefix.length(); i++) {
                int idx = prefix.charAt(i) - 'a';
                if (curr.children[idx] == null) return false;
                curr = curr.children[idx];
            }
            return true;
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int q = Integer.parseInt(line.trim());
        Trie trie = new Trie();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            String opLine = br.readLine();
            if (opLine == null) break;
            String[] parts = opLine.trim().split("\\\s+");
            if (parts.length < 2) continue;
            String op = parts[0];
            String arg = parts[1];
            if (op.equals("insert")) {
                trie.insert(arg);
            } else if (op.equals("search")) {
                sb.append(trie.search(arg) ? "true\\n" : "false\\n");
            } else if (op.equals("startsWith")) {
                sb.append(trie.startsWith(arg) ? "true\\n" : "false\\n");
            }
        }
        System.out.print(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
struct TrieNode {
    is_end: bool,
    children: [Option<Box<TrieNode>>; 26],
}
impl TrieNode {
    fn new() -> Self {
        TrieNode {
            is_end: false,
            children: Default::default(),
        }
    }
}
struct Trie {
    root: TrieNode,
}
impl Trie {
    fn new() -> Self {
        Trie { root: TrieNode::new() }
    }
    fn insert(&mut self, word: &str) {
        let mut curr = &mut self.root;
        for c in word.chars() {
            let idx = (c as u8 - b'a') as usize;
            if curr.children[idx].is_none() {
                curr.children[idx] = Some(Box::new(TrieNode::new()));
            }
            curr = curr.children[idx].as_mut().unwrap();
        }
        curr.is_end = true;
    }
    fn search(&self, word: &str) -> bool {
        let mut curr = &self.root;
        for c in word.chars() {
            let idx = (c as u8 - b'a') as usize;
            match &curr.children[idx] {
                Some(node) => curr = node,
                None => return false,
            }
        }
        curr.is_end
    }
    fn starts_with(&self, prefix: &str) -> bool {
        let mut curr = &self.root;
        for c in prefix.chars() {
            let idx = (c as u8 - b'a') as usize;
            match &curr.children[idx] {
                Some(node) => curr = node,
                None => return false,
            }
        }
        true
    }
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let q: usize = line.trim().parse().unwrap();
        let mut trie = Trie::new();
        for _ in 0..q {
            if let Some(Ok(l)) = lines.next() {
                let parts: Vec<&str> = l.trim().split_whitespace().collect();
                if parts.len() < 2 { continue; }
                let op = parts[0];
                let arg = parts[1];
                if op == "insert" {
                    trie.insert(arg);
                } else if op == "search" {
                    writeln!(out, "{}", if trie.search(arg) { "true" } else { "false" }).unwrap();
                } else if op == "startsWith" {
                    writeln!(out, "{}", if trie.starts_with(arg) { "true" } else { "false" }).unwrap();
                }
            }
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #2: Design Add and Search Words Data Structure ====================
    {
        title: 'Design Add and Search Words Data Structure',
        description:
            'Design a data structure that supports adding new words and finding if a string matches any previously added string.\n\nImplement the WordDictionary class:\n- `add <word>`: Adds `word` to the data structure.\n- `search <word>`: Returns `true` if there is any string in the data structure that matches `word`, or `false` otherwise. `word` may contain dots `.` where a dot can be matched with any letter.\n\n**Input Format:**\n- First line: integer q, the number of operations.\n- Next q lines: each contains an operation in one of the formats:\n  - `add <word>`\n  - `search <word>`\n\n**Output Format:**\n- For each `search` operation, print `true` or `false` on a new line.',
        difficulty: 'MEDIUM',
        tags: ['trie', 'prefix-tree', 'strings'],
        constraints:
            "1 <= q <= 5 * 10^4\nWords consist of lowercase English letters and '.'.\nFor add operations, word contains only lowercase English letters.\n1 <= |word| <= 100",
        hints: "Use a Trie. During search, if you encounter the wildcard '.', recursively search all active children of the current node.",
        editorial:
            "**Approach: Trie DFS Wildcard Matching**\n\nThe insertion matches standard Trie. For search, traverse recursively. If the current character is '.', try traversing down all 26 possible children and recursively evaluate. If it is a normal character, follow the matching branch.\n\n**Time Complexity:** O(L) for normal search/insert, up to O(26^L) in the worst-case of all dots, though typically much faster.\n**Space Complexity:** O(U * 26) where U is the number of characters in the Trie.",
        examples: [
            {
                title: 'Example 1',
                input: '7\nadd bad\nadd dad\nadd mad\nsearch pad\nsearch bad\nsearch .ad\nsearch b..',
                output: 'false\ntrue\ntrue\ntrue',
                explanation:
                    "'pad' is false. 'bad' matches exactly. '.ad' matches 'bad', 'dad', 'mad'. 'b..' matches 'bad'.",
            },
            {
                title: 'Example 2',
                input: '5\nadd a\nadd ab\nsearch a.\nsearch .\nsearch ..',
                output: 'true\ntrue\nfalse',
            },
        ],
        testcases: [
            {
                input: '7\nadd bad\nadd dad\nadd mad\nsearch pad\nsearch bad\nsearch .ad\nsearch b..',
                output: 'false\ntrue\ntrue\ntrue',
            },
            {
                input: '5\nadd a\nadd ab\nsearch a.\nsearch .\nsearch ..',
                output: 'true\ntrue\nfalse',
            },
            { input: '4\nadd cat\nsearch cat\nsearch c.t\nsearch .at', output: 'true\ntrue\ntrue' },
            { input: '2\nsearch a\nsearch .', output: 'false\nfalse' },
            { input: '3\nadd apple\nsearch a.p.e\nsearch .....', output: 'true\ntrue' },
            { input: '3\nadd car\nsearch ca.\nsearch c..', output: 'true\ntrue' },
            { input: '2\nadd ca\nsearch ...', output: 'false' },
            { input: '2\nadd hello\nsearch .ello', output: 'true' },
            { input: '3\nadd a\nadd b\nsearch .', output: 'true' },
            { input: '4\nadd a\nadd abc\nsearch .\nsearch ...', output: 'true\ntrue' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int q;
    if (cin >> q) {
        // Implement WordDictionary and solve
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    # Implement WordDictionary wildcard matching and handle queries
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Parse input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Implement WordDictionary with wildcard matching
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    bool isEnd = false;
    TrieNode* children[26] = {nullptr};
};
class WordDictionary {
    TrieNode* root;
    bool searchHelper(const string& word, int idx, TrieNode* node) {
        if (!node) return false;
        if (idx == word.length()) return node->isEnd;
        char c = word[idx];
        if (c == '.') {
            for (int i = 0; i < 26; i++) {
                if (node->children[i] && searchHelper(word, idx + 1, node->children[i])) {
                    return true;
                }
            }
            return false;
        } else {
            int i = c - 'a';
            return searchHelper(word, idx + 1, node->children[i]);
        }
    }
public:
    WordDictionary() { root = new TrieNode(); }
    void addWord(const string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
        }
        curr->isEnd = true;
    }
    bool search(const string& word) {
        return searchHelper(word, 0, root);
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    if (!(cin >> q)) return 0;
    WordDictionary wd;
    for (int i = 0; i < q; i++) {
        string op, arg;
        cin >> op >> arg;
        if (op == "add") {
            wd.addWord(arg);
        } else if (op == "search") {
            cout << (wd.search(arg) ? "true" : "false") << "\n";
        }
    }
    return 0;
}`,
            python: `import sys
sys.setrecursionlimit(2000)

class TrieNode:
    def __init__(self):
        self.is_end = False
        self.children = {}

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str):
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.is_end = True

    def search(self, word: str) -> bool:
        def dfs(node, idx) -> bool:
            if not node:
                return False
            if idx == len(word):
                return node.is_end
            c = word[idx]
            if c == '.':
                for child in node.children.values():
                    if dfs(child, idx + 1):
                        return True
                return False
            else:
                if c in node.children:
                    return dfs(node.children[c], idx + 1)
                return False
        return dfs(self.root, 0)

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    q = int(data[0])
    wd = WordDictionary()
    idx = 1
    out = []
    for _ in range(q):
        if idx >= len(data):
            break
        op = data[idx]
        arg = data[idx+1]
        idx += 2
        if op == "add":
            wd.addWord(arg)
        elif op == "search":
            out.append("true" if wd.search(arg) else "false")
    print('\\n'.join(out))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class TrieNode {
        boolean isEnd = false;
        TrieNode[] children = new TrieNode[26];
    }
    static class WordDictionary {
        TrieNode root = new TrieNode();
        void addWord(String word) {
            TrieNode curr = root;
            for (int i = 0; i < word.length(); i++) {
                int idx = word.charAt(i) - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
            }
            curr.isEnd = true;
        }
        boolean search(String word) {
            return searchHelper(word, 0, root);
        }
        private boolean searchHelper(String word, int idx, TrieNode node) {
            if (node == null) return false;
            if (idx == word.length()) return node.isEnd;
            char c = word.charAt(idx);
            if (c == '.') {
                for (int i = 0; i < 26; i++) {
                    if (node.children[i] != null && searchHelper(word, idx + 1, node.children[i])) {
                        return true;
                    }
                }
                return false;
            } else {
                int i = c - 'a';
                return searchHelper(word, idx + 1, node.children[i]);
            }
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int q = Integer.parseInt(line.trim());
        WordDictionary wd = new WordDictionary();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            String opLine = br.readLine();
            if (opLine == null) break;
            String[] parts = opLine.trim().split("\\\s+");
            if (parts.length < 2) continue;
            String op = parts[0];
            String arg = parts[1];
            if (op.equals("add")) {
                wd.addWord(arg);
            } else if (op.equals("search")) {
                sb.append(wd.search(arg) ? "true\\n" : "false\\n");
            }
        }
        System.out.print(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
struct TrieNode {
    is_end: bool,
    children: [Option<Box<TrieNode>>; 26],
}
impl TrieNode {
    fn new() -> Self {
        TrieNode {
            is_end: false,
            children: Default::default(),
        }
    }
}
struct WordDictionary {
    root: TrieNode,
}
impl WordDictionary {
    fn new() -> Self {
        WordDictionary { root: TrieNode::new() }
    }
    fn add_word(&mut self, word: &str) {
        let mut curr = &mut self.root;
        for c in word.chars() {
            let idx = (c as u8 - b'a') as usize;
            if curr.children[idx].is_none() {
                curr.children[idx] = Some(Box::new(TrieNode::new()));
            }
            curr = curr.children[idx].as_mut().unwrap();
        }
        curr.is_end = true;
    }
    fn search(&self, word: &str) -> bool {
        self.search_helper(word.as_bytes(), 0, &self.root)
    }
    fn search_helper(&self, word: &[u8], idx: usize, node: &TrieNode) -> bool {
        if idx == word.len() {
            return node.is_end;
        }
        let c = word[idx];
        if c == b'.' {
            for child in &node.children {
                if let Some(child_node) = child {
                    if self.search_helper(word, idx + 1, child_node) {
                        return true;
                    }
                }
            }
            false
        } else {
            let child_idx = (c - b'a') as usize;
            match &node.children[child_idx] {
                Some(child_node) => self.search_helper(word, idx + 1, child_node),
                None => false,
            }
        }
    }
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let q: usize = line.trim().parse().unwrap();
        let mut wd = WordDictionary::new();
        for _ in 0..q {
            if let Some(Ok(l)) = lines.next() {
                let parts: Vec<&str> = l.trim().split_whitespace().collect();
                if parts.len() < 2 { continue; }
                let op = parts[0];
                let arg = parts[1];
                if op == "add" {
                    wd.add_word(arg);
                } else if op == "search" {
                    writeln!(out, "{}", if wd.search(arg) { "true" } else { "false" }).unwrap();
                }
            }
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #3: Longest Common Prefix (Trie) ====================
    {
        title: 'Longest Common Prefix (Trie)',
        description:
            'Given a list of n strings, and an integer k, find the longest prefix that is shared by at least k strings.\n\nIf there are multiple prefixes of the maximum length, return the lexicographically smallest one. If no prefix of length >= 1 is shared by at least k strings, output an empty line.\n\n**Input Format:**\n- First line: two integers n and k.\n- Next n lines: each contains a string s_i consisting of lowercase English letters.\n\n**Output Format:**\n- The lexicographically smallest prefix of maximum length shared by at least k strings. If none, print an empty line.',
        difficulty: 'MEDIUM',
        tags: ['trie', 'prefix-tree', 'strings'],
        constraints: '1 <= n <= 5 * 10^4\n1 <= k <= n\n1 <= |s_i| <= 100',
        hints: 'Insert all words into a Trie. Each node should track how many times it was visited during insertions. DFS the Trie to find nodes visited >= k times.',
        editorial:
            "**Approach: Trie counting and DFS**\n\nBuild a Trie where each node records a count of words passing through it. After inserting all n strings, perform a DFS starting at the root. We only visit children where count >= k. Since we check children alphabetically from 'a' to 'z', the first candidate that hits the maximum depth will be our lexicographically smallest prefix.\n\n**Time Complexity:** O(N * L) to build the Trie, and O(Alphabet_Size * L) to DFS, where L is the maximum string length.\n**Space Complexity:** O(N * L * Alphabet_Size) Trie node storage.",
        examples: [
            {
                title: 'Example 1',
                input: '4 3\napple\napplet\napricot\napril',
                output: 'ap',
                explanation:
                    "'a' and 'ap' are shared by all 4 strings. 'app' is only shared by 2. Thus, 'ap' is the longest prefix shared by >= 3 strings.",
            },
            {
                title: 'Example 2',
                input: '5 2\nbanana\nbandana\ncherry\nchess\napple',
                output: 'ban',
                explanation:
                    "'ban' is shared by 'banana' and 'bandana' (length 3). 'che' is shared by 'cherry' and 'chess' (length 3). 'ban' is lexicographically smaller.",
            },
        ],
        testcases: [
            { input: '4 3\napple\napplet\napricot\napril', output: 'ap' },
            { input: '5 2\nbanana\nbandana\ncherry\nchess\napple', output: 'ban' },
            { input: '3 1\ncat\ndog\ncar', output: 'car' },
            { input: '3 3\nflower\nflow\nflight', output: 'fl' },
            { input: '3 3\nabc\ndef\nghi', output: '' },
            { input: '4 2\nabcd\nabce\ndefg\ndefi', output: 'abc' },
            { input: '5 3\na\nb\na\nb\na', output: 'a' },
            { input: '3 2\ntest\ntest\ntest', output: 'test' },
            { input: '3 2\nabcdefgh\nabcdefgi\nxyz', output: 'abcdefg' },
            { input: '4 2\napple\napply\napricot\napril', output: 'app' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n, k;
    if (cin >> n >> k) {
        // Solve using a Trie and print the prefix
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    # Read n, k and the n strings, find longest prefix shared by >= k
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Solve using a Trie and print prefix
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n, k and find the common prefix
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    int count = 0;
    TrieNode* children[26] = {nullptr};
};
void dfs(TrieNode* node, int depth, string& path, int k, int& max_depth, string& best_path) {
    if (!node) return;
    if (depth > 0 && node->count >= k) {
        if (depth > max_depth) {
            max_depth = depth;
            best_path = path;
        }
    }
    for (int i = 0; i < 26; i++) {
        if (node->children[i] && node->children[i]->count >= k) {
            path.push_back('a' + i);
            dfs(node->children[i], depth + 1, path, k, max_depth, best_path);
            path.pop_back();
        }
    }
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    TrieNode* root = new TrieNode();
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        TrieNode* curr = root;
        for (char c : s) {
            int idx = c - 'a';
            if (!curr->children[idx]) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
            curr->count++;
        }
    }
    int max_depth = 0;
    string best_path = "";
    string path = "";
    dfs(root, 0, path, k, max_depth, best_path);
    cout << best_path << "\n";
    return 0;
}`,
            python: `import sys
sys.setrecursionlimit(200000)

class TrieNode:
    def __init__(self):
        self.count = 0
        self.children = [None] * 26

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    strings = data[2:n+2]
    
    root = TrieNode()
    for s in strings:
        curr = root
        for c in s:
            idx = ord(c) - 97
            if curr.children[idx] is None:
                curr.children[idx] = TrieNode()
            curr = curr.children[idx]
            curr.count += 1
            
    max_depth = 0
    best_path = ""
    
    def dfs(node, depth, path):
        nonlocal max_depth, best_path
        if depth > 0 and node.count >= k:
            if depth > max_depth:
                max_depth = depth
                best_path = "".join(path)
        for i in range(26):
            child = node.children[i]
            if child is not None and child.count >= k:
                path.append(chr(97 + i))
                dfs(child, depth + 1, path)
                path.pop()
                
    dfs(root, 0, [])
    print(best_path)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class TrieNode {
        int count = 0;
        TrieNode[] children = new TrieNode[26];
    }
    static int maxDepth = 0;
    static String bestPath = "";
    static void dfs(TrieNode node, int depth, StringBuilder path, int k) {
        if (depth > 0 && node.count >= k) {
            if (depth > maxDepth) {
                maxDepth = depth;
                bestPath = path.toString();
            }
        }
        for (int i = 0; i < 26; i++) {
            TrieNode child = node.children[i];
            if (child != null && child.count >= k) {
                path.append((char)('a' + i));
                dfs(child, depth + 1, path, k);
                path.setLength(path.length() - 1);
            }
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        TrieNode root = new TrieNode();
        for (int i = 0; i < n; i++) {
            String s = br.readLine();
            if (s == null) break;
            s = s.trim();
            TrieNode curr = root;
            for (int j = 0; j < s.length(); j++) {
                int idx = s.charAt(j) - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
                curr.count++;
            }
        }
        maxDepth = 0;
        bestPath = "";
        dfs(root, 0, new StringBuilder(), k);
        System.out.println(bestPath);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
struct TrieNode {
    count: i32,
    children: [Option<Box<TrieNode>>; 26],
}
impl TrieNode {
    fn new() -> Self {
        TrieNode {
            count: 0,
            children: Default::default(),
        }
    }
}
fn dfs(node: &TrieNode, depth: usize, path: &mut Vec<char>, k: i32, max_depth: &mut usize, best_path: &mut String) {
    if depth > 0 && node.count >= k {
        if depth > *max_depth {
            *max_depth = depth;
            *best_path = path.iter().collect();
        }
    }
    for i in 0..26 {
        if let Some(child) = &node.children[i] {
            if child.count >= k {
                path.push((b'a' + i as u8) as char);
                dfs(child, depth + 1, path, k, max_depth, best_path);
                path.pop();
            }
        }
    }
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.trim().split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let k: i32 = parts[1].parse().unwrap();
        let mut root = TrieNode::new();
        for _ in 0..n {
            if let Some(Ok(s)) = lines.next() {
                let s = s.trim();
                let mut curr = &mut root;
                for c in s.chars() {
                    let idx = (c as u8 - b'a') as usize;
                    if curr.children[idx].is_none() {
                        curr.children[idx] = Some(Box::new(TrieNode::new()));
                    }
                    curr = curr.children[idx].as_mut().unwrap();
                    curr.count += 1;
                }
            }
        }
        let mut max_depth = 0;
        let mut best_path = String::new();
        let mut path = Vec::new();
        dfs(&root, 0, &mut path, k, &mut max_depth, &mut best_path);
        writeln!(out, "{}", best_path).unwrap();
    }
}`,
        },
    },

    // ==================== MEDIUM #4: Search Suggestion System ====================
    {
        title: 'Search Suggestion System',
        description:
            'You are given an array of strings products and a string searchWord.\n\nDesign a system that suggests at most three products from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix, return the three lexicographically minimum products.\n\nPrint the suggestions after each character of searchWord is typed.\n\n**Input Format:**\n- First line: integer n, the number of products.\n- Next n lines: each contains a product string.\n- Last line: string searchWord.\n\n**Output Format:**\n- For each character typed in searchWord (from prefix of length 1 to length |searchWord|), print the suggested products on a single line, space-separated, in lexicographical order. If no products match, print a blank line.',
        difficulty: 'MEDIUM',
        tags: ['trie', 'prefix-tree', 'strings'],
        constraints:
            '1 <= n <= 1000\n1 <= |products[i]| <= 2000\n1 <= |searchWord| <= 1000\nAll strings consist of lowercase English letters.',
        hints: 'Sort the products array. Use binary search (lower bound) to find the first candidate starting with the typed prefix.',
        editorial:
            '**Approach: Sorted Array with Binary Search**\n\nSort the products in O(N log N * L) time. When matching a typed prefix, perform a binary search (lower bound) to find the first product. Check if the product and the subsequent two products share the prefix. If they do, collect them. This matches the standard Trie prefix autocomplete query but is easier to write.\n\n**Time Complexity:** O(N * log N * L + S * log N * L) where S is the length of searchWord.\n**Space Complexity:** O(1) beyond storing products.',
        examples: [
            {
                title: 'Example 1',
                input: '5\nmobile\nmouse\nmoneypot\nmonitor\nmousepad\nmouse',
                output: 'mobile moneypot monitor\nmobile moneypot monitor\nmobile moneypot monitor\nmouse mousepad\nmouse mousepad',
                explanation:
                    "After typing 'm', 'mo', 'moy' -> mobile, moneypot, monitor. After 'mou', 'mous', 'mouse' -> mouse, mousepad.",
            },
            {
                title: 'Example 2',
                input: '3\nhavana\nhavana\nhavana\ntatiana',
                output: '\n\n\n\n\n\n',
                explanation: "None of the products start with 't', so 7 blank lines are printed.",
            },
        ],
        testcases: [
            {
                input: '5\nmobile\nmouse\nmoneypot\nmonitor\nmousepad\nmouse',
                output: 'mobile moneypot monitor\nmobile moneypot monitor\nmobile moneypot monitor\nmouse mousepad\nmouse mousepad',
            },
            { input: '3\nhavana\nhavana\nhavana\ntatiana', output: '\n\n\n\n\n\n' },
            { input: '1\nabc\nab', output: 'abc\nabc' },
            { input: '1\nabc\nxyz', output: '\n\n' },
            {
                input: '4\nbags\nbaggage\nbanner\nbox\nbag',
                output: 'baggage bags banner\nbaggage bags banner\nbaggage bags',
            },
            { input: '4\na\na\na\na\na', output: 'a a a' },
            { input: '1\ncode\ncoder', output: 'code\ncode\ncode\ncode\n' },
            { input: '3\na\nb\nc\na', output: 'a' },
            {
                input: '3\napple\napricot\napply\napp',
                output: 'apple apricot apply\napple apricot apply\napple apply',
            },
            {
                input: '5\nabcd\nabce\nabcf\nabcg\nabch\nabcd',
                output: 'abcd abce abcf\nabcd abce abcf\nabcd abce abcf\nabcd',
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
        // Read products and searchWord, and solve
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    # Implement suggestions using sorted array or Trie
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Parse input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Sort array or search via Trie
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
    vector<string> products(n);
    for (int i = 0; i < n; i++) cin >> products[i];
    string searchWord;
    cin >> searchWord;
    sort(products.begin(), products.end());
    string cur = "";
    for (char c : searchWord) {
        cur += c;
        auto it = lower_bound(products.begin(), products.end(), cur);
        vector<string> temp;
        for (int i = 0; i < 3 && (it + i) != products.end(); i++) {
            string s = *(it + i);
            if (s.compare(0, cur.length(), cur) == 0) {
                temp.push_back(s);
            } else {
                break;
            }
        }
        for (int i = 0; i < temp.size(); i++) {
            if (i > 0) cout << " ";
            cout << temp[i];
        }
        cout << "\n";
    }
    return 0;
}`,
            python: `import sys
import bisect
def main():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    n = int(lines[0].strip())
    products = [lines[i].strip() for i in range(1, n+1)]
    searchWord = lines[n+1].strip()
    products.sort()
    cur = ""
    out = []
    for c in searchWord:
        cur += c
        idx = bisect.bisect_left(products, cur)
        temp = []
        for i in range(3):
            if idx + i < len(products):
                s = products[idx + i]
                if s.startswith(cur):
                    temp.append(s)
                else:
                    break
        out.append(" ".join(temp))
    print("\\n".join(out))
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
        String[] products = new String[n];
        for (int i = 0; i < n; i++) {
            products[i] = br.readLine().trim();
        }
        String searchWord = br.readLine().trim();
        Arrays.sort(products);
        StringBuilder sb = new StringBuilder();
        String cur = "";
        for (int i = 0; i < searchWord.length(); i++) {
            cur += searchWord.charAt(i);
            int idx = lowerBound(products, cur);
            List<String> temp = new ArrayList<>();
            for (int j = 0; j < 3; j++) {
                if (idx + j < products.length) {
                    String s = products[idx + j];
                    if (s.startsWith(cur)) {
                        temp.add(s);
                    } else {
                        break;
                    }
                }
            }
            for (int j = 0; j < temp.size(); j++) {
                if (j > 0) sb.append(" ");
                sb.append(temp.get(j));
            }
            sb.append("\\n");
        }
        System.out.print(sb.toString());
    }
    private static int lowerBound(String[] arr, String target) {
        int l = 0, r = arr.length;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (arr[mid].compareTo(target) >= 0) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
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
        let mut products = Vec::new();
        for _ in 0..n {
            if let Some(Ok(l)) = lines.next() {
                products.push(l.trim().to_string());
            }
        }
        if let Some(Ok(search_word)) = lines.next() {
            let search_word = search_word.trim();
            products.sort();
            let mut cur = String::new();
            for c in search_word.chars() {
                cur.push(c);
                let idx = products.binary_search(&cur).unwrap_or_else(|x| x);
                let mut temp = Vec::new();
                for i in 0..3 {
                    if idx + i < products.len() {
                        let s = &products[idx + i];
                        if s.starts_with(&cur) {
                            temp.push(s.as_str());
                        } else {
                            break;
                        }
                    }
                }
                writeln!(out, "{}", temp.join(" ")).unwrap();
            }
        }
    }
}`,
        },
    },

    // ==================== HARD #1: Word Search II ====================
    {
        title: 'Word Search II',
        description:
            'Given an m x n board of characters and a list of strings words, return all words on the board.\n\nEach word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.\n\n**Input Format:**\n- First line: two integers m and n (board dimensions).\n- Next m lines: a string of length n representing the row of the board.\n- Next line: an integer w, the number of words.\n- Next w lines: each containing a word to search.\n\n**Output Format:**\n- The words found on the board, sorted in lexicographical order, one per line.',
        difficulty: 'HARD',
        tags: ['trie', 'backtracking', 'strings'],
        constraints:
            '1 <= m, n <= 12\nboard[i][j] is a lowercase English letter.\n1 <= w <= 100\n1 <= |words[i]| <= 10\nwords[i] consists of lowercase English letters.\nAll words in words are unique.',
        hints: 'Insert all search words into a Trie. Walk the board with DFS, moving down the Trie branches concurrently.',
        editorial:
            "**Approach: Backtracking with Trie**\n\nBuild a Trie containing all target words. Run a DFS from every board cell. At each cell, step down the matching character transition in the Trie. Mark cells visited by changing them to '#' temporarily and restore them. When a node's word is found, record it, then clear it to avoid duplicate output.\n\n**Time Complexity:** O(M * N * 4^L) where L is the maximum word length.\n**Space Complexity:** O(U * 26) Trie nodes.",
        examples: [
            {
                title: 'Example 1',
                input: '4 4\noaan\netae\nihkr\niflv\n4\noath\npea\neat\nrain',
                output: 'eat\noath',
                explanation: "The words 'eat' and 'oath' are found on the board.",
            },
            {
                title: 'Example 2',
                input: '2 2\nab\ncd\n1\nabcd',
                output: '',
                explanation: "No path exists for 'abcd' since diagonal steps are not allowed.",
            },
        ],
        testcases: [
            { input: '4 4\noaan\netae\nihkr\niflv\n4\noath\npea\neat\nrain', output: 'eat\noath' },
            { input: '2 2\nab\ncd\n1\nabcd', output: '' },
            { input: '2 2\nab\ncd\n1\nabba', output: '' },
            { input: '1 1\na\n1\na', output: 'a' },
            { input: '2 2\nab\nba\n4\nab\nba\naba\nbab', output: 'ab\naba\nba\nbab' },
            { input: '3 3\nabc\ndef\nghi\n2\nxyz\nhello', output: '' },
            { input: '2 2\nab\ncd\n1\nabcde', output: '' },
            { input: '3 3\nabc\nfed\nghi\n1\nabcdefghi', output: 'abcdefghi' },
            { input: '3 3\naaa\naaa\naaa\n1\naaaaa', output: 'aaaaa' },
            { input: '3 3\nabc\ndef\nghi\n3\nadg\nbeh\ncfi', output: 'adg\nbeh\ncfi' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int m, n;
    if (cin >> m >> n) {
        // Solve using Backtracking and Trie
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    # Implement Word Search II using Trie DFS
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Backtracking with Trie
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // DFS with Trie tracking
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    string word = "";
    TrieNode* children[26] = {nullptr};
};
void insert(TrieNode* root, const string& word) {
    TrieNode* curr = root;
    for (char c : word) {
        int idx = c - 'a';
        if (!curr->children[idx]) curr->children[idx] = new TrieNode();
        curr = curr->children[idx];
    }
    curr->word = word;
}
int m, n;
vector<string> board;
vector<string> result;
void dfs(int r, int c, TrieNode* node) {
    char ch = board[r][c];
    if (ch == '#' || !node->children[ch - 'a']) return;
    node = node->children[ch - 'a'];
    if (!node->word.empty()) {
        result.push_back(node->word);
        node->word = ""; 
    }
    board[r][c] = '#';
    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    for (int i = 0; i < 4; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];
        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
            dfs(nr, nc, node);
        }
    }
    board[r][c] = ch;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    if (!(cin >> m >> n)) return 0;
    board.resize(m);
    for (int i = 0; i < m; i++) cin >> board[i];
    int w;
    if (!(cin >> w)) return 0;
    TrieNode* root = new TrieNode();
    for (int i = 0; i < w; i++) {
        string word;
        cin >> word;
        insert(root, word);
    }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            dfs(i, j, root);
        }
    }
    sort(result.begin(), result.end());
    for (const string& word : result) {
        cout << word << "\n";
    }
    return 0;
}`,
            python: `import sys
sys.setrecursionlimit(2000)
class TrieNode:
    def __init__(self):
        self.word = ""
        self.children = {}

def insert(root, word):
    curr = root
    for c in word:
        if c not in curr.children:
            curr.children[c] = TrieNode()
        curr = curr.children[c]
    curr.word = word

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    m = int(data[0])
    n = int(data[1])
    board = []
    idx = 2
    for _ in range(m):
        board.append(list(data[idx]))
        idx += 1
    w = int(data[idx])
    idx += 1
    root = TrieNode()
    for _ in range(w):
        insert(root, data[idx])
        idx += 1
    result = []
    def dfs(r, c, node):
        ch = board[r][c]
        if ch == '#' or ch not in node.children:
            return
        node = node.children[ch]
        if node.word:
            result.append(node.word)
            node.word = ""
        board[r][c] = '#'
        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                dfs(nr, nc, node)
        board[r][c] = ch
    for i in range(m):
        for j in range(n):
            dfs(i, j, root)
    result.sort()
    for word in result:
        print(word)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class TrieNode {
        String word = "";
        TrieNode[] children = new TrieNode[26];
    }
    static void insert(TrieNode root, String word) {
        TrieNode curr = root;
        for (int i = 0; i < word.length(); i++) {
            int idx = word.charAt(i) - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.word = word;
    }
    static int m, n;
    static char[][] board;
    static List<String> result = new ArrayList<>();
    static void dfs(int r, int c, TrieNode node) {
        char ch = board[r][c];
        if (ch == '#' || node.children[ch - 'a'] == null) return;
        node = node.children[ch - 'a'];
        if (!node.word.isEmpty()) {
            result.add(node.word);
            node.word = "";
        }
        board[r][c] = '#';
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};
        for (int i = 0; i < 4; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                dfs(nr, nc, node);
            }
        }
        board[r][c] = ch;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        m = Integer.parseInt(st.nextToken());
        n = Integer.parseInt(st.nextToken());
        board = new char[m][n];
        for (int i = 0; i < m; i++) {
            String row = br.readLine().trim();
            for (int j = 0; j < n; j++) {
                board[i][j] = row.charAt(j);
            }
        }
        int w = Integer.parseInt(br.readLine().trim());
        TrieNode root = new TrieNode();
        for (int i = 0; i < w; i++) {
            insert(root, br.readLine().trim());
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(i, j, root);
            }
        }
        Collections.sort(result);
        for (String s : result) {
            System.out.println(s);
        }
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
struct TrieNode {
    word: String,
    children: [Option<Box<TrieNode>>; 26],
}
impl TrieNode {
    fn new() -> Self {
        TrieNode {
            word: String::new(),
            children: Default::default(),
        }
    }
}
fn insert(root: &mut TrieNode, word: &str) {
    let mut curr = root;
    for c in word.chars() {
        let idx = (c as u8 - b'a') as usize;
        if curr.children[idx].is_none() {
            curr.children[idx] = Some(Box::new(TrieNode::new()));
        }
        curr = curr.children[idx].as_mut().unwrap();
    }
    curr.word = word.to_string();
}
fn dfs(r: usize, c: usize, board: &mut Vec<Vec<char>>, node: &mut TrieNode, result: &mut Vec<String>, m: usize, n: usize) {
    let ch = board[r][c];
    if ch == '#' { return; }
    let idx = (ch as u8 - b'a') as usize;
    if let Some(child) = &mut node.children[idx] {
        if !child.word.is_empty() {
            result.push(child.word.clone());
            child.word = String::new();
        }
        board[r][c] = '#';
        let dr = [-1, 1, 0, 0];
        let dc = [0, 0, -1, 1];
        for i in 0..4 {
            let nr = r as i32 + dr[i];
            let nc = c as i32 + dc[i];
            if nr >= 0 && nr < m as i32 && nc >= 0 && nc < n as i32 {
                dfs(nr as usize, nc as usize, board, child, result, m, n);
            }
        }
        board[r][c] = ch;
    }
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.trim().split_whitespace().collect();
        if parts.len() < 2 { return; }
        let m: usize = parts[0].parse().unwrap();
        let n: usize = parts[1].parse().unwrap();
        let mut board = Vec::new();
        for _ in 0..m {
            if let Some(Ok(l)) = lines.next() {
                board.push(l.trim().chars().collect::<Vec<char>>());
            }
        }
        if let Some(Ok(l)) = lines.next() {
            let w: usize = l.trim().parse().unwrap();
            let mut root = TrieNode::new();
            for _ in 0..w {
                if let Some(Ok(word)) = lines.next() {
                    insert(&mut root, word.trim());
                }
            }
            let mut result = Vec::new();
            for i in 0..m {
                for j in 0..n {
                    dfs(i, j, &mut board, &mut root, &mut result, m, n);
                }
            }
            result.sort();
            for w in result {
                writeln!(out, "{}", w).unwrap();
            }
        }
    }
}`,
        },
    },

    // ==================== HARD #2: Palindrome Pairs ====================
    {
        title: 'Palindrome Pairs',
        description:
            'Given a list of unique words, find all pairs of distinct indices (i, j) in the given list, so that the concatenation of the two words, i.e., words[i] + words[j] is a palindrome.\n\n**Input Format:**\n- First line: integer n, the number of words.\n- Next n lines: each contains a word.\n\n**Output Format:**\n- First line: integer p, the number of palindrome pairs found.\n- Next p lines: two space-separated integers i and j representing the indices of the matching pair. The pairs should be sorted first by i, and then by j.',
        difficulty: 'HARD',
        tags: ['trie', 'strings', 'hash-table'],
        constraints: '1 <= n <= 5000\n0 <= |words[i]| <= 100\nAll words in the list are unique.',
        hints: 'For each word, split it into two halves. If the first half is a palindrome, you need the reverse of the second half to exist. If the second half is a palindrome, you need the reverse of the first half to exist.',
        editorial:
            '**Approach: Prefix/Suffix Palindrome Hashing**\n\nMap each word to its index. For each word w, split it into s1 and s2 at all indices 0..|w|. If s1 is a palindrome, we check if the reverse of s2 exists in our map. If it does and is at index k != i, then (k, i) forms a palindrome. Similarly, if s2 is a palindrome, check if the reverse of s1 exists in our map to form (i, k). Using a set/sorted container prevents duplicates and outputs pairs in sorted order.\n\n**Time Complexity:** O(N * L^2) where N is the number of words and L is the max word length.\n**Space Complexity:** O(N * L) to store the hash table.',
        examples: [
            {
                title: 'Example 1',
                input: '5\nabcd\ndcba\nlls\ns\nsssll',
                output: '4\n0 1\n1 0\n2 4\n3 2',
                explanation:
                    "words[0]+words[1] = 'abcddcba' (palindrome). words[1]+words[0] = 'dcbaabcd' (palindrome). words[2]+words[4] = 'llssssll'. words[3]+words[2] = 'slls'.",
            },
            {
                title: 'Example 2',
                input: '2\nbat\ntab',
                output: '2\n0 1\n1 0',
            },
        ],
        testcases: [
            { input: '5\nabcd\ndcba\nlls\ns\nsssll', output: '4\n0 1\n1 0\n2 4\n3 2' },
            { input: '2\nbat\ntab', output: '2\n0 1\n1 0' },
            { input: '3\na\n\naba', output: '4\n0 1\n1 0\n1 2\n2 1' },
            { input: '3\na\nb\nc', output: '0' },
            { input: '4\ncode\nedoc\nc\ned', output: '2\n0 1\n1 0' },
            { input: '2\nracecar\naba', output: '0' },
            { input: '3\nabc\ncba\nxyz', output: '2\n0 1\n1 0' },
            { input: '3\nabac\naba\ncab', output: '2\n0 1\n2 0' },
            {
                input: '4\na\naa\naaa\naaaa',
                output: '12\n0 1\n0 2\n0 3\n1 0\n1 2\n1 3\n2 0\n2 1\n2 3\n3 0\n3 1\n3 2',
            },
            { input: '3\nabcdefg\ngfedcba\nh', output: '2\n0 1\n1 0' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    if (cin >> n) {
        // Read words and solve
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    # Find all palindrome pairs
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Parse words and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
bool isPalindrome(const string& s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        if (s[l++] != s[r--]) return false;
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<string> words(n);
    unordered_map<string, int> wordMap;
    string dummy;
    getline(cin, dummy); 
    for (int i = 0; i < n; i++) {
        getline(cin, words[i]);
        wordMap[words[i]] = i;
    }
    set<pair<int, int>> ans;
    for (int i = 0; i < n; i++) {
        string w = words[i];
        int len = w.length();
        for (int j = 0; j <= len; j++) {
            string s1 = w.substr(0, j);
            string s2 = w.substr(j);
            if (isPalindrome(s1)) {
                string rev_s2 = s2;
                reverse(rev_s2.begin(), rev_s2.end());
                if (wordMap.count(rev_s2) && wordMap[rev_s2] != i) {
                    ans.insert({wordMap[rev_s2], i});
                }
            }
            if (isPalindrome(s2)) {
                string rev_s1 = s1;
                reverse(rev_s1.begin(), rev_s1.end());
                if (wordMap.count(rev_s1) && wordMap[rev_s1] != i) {
                    ans.insert({i, wordMap[rev_s1]});
                }
            }
        }
    }
    cout << ans.size() << "\n";
    for (auto p : ans) {
        cout << p.first << " " << p.second << "\n";
    }
    return 0;
}`,
            python: `import sys
def is_palindrome(s):
    return s == s[::-1]

def main():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    n = int(lines[0].strip())
    words = []
    for i in range(1, n + 1):
        if i < len(lines):
            words.append(lines[i])
        else:
            words.append("")
            
    word_map = {word: i for i, word in enumerate(words)}
    ans = set()
    
    for i, w in enumerate(words):
        for j in range(len(w) + 1):
            s1 = w[:j]
            s2 = w[j:]
            if is_palindrome(s1):
                rev_s2 = s2[::-1]
                if rev_s2 in word_map and word_map[rev_s2] != i:
                    ans.add((word_map[rev_s2], i))
            if is_palindrome(s2):
                rev_s1 = s1[::-1]
                if rev_s1 in word_map and word_map[rev_s1] != i:
                    ans.add((i, word_map[rev_s1]))
                    
    sorted_ans = sorted(list(ans))
    print(len(sorted_ans))
    for p in sorted_ans:
        print(f"{p[0]} {p[1]}")

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    private static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
    static class Pair implements Comparable<Pair> {
        int first, second;
        Pair(int first, int second) {
            this.first = first;
            this.second = second;
        }
        @Override
        public int compareTo(Pair o) {
            if (this.first != o.first) return Integer.compare(this.first, o.first);
            return Integer.compare(this.second, o.second);
        }
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Pair pair = (Pair) o;
            return first == pair.first && second == pair.second;
        }
        @Override
        public int hashCode() {
            return Objects.hash(first, second);
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        String[] words = new String[n];
        Map<String, Integer> wordMap = new HashMap<>();
        for (int i = 0; i < n; i++) {
            words[i] = br.readLine();
            if (words[i] == null) words[i] = "";
            wordMap.put(words[i], i);
        }
        TreeSet<Pair> ans = new TreeSet<>();
        for (int i = 0; i < n; i++) {
            String w = words[i];
            int len = w.length();
            for (int j = 0; j <= len; j++) {
                String s1 = w.substring(0, j);
                String s2 = w.substring(j);
                if (isPalindrome(s1)) {
                    String rev_s2 = new StringBuilder(s2).reverse().toString();
                    if (wordMap.containsKey(rev_s2) && wordMap.get(rev_s2) != i) {
                        ans.add(new Pair(wordMap.get(rev_s2), i));
                    }
                }
                if (isPalindrome(s2)) {
                    String rev_s1 = new StringBuilder(s1).reverse().toString();
                    if (wordMap.containsKey(rev_s1) && wordMap.get(rev_s1) != i) {
                        ans.add(new Pair(i, wordMap.get(rev_s1)));
                    }
                }
            }
        }
        StringBuilder sb = new StringBuilder();
        sb.append(ans.size()).append("\\n");
        for (Pair p : ans) {
            sb.append(p.first).append(" ").append(p.second).append("\\n");
        }
        System.out.print(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::{HashMap, BTreeSet};
fn is_palindrome(s: &str) -> bool {
    let bytes = s.as_bytes();
    let n = bytes.len();
    for i in 0..n/2 {
        if bytes[i] != bytes[n - 1 - i] {
            return false;
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
        let n: usize = line.trim().parse().unwrap();
        let mut words = Vec::with_capacity(n);
        let mut word_map = HashMap::with_capacity(n);
        for i in 0..n {
            if let Some(Ok(l)) = lines.next() {
                let w = l.clone();
                words.push(w.clone());
                word_map.insert(w, i);
            } else {
                words.push(String::new());
                word_map.insert(String::new(), i);
            }
        }
        let mut ans = BTreeSet::new();
        for i in 0..n {
            let w = &words[i];
            let len = w.len();
            for j in 0..=len {
                let s1 = &w[0..j];
                let s2 = &w[j..len];
                if is_palindrome(s1) {
                    let rev_s2: String = s2.chars().rev().collect();
                    if let Some(&k) = word_map.get(&rev_s2) {
                        if k != i {
                            ans.insert((k, i));
                        }
                    }
                }
                if is_palindrome(s2) {
                    let rev_s1: String = s1.chars().rev().collect();
                    if let Some(&k) = word_map.get(&rev_s1) {
                        if k != i {
                            ans.insert((i, k));
                        }
                    }
                }
            }
        }
        writeln!(out, "{}", ans.len()).unwrap();
        for (u, v) in ans {
            writeln!(out, "{} {}", u, v).unwrap();
        }
    }
}`,
        },
    },

    // ==================== HARD #3: Suffix Automaton Basics ====================
    {
        title: 'Suffix Automaton Basics',
        description:
            'Build a Suffix Automaton (SAM) for a given string s to answer queries.\n\nSupported queries:\n- `distinct`: Print the total number of distinct substrings in s.\n- `count p`: Print the number of times pattern p appears as a substring in s.\n\n**Input Format:**\n- First line: string s.\n- Second line: integer q, the number of queries.\n- Next q lines: each contains a query in format `distinct` or `count <pattern>`.\n\n**Output Format:**\n- For each query, print the answer on a new line.',
        difficulty: 'HARD',
        tags: ['suffix-automaton', 'strings', 'graphs'],
        constraints:
            '1 <= |s| <= 10^5\n1 <= q <= 10^5\n1 <= |pattern| <= 10^5\nSum of pattern lengths <= 5 * 10^5\nAll strings consist of lowercase English letters.',
        hints: 'Build the SAM online by extending one character at a time. To support occurrence counts, propagate counts up the link tree after construction.',
        editorial:
            '**Approach: Suffix Automaton (SAM)**\n\nBuild the SAM in O(|s|) time. Each node represents a set of equivalent substrings. The number of distinct substrings is computed by summing (len[i] - len[link[i]]) over all states. To answer occurrences, we set the count of suffix paths for prefix states to 1, and propagate this count via link transitions in length-descending order. Queries then traverse the matching characters starting at root.\n\n**Time Complexity:** O(|s| + q * |pattern|) total execution time.\n**Space Complexity:** O(|s| * Alphabet_Size) for transitions.',
        examples: [
            {
                title: 'Example 1',
                input: 'abacaba\n4\ndistinct\ncount aba\ncount a\ncount c',
                output: '21\n2\n4\n1',
                explanation:
                    "Total distinct substrings is 21. 'aba' appears twice (at 0 and 4). 'a' appears 4 times. 'c' appears once.",
            },
            {
                title: 'Example 2',
                input: 'aaaaa\n3\ndistinct\ncount a\ncount aa',
                output: '5\n5\n4',
            },
        ],
        testcases: [
            { input: 'abacaba\n4\ndistinct\ncount aba\ncount a\ncount c', output: '21\n2\n4\n1' },
            { input: 'aaaaa\n3\ndistinct\ncount a\ncount aa', output: '5\n5\n4' },
            { input: 'a\n2\ncount a\ncount b', output: '1\n0' },
            { input: 'abc\n1\ncount xyz', output: '0' },
            { input: 'abacaba\n1\ndistinct', output: '21' },
            { input: 'ababab\n1\ncount ab', output: '3' },
            { input: 'banana\n2\ncount ana\ncount an', output: '2\n2' },
            { input: 'abcdef\n1\ncount cd', output: '1' },
            { input: 'abcdefg\n1\ndistinct', output: '28' },
            { input: 'aba\n3\ndistinct\ncount b\ncount ab', output: '5\n1\n1' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Build SAM and answer queries
    
    return 0;
}`,
            python: `def main():
    import sys
    # Build SAM in O(|s|) and answer queries
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Build SAM and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Build Suffix Automaton and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct State {
    int len, link;
    int next[26];
};
vector<State> st;
vector<int> cnt_occur;
int sz, last;
void sam_init() {
    st.clear();
    cnt_occur.clear();
    st.push_back({0, -1, {}});
    memset(st[0].next, -1, sizeof(st[0].next));
    cnt_occur.push_back(0);
    sz = 1;
    last = 0;
}
void sam_extend(char c) {
    int cur = sz++;
    st.push_back({st[last].len + 1, -1, {}});
    memset(st[cur].next, -1, sizeof(st[cur].next));
    cnt_occur.push_back(1);
    int p = last;
    while (p != -1 && st[p].next[c - 'a'] == -1) {
        st[p].next[c - 'a'] = cur;
        p = st[p].link;
    }
    if (p == -1) {
        st[cur].link = 0;
    } else {
        int q = st[p].next[c - 'a'];
        if (st[p].len + 1 == st[q].len) {
            st[cur].link = q;
        } else {
            int clone = sz++;
            st.push_back({st[p].len + 1, st[q].link, {}});
            memcpy(st[clone].next, st[q].next, sizeof(st[q].next));
            cnt_occur.push_back(0);
            while (p != -1 && st[p].next[c - 'a'] == q) {
                st[p].next[c - 'a'] = clone;
                p = st[p].link;
            }
            st[q].link = st[cur].link = clone;
        }
    }
    last = cur;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    sam_init();
    for (char c : s) {
        sam_extend(c);
    }
    vector<int> states(sz);
    iota(states.begin(), states.end(), 0);
    sort(states.begin(), states.end(), [](int a, int b) {
        return st[a].len > st[b].len;
    });
    for (int u : states) {
        if (st[u].link != -1) {
            cnt_occur[st[u].link] += cnt_occur[u];
        }
    }
    long long total_distinct = 0;
    for (int i = 1; i < sz; i++) {
        total_distinct += st[i].len - st[st[i].link].len;
    }
    int q;
    if (!(cin >> q)) return 0;
    while (q--) {
        string type;
        cin >> type;
        if (type == "distinct") {
            cout << total_distinct << "\n";
        } else {
            string p;
            cin >> p;
            int curr = 0;
            bool possible = true;
            for (char c : p) {
                int idx = c - 'a';
                if (st[curr].next[idx] == -1) {
                    possible = false;
                    break;
                }
                curr = st[curr].next[idx];
            }
            cout << (possible ? cnt_occur[curr] : 0) << "\n";
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
    s = data[0]
    q = int(data[1])
    n = len(s)
    MAX_STATES = 2 * n + 2
    st_len = [0] * MAX_STATES
    st_link = [-1] * MAX_STATES
    st_next = [[-1] * 26 for _ in range(MAX_STATES)]
    cnt = [0] * MAX_STATES
    sz = 1
    last = 0
    for char in s:
        c = ord(char) - 97
        cur = sz
        sz += 1
        st_len[cur] = st_len[last] + 1
        cnt[cur] = 1
        p = last
        while p != -1 and st_next[p][c] == -1:
            st_next[p][c] = cur
            p = st_link[p]
        if p == -1:
            st_link[cur] = 0
        else:
            q_state = st_next[p][c]
            if st_len[p] + 1 == st_len[q_state]:
                st_link[cur] = q_state
            else:
                clone = sz
                sz += 1
                st_len[clone] = st_len[p] + 1
                st_next[clone] = list(st_next[q_state])
                st_link[clone] = st_link[q_state]
                while p != -1 and st_next[p][c] == q_state:
                    st_next[p][c] = clone
                    p = st_link[p]
                st_link[q_state] = st_link[cur] = clone
        last = cur
    buckets = [[] for _ in range(n + 1)]
    for i in range(sz):
        buckets[st_len[i]].append(i)
    for l in range(n, 0, -1):
        for u in buckets[l]:
            if st_link[u] != -1:
                cnt[st_link[u]] += cnt[u]
    total_distinct = 0
    for i in range(1, sz):
        total_distinct += st_len[i] - st_len[st_link[i]]
    idx = 2
    out = []
    for _ in range(q):
        if idx >= len(data):
            break
        q_type = data[idx]
        idx += 1
        if q_type == "distinct":
            out.append(str(total_distinct))
        else:
            p = data[idx]
            idx += 1
            curr = 0
            possible = True
            for char in p:
                c = ord(char) - 97
                if st_next[curr][c] == -1:
                    possible = False
                    break
                curr = st_next[curr][c]
            out.append(str(cnt[curr] if possible else 0))
    print("\\n".join(out))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static int[] stLen;
    static int[] stLink;
    static int[][] stNext;
    static int[] cnt;
    static int sz = 1;
    static int last = 0;
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        int n = s.length();
        int maxStates = 2 * n + 2;
        stLen = new int[maxStates];
        stLink = new int[maxStates];
        stNext = new int[maxStates][26];
        cnt = new int[maxStates];
        stLen[0] = 0;
        stLink[0] = -1;
        Arrays.fill(stNext[0], -1);
        for (int i = 0; i < n; i++) {
            int c = s.charAt(i) - 'a';
            int cur = sz++;
            stLen[cur] = stLen[last] + 1;
            Arrays.fill(stNext[cur], -1);
            cnt[cur] = 1;
            int p = last;
            while (p != -1 && stNext[p][c] == -1) {
                stNext[p][c] = cur;
                p = stLink[p];
            }
            if (p == -1) {
                stLink[cur] = 0;
            } else {
                int q = stNext[p][c];
                if (stLen[p] + 1 == stLen[q]) {
                    stLink[cur] = q;
                } else {
                    int clone = sz++;
                    stLen[clone] = stLen[p] + 1;
                    stNext[clone] = Arrays.copyOf(stNext[q], 26);
                    stLink[clone] = stLink[q];
                    while (p != -1 && stNext[p][c] == q) {
                        stNext[p][c] = clone;
                        p = stLink[p];
                    }
                    stLink[q] = stLink[cur] = clone;
                }
            }
            last = cur;
        }
        List<Integer>[] buckets = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) buckets[i] = new ArrayList<>();
        for (int i = 0; i < sz; i++) {
            buckets[stLen[i]].add(i);
        }
        for (int l = n; l > 0; l--) {
            for (int u : buckets[l]) {
                if (stLink[u] != -1) {
                    cnt[stLink[u]] += cnt[u];
                }
            }
        }
        long totalDistinct = 0;
        for (int i = 1; i < sz; i++) {
            totalDistinct += stLen[i] - stLen[stLink[i]];
        }
        String qLine = br.readLine();
        if (qLine == null) return;
        int q = Integer.parseInt(qLine.trim());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            String qStr = br.readLine();
            if (qStr == null) break;
            qStr = qStr.trim();
            if (qStr.equals("distinct")) {
                sb.append(totalDistinct).append("\\n");
            } else if (qStr.startsWith("count ")) {
                String p = qStr.substring(6).trim();
                int curr = 0;
                boolean possible = true;
                for (int j = 0; j < p.length(); j++) {
                    int c = p.charAt(j) - 'a';
                    if (stNext[curr][c] == -1) {
                        possible = false;
                        break;
                    }
                    curr = stNext[curr][c];
                }
                sb.append(possible ? cnt[curr] : 0).append("\\n");
            }
        }
        System.out.print(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(s)) = lines.next() {
        let s = s.trim();
        let n = s.len();
        let max_states = 2 * n + 2;
        let mut st_len = vec![0; max_states];
        let mut st_link = vec![-1; max_states];
        let mut st_next = vec![[-1; 26]; max_states];
        let mut cnt = vec![0; max_states];
        let mut sz = 1;
        let mut last = 0;
        for c_char in s.chars() {
            let c = (c_char as u8 - b'a') as usize;
            let cur = sz;
            sz += 1;
            st_len[cur] = st_len[last] + 1;
            cnt[cur] = 1;
            let mut p = last as i32;
            while p != -1 && st_next[p as usize][c] == -1 {
                st_next[p as usize][c] = cur as i32;
                p = st_link[p as usize];
            }
            if p == -1 {
                st_link[cur] = 0;
            } else {
                let q = st_next[p as usize][c] as usize;
                if st_len[p as usize] + 1 == st_len[q] {
                    st_link[cur] = q as i32;
                } else {
                    let clone = sz;
                    sz += 1;
                    st_len[clone] = st_len[p as usize] + 1;
                    st_next[clone] = st_next[q];
                    st_link[clone] = st_link[q];
                    while p != -1 && st_next[p as usize][c] == q as i32 {
                        st_next[p as usize][c] = clone as i32;
                        p = st_link[p as usize];
                    }
                    st_link[q] = clone as i32;
                    st_link[cur] = clone as i32;
                }
            }
            last = cur;
        }
        let mut buckets = vec![Vec::new(); n + 1];
        for i in 0..sz {
            buckets[st_len[i]].push(i);
        }
        for l in (1..=n).rev() {
            for &u in &buckets[l] {
                if st_link[u] != -1 {
                    cnt[st_link[u] as usize] += cnt[u];
                }
            }
        }
        let mut total_distinct: i64 = 0;
        for i in 1..sz {
            total_distinct += (st_len[i] as i64) - (st_len[st_link[i] as usize] as i64);
        }
        if let Some(Ok(q_line)) = lines.next() {
            let q: usize = q_line.trim().parse().unwrap();
            for _ in 0..q {
                if let Some(Ok(q_str)) = lines.next() {
                    let q_str = q_str.trim();
                    if q_str == "distinct" {
                        writeln!(out, "{}", total_distinct).unwrap();
                    } else if q_str.starts_with("count ") {
                        let p = q_str[6..].trim();
                        let mut curr = 0;
                        let mut possible = true;
                        for char_byte in p.as_bytes() {
                            let c = (char_byte - b'a') as usize;
                            if st_next[curr][c] == -1 {
                                possible = false;
                                break;
                            }
                            curr = st_next[curr][c] as usize;
                        }
                        writeln!(out, "{}", if possible { cnt[curr] } else { 0 }).unwrap();
                    }
                }
            }
        }
    }
}`,
        },
    },
]
