import React from "react";
import Question from "@/types/Question";
import { useAuth } from "@/contexts/AuthContext";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";

interface QuestionTableProps {
    questions: Question[];
    deleteQuestion: (question: Question) => Promise<number>;
    openModal: (question: Question) => void;
}

function QuestionTable({
    questions,
    deleteQuestion,
    openModal,
}: QuestionTableProps) {
    const { admin } = useAuth();

    const handleDelete = async (question: Question) => {
        try {
            const status = await deleteQuestion(question);
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table id="questionTable">
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Question Title</TableCell>
                        <TableCell>Question Complexity</TableCell>
                        <TableCell>Question Category</TableCell>
                        <TableCell>Question Description</TableCell>
                        <TableCell>Details</TableCell>
                        {admin && <TableCell>Delete</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody id="questionTableBody">
                    {Array.isArray(questions) &&
                        questions.map((question, index) => (
                            <TableRow key={question._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{question.title}</TableCell>
                                <TableCell>{question.difficulty}</TableCell>
                                <TableCell>{question.category}</TableCell>
                                <TableCell>{question.description}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => openModal(question)}>
                                        Details
                                    </Button>
                                </TableCell>
                                {admin && (
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleDelete(question)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default QuestionTable;
