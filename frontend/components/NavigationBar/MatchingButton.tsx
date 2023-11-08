import { useAuth } from "@/contexts/AuthContext";
import { useMatching } from "@/contexts/MatchingContext";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { LANGUAGE, DIFFICULTY } from "@/utils/enums";

const MatchingButton = () => {
    const { user } = useAuth();
    const { startMatching, cancelMatching, handleTimerExpire } = useMatching();
    const [language, setLanguage] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [open, setOpen] = useState(false);
    const [isTimeout, setTimeout] = useState(false);
    const [isMatching, setMatching] = useState(false);
    const [missingLanguage, setMissingLanguage] = useState(false);
    const [missingDifficulty, setMissingDifficulty] = useState(false);

    const langOptions = Object.keys(LANGUAGE).map((key) => ({
        key: key,
        value: (LANGUAGE as any)[key],
    }));

    const [progress, setProgress] = useState(0);
    const waitTime = 30000;
    const router = useRouter();
    const timerRef = useRef<number | null>(null);
    const handleClose = (event: any, reason: string) => {
        if (reason && reason == "backdropClick")
            return; /* This prevents modal from closing on an external click */
        // Reset variables
        cancelMatching();
        setMatching(false);
        setOpen(false);
        setLanguage("");
        setDifficulty("");
        setTimeout(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleMatching = () => {
        setTimeout(false);
        // Handle errors
        if (difficulty === "" || language === "") {
            setMissingDifficulty(difficulty === "");
            setMissingLanguage(language === "");
            return;
        }

        setMatching(true);

        // Starts matching using MatchingContext
        startMatching(user!, difficulty!, language!);

        // Start the matchmaking timer
        if (timerRef.current) {
            clearInterval(timerRef.current); // Clear any existing timer
        }
        setProgress(0);

        timerRef.current = window.setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress < 100 ? prevProgress + 0.1 : 100
            );
        }, waitTime / 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    };

    useEffect(() => {
        if (progress >= 100) {
            console.log("matching-dialog: time expired!");
            handleTimerExpire();
            setMatching(false);
            setTimeout(true);
            setProgress(0);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, [progress]);

    useEffect(() => {
        // On successful match, redirect to collab page, stop timer, stop matching
        if (router.pathname === "/collab") {
            setOpen(false); // Close the dialog box
            setMatching(false); // Stop matching
            if (timerRef.current) {
                clearInterval(timerRef.current); // Clear the timer
            }
            setProgress(0); // Reset progress
        }
    }, [router.pathname]);

    const elapsedTime = (progress / 100) * waitTime;
    const remainingTime = waitTime - elapsedTime; // Remaining time until the countdown is finished
    const remainingTimeInSeconds = Math.floor(remainingTime / 1000);
    const remainingMinutes = Math.floor(remainingTimeInSeconds / 60);
    const remainingSeconds = remainingTimeInSeconds % 60;

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                className=" bg-blue-400"
            >
                Match
            </Button>
            <Dialog open={open} fullWidth maxWidth="sm" onClose={handleClose}>
                <DialogTitle id="Matching-dialog-title">
                    Start Prepping
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="Matching-dialog-description"
                        className="mb-2"
                    >
                        {isMatching
                            ? "Finding you a suitable match..."
                            : "Select your desired difficulty and language"}
                    </DialogContentText>
                    {isMatching ? (
                        <Stack className="items-center">
                            <CircularProgress size="4rem" thickness={4} />
                            <Typography variant="caption" display="block" gutterBottom>
                                Time Remaining: {remainingMinutes}:{remainingSeconds.toString().padStart(2, '0')}
                            </Typography>
                        </Stack>
                    ) : (
                        <Stack>
                            <FormControl
                                className="m-2"
                                error={missingDifficulty}
                            >
                                <InputLabel id="difficulty-label">
                                    Difficulty
                                </InputLabel>
                                <Select
                                    labelId="difficulty-label"
                                    label="Difficulty"
                                    className="w-full"
                                    value={difficulty}
                                    onChange={(e) =>
                                        setDifficulty(e.target.value)
                                    }
                                >
                                    {Object.values(DIFFICULTY).map((value) => {
                                        return (
                                            <MenuItem key={value} value={value}>
                                                {value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {missingDifficulty && (
                                    <FormHelperText>
                                        Please select a value
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                className="m-2"
                                error={missingLanguage}
                            >
                                <InputLabel id="language-label">
                                    Language
                                </InputLabel>
                                <Select
                                    labelId="language-label"
                                    label="language"
                                    className="w-full"
                                    value={language}
                                    onChange={(e) => {
                                        setLanguage(e.target.value);
                                    }}
                                >
                                    {langOptions.map((option) => {
                                        return (
                                            <MenuItem
                                                key={option.value}
                                                value={option.key}
                                            >
                                                {option.value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {missingLanguage && (
                                    <FormHelperText>
                                        Please select a value
                                    </FormHelperText>
                                )}
                            </FormControl>
                            {isTimeout && (
                                <Typography
                                    className="m-2"
                                    variant="subtitle2"
                                    color="error"
                                >
                                    We could not find you a match right now.
                                    Please try again later!
                                </Typography>
                            )}
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    {!isMatching && (
                        <Button
                            variant="outlined"
                            style={{ textTransform: "none" }}
                            onClick={handleMatching}
                            className="m-2"
                        >
                            Begin Matchmaking
                        </Button>
                    )}
                    {/* See https://stackoverflow.com/questions/57329278/how-to-handle-outside-click-on-dialog-modal */}
                    {/* @ts-ignore */}
                    <Button
                        variant="outlined"
                        style={{ textTransform: "none" }}
                        onClick={handleClose}
                        color="error"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MatchingButton;
