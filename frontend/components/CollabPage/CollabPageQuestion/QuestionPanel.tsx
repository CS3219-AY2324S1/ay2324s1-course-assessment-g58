// import Question from "../../../types/Question";
// import { Card, CardContent, Typography } from "@mui/material";

// interface QuestionPanelProps {
//     question_number: number;
//     question: Question;
// }

// function QuestionPanel({ question_number, question }: QuestionPanelProps) {
//     return (
//         <Card sx={{ height: "100%", padding: 2 }}>
//             <CardContent>
//                 <Typography
//                     variant="h5"
//                     component="div"
//                     sx={{ marginBottom: 2 }}
//                 >
//                     Question {question_number}:{" "}
//                     {question ? question.title : "No title found"}
//                 </Typography>
//                 <Typography variant="body2">
//                     {question ? question.description : "No description found"}
//                 </Typography>
//             </CardContent>
//         </Card>
//     );
// }

// export default QuestionPanel;
import Question from "../../../types/Question";
import { Card, CardContent, Typography } from "@mui/material";

interface QuestionPanelProps {
    question_number: number;
    question: Question[];
}

function QuestionPanel({ question_number, question }: QuestionPanelProps) {
    return question[question_number] ? (
        <Card
            sx={{
                maxHeight: "85vh",
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
                    Question {question_number}:{" "}
                    {question
                        ? question[question_number].title
                        : "No title found"}
                </Typography>
                {/* Use pre element for preserving white spaces and new lines */}
                <pre style={{ whiteSpace: "pre-wrap", overflowX: "auto" }}>
                    {question
                        ? question[question_number].description
                        : "No description found"}
                </pre>
            </CardContent>
        </Card>
    ) : (
        <Card sx={{ maxHeight: "100vh", padding: 2 }}>
            <Typography>No more questions available.</Typography>
        </Card>
    );
}

export default QuestionPanel;
