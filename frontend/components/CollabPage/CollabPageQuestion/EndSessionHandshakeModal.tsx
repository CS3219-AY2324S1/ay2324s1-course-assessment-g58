/*Source: https://mui.com/material-ui/react-modal/*/
import * as React from 'react';
import {
  CircularProgress,
  Stack,
  Typography,
  Modal,
  Box,
  Button,
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

interface EndSessionHandshakeModalProps {
    isEndSessionHandshakeOpen: boolean;
    setIsEndSessionHandshakeOpen: (isOpen: boolean) => void;
    handleIPressedAcceptEndSession: () => void;
    handleIPressedRejectEndSession: () => void;
    iHaveAcceptedEndSession: boolean;
}

export default function EndSessionModal(
    { isEndSessionHandshakeOpen,
      setIsEndSessionHandshakeOpen,
      handleIPressedAcceptEndSession,
      handleIPressedRejectEndSession,
      iHaveAcceptedEndSession }: EndSessionHandshakeModalProps) {
  const handleClose = (event: any, reason: string) => {
    if (reason && reason == "backdropClick")
      return; /* This prevents modal from closing on an external click */

      if (reason && reason == "escapeKeyDown") 
            return; //prevent user from closing dialog using esacpe button
    setIsEndSessionHandshakeOpen(false);
  };
  return (
    <div>
      <Modal
        open={isEndSessionHandshakeOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Proposal to end the session.
          </Typography>
          {iHaveAcceptedEndSession ? (
            <Stack className="items-center">
              <CircularProgress size="2rem" thickness={3} />
              <Typography>
                Waiting for other members to accept/reject the proposal.
              </Typography>
            </Stack>
          ) : (
            <Box>
              <Button
                variant="outlined"
                color="success"
                onClick={handleIPressedAcceptEndSession}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleIPressedRejectEndSession}
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