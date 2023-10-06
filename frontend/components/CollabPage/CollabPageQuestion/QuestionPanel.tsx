import { Question } from "../../../contexts/MatchingContext";

interface QuestionPanelProps {
    question_number: number;
    question: Question;
}

function QuestionPanel({ question_number, question }: QuestionPanelProps) {
    return (
        <div>
            <h2>Question {question_number}</h2>
            <h3>{question.title}</h3>
            <p>{question.description}</p>
        </div>
    );
}

export default QuestionPanel;