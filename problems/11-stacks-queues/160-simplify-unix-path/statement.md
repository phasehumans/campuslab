Given an absolute path for a Unix-style file system, simplify it to the canonical path.

In Unix-style file system:
- A period '.' refers to the current directory.
- A double period '..' moves up a directory level.
- Multiple sequential slashes (e.g. '//') are treated as a single slash '/'.

The simplified canonical path must:
1. Start with a single slash '/'.
2. Any two directories are separated by a single slash '/'.
3. The path does not end with a trailing '/'.
4. The path only contains the directories on the path from the root directory to the target directory.

**Input Format:**
- A single line containing the path string s.

**Output Format:**
- The simplified canonical path.
