import React, { FormEvent, useState } from "react";
import Question from "@/types/Question";
import { 
    Typography, 
    Button, 
    TextField,
    Container,
    Grid
} from "@mui/material";
import AddQuestionModal from "./AddQuestionModal";

interface QuestionFormProps {
    addQuestion: (newQuestion: Question) => Promise<number>;
}

function QuestionForm({ addQuestion }: QuestionFormProps) {
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);

    const modalProps = {
        handleClose: handleClose,
        addQuestion: addQuestion
    };

    return (
        <Container maxWidth="sm">
            <Button variant="contained" onClick={() => setOpenModal(true)}>
                Add Question
            </Button>
            {openModal && <AddQuestionModal {...modalProps}/>}
        </Container>
    );
}

export default QuestionForm;
