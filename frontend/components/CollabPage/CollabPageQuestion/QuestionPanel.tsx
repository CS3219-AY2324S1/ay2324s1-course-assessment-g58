import Question from "../../../types/Question";
import { Card, CardContent, Typography } from "@mui/material";

interface QuestionPanelProps {
    question_number: number;
    question: Question;
}

function QuestionPanel({ question_number, question }: QuestionPanelProps) {
    return (
        <>
            <Card
                sx={{
                    maxHeight: "85vh",
                    width: "100vh",
                    padding: 2,
                    overflowY: "auto",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ marginBottom: 2 }}
                    >
                        Question {question_number + 1}:{" "}
                        {question ? question.title : "No title found"}
                    </Typography>
                    {/* Use pre element for preserving white spaces and new lines */}
                    <pre style={{ whiteSpace: "pre-wrap", overflowX: "auto" }}>
                        {question
                            ? question.description
                            : "No description found"}
                    </pre>
                </CardContent>
            </Card>
        </>
    );
}

export default QuestionPanel;
