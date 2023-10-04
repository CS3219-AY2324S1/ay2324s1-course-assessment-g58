import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { NextPage } from "next";
import LoginPage from "@/components/LoginPage/LoginPage";
import CodeEditor from "@/components/CollabPage/CodeEditor";
import { LANGUAGE, COMMENT } from "@/utils/enums";

const Room: NextPage = () => {
    const { user } = useAuth();
    // TODO: integrate from match context
    // const { userId, language, roomId } = useMatching();
    const language = LANGUAGE.PYTHON;
    const comment = COMMENT.PYTHON;
    const roomId = 1;

    // TODO: change language and starting code based on matching context
    return user ? (
        <CodeEditor
            language={language}
            editorContent={`${comment} Type your solution here`}
            roomId={roomId}
        />
    ) : (
        <LoginPage />
    );
};

export default Room;
