import { useAuth } from "@/contexts/AuthContext";
import { useMatching } from "@/contexts/MatchingContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import CodeEditor from "./CodeEditor";

const CollabPage = () => {
    const { language, roomId, cancelMatching } = useMatching();
    const router = useRouter();

    useEffect(() => {
        // Reject people with no roomId
        if (router.pathname == "/collab" && roomId === "") {
            router.push("/");
        }
    }, [roomId, router.pathname]);

    // When unmounting this component i.e leaving page, cancel matching
    useEffect(() => {
        return () => {
            cancelMatching();
        };
    }, []);

    return (
        <CodeEditor
            language={language}
            editorContent={
                (language === "Python" ? "## " : "// ") +
                "Type your solution here"
            }
            roomId={roomId}
        />
    );
};

export default CollabPage;
