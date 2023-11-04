import React, { createContext, ReactNode, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Socket, io } from "socket.io-client";
import Question from "@/types/Question";

interface MatchingContextType {
    roomId: string;
    userId: string;
    difficulty: string;
    language: string;
    startMatching: (user: string, difficulty: string, language: string) => void;
    cancelMatching: () => void;
    handleTimerExpire: () => void;
    questions: Question[];
    socketId: string;
}

type MatchType = {
    socketId: string;
    userId: string;
    difficulty: string;
    language: string;
    roomId: string;
    questions: Question[];
    
};

const MatchingContext = createContext<MatchingContextType | undefined>(
    undefined
);

export const MatchingProvider = ({ children }: { children: ReactNode }) => {
    //TODO: memomize some of these eg questions with UseMemo
    const [roomId, setRoomId] = useState("");
    const [socket, setSocket] = useState<Socket>();
    const [userId, setUserId] = useState("");
    const [language, setLanguage] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [socketId, setSocketId] = useState("");

    const router = useRouter();

    const startMatching = (
        user: string,
        difficulty: string,
        language: string
    ) => {
        // Connect to the server
        const socket = io(
            process.env.NEXT_PUBLIC_MATCHING_SERVER_URL as string
        );
        setSocket(socket);

        // Handle successful connection
        socket.on("connect", () => {
            console.log("Connected to the server");

            // Emit the 'joinQueue' event to join the queue
            socket.emit("joinQueue", {
                userId: user,
                difficulty: difficulty,
                language: language,
            });
        });

        // Handle 'match' event
        socket.on("match", (matchingUser: MatchType) => {
            console.log("Match found:", matchingUser);
            // TODO: do we need socketId ?
            setRoomId(matchingUser.roomId);
            setUserId(matchingUser.userId); // TODO: confirm is this is the local or matched user
            setDifficulty(matchingUser.difficulty);
            setLanguage(matchingUser.language);
            setQuestions(matchingUser.questions);
            setSocketId(matchingUser.socketId);
            
            router.push("/collab");
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("Disconnected from the server");
        });

        return () => {
            cancelMatching();
        };
    };

    // Resets variables
    const cancelMatching = () => {
        if (socket) socket.disconnect();
        setRoomId("");
        setUserId(""); // TODO: confirm is this is the local or matched user
        setDifficulty("");
        setLanguage("");
        setSocketId("");
    };

    // Handle timer timeout event
    const handleTimerExpire = () => {
        console.log("matching-context: timer expired!");
        if (socket) socket.disconnect();
    };

    return (
        <MatchingContext.Provider
            value={{
                userId,
                difficulty,
                language,
                roomId,
                startMatching,
                cancelMatching,
                handleTimerExpire,
                questions,
                socketId,
            }}
        >
            {children}
        </MatchingContext.Provider>
    );
};

export const useMatching = (): MatchingContextType => {
    const context = useContext(MatchingContext);
    if (!context) {
        throw new Error("useMatching must be used within an MatchingProvider");
    }
    return context;
};
