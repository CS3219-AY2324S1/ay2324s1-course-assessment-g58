import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question9 = {
    title: "Course Schedule",
    description:
`There are a total of numCourses courses you have to take, labeled from 0 to
numCourses - 1. You are given an array prerequisites where prerequisites[i]
= [ai, bi] indicates that you must take course bi first if you want to take
course ai.
For example, the pair [0, 1], indicates that to take course 0 you have to first
take course 1.
Return true if you can finish all courses. Otherwise, return false.

Example 1:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0. So it is possible.
Example 2:
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0, and to take course 0
you should also have finished course 1. So it is impossible.

Constraints:
- 1 <= numCourses <= 2000
- 0 <= prerequisites.length <= 5000
- prerequisites[i].length == 2
- 0 <= ai, bi < numCourses
- All the pairs prerequisites[i] are unique. 
`,
    difficulty: DIFFICULTY.MEDIUM,
    category: "Data Structures",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`class Solution:
    def canFinish(self,numCourses:int,prerequisites:list[list[int]])->bool:
        return False   
`
            , driverCode:
`import sys

# Assuming the Solution class is defined above

testcases = [
    (2, [[1, 0]], True),
    (2, [[1, 0], [0, 1]], False)
]
solution = Solution()

for i, (numCourses, prerequisites, expected_output) in enumerate(testcases, 1):
    actual = solution.canFinish(numCourses, prerequisites)
    if actual != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        return false;
    }
}
`
            , driverCode:
`class TestCase {
    int numCourses;
    int[][] prerequisites;
    boolean expected;

    TestCase(int numCourses, int[][] prerequisites, boolean expected) {
        this.numCourses = numCourses;
        this.prerequisites = prerequisites;
        this.expected = expected;
    }
}

public class Main {
    public static void main(String[] args) {
        TestCase[] testcases = {
            new TestCase(2, new int[][]{{1, 0}}, true),
            new TestCase(2, new int[][]{{1, 0}, {0, 1}}, false)
        };
        Solution solution = new Solution();

        for (int i = 0; i < testcases.length; i++) {
            boolean actual = solution.canFinish(testcases[i].numCourses, testcases[i].prerequisites);
            boolean expected = testcases[i].expected;

            if (actual != expected) {
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
* @param {number} numCourses
* @param {number[][]} prerequisites
* @return {boolean}
*/
var canFinish = function(numCourses, prerequisites) {
    return false;
};
`
            , driverCode:
`// Assuming canFinish function is defined above

const testcases = [
    { numCourses: 2, prerequisites: [[1, 0]], expected: true },
    { numCourses: 2, prerequisites: [[1, 0], [0, 1]], expected: false }
];

testcases.forEach((test, index) => {
    const actual = canFinish(test.numCourses, test.prerequisites);
    
    if (actual !== test.expected) {
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
#include <tuple>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        return false;
    }
};
`
            , driverCode:
`// Assuming the Solution class is defined above

int main() {
    vector<tuple<int, vector<vector<int>>, bool>> testcases = {
        make_tuple(2, vector<vector<int>>{{1, 0}}, true),
        make_tuple(2, vector<vector<int>>{{1, 0}, {0, 1}}, false)
    };
    Solution solution;

    for (int i = 0; i < testcases.size(); i++) {
        int numCourses = get<0>(testcases[i]);
        vector<vector<int>>& prerequisites = get<1>(testcases[i]);
        bool expected = get<2>(testcases[i]);

        bool actual = solution.canFinish(numCourses, prerequisites);

        if (actual != expected) {
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
`#include <stdbool.h>

bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize){
    return true;
}
`
            , driverCode:
`#include <stdio.h>
#include <stdlib.h>

// Assuming the canFinish function is defined above

int main() {
    // Test Case 1
    int numCourses1 = 2;
    int prerequisitesSize1 = 1;
    int* prerequisitesColSize1 = (int*)malloc(prerequisitesSize1 * sizeof(int));
    int** prerequisites1 = (int**)malloc(prerequisitesSize1 * sizeof(int*));
    for (int i = 0; i < prerequisitesSize1; i++) {
        prerequisites1[i] = (int*)malloc(2 * sizeof(int));
        prerequisitesColSize1[i] = 2;
    }
    prerequisites1[0][0] = 1;
    prerequisites1[0][1] = 0;

    // Test Case 2
    int numCourses2 = 2;
    int prerequisitesSize2 = 2;
    int* prerequisitesColSize2 = (int*)malloc(prerequisitesSize2 * sizeof(int));
    int** prerequisites2 = (int**)malloc(prerequisitesSize2 * sizeof(int*));
    for (int i = 0; i < prerequisitesSize2; i++) {
        prerequisites2[i] = (int*)malloc(2 * sizeof(int));
        prerequisitesColSize2[i] = 2;
    }
    prerequisites2[0][0] = 1;
    prerequisites2[0][1] = 0;
    prerequisites2[1][0] = 0;
    prerequisites2[1][1] = 1;

    // Perform tests
    bool result1 = canFinish(numCourses1, prerequisites1, prerequisitesSize1, prerequisitesColSize1);
    if (result1 != true) {
        printf("AssertionError: Test 1: Expected true, but got false\n");
    }

    bool result2 = canFinish(numCourses2, prerequisites2, prerequisitesSize2, prerequisitesColSize2);
    if (result2 != false) {
        printf("AssertionError: Test 2: Expected false, but got true\n");
    }

    // Free memory for Test Case 1
    for (int i = 0; i < prerequisitesSize1; i++) {
        free(prerequisites1[i]);
    }
    free(prerequisites1);
    free(prerequisitesColSize1);

    // Free memory for Test Case 2
    for (int i = 0; i < prerequisitesSize2; i++) {
        free(prerequisites2[i]);
    }
    free(prerequisites2);
    free(prerequisitesColSize2);

    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
