import React from "react";
import { NextPage } from "next";
import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/components/LoginPage/LoginPage";
import NavigationBar from "@/components/NavigationBar/NavigationBar";

const Profile: NextPage = () => {
    const { user } = useAuth();

    if (!user) {
        return <LoginPage />;
    }

    return (
        <>
            <NavigationBar />
            <ProfilePage />
        </>
    );
};

export default Profile;
