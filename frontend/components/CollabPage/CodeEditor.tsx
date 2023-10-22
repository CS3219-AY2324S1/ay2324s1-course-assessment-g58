// components
import { useRef, useEffect, useState } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { LANGUAGE } from "@/utils/enums";
import { Socket, io } from "socket.io-client";
import { fetchPost } from "@/utils/apiHelpers";
import { Button } from "@mui/material";
import RunCode from "@/components/CollabPage/RunCode/RunCode";

// types
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import Question from "@/types/Question";
import DataForCompilerService from "@/types/DataForCompilerService";
import CompilerServiceResult, {defaultRunCodeResults} from "@/types/CompilerServiceResult";

const CodeEditor = ({ language, editorContent, roomId, question }: Props) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const decorationRef = useRef<editor.IEditorDecorationsCollection | null>(
        null
    );
    const incomingRef = useRef(false);
    const socketRef = useRef<Socket | null>(null);
    const [RunCodeResults, setRunCodeResults] = useState<CompilerServiceResult>(defaultRunCodeResults);
    const runTests = async () => {
        // get source code from editor, if undefined, it is empty string
        const source_code = (editorRef.current?.getValue() ?? "").replace(/\t/g, "    ");
        const dataForCompilerService: DataForCompilerService = {
            language: language,
            source_code: source_code,
            calls: question.calls,
            functions: question.functions,
            // get driver code for language
            driverCode: question?.templates?.find(template => template.language === language)?.driverCode ?? null,
        };
        const response = await fetchPost("/api/compiler", dataForCompilerService);
        if (response.status == 201) {
            const compileResult: CompilerServiceResult = response;
            console.log(compileResult);
            setRunCodeResults(compileResult);
        } else {
            console.log(response.data.message)
            alert(response.data.message);
        }
    };

    useEffect(() => {
        if (!question) return;
        // reset compile results on new question
        setRunCodeResults(defaultRunCodeResults);
    }, [question]);
    
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

    //change editor tab size to 4
    editorRef.current?.getModel()?.updateOptions({ tabSize: 4 });
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
            />
            <Button variant="contained" onClick={runTests}>
                Run Tests
            </Button>
            <RunCode runResults={RunCodeResults}/>
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
