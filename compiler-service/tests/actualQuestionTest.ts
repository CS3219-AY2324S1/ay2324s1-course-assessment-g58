import { expect } from 'chai';
import { compileCode } from '../src/services/compiler.service';
import { LANGUAGE } from '../src/types/languageEnum';

describe('Actual leetcode questions', () => {
    describe('Question 1, reverse a string', () => {
        const calls = [
            {
                functionName: "foo",
                arguments: ["1"],
                argumentsTypes: [{
                    python: "int",
                    c: "int",
                    cpp: "int",
                    java: "int",
                    javascript: "number"
                }],
                expectedOutput: "2"
            },
            {
                functionName: "foo",
                arguments: ["5"],
                argumentsTypes: [{
                    python: "int",
                    c: "int",
                    cpp: "int",
                    java: "int",
                    javascript: "number"
                }],
                expectedOutput: "6"
            }
        ];
        const functions = [
            {
                name: "reverseString",
                returnType: {
                    python: "int",
                    c: "int",
                    cpp: "int",
                    java: "int",
                    javascript: "number"
                }
            }
        ];

        it('Python: correct code passes all tests', async () => {
            const userCode = `
class Solution:
    def reverseString(self, s: list) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left, right = left + 1, right - 1    
            `;
            const driverCode = `
testcases = [
    (["h","e","l","l","o"], ["o","l","l","e","h"]),
    (["H","a","n","n","a","h"], ["h","a","n","n","a","H"])
]

# Solution instance
solution = Solution()

# Testing loop
for i, (input_val, expected_output) in enumerate(testcases, 1):
# Copy input to ensure it's not modified
input_copy = input_val.copy()

# Call the user's function
solution.reverseString(input_copy)

# Check if the actual output is same as expected
if input_copy != expected_output:
    print(f"AssertionError: Test \`{i}\`: Expected {expected_output}, but got {input_copy}", file=sys.stderr)            
            `;
        });
    });
});