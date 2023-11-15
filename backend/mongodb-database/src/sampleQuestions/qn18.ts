import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question18 = {
    title: "Wildcard Matching",
    description:
`Given an input string (s) and a pattern (p), implement wildcard pattern
matching with support for '?' and '*' where:
- '?' Matches any single character.
- '*' Matches any sequence of characters (including the empty
sequence).
The matching should cover the entire input string (not partial).

Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:
Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.

Example 3:
Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.

Constraints:
- 0 <= s.length, p.length <= 2000
- s contains only lowercase English letters.
- p contains only lowercase English letters, '?' or '*'. 
`,
    difficulty: DIFFICULTY.HARD,
    category: "Strings",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        pass
`
            , driverCode:
`import sys

# Test cases
testcases = [("aa", "a", False), ("aa", "*", True), ("cb", "?a", False)]

# solution instance
solution = Solution()

# Testing loop
for i, (s, p, expected_output) in enumerate(testcases, 1):
    if solution.isMatch(s, p) != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {solution.isMatch(s, p)}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`class Solution {
    public boolean isMatch(String s, String p) {
        return false;
    }
}
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        Object[][] testcases = {{"aa", "a", false}, {"aa", "*", true}, {"cb", "?a", false}};
        Solution solution = new Solution();
        for(int i = 0; i < testcases.length; i++) {
            String s = (String) testcases[i][0];
            String p = (String) testcases[i][1];
            boolean expected = (Boolean) testcases[i][2];
            boolean actual = solution.isMatch(s, p);
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
* @param {string} s
* @param {string} p
* @return {boolean}
*/
var isMatch = function(s, p) {
   
};
`
            , driverCode:
`// Driver
const testcases = [
    { s: "aa", p: "a", expected: false },
    { s: "aa", p: "*", expected: true },
    { s: "cb", p: "?a", expected: false }
];

testcases.forEach((test, index) => {
    const actual = isMatch(test.s, test.p);
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
    bool isMatch(string s, string p) {
        return false;
    }
};
`
            , driverCode:
`int main() {
    vector<tuple<string, string, bool>> testcases = {{"aa", "a", false}, {"aa", "*", true}, {"cb", "?a", false}};
    Solution solution;
    for(int i = 0; i < testcases.size(); i++) {
        string s, p;
        bool expected;
        tie(s, p, expected) = testcases[i];
        bool actual = solution.isMatch(s, p);
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
#include <stdlib.h>
#include <stdbool.h>

bool isMatch(char* s, char* p) {
    
}
`
            , driverCode:
`int main() {
    char* testcases[][3] = {{"aa", "a", "0"}, {"aa", "*", "1"}, {"cb", "?a", "0"}};
    for(int i = 0; i < sizeof(testcases) / sizeof(testcases[0]); i++) {
        char* s = testcases[i][0];
        char* p = testcases[i][1];
        int expected = atoi(testcases[i][2]);
        int actual = isMatch(s, p);
        if(actual != expected) {
            fprintf(stderr, "AssertionError: Test %d: Expected %d, but got %d\\n", i + 1, expected, actual);
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
