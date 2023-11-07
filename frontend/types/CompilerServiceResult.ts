type CompilerServiceResult = {
    data: {
        stdout: string | null;
        status_id: number;
        time: string | null;
        memory: string | null;
        stderr: string | null;
        compile_output: string | null;
    };
    error: boolean;
    message: string;
    statusCode: number;
    firstFailedTestCaseNumber: number | null;
};

export default CompilerServiceResult;

export const defaultRunCodeResults: CompilerServiceResult = {
    data: {
      stdout: null,
      status_id: 0,
      time: null,
      memory: null,
      stderr: null,
      compile_output: null,
    },
    error: false,
    message: '',
    statusCode: 0,
    firstFailedTestCaseNumber: null,
  };