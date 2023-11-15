// Source: https://github.com/mui/material-ui/blob/v5.14.13/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { fetchPost } from "@/utils/apiHelpers";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import PasswordStrengthCheck, { testPasswordStrength, PasswordStrength } from "./PasswordStength";
import { messageHandler } from "@/utils/handlers";

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                MUI
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function AdminSignup() {
    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Check password is strong
        if (testPasswordStrength(password) !== PasswordStrength.STRONG) {
            messageHandler("Your password is not strong", "error");
            return;
        }
        await fetchPost("/api/users", {
            username: username,
            email: router.query.email,
            password: password,
            admin: true,
        })
            .then((res) => {
                if (res.status == 201) {
                    alert("Success! Added: " + res.data.email);
                    router.push("/login?mode=login");
                } else {
                    messageHandler(res.message, "error");
                }
            })
            .catch((err) => {
                messageHandler(err.message, "error");
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                label="Email Address"
                                value={router.query.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Username"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <PasswordStrengthCheck password={password} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Role"
                                value={"Admin"}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                href="#"
                                variant="body2"
                                onClick={() => router.push("/login?mode=login")}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}
