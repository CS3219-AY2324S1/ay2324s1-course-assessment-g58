import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginBox from "./LoginBox";
import SignupBox from "./SignupBox";
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

const LoginPage = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true); // Default to login mode

    // Check if we are in login or register mode, to show correct component
    // (Login box and signup box is in same page)
    useEffect(() => {
        const { mode } = router.query;
        setIsLogin((prev) =>
            mode === "register" ? false : mode === "login" ? true : prev
        );
    }, [router]);

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={5}>
                <Stack
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    padding={5}
                >
                    <Typography variant="h2" color="text.primary">
                        Welcome to PeerPrep.
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        A technical interview preparation platform with a peer
                        matching system made for you to ace your interviews.
                    </Typography>
                    <Image
                        alt="Graphic of people collaborating on programming"
                        src="/assets/coding_collab.svg"
                        width="600"
                        height="500"
                    />
                </Stack>
            </Grid>
            <Grid item xs={6}>
                {isLogin ? <LoginBox /> : <SignupBox />}
            </Grid>
        </Grid>
    );
};

export default LoginPage;
