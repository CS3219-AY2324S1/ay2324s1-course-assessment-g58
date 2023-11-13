import QuestionTable from "./QuestionTable";
import DescriptionModal from "./DescriptionModal";
import { fetchPost, fetchGet, fetchDelete, fetchPut } from "@/utils/apiHelpers";
import { useState, useEffect } from "react";
import Question from "@/types/Question";
import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "../LoginPage/LoginPage";
import { messageHandler } from "@/utils/handlers";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddQuestionModal from "./AddQuestionModal";
import ConfirmResetDialog from "./ConfirmResetDialog";

const QuestionPage = () => {
    // get user's role
    const { user, admin } = useAuth();

    // State for question modal popup
    const [questionModalOpen, setQuestionModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
        null
    );

    // State for add question popup
    const [addQuestionOpen, setAddQuestionOpen] = useState(false);

    const handleOpenModal = (question: Question) => {
        setSelectedQuestion(question);
        setQuestionModalOpen(true);
    };

    const handleCloseModal = () => {
        setQuestionModalOpen(false);
    };

    // Stuff for question table
    const [questions, setQuestions] = useState<Question[]>([]);
    // state is changed on adding, editing or deleting qns, useEffect is called
    // and refreshes the table
    const [refresh, setRefresh] = useState(false);

    const addQuestion = async (newQuestion: Question) => {
        // Add the new question to the backend and then update the state
        const response = await fetchPost("/api/questions", newQuestion);
        if (response.status == 201) {
            messageHandler("Success! Added: " + response.data.title, "success");
            setRefresh((prev) => !prev);
        } else {
            messageHandler(response.message, "error");
        }
        return response.status;
    };

    const deleteQuestion = async (question: Question) => {
        // Delete the question from the backend and then update the state
        const response = await fetchDelete("/api/questions", question);
        if (response.status == 200) {
            messageHandler(
                "Success! Deleted: " + response.data.title,
                "success"
            );
            setRefresh((prev) => !prev);
        } else {
            messageHandler(response.message, "error");
        }
        return response.status;
    };

    const editQuestion = async (updatedQuestion: Question) => {
        // Edit the question from the backend and then update the state
        const response = await fetchPut("/api/questions", updatedQuestion);
        if (response.status == 200) {
            messageHandler(
                "Success! Updated: " + response.data.title,
                "success"
            );

            setRefresh((prev) => !prev);
            handleCloseModal();
        } else {
            messageHandler(response.message, "error");
        }
        return response.status;
    };

    const [openResetDialog, setOpenResetDialog] = useState(false);
    const setToDefaultQns = async () => {
        const response = await fetchPost("/api/questions", "setToDefault");
        if (response.status == 201) {
            messageHandler("Success! Set to default questions", "success");
            setRefresh((prev) => !prev);
        } else {
            const errorMsg = response.message || response.data.message;
            messageHandler(errorMsg, "error");
        }
        setOpenResetDialog(false);
        return response.status;
    };
    const confirmDialogProps = {
        open: openResetDialog,
        setOpen: setOpenResetDialog,
        handleConfirm: setToDefaultQns,
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            const fetchedQuestions = await fetchGet("/api/questions");
            setQuestions(fetchedQuestions.data);
        };
        fetchQuestions();
    }, [refresh]);

    if (!user) {
        return <LoginPage />;
    }

    return (
        <main>
            {admin && addQuestionOpen && (
                <AddQuestionModal
                    handleClose={() => setAddQuestionOpen(false)}
                    addQuestion={addQuestion}
                />
            )}
            <Box display="flex" maxHeight="80vh" padding={2}>
                <QuestionTable
                    questions={questions}
                    deleteQuestion={deleteQuestion}
                    openModal={handleOpenModal}
                />
            </Box>
            {questionModalOpen && (
                <DescriptionModal
                    question={selectedQuestion}
                    closeModal={handleCloseModal}
                    editQuestion={editQuestion}
                />
            )}
            {admin && (
                <>
                    <Fab
                        color="primary"
                        aria-label="reset"
                        variant="extended"
                        style={{
                            position: "fixed",
                            bottom: "20px",
                            left: "20px",
                        }}
                        onClick={() => setOpenResetDialog(true)}
                    >
                        Reset Questions
                    </Fab>
                    <Fab
                        color="primary"
                        aria-label="add"
                        style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px",
                        }}
                        onClick={() => setAddQuestionOpen(true)}
                    >
                        <AddIcon />
                    </Fab>
                    <ConfirmResetDialog {...confirmDialogProps} />
                </>
            )}
        </main>
    );
};

export default QuestionPage;
