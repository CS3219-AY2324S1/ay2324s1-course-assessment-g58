import React, { createContext, ReactNode, useState, useContext, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { fetchGet } from "@/utils/apiHelpers";

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
        //TODO: proper login logic
        // Fetch the list of users
        const res = await fetchGet("/api/users");
        
        // Check if the response is successful and contains data
        if (res.status === 200 && res.data) {
            // Check if the provided email exists in the list of users
            const userExists = res.data.some((user: any) => user.email === email);
            
            if (userExists) {
                setUser(email);
            } else {
                alert("No such user");
            }
        } else {
            // Handle any errors or unexpected responses here
            alert("Failed to fetch users or unexpected response format.");
        }
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
