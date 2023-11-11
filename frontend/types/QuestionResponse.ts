import Question from "./Question";

type QuestionResponse = {
    questionId: string;
    question: Question;
    text: string;
};

export default QuestionResponse;
