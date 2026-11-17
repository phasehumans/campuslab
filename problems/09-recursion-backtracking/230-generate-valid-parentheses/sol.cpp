#include <bits/stdc++.h>
using namespace std;
void backtrack(string current, int open, int close, int max_val) {
    if (current.length() == max_val * 2) {
        cout << current << "\n";
        return;
    }
    if (open < max_val) {
        backtrack(current + "(", open + 1, close, max_val);
    }
    if (close < open) {
        backtrack(current + ")", open, close + 1, max_val);
    }
}
int main() {
    int n;
    if (cin >> n) {
        backtrack("", 0, 0, n);
    }
    return 0;
}
