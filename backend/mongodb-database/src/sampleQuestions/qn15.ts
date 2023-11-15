import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question15 = {
    title: "Sliding Window Maximum",
    description:
`You are given an array of integers nums, there is a sliding window of size k
which is moving from the very left of the array to the very right. You can
only see the k numbers in the window. Each time the sliding window moves
right by one position.
Return the max sliding window.

Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position Max
--------------- -----
[1 3 -1] -3 5 3 6 7 3
 1 [3 -1 -3] 5 3 6 7 3
 1 3 [-1 -3 5] 3 6 7 5
 1 3 -1 [-3 5 3] 6 7 5
 1 3 -1 -3 [5 3 6] 7 6
 1 3 -1 -3 5 [3 6 7] 7
Example 2:
Input: nums = [1], k = 1
Output: [1]

Constraints:
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
- 1 <= k <= nums.length
`,
    difficulty: DIFFICULTY.HARD,
    category: "Arrays",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`from typing import List

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        pass
`
            , driverCode:
`# Assuming the Solution class is defined above

testcases = [
    (([1,3,-1,-3,5,3,6,7], 3), [3,3,5,5,6,7]),
    (([1], 1), [1])
]

solution = Solution()

for i, ((nums, k), expected_output) in enumerate(testcases, 1):
    actual = solution.maxSlidingWindow(nums, k)
    if actual != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`import java.util.*;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        return new int[0];
    }
}
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        int[][] inputs = {{1,3,-1,-3,5,3,6,7}, {1}};
        int[] ks = {3, 1};
        int[][] expected = {{3,3,5,5,6,7}, {1}};
        Solution solution = new Solution();

        for (int i = 0; i < inputs.length; i++) {
            int[] actual = solution.maxSlidingWindow(inputs[i], ks[i]);
            if (!Arrays.equals(actual, expected[i])) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + Arrays.toString(expected[i]) + ", but got " + Arrays.toString(actual));
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
* @param {number} k
* @return {number[]}
*/
var maxSlidingWindow = function(nums, k) {
    return [];
};
`
            , driverCode:
`// Assuming maxSlidingWindow function is defined above

const testcases = [
    { nums: [1,3,-1,-3,5,3,6,7], k: 3, expected: [3,3,5,5,6,7] },
    { nums: [1], k: 1, expected: [1] }
];

testcases.forEach((test, index) => {
    const actual = maxSlidingWindow(test.nums, test.k);
    if (JSON.stringify(actual) !== JSON.stringify(test.expected)) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${JSON.stringify(test.expected)}, but got \${JSON.stringify(actual)}\`);
    }
});
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`#include <vector>

using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        
    }
};
`
            , driverCode:
`#include <iostream>
#include <vector>
using namespace std;

// Assuming the Solution class is defined above

int main() {
    vector<pair<vector<int>, int>> inputs = {{{1,3,-1,-3,5,3,6,7}, 3}, {{1}, 1}};
    vector<vector<int>> expected = {{3,3,5,5,6,7}, {1}};

    Solution solution;
    for (int i = 0; i < inputs.size(); i++) {
        vector<int> actual = solution.maxSlidingWindow(inputs[i].first, inputs[i].second);
        if (actual != expected[i]) {
            cerr << "AssertionError: Test " << (i + 1) << ": Expected ";
            for (auto val : expected[i]) cerr << val << " ";
            cerr << ", but got ";
            for (auto val : actual) cerr << val << " ";
            cerr << endl;
        }
    }
    return 0;
}
`
        },
        {
            language: LANGUAGE.C,
            starterCode:
`/**
* Note: The returned array must be malloced, assume caller calls free().
*/
int* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize){

}
`
            , driverCode:
`#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Assuming the maxSlidingWindow function is defined above

void printArray(int* array, int size) {
    printf("[");
    for (int i = 0; i < size; i++) {
        printf("%d", array[i]);
        if (i < size - 1) printf(", ");
    }
    printf("]");
}

bool compareArrays(int* arr1, int* arr2, int size) {
    for (int i = 0; i < size; i++) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

int main() {
    int test1[] = {1,3,-1,-3,5,3,6,7};
    int k1 = 3;
    int expected1[] = {3,3,5,5,6,7};
    int expectedSize1 = 6;

    int returnSize1;
    int* result1 = maxSlidingWindow(test1, sizeof(test1) / sizeof(test1[0]), k1, &returnSize1);

    if (!compareArrays(result1, expected1, expectedSize1)) {
        fprintf(stderr, "AssertionError: Test 1: Expected ");
        printArray(expected1, expectedSize1);
        fprintf(stderr, ", but got ");
        printArray(result1, returnSize1);
        fprintf(stderr, "\n");
    }
    free(result1);

    int test2[] = {1};
    int k2 = 1;
    int expected2[] = {1};
    int expectedSize2 = 1;

    int returnSize2;
    int* result2 = maxSlidingWindow(test2, sizeof(test2) / sizeof(test2[0]), k2, &returnSize2);

    if (!compareArrays(result2, expected2, expectedSize2)) {
        fprintf(stderr, "AssertionError: Test 2: Expected ");
        printArray(expected2, expectedSize2);
        fprintf(stderr, ", but got ");
        printArray(result2, returnSize2);
        fprintf(stderr, "\n");
    }
    free(result2);

    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
