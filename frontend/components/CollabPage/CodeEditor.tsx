import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
    return (
        <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
        />
    );
};

export default CodeEditor;
