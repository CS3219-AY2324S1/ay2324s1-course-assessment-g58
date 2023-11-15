import { Calls } from "../types/calls";
import { Functions } from "../types/functions";
import { ASSERTION_ERROR_MESSAGE_TEMPLATE, formatErrorMessageC } from "./assertionErrorMessage";

// export const generateCppFile = (userCode: string, calls: Calls, functions: Functions) => {
//     let testsCode = "";
//     let testCounter = 1;

//     // Create a dictionary to store return types for each function
//     const returnTypeForFunction: { [key: string]: string } = {};
//     functions.forEach(func => {
//         returnTypeForFunction[func.name as string] = func.returnType.cpp as string;
//     });

//     for (let call of calls) {
//         let functionName = call.functionName;
//         let args = call.arguments.join(", ");
//         let returnType = returnTypeForFunction[functionName];

//         // Check if the function exists in the provided functions list
//         if (returnType) {
//             testsCode += `\t${returnType} result${testCounter} = ${functionName}(${args});\n`;
//             testsCode += `\tif (result${testCounter} != ${call.expectedOutput}) {\n`; 
//             const errorMessage = formatErrorMessageC(ASSERTION_ERROR_MESSAGE_TEMPLATE, String(testCounter), call.expectedOutput, returnType);
//             testsCode += `\t\tstd::fprintf(stderr, "${errorMessage}", result${testCounter});\n`;
//             testsCode += `\t\tstd::exit(1); // Exit on failure\n`;
//             testsCode += `\t}\n\n`;
//             testCounter++;
//         } else {
//             throw new Error(`Function ${functionName} is not defined.`);
//         }
//     }

//     let driverTemplate = `
// #include <cstdio>
// #include <cstdlib>

// // --- USER CODE START ---
// ${userCode}
// // --- USER CODE END ---

// void run_tests() {

// \t// --- TESTS START ---
// ${testsCode}
// \t// --- TESTS END ---
// }

// int main() {
// \trun_tests();
// \treturn 0;
// }`;
//     console.log(driverTemplate);
//     return driverTemplate;
// };
// ... [Your imports and other code]

export const generateCppFile = (userCode: string, calls: Calls, functions: Functions) => {
    let testsCode = "";
    let testCounter = 1;

    // Create a dictionary to store return types for each function
    const returnTypeForFunction: { [key: string]: string } = {};
    functions.forEach(func => {
        returnTypeForFunction[func.name as string] = func.returnType.cpp as string;
    });

    for (let call of calls) {
        let functionName = call.functionName;
        let returnType = returnTypeForFunction[functionName];

        let isArgVector = call.argumentsTypes.some(arg => arg.cpp.includes("std::vector"));
        let isReturnVector = returnType.includes("std::vector");

        if (returnType) {
            let args;
            if (isArgVector || isReturnVector) {
                // Handle vectors
                let vectorInputCounter = 0;
                let modifiedArgs: string[] = [];
                call.arguments.forEach((arg, index) => {
                    if (call.argumentsTypes[index].cpp.includes("std::vector")) {
                        vectorInputCounter++;

                        // Convert array notation to vector initializer list
                        arg = arg.replace(/\[/g, "{");
                        arg = arg.replace(/\]/g, "}");

                        // Add the vector declaration to the testsCode
                        let vectorVarName = `input_${testCounter}_${vectorInputCounter}`;
                        testsCode += `\t${call.argumentsTypes[index].cpp} ${vectorVarName} = ${arg};\n`;
                        modifiedArgs.push(vectorVarName);
                    } else {
                        modifiedArgs.push(arg);
                    }
                });

                // Generate the function call code
                args = modifiedArgs.join(", ");
                testsCode += `\t${returnType} result${testCounter} = ${functionName}(${args});\n`;

                if (isReturnVector) {
                    call.expectedOutput = call.expectedOutput.replace(/\[/g, "{");
                    call.expectedOutput = call.expectedOutput.replace(/\]/g, "}");
                    testsCode += `\t${returnType} expected${testCounter} = ${call.expectedOutput};\n`;
                    testsCode += `\tif (result${testCounter} != expected${testCounter}) {\n`;
                }
            } else {
                args = call.arguments.join(", ");
                testsCode += `\t${returnType} result${testCounter} = ${functionName}(${args});\n`;
                testsCode += `\tif (result${testCounter} != ${call.expectedOutput}) {\n`;
            }

            const errorMessage = formatErrorMessageC(ASSERTION_ERROR_MESSAGE_TEMPLATE, String(testCounter), call.expectedOutput, returnType);
            testsCode += `\t\tstd::cerr << "${errorMessage}";\n`;
            testsCode += `\t\texit(1); // Exit on failure\n`;
            testsCode += `\t}\n\n`;
            testCounter++;
        } else {
            throw new Error(`Function ${functionName} is not defined.`);
        }
    }

    let driverTemplate = `
#include <iostream>
#include <vector>
#include <cstdlib>

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
