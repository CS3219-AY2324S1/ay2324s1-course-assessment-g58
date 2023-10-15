import React, { createContext, ReactNode, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Socket, io } from "socket.io-client";

export type Question = {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
};

interface MatchingContextType {
    roomId: string;
    userId: string;
    difficulty: string;
    language: string;
    startMatching: (user: string, difficulty: string, language: string) => void;
    cancelMatching: () => void;
    handleTimerExpire: () => void;
    questions: Question[];
}

type MatchType = {
    socketId: string;
    userId: string;
    difficulty: string;
    language: string;
    room: string;
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

    const router = useRouter();

    const startMatching = (
        user: string,
        difficulty: string,
        language: string
    ) => {
        // Connect to the server
        const socket = io("http://localhost:3004");
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
            setRoomId(matchingUser.room);
            setUserId(matchingUser.userId); // TODO: confirm is this is the local or matched user
            setDifficulty(matchingUser.difficulty);
            setLanguage(matchingUser.language);
            setQuestions(matchingUser.questions);
            console.log(matchingUser.questions);
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
