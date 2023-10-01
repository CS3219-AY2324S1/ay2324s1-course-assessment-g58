import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/components/LoginPage/LoginPage";

const Profile: NextPage = () => {
    const { user } = useAuth();

    return user ? <ProfilePage /> : <LoginPage />;
};

export default Profile;
