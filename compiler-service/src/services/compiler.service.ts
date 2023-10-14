import { generatePythonFile } from "../utils/pythonDriverGenerator";
import { generateCFile } from "../utils/cDriverGenerator";
import { Calls } from "../types/calls";
import { Functions } from "../types/functions";
import { CompilationData } from "../types/compilationData";
import { AfterCompileData } from "../types/afterCompileData";
import { CompileCodeResult } from "../types/compileCodeResult";
import { LANGUAGE } from "../types/languageEnum";
import { ASSERTION_ERROR_PATTERN } from "../utils/assertionErrorMessage";

const JUDGE_0_URL = "http://localhost:2358/" // TODO: dont keep this so static and available to the public

const JUDGE_0_PYTHON_LANG_ID = 71; //(3.8.1)
const JUDGE_0_C_LANG_ID = 50; //(GCC 9.2.0)
const JUDGE_0_CPP_LANG_ID = 54; //(GCC 9.2.0)
const JUDGE_0_JAVA_LANG_ID = 62; //(OpenJDK 13.0.1)
const JUDGE_0_JAVASCRIPT_LANG_ID = 63; //(Node.js 12.14.0)

function getFailedTestNumber(errorMsg: string): number | null {
    const match = errorMsg.match(ASSERTION_ERROR_PATTERN);
    if (match && match[1]) {
        return parseInt(match[1]);
    }
    return null;
}

export const compileCode = async (language: string,
        source_code: string,
        calls: Calls,
        functions: Functions): Promise<CompileCodeResult> => {
    
    const language_id = language ==  LANGUAGE.CPP ? JUDGE_0_CPP_LANG_ID :
            language == LANGUAGE.C ? JUDGE_0_C_LANG_ID :
            language == LANGUAGE.JAVA ? JUDGE_0_JAVA_LANG_ID :
            language == LANGUAGE.PYTHON ? JUDGE_0_PYTHON_LANG_ID :
            language == LANGUAGE.JAVASCRIPT ? JUDGE_0_JAVASCRIPT_LANG_ID : undefined;

    if (language_id == undefined) {
        return { data: null, error: true, message: "Invalid language", statusCode: 400, firstFailedTestCaseNumber: null };
    }

    if (language == LANGUAGE.PYTHON) {
        return await compilePythonCode(source_code, calls, functions);
    }

    if (language == LANGUAGE.C) {
        return await compileCCode(source_code, calls, functions);
    }

    // TODO: handle other languages
    return {data: null, error: true, message: "Only python supported now", statusCode: 400, firstFailedTestCaseNumber: null };
    
};

const getJudge0Output = async (data: CompilationData): Promise<CompileCodeResult> => {
    try {
        const response = await fetch(JUDGE_0_URL + "submissions/?base64_encoded=false&wait=false", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        const responseBody = await response.json();

        const { token } = responseBody;
        
        let responseBodySubmission;
        let retries = 5;

        while (retries > 0) {
            const responseSubmission = await fetch(JUDGE_0_URL + "submissions/" + token
                    + "?base64_encoded=True&fields=stdout,stderr,status_id,time,memory", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            responseBodySubmission = await responseSubmission.json();

            if (responseBodySubmission.status_id !== 1) {
                break;  // Exit loop if status is not 1 (in queue)
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            retries--;
        }
        const afterCompileData = responseBodySubmission as AfterCompileData;
        
        let firstFailedTestCaseNumber: number | null = null;
        if (afterCompileData.stderr != null) {
            firstFailedTestCaseNumber = getFailedTestNumber(afterCompileData.stderr);
        }
        return { data: afterCompileData, error: false, message: "Judge0 responsed", statusCode: 200, firstFailedTestCaseNumber };
    } catch (err: any) {
        return {data: null, error: true, message: "Error in compilation: " + err.message, statusCode: 500, firstFailedTestCaseNumber: null };
    }
};

const compilePythonCode = async (source_code: string,
        calls: Calls,
        functions: Functions): Promise<CompileCodeResult> => {
    const language_id = JUDGE_0_PYTHON_LANG_ID;
    const source_with_driver_code = generatePythonFile(source_code, calls, functions);
    const rawData = {
        language_id: language_id,
        source_code: source_with_driver_code,
        stdin: "",
        expected_output: "",
    };

    const { data, error, message, statusCode, firstFailedTestCaseNumber } = await getJudge0Output(rawData);
    return { data, error, message, statusCode, firstFailedTestCaseNumber };
};

const compileCCode = async (source_code: string,
    calls: Calls,
    functions: Functions): Promise<CompileCodeResult> => {
    const language_id = JUDGE_0_C_LANG_ID;
    const source_with_driver_code = generateCFile(source_code, calls, functions);
    const rawData = {
        language_id: language_id,
        source_code: source_with_driver_code,
        stdin: "",
        expected_output: "",
    };

    const { data, error, message, statusCode, firstFailedTestCaseNumber } = await getJudge0Output(rawData);
    return { data, error, message, statusCode, firstFailedTestCaseNumber };
};

// const compileCppCode = async (source_code: string,
//     calls: Calls,
//     functions: Functions): Promise<CompileCodeResult> => {
//     const language_id = JUDGE_0_CPP_LANG_ID;
//     const source_with_driver_code = generateCppFile(source_code, calls, functions);
//     const rawData = {
//         language_id: language_id,
//         source_code: source_with_driver_code,
//         stdin: "",
//         expected_output: "",
//     };

//     const { data, error, message, statusCode } = await getJudge0Output(rawData);
//     return { data, error, message, statusCode };
// };

// const compileJavaCode = async (source_code: string,
//     calls: Calls,
//     functions: Functions): Promise<CompileCodeResult> => {
//     const language_id = JUDGE_0_JAVA_LANG_ID;
//     const source_with_driver_code = generateJavaFile(source_code, calls, functions);
//     const rawData = {
//         language_id: language_id,
//         source_code: source_with_driver_code,
//         stdin: "",
//         expected_output: "",
//     };

//     const { data, error, message, statusCode } = await getJudge0Output(rawData);
//     return { data, error, message, statusCode };
// };

// const compileJavascriptCode = async (source_code: string,
//     calls: Calls,
//     functions: Functions): Promise<CompileCodeResult> => {
//     const language_id = JUDGE_0_JAVASCRIPT_LANG_ID;
//     const source_with_driver_code = generateJavascriptFile(source_code, calls, functions);
//     const rawData = {
//         language_id: language_id,
//         source_code: source_with_driver_code,
//         stdin: "",
//         expected_output: "",
//     };

//     const { data, error, message, statusCode } = await getJudge0Output(rawData);
//     return { data, error, message, statusCode };
// };
