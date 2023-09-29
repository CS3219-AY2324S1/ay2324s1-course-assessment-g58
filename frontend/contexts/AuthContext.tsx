import React, { createContext, ReactNode, useState, useContext } from "react";
import { useRouter } from "next/router";
import { fetchPost } from "@/utils/apiHelpers";

interface AuthContextType {
    user: string | null;
    admin: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [admin, setAdmin] = useState<boolean>(false);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        // Login user
        const res = await fetchPost("/api/login", {
            email: email,
            password: password,
        });

        const user = res.data;

        // Check if the login is successful
        if (res.status === 200 && res.data) {
            setUser(user.username);
            setAdmin(user.admin);
            router.push("/");
        } else {
            alert("Login unsuccessful");
        }
    };

    const logout = () => {
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
