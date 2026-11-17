#include <bits/stdc++.h>
using namespace std;
pair<string, long long> removePattern(const string& s, char p0, char p1, long long val) {
    string stack = "";
    long long score = 0;
    for (char c : s) {
        if (!stack.empty() && stack.back() == p0 && c == p1) {
            stack.pop_back();
            score += val;
        } else {
            stack.push_back(c);
        }
    }
    return {stack, score};
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    long long x, y;
    if (!(cin >> s >> x >> y)) return 0;
    char first0 = 'a', first1 = 'b', second0 = 'b', second1 = 'a';
    long long firstVal = x, secondVal = y;
    if (y > x) {
        first0 = 'b'; first1 = 'a';
        second0 = 'a'; second1 = 'b';
        firstVal = y; secondVal = x;
    }
    auto p1 = removePattern(s, first0, first1, firstVal);
    auto p2 = removePattern(p1.first, second0, second1, secondVal);
    cout << p1.second + p2.second << "\n";
    return 0;
}
