import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Typography from "@mui/material/Typography";
import { Box, Paper, Stack } from "@mui/material";
import NavigationBar from "../NavigationBar/NavigationBar";
import MatchingButton from "../NavigationBar/MatchingButton";

interface HomePageProps {}

function HomePage(props: HomePageProps) {
    const { user, logout } = useAuth();

    return (
        <>
            <Stack
                display="flex"
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                padding={5}
            >
                <Stack
                    display="flex"
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    padding={5}
                >
                    <Typography
                        variant="h2"
                        color="text.primary"
                        style={{ margin: 5 }}
                    >
                        Welcome, {user}.
                    </Typography>
                    <MatchingButton />
                </Stack>
            </Stack>
        </>
    );
}

export default HomePage;
