import React, {
    createContext,
    ReactNode,
    useState,
    useContext,
    useEffect,
} from "react";
import { useRouter } from "next/router";
import { fetchPost } from "@/utils/apiHelpers";

interface MatchingContextType {
    roomId: string | null;
    socket: string | null;
    userId: string | null;
    difficulty: string | null;
    language: string | null;
}

const MatchingContext = createContext<MatchingContextType | undefined>(
    undefined
);

export const MatchingProvider = ({ children }: { children: ReactNode }) => {
    const [roomId, setRoomId] = useState("");
    const [socket, setSocket] = useState("");
    const [userId, setUserId] = useState("");
    const [language, setLanguage] = useState("");
    const [difficulty, setDifficulty] = useState("");
    return (
        <MatchingContext.Provider
            value={{ userId, socket, difficulty, language, roomId }}
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
