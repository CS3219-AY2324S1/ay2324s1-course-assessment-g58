import { Calls } from "../types/calls";
import { Functions } from "../types/functions";
import { ASSERTION_ERROR_MESSAGE_TEMPLATE, formatErrorMessageC } from "./assertionErrorMessage";
//TODO: handle arrays
export const generateCFile = (userCode: string, calls: Calls, functions: Functions) => {
    let testsCode = "";
    let testCounter = 1;

    // Create a dictionary to store return types for each function
    const returnTypeForFunction: { [key: string]: string } = {};
    functions.forEach(func => {
        returnTypeForFunction[func.name as string] = func.returnType.c as string;
    });

    for (let call of calls) {
        let functionName = call.functionName;
        let args = call.arguments.join(", ");
        let returnType = returnTypeForFunction[functionName];

        // Check if the function exists in the provided functions list
        if (returnType) {
            testsCode += `\t${returnType} result${testCounter} = ${functionName}(${args});\n`;
            testsCode += `\tif (result${testCounter} != ${call.expectedOutput}) {\n`; 
            const errorMessage = formatErrorMessageC(ASSERTION_ERROR_MESSAGE_TEMPLATE, String(testCounter), call.expectedOutput, returnType);
            testsCode += `\t\tfprintf(stderr, "${errorMessage}", result${testCounter});\n`;
            testsCode += `\t\texit(1); // Exit on failure\n`;
            testsCode += `\t}\n\n`;
            testCounter++;
        } else {
            throw new Error(`Function ${functionName} is not defined.`);
        }
    }

    let driverTemplate = `
#include <stdio.h>
#include <stdlib.h>

// --- USER CODE START ---
${userCode}
// --- USER CODE END ---

void run_tests() {

\t// --- TESTS START ---
${testsCode}
\t// --- TESTS END ---
}

int main() {
\trun_tests();
\treturn 0;
}`;

    return driverTemplate;
};
