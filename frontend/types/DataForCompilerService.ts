import { questionCall, questionFunction } from "./Question";

type DataForCompilerService = {
    language: string;
    source_code: string;
    calls: questionCall[] | null;
    functions: questionFunction[] | null;
    driverCode: string | null;
};

export default DataForCompilerService;
