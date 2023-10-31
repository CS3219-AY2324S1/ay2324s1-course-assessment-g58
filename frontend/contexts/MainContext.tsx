import { AuthProvider } from "./AuthContext";
import { ReactNode } from "react";
import { MatchingProvider } from "./MatchingContext";

interface MainContextType {
    theme: string | null;
}

const MainContext = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <MatchingProvider>{children}</MatchingProvider>
        </AuthProvider>
    );
};

export default MainContext;
