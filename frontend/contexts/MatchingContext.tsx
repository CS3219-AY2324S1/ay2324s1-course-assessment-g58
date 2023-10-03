import React, { createContext, ReactNode, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Socket, io } from "socket.io-client";

interface MatchingContextType {
    roomId: string | null;
    userId: string | null;
    difficulty: string | null;
    language: string | null;
    startMatching: (user: string) => void;
    cancelMatching: () => void;
    handleTimerExpire: () => void;
}

type MatchType = {
    socketId: string;
    userId: string;
    difficulty: string;
    language: string;
    room: string;
};

const MatchingContext = createContext<MatchingContextType | undefined>(
    undefined
);

export const MatchingProvider = ({ children }: { children: ReactNode }) => {
    const [roomId, setRoomId] = useState("");
    const [socket, setSocket] = useState<Socket>();
    const [userId, setUserId] = useState("");
    const [language, setLanguage] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const router = useRouter();

    const startMatching = (user: string) => {
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
            router.push("/collab");
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("Disconnected from the server");
        });
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
