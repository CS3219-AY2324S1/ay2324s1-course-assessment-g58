import React, { useState } from "react";
import { useRouter } from "next/router";
import { fetchPost, fetchGet } from "@/utils/apiHelpers";

type User = {
    username: string;
    email: string;
};

const SignupBox = () => {
    const router = useRouter();

    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [admin, setAdmin] = useState<boolean | null>(null);

    const handleSignupClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        console.log(
            "sending username, email, password: {} {} {} ",
            username,
            email,
            password,
            admin
        );
        await fetchPost("/api/users", {
            username: username,
            email: email,
            password: password,
            admin: admin,
        })
            .then((res) => {
                if (res.status == 201) {
                    alert("Success! Added: " + res.data.email);
                    router.push("/login?mode=login");
                } else {
                    alert(res.message);
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="h-[90vh] w-screen relative mx-auto font-poppins bg-f0f2f5 text-1c1e21">
            <div className="flex justify-center items-center w-full max-w-1000px absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex-none text-center w-2/5">
                    <div className="bg-white border-none rounded-xl shadow-sm p-5 max-w-md">
                        <h1 className="text-2xl mb-5">Signup</h1>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full my-1 h-11 border border-dddfe2 text-1d2129 px-2 outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                        <select
                            name="Role"
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => {
                                e.target.value === "admin"
                                    ? setAdmin(true)
                                    : setAdmin(false);
                            }}
                            required
                        >
                            <option disabled selected>
                                Select a role
                            </option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <button
                            className="w-full mt-1 h-11 bg-blue-600 rounded-md text-white text-xl font-bold"
                            onClick={handleSignupClick}
                        >
                            Sign Up
                        </button>
                        <a
                            href="#"
                            className="block mt-2.5 mb-5 text-1877f2 text-sm underline pb-2 border-b border-dadde1"
                            onClick={() => router.push("/login?mode=login")}
                        >
                            Already have an account? Log In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupBox;
