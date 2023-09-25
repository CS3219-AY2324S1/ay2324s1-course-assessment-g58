import Header from './Header';
import QuestionForm from './QuestionForm';
import QuestionTable from './QuestionTable';
import DescriptionModal from './DescriptionModal';
import UserDemo from './UserDemo';
import { fetchPost, fetchGet, fetchDelete } from "@/utils/apiHelpers";
import { useState, useEffect } from 'react';
import Question from '@/types/Question';

const QuestionPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    // state is changed on adding, editing or deleting qns, useEffect is called
    // and refreshes the table
    const [refresh, setRefresh] = useState(false);
    
    const addQuestion = async (newQuestion: Question) => {
        // Add the new question to the backend and then update the state
        const response = await fetchPost("/api/questions", newQuestion);
        if (response.status == 201) {
            alert("Success! Added: " + response.data.title);
            setRefresh(prev => !prev);
        } else {
            alert(response.message);
        }
        return response.status; 
    };

    const deleteQuestion = async (question: Question) => {
        console.log("delete", question);
        // Add the new question to the backend and then update the state
        const response = await fetchDelete("/api/questions", question);
        if (response.status == 200) {
            alert("Success! Deleted: " + response.data.title);
            setRefresh(prev => !prev);
        } else {
            alert(response.message);
        }
        return response.status; 
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            const fetchedQuestions = await fetchGet("/api/questions");
            console.log("fetched", fetchedQuestions);
            setQuestions(fetchedQuestions.data);
        };
        fetchQuestions();
    }, [refresh]);

    return (
        <main>
            <Header />
            <QuestionForm addQuestion={addQuestion} />
            <QuestionTable questions={questions} deleteQuestion={deleteQuestion} />
            <DescriptionModal />
            <UserDemo/>
        </main>
    );
  }
  
  export default QuestionPage;