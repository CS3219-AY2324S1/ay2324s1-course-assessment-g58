import React, {
    createContext,
    ReactNode,
    useState,
    useContext,
    useEffect,
} from "react";
import { useRouter } from "next/router";
import { fetchPost } from "@/utils/apiHelpers";
import { messageHandler } from "@/utils/handlers";

interface AuthContextType {
    user: string | null;
    admin: boolean | null;
    email: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    setUser: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const fetchToken = () => {
    return localStorage.getItem("accessToken");
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [admin, setAdmin] = useState<boolean | null>(null);
    const router = useRouter();

    async function fetchUserFromToken() {
        const token = fetchToken();

        if (!user && token) {
            try {
                const res = await fetchPost("/api/token-login", {
                    token: token,
                });

                const userData = res.data;

                setUser(userData.username);
                setEmail(userData.email);
                setAdmin(userData.admin);
            } catch (error: any) {
                localStorage.removeItem("accessToken");
            }
        }
    }

    // try to login using token
    useEffect(() => {
        if (!user) {
            fetchUserFromToken();
        }
    }, [user]);

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
            setEmail(user.email);
            setAdmin(user.admin);
            router.push("/");
        } else {
            messageHandler("Login unsuccessful", "error");
        }
    };

    const logout = () => {
        setUser(null);
        setEmail(null);
        setAdmin(null);
        localStorage.removeItem("accessToken");
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{ user, admin, email, login, logout, setUser }}
        >
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
