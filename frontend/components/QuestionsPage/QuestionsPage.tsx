import QuestionTable from "./QuestionTable";
import DescriptionModal from "./DescriptionModal";
import { fetchPost, fetchGet, fetchDelete, fetchPut } from "@/utils/apiHelpers";
import { useState, useEffect } from "react";
import Question from "@/types/Question";
import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "../LoginPage/LoginPage";
import { messageHandler } from "@/utils/handlers";
import { Alert, Box, Fab, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddQuestionModal from "./AddQuestionModal";
import ConfirmResetDialog from "./ConfirmResetDialog";
import FilterBar from "./FilterBar";

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

    // State for filter bar
    const [categoryOptions, setCategoryOptions] = useState<{ value: number; label: string }[]>([]);
    const [difficultyOptions, setDifficultyOptions] = useState<{ value: number; label: string }[]>([]);

    // Stuff for question table
    const [questions, setQuestions] = useState<Question[]>([]);
    // state is changed on adding, editing or deleting qns, useEffect is called
    // and refreshes the table
    const [refresh, setRefresh] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

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
    // filter stuff
    const handleApplyFilters = async (selectedCategories: string[], selectedDifficulties: string[]) => {
        // Handle applying filters, e.g., fetching filtered data
        console.log('Applying filters:', selectedCategories, selectedDifficulties);
        // Update logic as needed
        
        await fetchPost("/api/questions/filter", {
            category: selectedCategories,
            difficulty: selectedDifficulties
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                setQuestions(res.data);
            } else {
                console.error("Failed to apply filters");
                setOpenAlert(true);
            }
        });
        
    };
    
    const handleResetFilters = () => {
    // Handle resetting filters, e.g., resetting the state or fetching all data
    console.log('Resetting filters');
    };
    

    useEffect(() => {
        const fetchQuestions = async () => {
            const fetchedQuestions = await fetchGet("/api/questions");
            setQuestions(fetchedQuestions.data);
        };
        fetchQuestions();
    }, [refresh]);

    useEffect(() => {
        const categories = new Set<string>();
        const difficulties = new Set<string>();
        questions.forEach((question) => {
            categories.add(question.category);
            difficulties.add(question.difficulty);
        });
        // Note: This sets the filters to the tags of the remaining questions.
        // While this works when all questions are present, after filtering, the options are reduced to that of the filtered questions
        // If this is an unintended consequence
        // Consider using a different variable to maintain the state of all the categories and difficulties at the start!
        // If not, great work!  

        // Also, there are impossible combinations, e.g bit manipulation and hard. 
        // For this case, I added an alert!

        const categoryOptions = Array.from(categories).map((category, index) => ({
            value: index,
            label: category,
        }));
        const difficultyOptions = Array.from(difficulties).map((difficulty, index) => ({
            value: index,
            label: difficulty,
        }));
        setCategoryOptions(categoryOptions);
        setDifficultyOptions(difficultyOptions);
    }, [questions]);

    console.log('Current value of questions:', questions);

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
            <FilterBar
                categoryOptions={categoryOptions}
                difficultyOptions={difficultyOptions}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
            />
            <Box display="flex" padding={2}>
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
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={() => setOpenAlert(false)}
            >
                <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
                    Question with specified filters does not exist!
                </Alert>
            </Snackbar>
        </main>
    );
};

export default QuestionPage;
