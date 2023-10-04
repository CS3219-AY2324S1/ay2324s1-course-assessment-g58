import CollabPage from "@/components/CollabPage/CollabPage";
import CodeEditor from "@/components/CollabPage/CodeEditor";
import { NextPage } from "next";
import { useMatching } from "@/contexts/MatchingContext";

// types and enums
import { LANGUAGE, COMMENT } from "@/utils/enums";
import { useAuth } from "@/contexts/AuthContext";

const Collab: NextPage = () => {
    const user = useAuth();
    const { roomId, language, difficulty, cancelMatching } = useMatching();
    return (
        // <>
        //     <h1>Collab Room</h1>
        //     <h1>room: {roomId}</h1>
        //     <h1>language: {language}</h1>
        //     <h1>difficulty: {difficulty}</h1>
        // </>

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

export default Collab;
