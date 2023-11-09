import Header from "./Header";
import QuestionForm from "./QuestionForm";
import QuestionTable from "./QuestionTable";
import DescriptionModal from "./DescriptionModal";
import { fetchPost, fetchGet, fetchDelete, fetchPut } from "@/utils/apiHelpers";
import { useState, useEffect } from "react";
import Question from "@/types/Question";
import { useAuth } from "@/contexts/AuthContext";

const QuestionPage = () => {
    // get user's role
    const { token, admin } = useAuth();

    // Stuff for modal popup
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
        null
    );
    const handleOpenModal = (question: Question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Stuff for question table
    const [questions, setQuestions] = useState<Question[]>([]);
    // state is changed on adding, editing or deleting qns, useEffect is called
    // and refreshes the table
    const [refresh, setRefresh] = useState(false);

    const addQuestion = async (newQuestion: Question) => {
        if (!token) return;
        // Add the new question to the backend and then update the state
        const response = await fetchPost("/api/questions", {
            ...newQuestion,
            token,
        });
        if (response.status == 201) {
            alert("Success! Added: " + response.data.title);
            setRefresh((prev) => !prev);
        } else {
            alert(response.message);
        }
        return response.status;
    };

    const deleteQuestion = async (question: Question) => {
        if (!token) return;
        // Delete the question from the backend and then update the state
        const response = await fetchDelete("/api/questions", {
            ...question,
            token,
        });
        if (response.status == 200) {
            alert("Success! Deleted: " + response.data.title);
            setRefresh((prev) => !prev);
        } else {
            alert(response.message);
        }
        return response.status;
    };

    const editQuestion = async (updatedQuestion: Question) => {
        if (!token) return;
        // Edit the question from the backend and then update the state
        const response = await fetchPut("/api/questions", {
            ...updatedQuestion,
            token,
        });
        if (response.status == 200) {
            alert("Success! Updated: " + response.data.title);
            setRefresh((prev) => !prev);
            handleCloseModal();
        } else {
            alert(response.message);
        }
        return response.status;
    };

    useEffect(() => {
        if (!token) return;
        const fetchQuestions = async () => {
            const fetchedQuestions = await fetchGet("/api/questions", {
                token: token,
            });
            setQuestions(fetchedQuestions.data);
        };
        fetchQuestions();
    }, [refresh, token]);

    return (
        <main>
            <Header />
            {admin && <QuestionForm addQuestion={addQuestion} />}
            <QuestionTable
                questions={questions}
                deleteQuestion={deleteQuestion}
                openModal={handleOpenModal}
            />
            {isModalOpen && (
                <DescriptionModal
                    question={selectedQuestion}
                    closeModal={handleCloseModal}
                    editQuestion={editQuestion}
                />
            )}
        </main>
    );
};

export default QuestionPage;
