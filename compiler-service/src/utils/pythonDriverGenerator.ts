import { Tests, Test } from "../types/tests";

// This only handles single function python qns (not like https://leetcode.com/problems/lru-cache/)
export const generatePythonFile = (userCode: string, tests: Tests, testFunction: string) => {
    let testsCode = "";
    for (let test of tests) {
        testsCode += `\tresult = ${testFunction}(${test.input})\n`;
        testsCode += `\tassert result == ${test.expectedOutput}, "Expected ${test.expectedOutput}, but got " + str(result)\n\n`;
    }

    let driverTemplate = `
# --- USER CODE START ---
${userCode}
# --- USER CODE END ---

def run_tests():
\t# --- TESTS START ---
${testsCode}
\t# --- TESTS END ---

if __name__ == "__main__":
\trun_tests()`;

    return driverTemplate;
}