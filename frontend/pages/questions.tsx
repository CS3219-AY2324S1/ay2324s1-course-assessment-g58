import LoginPage from "@/components/LoginPage/LoginPage";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import QuestionPage from "@/components/QuestionsPage/QuestionsPage";
import { useAuth } from "@/contexts/AuthContext";
import { NextPage } from "next";

const Questions: NextPage = () => {
    const { user } = useAuth();

    return (
        <>
            <NavigationBar />
            {user ? <QuestionPage /> : <LoginPage />}
        </>
    );
};

export default Questions;
