import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question8 = {
    title: "Repeated DNA Sequences",
    description:
`The DNA sequence is composed of a series of nucleotides abbreviated as 'A',
'C', 'G', and 'T'.
For example, "ACGAATTCCG" is a DNA sequence.
When studying DNA, it is useful to identify repeated sequences within the
DNA.
Given a string s that represents a DNA sequence, return all the 10-letterlong sequences (substrings) that occur more than once in a DNA molecule.
You may return the answer in any order.
Example 1: 
Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]
Example 2:
Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]

Constraints:
- 1 <= s.length <= 10^5
- s[i] is either 'A', 'C', 'G', or 'T'. 
`,
    difficulty: DIFFICULTY.MEDIUM,
    category: "Bit Manipulation",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`class Solution:
    def findRepeatedDnaSequences(self, s: str) -> list[str]:
        pass
`
            , driverCode:
`import sys

# Assuming the Solution class is defined above

testcases = [
    ("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT", ["AAAAACCCCC", "CCCCCAAAAA"]),
    ("AAAAAAAAAAAAA", ["AAAAAAAAAA"])
]
solution = Solution()

for i, (input_val, expected_output) in enumerate(testcases, 1):
    actual = solution.findRepeatedDnaSequences(input_val)
    if sorted(actual) != sorted(expected_output):
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`import java.util.*;

class Solution {
    public List<String> findRepeatedDnaSequences(String s) {

    }
}
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        String[] inputs = {"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT", "AAAAAAAAAAAAA"};
        String[][] expectedOutputs = {{"AAAAACCCCC", "CCCCCAAAAA"}, {"AAAAAAAAAA"}};
        Solution solution = new Solution();

        for (int i = 0; i < inputs.length; i++) {
            List<String> actual = solution.findRepeatedDnaSequences(inputs[i]);
            Collections.sort(actual);
            List<String> expected = Arrays.asList(expectedOutputs[i]);
            Collections.sort(expected);

            if (!actual.equals(expected)) {
                System.err.print("AssertionError: Test " + (i + 1) + ": Expected ");
                for (String e : expected) System.err.print(e + " ");
                System.err.print(", but got ");
                for (String a : actual) System.err.print(a + " ");
                System.err.println();
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
* @return {string[]}
*/
var findRepeatedDnaSequences = function(s) {

};
`
            , driverCode:
`// Assuming findRepeatedDnaSequences function is defined above

const testcases = [
    { input: "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT", expected: ["AAAAACCCCC", "CCCCCAAAAA"] },
    { input: "AAAAAAAAAAAAA", expected: ["AAAAAAAAAA"] }
];

testcases.forEach((test, index) => {
    const actual = findRepeatedDnaSequences(test.input).sort();
    const expected = test.expected.sort();
    
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${JSON.stringify(expected)}, but got \${JSON.stringify(actual)}\`);
    }
});
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {

    }
};
`
            , driverCode:
`// Assuming the Solution class is defined above

int main() {
    vector<pair<string, vector<string>>> testcases = {
        {"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT", {"AAAAACCCCC", "CCCCCAAAAA"}},
        {"AAAAAAAAAAAAA", {"AAAAAAAAAA"}}
    };
    Solution solution;

    for (int i = 0; i < testcases.size(); i++) {
        string input = testcases[i].first;
        vector<string> expected = testcases[i].second;
        vector<string> actual = solution.findRepeatedDnaSequences(input);

        sort(actual.begin(), actual.end());
        sort(expected.begin(), expected.end());

        if (actual != expected) {
            cerr << "AssertionError: Test " << (i + 1) << ": Expected ";
            for (const auto& e : expected) cerr << e << " ";
            cerr << ", but got ";
            for (const auto& a : actual) cerr << a << " ";
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
`# include <stdlib.h>
# include <string.h>

char ** findRepeatedDnaSequences(char * s, int* returnSize){
    
}
`
            , driverCode:
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Assuming the findRepeatedDnaSequences function is defined above

// Helper function for comparing string arrays
int compareStringArrays(char **arr1, int size1, char **arr2, int size2) {
    if (size1 != size2) {
        return 0;
    }
    for (int i = 0; i < size1; i++) {
        if (strcmp(arr1[i], arr2[i]) != 0) {
            return 0;
        }
    }
    return 1;
}

// Helper function for printing string arrays
void printStringArray(char **arr, int size) {
    printf("[");
    for (int i = 0; i < size; i++) {
        printf("\"%s\"", arr[i]);
        if (i < size - 1) printf(", ");
    }
    printf("]\n");
}

void freeResult(char **result, int size) {
    for (int i = 0; i < size; i++) {
        free(result[i]);
    }
    free(result);
}

int main() {
    // Test case inputs and expected outputs
    char input1[] = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT";
    char *expected1[] = {"AAAAACCCCC", "CCCCCAAAAA"};
    int expectedSize1 = 2;

    char input2[] = "AAAAAAAAAAAAA";
    char *expected2[] = {"AAAAAAAAAA"};
    int expectedSize2 = 1;

    int returnSize;
    char **result;

    // Test 1
    result = findRepeatedDnaSequences(input1, &returnSize);
    if (!compareStringArrays(result, returnSize, expected1, expectedSize1)) {
        fprintf(stderr, "AssertionError: Test 1: Expected ");
        printStringArray(expected1, expectedSize1);
        fprintf(stderr, "but got ");
        printStringArray(result, returnSize);
        freeResult(result, returnSize);
        return 1; // Exiting due to failure
    }
    freeResult(result, returnSize);

    // Test 2
    result = findRepeatedDnaSequences(input2, &returnSize);
    if (!compareStringArrays(result, returnSize, expected2, expectedSize2)) {
        fprintf(stderr, "AssertionError: Test 2: Expected ");
        printStringArray(expected2, expectedSize2);
        fprintf(stderr, "but got ");
        printStringArray(result, returnSize);
        freeResult(result, returnSize);
        return 1; // Exiting due to failure
    }
    freeResult(result, returnSize);

    // Add additional tests as needed

    printf("All tests passed successfully.\n");
    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
