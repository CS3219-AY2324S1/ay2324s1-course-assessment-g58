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
    
        let isArgArray = call.argumentsTypes.some(arg => arg.c.includes("*"));
        let isReturnArray = returnType.includes("*");
    
        if (returnType) {
            let args;
            if (isArgArray || isReturnArray) {
                // Handle arrays
                // args = call.arguments.map((arg, index) => {
                //     return call.argumentsTypes[index].c.includes("*") ? `&${arg}` : arg;
                // }).join(", ");
                // testsCode += `\t${returnType} input`
                // testsCode += `\t${returnType} result${testCounter} = ${functionName}(${args});\n`;
                let arrayInputCounter = 0;
    
                // Modified list of arguments to hold the references to the declared arrays
                let modifiedArgs: string[] = [];

                call.arguments.forEach((arg, index) => {
                    // Check if the argument type is a pointer (i.e., an array)
                    const count = call.argumentsTypes[index].c.split('*').length - 1;
                    if (count >= 1) {
                        // Increment the counter
                        arrayInputCounter++;

                        // Generate the name of the new array variable
                        let arrayVarName = `input_${testCounter}_${arrayInputCounter}`;
                        arg = arg.replace(/\[/g, "{");
                        arg = arg.replace(/\]/g, "}");
                        
                        let dimensions = "";
                        for (let i = 0; i < count; i++) { // Input should be such that args following an array specify its dimensions
                            dimensions += `[${call.arguments[index + i + 1]}]`;
                        }
                        // Add the array declaration to the testsCode
                        testsCode += `\t${call.argumentsTypes[index].c.replace(/\*/g, "")} ${arrayVarName}${dimensions} = ${arg};\n`;
                        
                        // Add the reference to the new array to the modified args list
                        modifiedArgs.push(`${arrayVarName}`);
                    } else {
                        modifiedArgs.push(arg);
                    }
                });

                // Generate the function call code
                args = modifiedArgs.join(", ");
                testsCode += `\t${returnType} result${testCounter} = ${functionName}(${args});\n`;
                
                if (isReturnArray) {
                    // Check if the return type is 1D or 2D
                    let arrayDimension = (returnType.match(/\*/g) || []).length;
                    let dimensions = "";
                        for (let i = 0; i < arrayDimension; i++) {
                            if (call.lengthOfArray !== undefined) { // Input should be such that if return type is array, lengthOfArray specifies dimensions
                                dimensions += `[${call.lengthOfArray[i]}]`;
                            }
                        }
                    // Declare expected output as an array
                    if (arrayDimension === 1) {
                        // Replace expected output if it is an array to c array format (from [] to {})
                        call.expectedOutput = call.expectedOutput.replace(/\[/g, "{");
                        call.expectedOutput = call.expectedOutput.replace(/\]/g, "}");
                        testsCode += `\t${returnType.replace(/\*/g, "")} expected${testCounter}${dimensions} = ${call.expectedOutput};\n`;
                        testsCode += `\tif (!compare1DArrays(result${testCounter}, expected${testCounter}, ${call.lengthOfArray![0]})) {\n`;
                    } else if (arrayDimension === 2) {
                        // Replace expected output if it is an array to c array format (from [] to {})
                        call.expectedOutput = call.expectedOutput.replace(/\[/g, "{");
                        call.expectedOutput = call.expectedOutput.replace(/\]/g, "}");
                        testsCode += `\t${returnType.replace(/\*/g, "")} expected${testCounter}${dimensions} = ${call.expectedOutput};\n`;
                        testsCode += `\tif (!compare2DArrays(result${testCounter}, expected${testCounter}, ${call.lengthOfArray![0]}, ${call.lengthOfArray![1]})) {\n`;
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
            // Check if errormessage contains '%'
            if (errorMessage.includes("%")) {
                testsCode += `\t\tfprintf(stderr, "${errorMessage}", result${testCounter});\n`;
            } else {
                testsCode += `\t\tfprintf(stderr, "${errorMessage}");\n`;
            }
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
