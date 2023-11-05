import React, { FormEvent, useState } from "react";
import Question from "@/types/Question";
import { 
    Typography, 
    Button, 
    TextField,
    Container,
    Grid
} from "@mui/material";

interface QuestionFormProps {
    addQuestion: (newQuestion: Question) => Promise<number>;
}

const labelStyle = {
    marginRight: "10px",
};

function QuestionForm({ addQuestion }: QuestionFormProps) {
    const [questionTitle, setQuestionTitle] = React.useState("");
    const [questionDescription, setQuestionDescription] = React.useState("");
    const [questionCategory, setQuestionCategory] = React.useState("");
    const [questionComplexity, setQuestionComplexity] = React.useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        // Handle null values
        if (questionTitle == "") {
            alert("Please enter a question title.");
            return;
        }
        if (questionDescription == "") {
            alert("Please enter a question description.");
            return;
        }
        if (questionCategory == "") {
            alert("Please enter a question category.");
            return;
        }
        if (questionComplexity == "") {
            alert("Please enter a question complexity.");
            return;
        }
        const newQuestion: Question = {
            _id: "",
            title: questionTitle,
            description: questionDescription,
            difficulty: questionComplexity,
            category: questionCategory,
        };
        const status = await addQuestion(newQuestion);

        if (status === 201) {
            // Reset the state values to clear input fields
            setQuestionTitle("");
            setQuestionDescription("");
            setQuestionCategory("");
            setQuestionComplexity("");
        }
    };
    return (
        <Container maxWidth="sm">
            <form id="questionForm" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="caption" display="block" gutterBottom>
                            Enter Question Title:
                        </Typography>
                        <TextField
                            fullWidth
                            id="questionTitle"
                            name="questionTitle"
                            placeholder="Question Title"
                            value={questionTitle}
                            onChange={(e) => {
                                setQuestionTitle(e.target.value);
                            }}
                            variant="standard"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="caption" display="block" gutterBottom>
                            Enter Question Description:
                        </Typography>
                        <TextField
                            fullWidth
                            id="questionDescription"
                            name="questionDescription"
                            placeholder="Question Description..."
                            value={questionDescription}
                            onChange={(e) => {
                                setQuestionDescription(e.target.value);
                            }}
                            multiline
                            rows={4}
                            variant="standard"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="caption" display="block" gutterBottom>
                            Enter Question Category:
                        </Typography>
                        <TextField
                            fullWidth
                            id="questionCategory"
                            name="questionCategory"
                            placeholder="Question Category"
                            value={questionCategory}
                            onChange={(e) => {
                                setQuestionCategory(e.target.value);
                            }}
                            variant="standard"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="caption" display="block" gutterBottom>
                            Enter Question Complexity:
                        </Typography>
                        <TextField
                            fullWidth
                            id="questionComplexity"
                            name="questionComplexity"
                            placeholder="Question Complexity"
                            value={questionComplexity}
                            onChange={(e) => {
                                setQuestionComplexity(e.target.value);
                            }}
                            variant="standard"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default QuestionForm;
