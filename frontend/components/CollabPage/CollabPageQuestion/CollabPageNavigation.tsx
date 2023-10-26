import React from "react";
import NextQnHandshakeModal from "./NextQnHandshakeModal";
import { Button, Stack } from "@mui/material";

interface CollabPageNavigationProps {
    handleNextQuestion: () => void;
    isNextQnHandshakeOpen: boolean;
    setIsNextQnHandshakeOpen: (isOpen: boolean) => void;
    handleIPressedAccept: () => void;
    handleIPressedReject: () => void;
    iHaveAcceptedNextQn: boolean;
    toggleInterviewerView: () => void;
    showInterviewerView: boolean;
    isInterviewer: boolean | undefined;
    startRoleChange: () => void;
}

function CollabPageNavigation({
    handleNextQuestion,
    isNextQnHandshakeOpen,
    setIsNextQnHandshakeOpen,
    handleIPressedAccept,
    handleIPressedReject,
    iHaveAcceptedNextQn,
    toggleInterviewerView,
    showInterviewerView,
    isInterviewer,
    startRoleChange,
}: CollabPageNavigationProps) {
    const NextQnHandshakeModalProps = {
        isNextQnHandshakeOpen: isNextQnHandshakeOpen,
        setIsNextQnHandshakeOpen: setIsNextQnHandshakeOpen,
        handleIPressedAccept: handleIPressedAccept,
        handleIPressedReject: handleIPressedReject,
        iHaveAcceptedNextQn: iHaveAcceptedNextQn,
    };

    //Navigation bar to switch roles, toggle interviewer view, go to next question and end session
    return (
        <div>
            <NextQnHandshakeModal {...NextQnHandshakeModalProps} />
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleInterviewerView}
                    disabled={!isInterviewer}
                >
                    {showInterviewerView
                        ? "Hide Interviewer View"
                        : "Show Interviewer View"}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={startRoleChange}
                >
                    Switch roles
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleNextQuestion}
                >
                    Next Question
                </Button>
                <Button variant="contained" color="error">
                    End Session
                </Button>
            </Stack>
        </div>
    );
}

export default CollabPageNavigation;
