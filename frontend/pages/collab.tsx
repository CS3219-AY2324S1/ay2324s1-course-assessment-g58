import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { NextPage } from "next";
import LoginPage from "@/components/LoginPage/LoginPage";
import CodeEditor from "@/components/CollabPage/CodeEditor";

const Collab: NextPage = () => {
    const { user } = useAuth();

    return user ? <CodeEditor /> : <LoginPage />;
};

export default Collab;
