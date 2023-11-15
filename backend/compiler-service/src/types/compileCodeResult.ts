import { AfterCompileData } from './afterCompileData';

export interface CompileCodeResult {
    data: AfterCompileData | null;
    error: boolean;
    message: string;
    statusCode: number;
    firstFailedTestCaseNumber: number | null;
}
