import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import HomePage from "../components/HomePage/HomePage";
import { NextPage } from "next";
import NavigationBar from "@/components/NavigationBar/NavigationBar";

const Home: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    });

    if (!user) {
        return (
            //loading text
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <NavigationBar />
            <HomePage />
        </>
    );
};

export default Home;
