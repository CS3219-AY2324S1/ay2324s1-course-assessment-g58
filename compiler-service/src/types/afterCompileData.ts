export interface AfterCompileData {
    stdout: string | null;
    status_id: number;
    time: string | null;
    memory: number | null;
    stderr: string | null;
    compile_output: string | null;
}