import { ArgumentsTypes } from "./testCaseType";

export interface Call {
    functionName: string;
    arguments: string[];
    argumentsTypes: ArgumentsTypes;
    expectedOutput: string;
    lengthOfArray?: number[]; // ind 0 is length of 1st dimension, ind 1 is length of 2nd dimension
}

export type Calls = Call[];
