import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Typography from "@mui/material/Typography";
import { Box, Paper, Stack, Button } from "@mui/material";
import NavigationBar from "../NavigationBar/NavigationBar";
import MatchingButton from "../NavigationBar/MatchingButton";
import Image from "next/image";

interface HomePageProps {}

function HomePage(props: HomePageProps) {
    const { user, logout } = useAuth();

    return (
        <>
              {/* Banner */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingY={3}
                sx={{backgroundColor:"#007bff",
                color:"#fff"}}
            >
                <Typography variant="h4">
                    Welcome to PeerPrep, {user}
                </Typography>
            </Box>

            {/* Main Content */}
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
                        Lets Ace Those Interviews!
                    </Typography>
                    <MatchingButton />
                </Stack>
            </Stack>

            {/* Tips and Resources section */}
            <Box padding={5}>
                <Paper elevation={3} style={{ padding: 20 }} sx={{maxWidth: 1000, marginLeft: 25}}>
                    <Typography variant="h4" color="text.primary">
                        Interview Tips
                    </Typography>


                    {/* Tip 1 */}
                    <Box marginBottom={3}>
                        <Typography variant="h5" color="text.primary">
                            Tip 1: Master Your Programming Language
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Become proficient in your preferred programming language. Knowing
                            language-specific details can give you an edge during interviews.
                        </Typography>
                    </Box>

                    {/* Tip 2 */}
                    <Box marginBottom={3}>
                        <Typography variant="h5" color="text.primary">
                            Tip 2: Understand the Company 
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Research the company culture, values, and mission. Understand the 
                            industry they operate in and the specific challenges they might be facing. 
                            This knowledge can help you tailor your responses to align with the company goals.
                        </Typography>
                    </Box>

                    {/* Resources */}
                    <Box marginBottom={3}>
                        <Typography variant="h5" color="text.primary">
                            Resource: Commonly asked interview questions and how to answer them
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Check out some popular interview questions
                            from recruiters and tech CEOs.
                        </Typography>
                    </Box>

                    <Box marginBottom={3}>
                        <a href="https://skillcrush.com/blog/technical-interviews/" target="_blank" rel="noopener noreferrer">
                            Check out website for more details
                        </a>
                    </Box>

                </Paper>
            </Box>
        </>
    );
}

export default HomePage;
