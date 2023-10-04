/* Common naviagtion bar across whole app */
import React from "react";
import Link from "next/link";
import { Box, Stack } from "@mui/material";
import MatchingButton from "./MatchingButton";
import { useAuth } from "@/contexts/AuthContext";

const NavigationBar = () => {
    const { user } = useAuth();
    return (
        <Box className="bg-blue-600 p-2 h-[50px]">
            <Stack
                direction="row"
                className="flex justify-between w-full max-w-screen-md mx-auto"
            >
                <Link
                    href="/"
                    className="text-white hover:bg-blue-500 px-3 py-1 rounded-md"
                >
                    Home
                </Link>
                {user && <MatchingButton />}
                <Link
                    href="/profile"
                    className="text-white hover:bg-blue-500 px-3 py-1 rounded-md"
                >
                    Profile
                </Link>
            </Stack>
        </Box>
    );
};

export default NavigationBar;
