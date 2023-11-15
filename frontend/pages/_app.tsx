import "../styles/globals.css";
import { AppProps } from "next/app";
import MainContext from "../contexts/MainContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AlertColor, CssBaseline, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider>
                <MainContext>
                    <div>
                        <main>
                            <Component {...pageProps} />
                        </main>
                    </div>
                </MainContext>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default MyApp;
