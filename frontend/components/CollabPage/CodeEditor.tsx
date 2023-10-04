// components
import { useState, useRef } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { LANGUAGE } from "@/utils/enums";
import { Socket } from "socket.io";

// types
import { editor } from "monaco-editor/esm/vs/editor/editor.api";

const CodeEditor = ({ language, editorContent, roomId }: Props) => {
    const [socket, setSocket] = useState<Socket>();

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    // handle mounting of editor
    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    // in the event that code is edited or cursor is moved
    const handleChange: OnChange = (value = "", event) => {
        socket?.emit("editEvent", event);
    };

    return (
        <Editor
            key={roomId}
            height="50vh"
            defaultLanguage={(language ?? LANGUAGE.PYTHON)
                .toString()
                .toLowerCase()}
            defaultValue={editorContent}
            onMount={handleEditorDidMount}
            onChange={handleChange}
        />
    );
};

export default CodeEditor;

interface Props {
    language: string;
    editorContent: string;
    roomId: string;
}
