import { Calls } from "../types/calls";
import { Functions } from "../types/functions";
import { ASSERTION_ERROR_MESSAGE_TEMPLATE, formatErrorMessageJava } from "./assertionErrorMessage";

//TODO: handle arrays
export const generateJavaFile = (userCode: string, calls: Calls, functions: Functions) => {
    let testsCode = "";
    let testCounter = 1;

    // Create a dictionary to store return types for each function
    const returnTypeForFunction: { [key: string]: string } = {};
    functions.forEach(func => {
        returnTypeForFunction[func.name as string] = func.returnType.java as string;
    });

    for (let call of calls) {
        let functionName = call.functionName;
        let args = call.arguments.join(", ");
        let returnType = returnTypeForFunction[functionName];

        // Check if the function exists in the provided functions list
        if (returnType) {
            testsCode += `\t\t${returnType} result${testCounter} = ${functionName}(${args});\n`;

            // Determine the correct way to compare based on returnType
            let comparison;
            if (["int", "char", "byte", "short", "long", "boolean", "float", "double"].includes(returnType)) {
                comparison = `result${testCounter} != ${call.expectedOutput}`;
            } else {
                // For array types, use Arrays.equals
                if (returnType.endsWith("[]")) {
                    comparison = `!java.util.Arrays.equals(result${testCounter}, ${call.expectedOutput})`;
                } else {
                    comparison = `!result${testCounter}.equals(${call.expectedOutput})`;
                }
            }

            testsCode += `\t\tif (${comparison}) {\n`;
            const errorMessage = formatErrorMessageJava(ASSERTION_ERROR_MESSAGE_TEMPLATE, String(testCounter), call.expectedOutput);
            testsCode += `\t\t\tSystem.err.println("${errorMessage}" + result${testCounter});\n`;
            testsCode += `\t\t\treturn;\n`;
            testsCode += `\t\t}\n\n`;
            testCounter++;
        } else {
            throw new Error(`Function ${functionName} is not defined.`);
        }
    }

    let driverTemplate = `
public class Main {

\t// --- USER CODE START ---
\t${userCode}
\t// --- USER CODE END ---

\tpublic static void run_tests() {

\t\t// --- TESTS START ---
\t\t${testsCode}
\t\t// --- TESTS END ---

\t}

\tpublic static void main(String[] args) {
\t\trun_tests();
\t}
}`;
    return driverTemplate;
};
