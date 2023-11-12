import { Calls } from "../types/calls";
import { Functions } from "../types/functions";
import { ASSERTION_ERROR_MESSAGE_TEMPLATE, formatErrorMessagePython } from "./assertionErrorMessage";
export const generatePythonFile = (userCode: string, calls: Calls, functions: Functions) => {
    let testsCode = "";
    let testCounter = 1;

    for (let call of calls) {
        let functionName = call.functionName;
        let args = call.arguments.join(", ");

        // Check if the function exists in the provided functions list
        if (functions.some(func => func.name === functionName)) {
            testsCode += `\tresult = ${functionName}(${args})\n`;
            const errorMessage = formatErrorMessagePython(ASSERTION_ERROR_MESSAGE_TEMPLATE, String(testCounter), call.expectedOutput, '"+ str(result) +"');
            testsCode += `\tassert result == ${call.expectedOutput}, f"${errorMessage}"\n\n`;
            testCounter++; 
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
};
