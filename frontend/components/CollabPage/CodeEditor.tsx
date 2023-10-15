// components
import { useRef, useEffect, useState } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { LANGUAGE } from "@/utils/enums";
import { Socket, io } from "socket.io-client";

// types
import { editor } from "monaco-editor/esm/vs/editor/editor.api";

const CodeEditor = ({ language, editorContent, roomId }: Props) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const decorationRef = useRef<editor.IEditorDecorationsCollection | null>(
        null
    );
    const incomingRef = useRef(false);
    // const [socket, setSocket] = useState<Socket>();
    const socketRef = useRef<Socket | null>(null);

    // Connect to collab service socket via roomId
    //TODO: non hardcode url handling
    useEffect(() => {
        if (roomId === "") return;
        const socket = io("http://localhost:3005", {
            auth: {
                roomId: roomId,
            },
            autoConnect: false,
        });
        socket.connect();
        //setSocket(socket);
        socketRef.current = socket;

        socket?.on("text", (event: editor.IModelContentChangedEvent) => {
            incomingRef.current = true;
            editorRef.current?.getModel()?.applyEdits(event.changes);
        });

        socket?.on("select", (event: editor.ICursorSelectionChangedEvent) => {
            console.log(event);
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
        console.log("Editor has mounted, with socket ", socketRef.current);
        editorRef.current = editor;

        // handle all required event listeners
        handleSelectionEventListeners();
    };

    // when user makes a text edit
    const handleEditEvent: OnChange = (value, event) => {
        console.log("handle edit event: " + incomingRef.current);

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
                console.log(socketRef.current);
                socketRef.current?.emit("selection", event);
            }
        );
        console.log("selection event listener launched");
    }

    return (
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
    );
};

export default CodeEditor;

interface Props {
    language: string;
    editorContent: string;
    roomId: string;
}
