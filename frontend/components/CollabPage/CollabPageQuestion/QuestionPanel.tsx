import { Question } from "../../../contexts/MatchingContext";

interface QuestionPanelProps {
    question_number: number;
    question: Question;
}

function QuestionPanel({ question_number, question }: QuestionPanelProps) {
    return (
        <div>
            <h2>Question {question_number}</h2>
            <h3>{question ? question.title : "No title found"}</h3>
            <p>{question ? question.description: "No description found"}</p>
        </div>
    );
}

export default QuestionPanel;