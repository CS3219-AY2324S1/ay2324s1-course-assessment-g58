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
        let returnType = returnTypeForFunction[functionName];
    
        let isArgArray = call.argumentsTypes.some(arg => arg.c.includes("[]"));
        let isReturnArray = returnType.includes("[]");
    
        if (returnType) {
            let args;
            if (isArgArray || isReturnArray) {
                // Handle arrays
                args = call.arguments.map((arg, index) => {
                    return call.argumentsTypes[index].c.includes("[]") ? `&${arg}` : arg;
                }).join(", ");
                
                testsCode += `\t${returnType} result${testCounter} = ${functionName}(${args});\n`;
    
                if (isReturnArray) {
                    // Check if the return type is 1D or 2D
                    let arrayDimension = (returnType.match(/\[\]/g) || []).length;
                    if (arrayDimension === 1) {
                        testsCode += `\tif (!compare1DArrays(result${testCounter}, ${call.expectedOutput}, ARRAY_SIZE)) {\n`;
                    } else if (arrayDimension === 2) {
                        testsCode += `\tif (!compare2DArrays(result${testCounter}, ${call.expectedOutput}, ROW_SIZE, COL_SIZE)) {\n`;
                    }
                } else {
                    testsCode += `\tif (result${testCounter} != ${call.expectedOutput}) {\n`; 
                }
            } else {
                // Handle non-array types
                args = call.arguments.join(", ");
                testsCode += `\t${returnType} result${testCounter} = ${functionName}(${args});\n`;
                testsCode += `\tif (result${testCounter} != ${call.expectedOutput}) {\n`; 
            }
    
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
#include <stdbool.h>

// Compares two 1D arrays
bool compare1DArrays(int *arr1, int *arr2, int size) {
    for (int i = 0; i < size; i++) {
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

// Compares two 2D arrays
bool compare2DArrays(int **arr1, int **arr2, int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        if (!compare1DArrays(arr1[i], arr2[i], cols)) return false;
    }
    return true;
}

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
    console.log(driverTemplate);
    return driverTemplate;
};
