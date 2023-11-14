import { Calls } from "../types/calls";
import { Functions } from "../types/functions";
import { ASSERTION_ERROR_MESSAGE_TEMPLATE, formatErrorMessageJavaScript } from "./assertionErrorMessage";

export const generateJavaScriptFile = (userCode: string, calls: Calls, functions: Functions) => {
    let testsCode = "";
    let testCounter = 1;

    const returnTypeForFunction: { [key: string]: string } = {};
    functions.forEach(func => {
        returnTypeForFunction[func.name as string] = func.returnType.java as string;
    });

    for (let call of calls) {
        let functionName = call.functionName;
        let args = call.arguments.join(", ");

        // Check if the function exists in the provided functions list
        if (functions.some(func => func.name === functionName)) {
            testsCode += `const result${testCounter} = ${functionName}(${args});\n`;

            // Determine the correct way to compare based on returnType
            const comparison = returnTypeForFunction[functionName].endsWith("[]")
                ? `!arraysEqual(result${testCounter}, ${call.expectedOutput})` 
                : `result${testCounter} !== ${call.expectedOutput}`;
            
            testsCode += `\tif (${comparison}) {\n`;
            const errorMessage = formatErrorMessageJavaScript(ASSERTION_ERROR_MESSAGE_TEMPLATE, String(testCounter), call.expectedOutput);
            testsCode += `\t\tconsole.error("${errorMessage}", result${testCounter});\n`;
            testsCode += `\t\treturn;\n`;
            testsCode += `\t}\n\n`;
            testCounter++;
        } else {
            throw new Error(`Function ${functionName} is not defined.`);
        }
    }

    let driverTemplate = `
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (Array.isArray(a[i]) && Array.isArray(b[i])) {
            if (!arraysEqual(a[i], b[i])) return false;
        } else if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
    
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
