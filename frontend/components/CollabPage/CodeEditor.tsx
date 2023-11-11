// components
import { useRef, useEffect, useState } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { LANGUAGE } from "@/utils/enums";
import { Socket, io } from "socket.io-client";
import { fetchPost } from "@/utils/apiHelpers";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import RunCode from "@/components/CollabPage/RunCode/RunCode";

// types
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import Question from "@/types/Question";
import DataForCompilerService from "@/types/DataForCompilerService";
import CompilerServiceResult, {
    defaultRunCodeResults,
} from "@/types/CompilerServiceResult";
import { messageHandler } from "@/utils/handlers";
import { useStore } from "@/stores";

const CodeEditor = ({ language, editorContent, roomId, question }: Props) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const decorationRef = useRef<editor.IEditorDecorationsCollection | null>(
        null
    );
    const incomingRef = useRef(false);
    const socketRef = useRef<Socket | null>(null);
    const [RunCodeResults, setRunCodeResults] = useState<CompilerServiceResult>(
        defaultRunCodeResults
    );
    const [isRunningCode, setIsRunningCode] = useState<boolean>(false);
    const [editorContentState, setEditorContentState] =
        useState<string>(editorContent);

    // options for monaco editor
    const options: editor.IStandaloneEditorConstructionOptions = {
        readOnly: false,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        tabSize: 4,
    };
    const editorStore = useStore().editor;

    const runTests = async () => {
        // get source code from editor, if undefined, it is empty string
        const source_code = (editorRef.current?.getValue() ?? "").replace(
            /\t/g,
            "    "
        );
        const dataForCompilerService: DataForCompilerService = {
            language: language,
            source_code: source_code,
            driverCode:
                question?.templates?.find(
                    (template) => template.language === language
                )?.driverCode ?? null,
        };
        setIsRunningCode(true);
        socketRef.current?.emit("runCode");
        const response = await fetchPost(
            "/api/compiler",
            dataForCompilerService
        );
        setIsRunningCode(false);
        if (response.status == 201) {
            const compileResult: CompilerServiceResult = response.data;
            setRunCodeResults(compileResult);
            socketRef.current?.emit("runCodeDone", compileResult);
            console.log(compileResult);
        } else {
            messageHandler(response.message, "error");
        }
    };

    useEffect(() => {
        if (!question) return;
        // reset compile results on new question
        setRunCodeResults(defaultRunCodeResults);
    }, [question]);

    // Connect to collab service socket via roomId
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

        socket?.on("runCode", () => {
            setIsRunningCode(true);
        });

        socket?.on("runCodeDone", (response: CompilerServiceResult) => {
            setIsRunningCode(false);
            setRunCodeResults(response);
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    useEffect(() => {
        editorRef.current?.getModel()?.setValue(editorContent);
    }, [editorContentState]);

    // handle mounting of editor
    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // set initial light/dark mode
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            // dark mode
            editor.updateOptions({ theme: "vs-dark" });
        }

        // change theme of editor if user switches between light and dark mode
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (event) => {
                event.matches
                    ? editor.updateOptions({ theme: "vs-dark" })
                    : editor.updateOptions({ theme: "vs" });
            });

        editorRef.current = editor;
        editorStore.setEditor(editor);

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
                value={editorContent}
                onMount={handleEditorDidMount}
                onChange={handleEditEvent}
                options={options}
            />
            {/* change button to unclickable when isRunningCode */}
            <Button
                variant="contained"
                onClick={runTests}
                disabled={isRunningCode}
            >
                Run Tests
            </Button>
            {/* <Button variant="contained" onClick={runTests}>
                Run Tests
            </Button> */}
            {/* If isRunningCode is false, render RunCode, else render a loading interface */}
            {isRunningCode ? (
                <Stack className="items-center">
                    <CircularProgress size="2rem" thickness={3} />
                    <Typography>Running code...</Typography>
                </Stack>
            ) : (
                <RunCode runResults={RunCodeResults} />
            )}
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
