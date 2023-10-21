// components
import { useRef, useEffect, useState } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { LANGUAGE } from "@/utils/enums";
import { Socket, io } from "socket.io-client";
import { fetchPost } from "@/utils/apiHelpers";
import { Button } from "@mui/material";

// types
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import Question from "@/types/Question";
import DataForCompilerService from "@/types/DataForCompilerService";

const CodeEditor = ({ language, editorContent, roomId, question }: Props) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const decorationRef = useRef<editor.IEditorDecorationsCollection | null>(
        null
    );
    const incomingRef = useRef(false);
    const socketRef = useRef<Socket | null>(null);

    const runTests = async () => {
        // get source code from editor, if undefined, it is empty string
        const source_code = editorRef.current?.getValue() ?? "";
        const dataForCompilerService: DataForCompilerService = {
            language: language,
            source_code: source_code,
            calls: question.calls,
            functions: question.functions,
            // get driver code for language
            driverCode: question?.templates?.find(template => template.language === language)?.driverCode ?? null,
        };
        const response = await fetchPost("/api/compiler", dataForCompilerService);
        if (response.status == 200) {
            alert("Success! " + response.data);
        } else {
            alert(response.message);
        }
    };

    // Connect to collab service socket via roomId
    //TODO: non hardcode url handling
    useEffect(() => {
        if (roomId === "") return;
        const socket = io(process.env.NEXT_PUBLIC_COLLAB_SERVER_URL as string, {
            auth: {
                roomId: roomId,
            },
            autoConnect: false,
        });
        socket.connect();
        socketRef.current = socket;

        socket?.on("text", (event: editor.IModelContentChangedEvent) => {
            incomingRef.current = true;
            editorRef.current?.getModel()?.applyEdits(event.changes);
        });

        socket?.on("select", (event: editor.ICursorSelectionChangedEvent) => {
            const selectionArray = [];

            if (
                event.selection.startColumn === event.selection.endColumn &&
                event.selection.startLineNumber ===
                    event.selection.endLineNumber
            ) {
                selectionArray.push({
                    range: event.selection,
                    options: { className: "otherUserCursor" },
                });
            } else {
                selectionArray.push({
                    range: event.selection,
                    options: { className: "otherUserSelection" },
                });
            }

            decorationRef.current?.clear();
            decorationRef.current =
                editorRef.current?.createDecorationsCollection(
                    selectionArray
                ) ?? null;
        });

        // reset text in model on next question
        socket?.on("proceedWithNextQuestion", () => {
            editorRef.current?.getModel()?.setValue("");
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    // handle mounting of editor
    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // handle all required event listeners
        handleSelectionEventListeners();
    };

    // when user makes a text edit
    const handleEditEvent: OnChange = (value, event) => {
        if (incomingRef.current) {
            incomingRef.current = false;
            return;
        }

        // emit text change to backend
        socketRef.current?.emit("editEvent", event);
    };

    function handleSelectionEventListeners() {
        editorRef.current!.onDidChangeCursorSelection(
            (event: editor.ICursorSelectionChangedEvent) => {
                socketRef.current?.emit("selection", event);
            }
        );
    }

    return (
        <div>
            <Editor
                key={roomId}
                height="50vh"
                defaultLanguage={(language ?? LANGUAGE.PYTHON)
                    .toString()
                    .toLowerCase()}
                defaultValue={editorContent}
                onMount={handleEditorDidMount}
                onChange={handleEditEvent}
            />
            <Button variant="contained" onClick={runTests}>
                Run Tests
            </Button>
        </div>
    );
};

export default CodeEditor;

interface Props {
    language: string;
    editorContent: string;
    roomId: string;
    question: Question;
}
