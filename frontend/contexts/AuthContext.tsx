import React, {
    createContext,
    ReactNode,
    useState,
    useContext,
    useEffect,
} from "react";
import { useRouter } from "next/router";
import { fetchPost } from "@/utils/apiHelpers";

interface AuthContextType {
    user: string | null;
    admin: boolean | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [admin, setAdmin] = useState<boolean | null>(null);
    const router = useRouter();

    async function fetchUserFromToken() {
        const token = localStorage.getItem("accessToken");

        if (!user && token) {
            try {
                const res = await fetchPost("/api/token-login", {
                    token: token,
                });

                const userData = res.data;

                setUser(userData.username);
                setAdmin(userData.admin);
            } catch (error: any) {
                localStorage.removeItem("accessToken");
                alert("Please login again");
            }
        }
    }

    // try to login using token
    useEffect(() => {
        if (!user) {
            fetchUserFromToken();
        }
    });

    const login = async (email: string, password: string) => {
        // login user
        const res = await fetchPost("/api/login", {
            email: email,
            password: password,
        });

        if (!res) {
            return;
        }

        const user = res.data;

        // store token locally
        if (user) {
            localStorage.setItem("accessToken", user.token);
        }

        // check if the login is successful
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
        setAdmin(null);
        localStorage.removeItem("accessToken");
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
