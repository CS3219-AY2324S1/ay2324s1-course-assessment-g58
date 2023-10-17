export interface Call {
    functionName: string;
    arguments: string[];
    argumentsTypes: string[];
    expectedOutput: string;

}

export type Calls = Call[];
