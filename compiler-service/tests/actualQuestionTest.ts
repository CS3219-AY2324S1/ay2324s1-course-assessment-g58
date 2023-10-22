import { expect } from 'chai';
import { compileCode } from '../src/services/compiler.service';
import { LANGUAGE } from '../src/types/languageEnum';

describe('Actual leetcode questions', () => {
    describe('Question 1, reverse a string', () => {
        
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
import sys
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
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {input_copy}", file=sys.stderr)            
            `;
            const result = await compileCode(LANGUAGE.PYTHON, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.null;
        });

        it('Python: wrong code passes fails first test case', async () => {
            const userCode = `
class Solution:
    def reverseString(self, s: list) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left, right = left + 1, right - 1
            s[0] = ["wrong"]
            `;
            const driverCode = `
import sys
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
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {input_copy}", file=sys.stderr)            
            `;
            const result = await compileCode(LANGUAGE.PYTHON, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.equal(1);
        });

        it('Javascript: correct code passes all tests', async () => {
            const userCode = `
class Solution {
    reverseString(s) {
        let left = 0, right = s.length - 1;
        while(left < right) {
            [s[left], s[right]] = [s[right], s[left]];
            left++;
            right--;
        }
    }
}            
            `;
            const driverCode = `
const testcases = [
    {input: ["h","e","l","l","o"], expected: ["o","l","l","e","h"]},
    {input: ["H","a","n","n","a","h"], expected: ["h","a","n","n","a","H"]}
];

const solution = new Solution();

testcases.forEach((test, index) => {
    const inputCopy = [...test.input];
    solution.reverseString(inputCopy);
    
    if(JSON.stringify(inputCopy) !== JSON.stringify(test.expected)) {
        console.error(\`AssertionError: Test $\{index + 1}: Expected $\{test.expected}, but got $\{inputCopy}\`);
    }
});
            `;
            const result = await compileCode(LANGUAGE.JAVASCRIPT, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.null;
        });
        
        it('Javascript: wrong correct code fails second test case', async () => {
            const userCode = `
class Solution {
    reverseString(s) {
        let left = 0, right = s.length - 1;
        while(left < right) {
            [s[left], s[right]] = [s[right], s[left]];
            left++;
            right--;
        }
        s[0] = "o";
    }
}            
            `;
            const driverCode = `
const testcases = [
    {input: ["h","e","l","l","o"], expected: ["o","l","l","e","h"]},
    {input: ["H","a","n","n","a","h"], expected: ["h","a","n","n","a","H"]}
];

const solution = new Solution();

testcases.forEach((test, index) => {
    const inputCopy = [...test.input];
    solution.reverseString(inputCopy);
    
    if(JSON.stringify(inputCopy) !== JSON.stringify(test.expected)) {
        console.error(\`AssertionError: Test $\{index + 1}: Expected $\{test.expected}, but got $\{inputCopy}\`);
    }
});
            `;
            const result = await compileCode(LANGUAGE.JAVASCRIPT, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.equal(2);
        });

        it('Java: correct code passes all tests', async () => {
            const userCode = `
class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while(left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}          
            `;
            const driverCode = `
public class Main {
    public static void main(String[] args) {
        // Test cases
        char[][] testcases = {
            {'h','e','l','l','o'},
            {'H','a','n','n','a','h'}
        };
        char[][] expectedOutputs = {
            {'o','l','l','e','h'},
            {'h','a','n','n','a','H'}
        };
        
        Solution solution = new Solution();
        
        for(int i = 0; i < testcases.length; i++) {
            char[] inputCopy = testcases[i].clone();
            solution.reverseString(inputCopy);
            
            if(!java.util.Arrays.equals(inputCopy, expectedOutputs[i])) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + java.util.Arrays.toString(expectedOutputs[i]) + ", but got " + java.util.Arrays.toString(inputCopy));
                return;
            }
        }
    }
}
            `;
            const result = await compileCode(LANGUAGE.JAVA, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.null;
        });

        it('Java: wrong code fail first test', async () => {
            const userCode = `
class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while(left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
        s[0] = 'c';
    }
}          
            `;
            const driverCode = `
public class Main {
    public static void main(String[] args) {
        // Test cases
        char[][] testcases = {
            {'h','e','l','l','o'},
            {'H','a','n','n','a','h'}
        };
        char[][] expectedOutputs = {
            {'o','l','l','e','h'},
            {'h','a','n','n','a','H'}
        };
        
        Solution solution = new Solution();
        
        for(int i = 0; i < testcases.length; i++) {
            char[] inputCopy = testcases[i].clone();
            solution.reverseString(inputCopy);
            
            if(!java.util.Arrays.equals(inputCopy, expectedOutputs[i])) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + java.util.Arrays.toString(expectedOutputs[i]) + ", but got " + java.util.Arrays.toString(inputCopy));
                return;
            }
        }
    }
}
            `;
            const result = await compileCode(LANGUAGE.JAVA, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.equal(1);
        });

        it('C: correct code passes all tests', async () => {
            const userCode = `
void reverseString(char* s, int sSize) {
    int left = 0, right = sSize - 1;
    while(left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
    s[sSize] = '\\0';
}     
            `;
            const driverCode = `
#include <stdio.h>
#include <string.h>

int main() {
    char testcases[][7] = {
        "hello",
        "Hannah"
    };
    char expectedOutputs[][7] = {
        "olleh",
        "hannaH"
    };
    int numTests = sizeof(testcases) / sizeof(testcases[0]);

    for(int i = 0; i < numTests; i++) {
        char inputCopy[7];
        strcpy(inputCopy, testcases[i]);
        reverseString(inputCopy, strlen(inputCopy));

        if(strcmp(inputCopy, expectedOutputs[i]) != 0) {
            fprintf(stderr, "AssertionError: Test %d: Expected %s, but got %s\\n", i + 1, expectedOutputs[i], inputCopy);
            return 1;
        }
    }
    return 0;
}
            `;
            const result = await compileCode(LANGUAGE.C, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.null;
        });

        it('C: wrong code fail first test', async () => {
            const userCode = `
void reverseString(char* s, int sSize) {
    int left = 0, right = sSize - 1;
    while(left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
    s[sSize] = '\\0';
    s[0] = 'w';
}     
            `;
            const driverCode = `
#include <stdio.h>
#include <string.h>

int main() {
    char testcases[][7] = {
        "hello",
        "Hannah"
    };
    char expectedOutputs[][7] = {
        "olleh",
        "hannaH"
    };
    int numTests = sizeof(testcases) / sizeof(testcases[0]);

    for(int i = 0; i < numTests; i++) {
        char inputCopy[7];
        strcpy(inputCopy, testcases[i]);
        reverseString(inputCopy, strlen(inputCopy));

        if(strcmp(inputCopy, expectedOutputs[i]) != 0) {
            fprintf(stderr, "AssertionError: Test %d: Expected %s, but got %s\\n", i + 1, expectedOutputs[i], inputCopy);
            return 1;
        }
    }
    return 0;
}
            `;
            const result = await compileCode(LANGUAGE.C, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.equal(1);
        });

        it('C++: correct code passes all tests', async () => {
            const userCode = `
#include <vector>
class Solution {
public:
    void reverseString(std::vector<char>& s) {
        int left = 0, right = s.size() - 1;
        while(left < right) {
            std::swap(s[left], s[right]);
            left++;
            right--;
        }
    }
};
            `;
            const driverCode = `
#include <iostream>
using namespace std;

int main() {
    vector<vector<char>> testcases = {
        {'h','e','l','l','o'},
        {'H','a','n','n','a','h'}
    };
    vector<vector<char>> expectedOutputs = {
        {'o','l','l','e','h'},
        {'h','a','n','n','a','H'}
    };

    Solution solution;

    for(int i = 0; i < testcases.size(); i++) {
        vector<char> inputCopy = testcases[i];
        solution.reverseString(inputCopy);

        if(inputCopy != expectedOutputs[i]) {
            cerr << "AssertionError: Test " << i + 1 << ": Expected ";
            for(auto c : expectedOutputs[i]) cerr << c;
            cerr << ", but got ";
            for(auto c : inputCopy) cerr << c;
            cerr << endl;
            return 1;
        }
    }
    return 0;
}
            `;
            const result = await compileCode(LANGUAGE.CPP, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.null;
        });
        
        it('C++: correct code passes all tests', async () => {
            const userCode = `
#include <vector>
class Solution {
public:
    void reverseString(std::vector<char>& s) {
        int left = 0, right = s.size() - 1;
        while(left < right) {
            std::swap(s[left], s[right]);
            left++;
            right--;
        }
        s[0] = 'w';
    }
};
            `;
            const driverCode = `
#include <iostream>
using namespace std;

int main() {
    vector<vector<char>> testcases = {
        {'h','e','l','l','o'},
        {'H','a','n','n','a','h'}
    };
    vector<vector<char>> expectedOutputs = {
        {'o','l','l','e','h'},
        {'h','a','n','n','a','H'}
    };

    Solution solution;

    for(int i = 0; i < testcases.size(); i++) {
        vector<char> inputCopy = testcases[i];
        solution.reverseString(inputCopy);

        if(inputCopy != expectedOutputs[i]) {
            cerr << "AssertionError: Test " << i + 1 << ": Expected ";
            for(auto c : expectedOutputs[i]) cerr << c;
            cerr << ", but got ";
            for(auto c : inputCopy) cerr << c;
            cerr << endl;
            return 1;
        }
    }
    return 0;
}
            `;
            const result = await compileCode(LANGUAGE.CPP, userCode, [], [], driverCode);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.firstFailedTestCaseNumber).to.be.equal(1);
        });
    });

    
});