import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question11 = {
    title: "Longest Common Subsequence",
    description:
`Given two strings text1 and text2, return the length of their longest
common subsequence. If there is no common subsequence, return 0.
A subsequence of a string is a new string generated from the original string
with some characters (can be none) deleted without changing the relative
order of the remaining characters.
For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to
both strings.
Example 1:
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.

Constraints:
- 1 <= text1.length, text2.length <= 1000
- text1 and text2 consist of only lowercase English characters
`,
    difficulty: DIFFICULTY.MEDIUM,
    category: "Strings",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        return 0
`
            , driverCode:
`import sys

# Assuming the Solution class is defined above

testcases = [
    (("abcde", "ace"), 3),
    (("abc", "abc"), 3),
    (("abc", "def"), 0)
]
solution = Solution()

for i, ((text1, text2), expected_output) in enumerate(testcases, 1):
    actual = solution.longestCommonSubsequence(text1, text2)
    if actual != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`import java.util.*;

class Solution {
    public int longestCommonSubsequence(String s1, String s2) {
        return 0;
    }
}

`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        String[][] inputs = {{"abcde", "ace"}, {"abc", "abc"}, {"abc", "def"}};
        int[] expectedOutputs = {3, 3, 0};
        Solution solution = new Solution();

        for (int i = 0; i < inputs.length; i++) {
            int actual = solution.longestCommonSubsequence(inputs[i][0], inputs[i][1]);
            if (actual != expectedOutputs[i]) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expectedOutputs[i] + ", but got " + actual);
            }
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`/**
* @param {string} text1
* @param {string} text2
* @return {number}
*/
var longestCommonSubsequence = function(text1, text2) {
   return 0;
};
`
            , driverCode:
`// Assuming longestCommonSubsequence function is defined above

const testcases = [
    { text1: "abcde", text2: "ace", expected: 3 },
    { text1: "abc", text2: "abc", expected: 3 },
    { text1: "abc", text2: "def", expected: 0 }
];

testcases.forEach((test, index) => {
    const actual = longestCommonSubsequence(test.text1, test.text2);
    
    if (actual !== test.expected) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${test.expected}, but got \${actual}\`);
    }
});
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`#include <string>
#include <vector>

using namespace std;

class Solution {
public:

    int longestCommonSubsequence(string s1, string s2) {
        return 0;
    }
};
`
            , driverCode:
`#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Assuming the Solution class is defined above

int main() {
    vector<pair<pair<string, string>, int>> testcases = {
        {{"abcde", "ace"}, 3},
        {{"abc", "abc"}, 3},
        {{"abc", "def"}, 0}
    };
    Solution solution;

    for (int i = 0; i < testcases.size(); i++) {
        int actual = solution.longestCommonSubsequence(testcases[i].first.first, testcases[i].first.second);
        int expected = testcases[i].second;

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
`int longestCommonSubsequence(char* text1, char* text2) {
    
}
`
            , driverCode:
`#include <stdio.h>

// Assuming longestCommonSubsequence function is defined above

int main() {
    char* text1[] = {"abcde", "abc", "abc"};
    char* text2[] = {"ace", "abc", "def"};
    int expected[] = {3, 3, 0};
    int numTests = 3;

    for (int i = 0; i < numTests; i++) {
        int actual = longestCommonSubsequence(text1[i], text2[i]);
        if (actual != expected[i]) {
            fprintf(stderr, "AssertionError: Test %d: Expected %d, but got %d\n", i + 1, expected[i], actual);
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
