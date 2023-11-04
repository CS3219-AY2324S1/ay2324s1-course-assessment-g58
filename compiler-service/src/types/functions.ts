import { ReturnType } from "./testCaseType";

export interface Function {
    name: String;
    returnType: ReturnType;
}

export type Functions = Function[];
