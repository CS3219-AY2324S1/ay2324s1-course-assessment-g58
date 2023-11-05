import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import QuestionPage from "../components/QuestionsPage/QuestionsPage";
import { NextPage } from "next";

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

    return <QuestionPage />;
};

export default Home;
