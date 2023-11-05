import { AuthProvider } from "./AuthContext";
import { ReactNode } from "react";
import { MatchingProvider } from "./MatchingContext";

const MainContext = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <MatchingProvider>{children}</MatchingProvider>
        </AuthProvider>
    );
};

export default MainContext;
