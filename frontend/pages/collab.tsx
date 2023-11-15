import CollabPage from "@/components/CollabPage/CollabPage";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { NextPage } from "next";
import React from "react";

const Collab: NextPage = () => {
    return (
        <>
            <NavigationBar />
            <CollabPage />
        </>
    );
};

export default Collab;
