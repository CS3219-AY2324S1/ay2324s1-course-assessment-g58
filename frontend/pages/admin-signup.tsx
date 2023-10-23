import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import AdminSignup from "@/components/LoginPage/AdminSignup";

const AdminSignupPage: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    });

    if (user) {
        return (
            //loading text
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return <AdminSignup />;
};

export default AdminSignupPage;
