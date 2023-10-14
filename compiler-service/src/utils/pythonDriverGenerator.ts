import { Calls } from "../types/calls";
import { Functions } from "../types/functions";

export const generatePythonFile = (userCode: string, calls: Calls, functions: Functions) => {
    let testsCode = "";

    for (let call of calls) {
        let functionName = call.functionName;
        let args = call.arguments.join(", ");

        // Check if the function exists in the provided functions list
        if (functions.some(func => func.name === functionName)) {
            testsCode += `\tresult = ${functionName}(${args})\n`;
            testsCode += `\tassert result == ${call.expectedOutput}, "Expected ${call.expectedOutput}, but got " + str(result)\n\n`;
        } else {
            throw new Error(`Function ${functionName} is not defined.`);
        }
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
    console.log(driverTemplate);
    return driverTemplate;
}
