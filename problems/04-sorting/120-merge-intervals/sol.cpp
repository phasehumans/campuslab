#include <bits/stdc++.h>
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
}
