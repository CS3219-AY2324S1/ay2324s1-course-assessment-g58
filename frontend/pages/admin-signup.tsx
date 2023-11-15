import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import AdminSignup from "@/components/LoginPage/AdminSignup";
import { fetchPost } from "@/utils/apiHelpers";

const AdminSignupPage: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [isVerified, setVerified] = useState(false);
    const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    });

    useEffect(() => {
        /* On load, verify if user can be on this page */
        const verifyUser = async () => {
            const id = router.query.id;
            await fetchPost("/api/users/verify-invitation", {
                id: id,
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    if (redirectTimer) clearTimeout(redirectTimer);
                    setVerified(true);
                } else {
                    router.push("/login?mode=register");
                }
            });
        };
        if (router.query.email) verifyUser();
    }, [router.query.email]);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/login?mode=register");
        }, 5000);
        setRedirectTimer(timer);
    }, []);

    if (user || !isVerified) {
        return (
            //loading text
            <div>
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return <AdminSignup />;
    }
};

export default AdminSignupPage;
