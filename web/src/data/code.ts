import { rust } from '@codemirror/lang-rust'
import { cpp } from '@codemirror/lang-cpp'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'

export const DEFAULT_CODE: Record<string, string> = {
    rust: `use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut seen = HashMap::new();

        for (i, &num) in nums.iter().enumerate() {
            let need = target - num;

            if let Some(&j) = seen.get(&need) {
                return vec![j, i as i32];
            }

            seen.insert(num, i as i32);
        }

        vec![]
    }
}`,
    cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int need = target - nums[i];
            if (seen.count(need)) {
                return {seen[need], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            need = target - num
            if need in seen:
                return [seen[need], i]
            seen[num] = i
        return []`,
    java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[] { seen.get(need), i };
            }
            seen.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
}

export const LANGUAGES = [
    { id: 'cpp', name: 'C++', ext: cpp },
    { id: 'python', name: 'Python', ext: python },
    { id: 'java', name: 'Java', ext: java },
    { id: 'rust', name: 'Rust', ext: rust },
]

export const TEST_CASES = [
    { nums: '[2,7,11,15]', target: '9' },
    { nums: '[3,2,4]', target: '6' },
    { nums: '[3,3]', target: '6' },
]
