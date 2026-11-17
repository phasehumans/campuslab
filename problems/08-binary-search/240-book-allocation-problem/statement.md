Given N books, the i-th book has A[i] pages. There are M students. The task is to allocate all books to the M students such that:
1. Each student gets at least one book.
2. Each book is allocated to exactly one student.
3. The allocation is contiguous; i.e., a student can only be allocated books that are adjacent in the list.

Allocate the books such that the maximum number of pages allocated to a student is minimized. Return this minimized maximum. If it is impossible to allocate books (e.g. if M > N), return -1.

**Input Format:**
- First line: two space-separated integers N and M
- Second line: N space-separated integers representing pages of each book

**Output Format:**
- A single integer: the minimized maximum number of pages, or -1 if impossible
