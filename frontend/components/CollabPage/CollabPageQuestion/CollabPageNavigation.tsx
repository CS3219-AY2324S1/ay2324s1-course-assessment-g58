import React from "react";
import NextQnHandshakeModal from "./NextQnHandshakeModal";
import EndSessionHandshakeModal from "./EndSessionHandshakeModal";
import { Button, Stack } from "@mui/material";

interface CollabPageNavigationProps {
    handleNextQuestion: () => void;
    isNextQnHandshakeOpen: boolean;
    setIsNextQnHandshakeOpen: (isOpen: boolean) => void;
    handleIPressedAccept: () => void;
    handleIPressedReject: () => void;
    iHaveAcceptedNextQn: boolean;
    isLastQuestion: boolean;
    toggleInterviewerView: () => void;
    showInterviewerView: boolean;
    isInterviewer: boolean | undefined;
    startRoleChange: () => void;
    handleEndSession: () => void;
    isEndSessionHandshakeOpen: boolean;
    setIsEndSessionHandshakeOpen: (isOpen: boolean) => void;
    handleIPressedAcceptEndSession: () => void;
    handleIPressedRejectEndSession: () => void;
    iHaveAcceptedEndSession: boolean;
}

function CollabPageNavigation({
    handleNextQuestion,
    isNextQnHandshakeOpen,
    setIsNextQnHandshakeOpen,
    handleIPressedAccept,
    handleIPressedReject,
    iHaveAcceptedNextQn,
    isLastQuestion,
    toggleInterviewerView,
    showInterviewerView,
    isInterviewer,
    startRoleChange,
    handleEndSession,
    isEndSessionHandshakeOpen,
    setIsEndSessionHandshakeOpen,
    handleIPressedAcceptEndSession,
    handleIPressedRejectEndSession,
    iHaveAcceptedEndSession,
}: CollabPageNavigationProps) {
    const NextQnHandshakeModalProps = {
        isNextQnHandshakeOpen: isNextQnHandshakeOpen,
        setIsNextQnHandshakeOpen: setIsNextQnHandshakeOpen,
        handleIPressedAccept: handleIPressedAccept,
        handleIPressedReject: handleIPressedReject,
        iHaveAcceptedNextQn: iHaveAcceptedNextQn,
        isLastQuestion: isLastQuestion,
    };

    const EndSessionHandshakeModalProps = {
        isEndSessionHandshakeOpen: isEndSessionHandshakeOpen,
        setIsEndSessionHandshakeOpen: setIsEndSessionHandshakeOpen,
        handleIPressedAcceptEndSession: handleIPressedAcceptEndSession,
        handleIPressedRejectEndSession: handleIPressedRejectEndSession,
        iHaveAcceptedEndSession: iHaveAcceptedEndSession,
    };

    //Navigation bar to switch roles, toggle interviewer view, go to next question and end session
    return (
        <div>
            <NextQnHandshakeModal {...NextQnHandshakeModalProps} />
            <EndSessionHandshakeModal {...EndSessionHandshakeModalProps} />
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
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleEndSession}
                >
                    End Session
                </Button>
            </Stack>
        </div>
    );
}

export default CollabPageNavigation;
