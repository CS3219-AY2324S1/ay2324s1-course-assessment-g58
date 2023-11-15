// src: https://mui.com/material-ui/react-modal/
import * as React from "react";
import Question, {
  questionTemplate,
  defaultQuestionTemplates,
} from "@/types/Question";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { messageHandler } from "@/utils/handlers";
import { DIFFICULTY } from "@/utils/enums";

interface DescriptionModalProps {
  question: Question | null;
  closeModal: () => void;
  editQuestion: (updatedQuestion: Question) => Promise<number>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "80vh", // set a maximum height relative to the viewport height
  overflowY: "auto", // enable vertical scrolling
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const inputStyle = {
  width: "100%", // make it take the full width of its container
  padding: "10px",
  margin: "10px 0",
  boxSizing: "border-box" as "border-box",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

type ResizeOption =
  | "none"
  | "both"
  | "horizontal"
  | "vertical"
  | "block"
  | "inline";

const textareaStyle: React.CSSProperties = {
  ...inputStyle, // spread the input styles
  height: "100px", // set a default height
  resize: "vertical" as ResizeOption, // specify the type
};

function DescriptionModal({
  question,
  closeModal,
  editQuestion,
}: DescriptionModalProps) {
  // checks if user is admin
  const { admin } = useAuth();

  const [editMode, setEditMode] = React.useState(false);
  const [updatedTitle, setUpdatedTitle] = React.useState(
    question?.title || ""
  );
  const [updatedDescription, setUpdatedDescription] = React.useState(
    question?.description || ""
  );
  const [updatedDifficulty, setUpdatedDifficulty] = React.useState(
    question?.difficulty || ""
  );
  const [updatedCategory, setUpdatedCategory] = React.useState(
    question?.category || ""
  );
  const [updatedTemplates, setUpdatedTemplates] = React.useState<
    questionTemplate[]
  >(question?.templates || defaultQuestionTemplates);

  const handleTemplateChange = (
    index: number,
    setStarterCode: boolean,
    newValue: string
  ) => {
    setUpdatedTemplates((prevTemplates) => {
      const updatedTemplates = [...prevTemplates];
      if (setStarterCode) {
        updatedTemplates[index].starterCode = newValue;
      } else {
        updatedTemplates[index].driverCode =
          newValue == "" ? null : newValue;
      }
      return updatedTemplates;
    });
  };

  const handleConfirmEdit = () => {
    const updatedQuestion: Question = {
      _id: question?._id || "",
      title: updatedTitle,
      description: updatedDescription,
      difficulty: updatedDifficulty,
      category: updatedCategory,
      templates: updatedTemplates,
    };
    if (
      updatedQuestion.title == "" ||
      updatedQuestion.description == "" ||
      updatedQuestion.difficulty == "" ||
      updatedQuestion.category == ""
    ) {
      messageHandler("All fields required", "error");
      return;
    }
    // If any of the starter templates are blank, don't allow the edit
    for (const template of updatedQuestion.templates) {
      if (template.starterCode == "") {
        messageHandler("All templates must have starter code", "error");
        return;
      }
    }
    editQuestion(updatedQuestion);
    setEditMode(false);
  };

  if (!question) {
    return null;
  }

  return (
    <div>
      <Modal
        open={true}
        onClose={() => {
          closeModal();
          setEditMode(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {admin && (
            <Button
              variant="contained"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Go back" : "Edit"}
            </Button>
          )}
          {editMode ? (
            <>
              <Typography variant="h6" color="text.primary">
                Edit question
              </Typography>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={updatedTitle}
                onChange={(e) =>
                  setUpdatedTitle(e.target.value)
                }
              />
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                margin="normal"
                value={updatedCategory}
                onChange={(e) =>
                  setUpdatedCategory(e.target.value)
                }
              />
              <InputLabel id="difficulty-label">
                Difficulty
              </InputLabel>
              <Select
                labelId="difficulty-label"
                label="Difficulty"
                fullWidth
                value={updatedDifficulty}
                onChange={(e) =>
                  setUpdatedDifficulty(e.target.value)
                }
              >
                {Object.values(DIFFICULTY).map((value) => {
                  return (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: { resize: "both" }, // Allows resizing both horizontally and vertically
                  },
                }}
                margin="normal"
                value={updatedDescription}
                onChange={(e) =>
                  setUpdatedDescription(e.target.value)
                }
              />
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Templates</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {updatedTemplates.map((template, index) => (
                    <Accordion key={index}>
                      <AccordionSummary>
                        <Typography>
                          {template.language}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2} key={index}>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1">
                              Starter Code:
                            </Typography>
                            <Editor
                              height="30vh"
                              value={template.starterCode}
                              onChange={(value, event) => {
                                handleTemplateChange(index, true, value || "");
                              }}
                              defaultLanguage={template.language.toLowerCase()}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1">
                              Driver Code:
                            </Typography>
                            <Editor
                              height="30vh"
                              value={template.driverCode || ""}
                              onChange={(value, event) => {
                                handleTemplateChange(index, false, value || "");
                              }}
                              defaultLanguage={template.language.toLowerCase()}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
              <Button
                variant="contained"
                onClick={handleConfirmEdit}
              >
                Confirm
              </Button>
            </>
          ) : (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                color="text.primary"
              >
                {question.title}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                color="text.primary"
              >
                Question Description:{" "}
                <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
                    {question ? question.description : "No description found"}
                </pre>
              </Typography>
              <Typography
                id="modal-modal-difficulty"
                sx={{ mt: 2 }}
                color="text.primary"
              >
                Question Difficulty: {question.difficulty}
              </Typography>
              <Typography
                id="modal-modal-category"
                sx={{ mt: 2 }}
                color="text.primary"
              >
                Question Category: {question.category}
              </Typography>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Templates</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {question.templates.map(
                    (template, index) => (
                      <Accordion key={index}>
                        <AccordionSummary>
                          <Typography>
                            {template.language}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid
                            container
                            spacing={2}
                            key={index}
                          >
                            <Grid item xs={12}>
                              <Typography variant="subtitle1">
                                Starter Code:
                              </Typography>
                              <SyntaxHighlighter
                                language={template.language.toLowerCase()}
                                style={tomorrow}
                              >
                                {template.starterCode}
                              </SyntaxHighlighter>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1">
                                Driver Code:
                              </Typography>
                              <SyntaxHighlighter
                                language={template.language.toLowerCase()}
                                style={tomorrow}
                              >
                                {template.driverCode || ""}
                              </SyntaxHighlighter>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    )
                  )}
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default DescriptionModal;
