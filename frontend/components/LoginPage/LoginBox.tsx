import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";

const LoginBox = () => {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await login(email, password);
        router.push("/");
    };

    return (
        <div className="h-[90vh] w-full relative mx-auto font-poppins bg-f0f2f5 text-1c1e21">
            <div className="flex justify-center items-center w-full max-w-1000px absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex-none w-2/5 text-center">
                    <div className="bg-white border-none rounded-lg shadow-md p-5 max-w-xs mx-auto">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Email address"
                                className="w-full my-1 h-11 border border-dddfe2 text-1d2129 px-2 outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full my-1 h-11 border border-dddfe2 text-1d2129 px-2 outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="w-full mt-1 h-11 bg-blue-600 rounded-md text-white text-xl font-bold"
                                type="submit"
                            >
                                Login
                            </button>
                        </form>

                        <a
                            href="#"
                            className="block text-1877f2 text-sm no-underline pt-2 pb-5 border-b border-dadde1"
                        >
                            Forgotten password?
                        </a>
                        <a
                            href="#"
                            className="block text-1877f2 text-sm no-underline pt-2 pb-5 border-b border-dadde1"
                            onClick={() => router.push("/login?mode=register")}
                        >
                            Create a New Account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBox;
