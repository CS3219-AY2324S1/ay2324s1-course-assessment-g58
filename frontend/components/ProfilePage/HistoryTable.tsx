import { ChangeEvent, Ref, forwardRef, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    AppBar,
    Avatar,
    Box,
    Button,
    Dialog,
    IconButton,
    Slide,
    Stack,
    Toolbar,
    Typography,
    Pagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import QuestionPanel from "../CollabPage/CollabPageQuestion/QuestionPanel";
import QuestionResponse from "@/types/QuestionResponse";
import { useStore } from "@/stores";
import { fetchGet } from "@/utils/apiHelpers";
import CodeBlock from "./CodeBlock";
import { capitalizeString } from "@/utils/helper";
import { messageHandler } from "@/utils/handlers";

type HistoryData = {
    id: number;
    peer: string;
    completedOn: string;
    language: string;
    difficulty: string;
    questionsCompleted: number;
};

interface HistoryTableProps {
    username: string;
}

const HistoryTable = ({ username }: HistoryTableProps) => {
    const [open, setOpen] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [tableData, setTableData] = useState<HistoryData[]>([]);
    const [questionPanelProps, setQuestionProps] = useState({
        question_number: questionNumber,
        question: {},
    });
    const [displayedResponses, setDisplayedResponses] = useState<
        QuestionResponse[]
    >([]);
    const [modalLanguage, setModalLanguage] = useState("python");
    const historyStore = useStore().history;
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setQuestionNumber(value - 1);
        setQuestionProps({
            question_number: value - 1,
            question: historyStore.getQuestionById(
                displayedResponses[value - 1].questionId
            )!,
        });
    };

    const handleClick = (id: number) => {
        const responses = historyStore.getSessionById(id);
        if (responses == undefined || responses.length == 0) {
            messageHandler("No Responses found for this Session!", "error");
            return;
        }

        const session = tableData.find((session) => session.id === id);
        if (!session) {
            messageHandler("Session not found!", "error");
            return;
        }

        responses?.map((response) => {
            response.question = historyStore.getQuestionById(
                response.questionId
            )!;
        });
        setDisplayedResponses(responses!);
        if (responses == undefined) return;
        setQuestionProps({
            question_number: 0,
            question: historyStore.getQuestionById(responses[0].questionId),
        });
        setModalLanguage(session.language.toLowerCase());
        setOpen(true);
    };

    useEffect(() => {
        const retrieveSessions = async () => {
            await fetchGet(`/api/sessions/${username}`).then((res) => {
                if (res.status == 200) {
                    const sessions = [];
                    for (
                        let sessionIndex = 0;
                        sessionIndex < res.data.length;
                        sessionIndex++
                    ) {
                        const session = res.data[sessionIndex];
                        // TODO: make this section neater
                        const formattedDate = new Date(
                            session.createdAt
                        ).toLocaleDateString(undefined, dateOptions);
                        const responses = session.responses;
                        const sessionData: HistoryData = {
                            id: session.id,
                            peer: session.users.filter(
                                (user: { username: string }) =>
                                    user.username != username
                            )[0].username,
                            language: capitalizeString(session.language),
                            difficulty: session.difficulty,
                            completedOn: formattedDate,
                            questionsCompleted: responses.length,
                        };
                        sessions.push(sessionData);
                        historyStore.addSessions(sessionData.id, responses);
                    }
                    setTableData(sessions);
                    console.log(res);
                } else {
                    console.error("Failed to retrieve question history");
                }
            });
        };

        if (username) {
            retrieveSessions();
        }
    }, [username]);

    // Gets all questions
    // TODO: replace this with getting questions on button click
    useEffect(() => {
        const fetchQuestions = async () => {
            const fetchedQuestions = await fetchGet("/api/questions");
            historyStore.addQuestions(fetchedQuestions.data);
        };
        fetchQuestions();
    }, []);

    return (
        // <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
        // <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "lightgray" }}>
                            <TableCell>Peer</TableCell>
                            <TableCell align="right">Completed On</TableCell>
                            <TableCell align="right">Language</TableCell>
                            <TableCell align="right">Difficulty</TableCell>
                            <TableCell align="right">
                                Questions Attempted
                            </TableCell>
                            <TableCell align="right" sx={{ paddingRight: 4 }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow
                                key={row.peer}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Stack
                                        direction="row"
                                        sx={{ alignItems: "center" }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 25,
                                                height: 25,
                                                marginRight: 2,
                                                paddingLeft: 0.1,
                                                paddingTop: 0.1,
                                                fontSize: 16,
                                            }}
                                        >
                                            {row.peer[0]}
                                        </Avatar>
                                        <Typography variant="subtitle1">
                                            {row.peer}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle1">
                                        {row.completedOn}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle1">
                                        {row.language}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle1">
                                        {row.difficulty}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle1">
                                        {row.questionsCompleted}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        style={{ textTransform: "none" }}
                                        onClick={() => handleClick(row.id)}
                                    >
                                        <Typography variant="subtitle1">
                                            View
                                        </Typography>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{ justifyContent: "center", justifyItems: "center" }}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Stack direction="row">
                    <Box
                        display="flex"
                        sx={{ width: "50%", height: "80vh", padding: 8 }}
                    >
                        {/* @ts-ignore */}
                        <QuestionPanel {...questionPanelProps} />
                    </Box>

                    <Box sx={{ width: "50%", height: "80vh", padding: 8 }}>
                        <CodeBlock
                            code={
                                displayedResponses[questionNumber] ==
                                undefined
                                    ? "  Press the question number  "
                                    : displayedResponses[questionNumber]
                                          .text
                            }
                            language={modalLanguage}
                        />
                    </Box>
                </Stack>
                <Box>
                    <Pagination
                        count={displayedResponses.length}
                        page={questionNumber + 1}
                        color="primary"
                        onChange={handleChange}
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                        }}
                    />
                </Box>
            </Dialog>
        </>
    );
};

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default HistoryTable;
