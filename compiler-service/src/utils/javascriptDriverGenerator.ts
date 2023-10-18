import { Calls } from "../types/calls";
import { Functions } from "../types/functions";
import { ASSERTION_ERROR_MESSAGE_TEMPLATE, formatErrorMessageJavaScript } from "./assertionErrorMessage";

export const generateJavaScriptFile = (userCode: string, calls: Calls, functions: Functions) => {
    let testsCode = "";
    let testCounter = 1;

    for (let call of calls) {
        let functionName = call.functionName;
        let args = call.arguments.join(", ");

        // Check if the function exists in the provided functions list
        if (functions.some(func => func.name === functionName)) {
            testsCode += `const result${testCounter} = ${functionName}(${args});\n`;

            // In JavaScript, we can use a simple equality check for most primitives and objects
            const comparison = `result${testCounter} !== ${call.expectedOutput}`;
            
            testsCode += `if (${comparison}) {\n`;
            const errorMessage = formatErrorMessageJavaScript(ASSERTION_ERROR_MESSAGE_TEMPLATE, String(testCounter), call.expectedOutput);
            testsCode += `\tconsole.error("${errorMessage}", result${testCounter});\n`;
            testsCode += `\treturn;\n`;
            testsCode += `}\n\n`;
            testCounter++;
        } else {
            throw new Error(`Function ${functionName} is not defined.`);
        }
    }

    let driverTemplate = `
// --- USER CODE START ---
${userCode}
// --- USER CODE END ---

function run_tests() {

\t// --- TESTS START ---
\t${testsCode}
\t// --- TESTS END ---

}

run_tests();
`;
    console.log(driverTemplate);
    return driverTemplate;
};
