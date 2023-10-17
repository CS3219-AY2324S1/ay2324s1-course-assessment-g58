import { ArgumentsTypes } from "./testCaseType";

export interface Call {
    functionName: string;
    arguments: string[];
    argumentsTypes: ArgumentsTypes;
    expectedOutput: string;

}

export type Calls = Call[];
