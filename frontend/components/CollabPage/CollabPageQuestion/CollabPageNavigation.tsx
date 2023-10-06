import React from "react";
import NextQnHandshakeModal from "./NextQnHandshakeModal";
import {
    Button,
    Stack,
} from "@mui/material";

interface CollabPageNavigationProps {
    handleNextQuestion: () => void;
    isNextQnHandshakeOpen: boolean;
    setIsNextQnHandshakeOpen: (isOpen: boolean) => void;
    handleIPressedAccept: () => void;
    handleIPressedReject: () => void;
    iHaveAcceptedNextQn: boolean;
}

function CollabPageNavigation(
        { handleNextQuestion,
        isNextQnHandshakeOpen,
        setIsNextQnHandshakeOpen,
        handleIPressedAccept,
        handleIPressedReject,
        iHaveAcceptedNextQn }: CollabPageNavigationProps) {
    
    const NextQnHandshakeModalProps = {
        isNextQnHandshakeOpen: isNextQnHandshakeOpen,
        setIsNextQnHandshakeOpen: setIsNextQnHandshakeOpen,
        handleIPressedAccept: handleIPressedAccept,
        handleIPressedReject: handleIPressedReject,
        iHaveAcceptedNextQn: iHaveAcceptedNextQn,
    }        
    //Navigation bar with next question button
    return (
        <div>
            <NextQnHandshakeModal {...NextQnHandshakeModalProps} />
            <Stack direction="row" spacing={2}>
                <Button
                    variant="outlined"
                    onClick={handleNextQuestion}
                >
                    Next Question
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                >
                    End Session
                </Button>
            </Stack>
        </div>
    );

}

export default CollabPageNavigation;
