import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question19 = {
    title: "Chalkboard XOR Game",
    description:
`You are given an array of integers nums represents the numbers written on
a chalkboard.
Alice and Bob take turns erasing exactly one number from the chalkboard,
with Alice starting first. If erasing a number causes the bitwise XOR of all the
elements of the chalkboard to become 0, then that player loses. The bitwise
XOR of one element is that element itself, and the bitwise XOR of no
elements is 0.
Also, if any player starts their turn with the bitwise XOR of all the elements
of the chalkboard equal to 0, then that player wins.
Return true if and only if Alice wins the game, assuming both players play
optimally.
Example 1:
Input: nums = [1,1,2]
Output: false
Explanation:
Alice has two choices: erase 1 or erase 2

If she erases 1, the nums array becomes [1, 2]. The bitwise XOR of all the
elements of the chalkboard is 1 XOR 2 = 3. Now Bob can remove any
element he wants, because Alice will be the one to erase the last element
and she will lose.
If Alice erases 2 first, now nums become [1, 1]. The bitwise XOR of all the
elements of the chalkboard is 1 XOR 1 = 0. Alice will lose.
Example 2:
Input: nums = [0,1]
Output: true
Example 3:
Input: nums = [1,2,3]
Output: true
Constraints:
- 1 <= nums.length <= 1000
- 0 <= nums[i] < 2^16

`,
    difficulty: DIFFICULTY.HARD,
    category: "Brainteaser",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`from typing import List

class Solution:
    def xorGame(self, nums: List[int]) -> bool:
        pass
`
            , driverCode:
`import sys

# Test cases
testcases = [([1,1,2], False), ([0,1], True), ([1,2,3], True)]

# solution instance
solution = Solution()

# Testing loop
for i, (nums, expected_output) in enumerate(testcases, 1):
    if solution.xorGame(nums) != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {solution.xorGame(nums)}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`class Solution {
    public boolean xorGame(int[] nums) {
        return false;
    }
}
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        Object[][] testcases = { {new int[]{1,1,2}, false}, {new int[]{0,1}, true}, {new int[]{1,2,3}, true} };
        Solution solution = new Solution();
        for(int i = 0; i < testcases.length; i++) {
            int[] nums = (int[]) testcases[i][0];
            boolean expected = (Boolean) testcases[i][1];
            boolean actual = solution.xorGame(nums);
            if(actual != expected) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expected + ", but got " + actual);
            }
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`/**
* @param {number[]} nums
* @return {boolean}
*/
var xorGame = function(nums) {
   
};
`
            , driverCode:
`// Driver
const testcases = [
    { nums: [1,1,2], expected: false },
    { nums: [0,1], expected: true },
    { nums: [1,2,3], expected: true }
];

testcases.forEach((test, index) => {
    const actual = xorGame(test.nums);
    if(actual !== test.expected) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${test.expected}, but got \${actual}\`);
    }
});
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool xorGame(vector<int>& nums) {
        return false;
    }
};
`
            , driverCode:
`// Driver
int main() {
    vector<pair<vector<int>, bool>> testcases = {{{1,1,2}, false}, {{0,1}, true}, {{1,2,3}, true}};
    Solution solution;
    for(int i = 0; i < testcases.size(); i++) {
        vector<int> nums = testcases[i].first;
        bool expected = testcases[i].second;
        bool actual = solution.xorGame(nums);
        if(actual != expected) {
            cerr << "AssertionError: Test " << (i + 1) << ": Expected " << expected << ", but got " << actual << endl;
        }
    }
    return 0;
}
`
        },
        {
            language: LANGUAGE.C,
            starterCode:
`#include <stdio.h>
#include <stdbool.h>

bool xorGame(int* nums, int numsSize) {
    
}
`
            , driverCode:
`// Driver
int main() {
    int testcase1[] = {1,1,2};
    int testcase2[] = {0,1};
    int testcase3[] = {1,2,3};
    int* testcases[] = {testcase1, testcase2, testcase3};
    int sizes[] = {3, 2, 3};
    int expected[] = {0, 1, 1};

    for(int i = 0; i < 3; i++) {
        int actual = xorGame(testcases[i], sizes[i]);
        if(actual != expected[i]) {
            fprintf(stderr, "AssertionError: Test %d: Expected %d, but got %d\\n", i + 1, expected[i], actual);
        }
    }
    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
