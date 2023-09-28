import React, { createContext, ReactNode, useState, useContext, FormEvent } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
    user: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        //TODO: implement login
        setUser(email);
        
    };

    const logout = () => {
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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
