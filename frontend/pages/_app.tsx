import "../styles/globals.css";
import { AppProps } from "next/app";
import MainContext from "../contexts/MainContext";
import NavigationBar from "@/components/NavigationBar/NavigationBar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MainContext>
            <div>
                {/* NavBar 6vh */}
                <NavigationBar />
                <main>
                    <Component {...pageProps} />
                </main>
            </div>
        </MainContext>
    );
}

export default MyApp;
