/*Source: https://mui.com/material-ui/react-modal/*/
import React, { useEffect, useState, useRef } from "react";
import {
  CircularProgress,
  Stack,
  Typography,
  Modal,
  Box,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface NextQnHandshakeModalProps {
    isNextQnHandshakeOpen: boolean;
    setIsNextQnHandshakeOpen: (isOpen: boolean) => void;
    handleIPressedAccept: () => void;
    handleIPressedReject: () => void;
    iHaveAcceptedNextQn: boolean;
    isLastQuestion: boolean;
}

export default function BasicModal(
    { isNextQnHandshakeOpen,
      setIsNextQnHandshakeOpen,
      handleIPressedAccept,
      handleIPressedReject,
      iHaveAcceptedNextQn,
      isLastQuestion }: NextQnHandshakeModalProps) {
  const handleClose = (event: any, reason: string) => {
    if (reason && reason == "backdropClick") {
      return; /* This prevents modal from closing on an external click */
    }
    if (reason && reason == "escapeKeyDown") {
      return; //prevent user from closing dialog using esacpe button
    }
    setIsNextQnHandshakeOpen(false);
  };

  // Add timer that automatically rejects after 15s upon model opening
  const [progress, setProgress] = useState(0);
  const waitTime =10000;
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (isNextQnHandshakeOpen) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
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
    }
  }, [isNextQnHandshakeOpen]);

  useEffect(() => {
    if (isNextQnHandshakeOpen && progress >= 100) {
      handleIPressedReject();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [progress]);
  const elapsedTime = (progress / 100) * waitTime;
  const remainingTime = waitTime - elapsedTime; // Remaining time until the countdown is finished
  const remainingTimeInSeconds = Math.floor(remainingTime / 1000);
  const remainingMinutes = Math.floor(remainingTimeInSeconds / 60);
  const remainingSeconds = remainingTimeInSeconds % 60;

  return (
    <div>
      <Modal
        open={isNextQnHandshakeOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLastQuestion ?
            (<Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                This is the last question. Are you sure you want to end the session?
              </Alert>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Proposal to end the session.
              </Typography>
            </Stack>) : 
            (<Typography id="modal-modal-title" variant="h6" component="h2">
              Proposal to move on to the next question.
            </Typography>)
          }
          {iHaveAcceptedNextQn ? (
            <Stack className="items-center">
              <CircularProgress size="2rem" thickness={3} />
              <Typography>
                Waiting for other members to accept/reject the proposal.
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Time Remaining: {remainingMinutes}:{remainingSeconds.toString().padStart(2, '0')}
              </Typography>
            </Stack>
          ) : (
            <Box>
              <Typography variant="caption" display="block" gutterBottom>
                Time Remaining: {remainingMinutes}:{remainingSeconds.toString().padStart(2, '0')}
              </Typography>
              <Button
                variant="outlined"
                color="success"
                onClick={handleIPressedAccept}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleIPressedReject}
              >
                Reject
              </Button>
            </Box>
          )}
          
        </Box>
      </Modal>
    </div>
  );
}