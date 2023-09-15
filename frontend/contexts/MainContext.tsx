import { AuthProvider } from "./AuthContext"
import { ReactNode } from "react"

const MainContext = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default MainContext;
