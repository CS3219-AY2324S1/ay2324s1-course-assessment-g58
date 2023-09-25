import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Question from '@/types/Question';

interface DescriptionModalProps {
    question: Question | null;
    closeModal: () => void;
}

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

function DescriptionModal({ question, closeModal } : DescriptionModalProps) {
    if (!question) {
        return null;
    }

    return (
        <div>
            <Modal
                open={true}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {question.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Question Description: {question.description}
                    </Typography>
                    <Typography id="modal-modal-difficulty" sx={{ mt: 2 }}>
                        Question Difficulty: {question.difficulty}
                    </Typography>
                    <Typography id="modal-modal-category" sx={{ mt: 2 }}>
                        Question Category: {question.category}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default DescriptionModal;
