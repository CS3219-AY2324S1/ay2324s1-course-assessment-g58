import "../styles/globals.css";
import { AppProps } from "next/app";
import MainContext from "../contexts/MainContext";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import React from "react";

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
            <MainContext>
                <div>
                    <NavigationBar />
                    {/* NavBar 6vh */}
                    <main>
                        <Component {...pageProps} />
                    </main>
                </div>
            </MainContext>
        </ThemeProvider>
    );
}

export default MyApp;
