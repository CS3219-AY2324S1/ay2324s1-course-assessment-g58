import { Question } from "../../contexts/MatchingContext";

interface QuestionPanelProps {
    questions?: Question[];
}

function QuestionPanel({ questions }: QuestionPanelProps) {
    // TODO: dont just show all questions
    return (
        <div>
            <h2>Questions</h2>
            {questions?.map((question) => (
                <div key={question._id}>
                    <h3>{question.title}</h3>
                    <p>{question.description}</p>
                    <p>{question.category}</p>
                    <p>{question.difficulty}</p>
                </div>
            ))}
        </div>
    );
}

export default QuestionPanel;