import Question from "../../../types/Question";
import { Card, CardContent, Typography } from "@mui/material";

interface QuestionPanelProps {
    question_number: number;
    question: Question;
}

function QuestionPanel({ question_number, question }: QuestionPanelProps) {
    return (
        <Card sx={{ height: "100%", padding: 2 }}>
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: 2 }}
                >
                    Question {question_number}:{" "}
                    {question ? question.title : "No title found"}
                </Typography>
                <Typography variant="body2">
                    {question ? question.description : "No description found"}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default QuestionPanel;
