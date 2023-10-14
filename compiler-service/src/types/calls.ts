export interface Call {
    functionName: string;
    arguments: string[];
    expectedOutput: string;

}

export type Calls = Call[];
