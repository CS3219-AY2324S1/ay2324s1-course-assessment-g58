import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { useAuth } from "@/contexts/AuthContext";

const Profile: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/profile");
        }
    });

    if (!user) {
        return (
            //loading text
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl font-bold">Loading...</h1>
            </div>
        );
    }

    return <ProfilePage />;
};

export default Profile;
