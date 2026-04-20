import { cpp } from '@codemirror/lang-cpp'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import type { EditorLanguage } from '@/lib/types'

export const FALLBACK_CODE: Record<EditorLanguage, string> = {
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Write your solution here.
    return 0;
}`,
    python: `def main():
    # Write your solution here.
    pass


if __name__ == "__main__":
    main()
`,
    java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Write your solution here.
    }
}`,
}

export const LANGUAGES = [
    { id: 'cpp', name: 'C++', ext: cpp },
    { id: 'python', name: 'Python', ext: python },
    { id: 'java', name: 'Java', ext: java },
] as const
