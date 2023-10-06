/*Source: https://mui.com/material-ui/react-modal/*/
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

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
}

export default function BasicModal(
    { isNextQnHandshakeOpen,
      setIsNextQnHandshakeOpen,
      handleIPressedAccept }: NextQnHandshakeModalProps) {
  const handleClose = () => setIsNextQnHandshakeOpen(false);

  return (
    <div>
      <Modal
        open={isNextQnHandshakeOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Proposal to move on to the next question.
          </Typography>
          <Button
            variant="outlined"
            color="success"
            onClick={handleIPressedAccept}
          >
            Accept
          </Button>
          <Button variant="outlined" color="error">
            Reject
          </Button>
        </Box>
      </Modal>
    </div>
  );
}