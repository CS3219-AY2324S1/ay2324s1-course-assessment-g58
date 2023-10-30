import { useAuth } from "@/contexts/AuthContext";
import { useMatching } from "@/contexts/MatchingContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import CollabPageNavigation from "./CollabPageQuestion/CollabPageNavigation";
import QuestionPanel from "./CollabPageQuestion/QuestionPanel";
import InterviewerView from "./InterviewerView";
import {
    Container,
    Box,
    Button,
    Paper,
    TextareaAutosize,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import CodeEditor from "./CodeEditor";
import { LANGUAGE } from "@/utils/enums";
import SimpleSnackbar from "./RejectQuestionSnackBar";

const CollabPage = () => {
    const { user } = useAuth();
    const { language, roomId, cancelMatching, questions } = useMatching();
    const router = useRouter();
    const [socket, setSocket] = useState<Socket>();
    const [questionNumber, setQuestionNumber] = useState(0);
    const [isNextQnHandshakeOpen, setIsNextQnHandshakeOpen] = useState(false);
    const [iHaveAcceptedNextQn, setIHaveAcceptedNextQn] = useState(false);
    const [isInterviewer, setInterviewer] = useState<boolean>();
    const [isInterviewerChosen, setInterviewerChosen] =
        useState<boolean>(false);
    const [isIntervieweeChosen, setIntervieweeChosen] =
        useState<boolean>(false);
    const [showInterviewerView, setShowInterviewerView] = useState(false);
    const [showDialog, setShowDialog] = useState(true);
    const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);

    const toggleInterviewerView = () => {
        setShowInterviewerView(!showInterviewerView);
    };
    const startRoleChange = () => {
        socket?.emit("roleSwitch");
        console.log("role switch");
    };
    const changeRole = () => {
        setInterviewer(!isInterviewer);
        if (showInterviewerView) {
            setShowInterviewerView(false);
        }
    };

    const handleClosePickRole = (event: any, reason: string) => {
        if (reason && reason == "backdropClick")
            return; /* This prevents modal from closing on an external click */
        
        if (reason && reason == "escapeKeyDown") 
            return; //prevent user from closing dialog using esacpe button
        setShowDialog(false);
    };

    const handleSnackbarClose = () => {
        setSnackBarIsOpen(false);
    };

    const questionPanelProps = {
        question_number: questionNumber + 1,
        question: questions[questionNumber],
    };

    // Called when Next question button is pressed by this user
    const handleNextQuestion = () => {
        socket?.emit("openNextQuestionPrompt");
    };
    // Called when this user accepts next question prompt
    const handleIPressedAccept = () => {
        setIHaveAcceptedNextQn(true);
        socket?.emit("aUserHasAcceptedNextQuestionPrompt");
    };
    // Called when this user rejects next question prompt
    const handleIPressedReject = () => {
        setIHaveAcceptedNextQn(false);
        socket?.emit("aUserHasRejectedNextQuestionPrompt");
    };
    const collabPageNavigationProps = {
        handleNextQuestion: handleNextQuestion,
        isNextQnHandshakeOpen: isNextQnHandshakeOpen,
        setIsNextQnHandshakeOpen: setIsNextQnHandshakeOpen,
        handleIPressedAccept: handleIPressedAccept,
        handleIPressedReject: handleIPressedReject,
        iHaveAcceptedNextQn: iHaveAcceptedNextQn,
    };
    useEffect(() => {
        // Reject people with no roomId
        if (router.pathname == "/collab" && roomId === "") {
            router.push("/");
        }
    }, [roomId, router.pathname]);

    // Connect to collab service socket via roomId
    useEffect(() => {
        if (roomId === "") return;
        //TODO: non hardcode url handling
        const socket = io(process.env.NEXT_PUBLIC_COLLAB_SERVER_URL as string, {
            auth: {
                roomId: roomId,
            },
        });
        setSocket(socket);
        socket.on("changeRole", () => {
            console.log("role changed");
            changeRole();
        });
        socket.on("interviewer-chosen", () => {
            console.log("interviewer chosen");
            setInterviewerChosen(true);
        });
        socket.on("interviewee-chosen", () => {
            console.log("interviewee chosen");
            setIntervieweeChosen(true);
        });

        // Server tells clients this when any client clicks on 'Next qn` button
        socket.on("openNextQuestionPrompt", () => {
            setIsNextQnHandshakeOpen(true);
        });

        // Server tells clients this when all clients in room have accepted next question prompt
        socket.on("proceedWithNextQuestion", () => {
            console.log("proceedWithNextQuestion");
            setIsNextQnHandshakeOpen(false);
            setIHaveAcceptedNextQn(false);

            if (questionNumber >= questions.length - 1) {
                alert("You have completed all the questions!");
                router.push("/");
            } else {
                setQuestionNumber((prev) => prev + 1);
            }
        });

        // Server tells clients this when a client in room has rejected next question prompt
        socket.on("dontProceedWithNextQuestion", () => {
            console.log("dontProceedWithNextQuestion");
            setSnackBarIsOpen(true);
            //alert("Proposal to move on to next question has been rejected.");
            setIsNextQnHandshakeOpen(false);
            setIHaveAcceptedNextQn(false);
        });

        return () => {
            socket.disconnect();
        };
    }, [
        roomId,
        questionNumber,
        isInterviewer,
        isInterviewerChosen,
        isIntervieweeChosen,
    ]);

    // When unmounting this component i.e leaving page, cancel matching (leave mathcing service socket)
    useEffect(() => {
        return () => {
            cancelMatching();
        };
    }, []);

    return (
        <div>
            <CollabPageNavigation {...collabPageNavigationProps} />
            <h1>Collab Page</h1>
            <h2>Username: {user}</h2>
            <h2>Room ID: {roomId}</h2>
            {questions[questionNumber] ? (
                <QuestionPanel {...questionPanelProps} />
            ) : (
                <p>No more questions available.</p>
            )}
            <div className="button-container">
                <Box display="flex" alignItems="center">
                    {isInterviewer && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleInterviewerView}
                            style={{
                                backgroundColor: "#0073e6",
                                color: "white",
                                border: "2px solid #0051a5",
                                marginRight: "10px",
                            }}
                        >
                            {showInterviewerView
                                ? "Hide Interviewer View"
                                : "Show Interviewer View"}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={startRoleChange}
                        style={{
                            backgroundColor: "#0073e6",
                            color: "white",
                            border: "2px solid #0051a5",
                        }}
                    >
                        Switch roles
                    </Button>
                </Box>
            </div>
            <div className="code-editor-and-interviewer">
                {/*Enter Code editor component here*/}
                <CodeEditor
                    language={language}
                    roomId={roomId}
                    editorContent={
                        (language == LANGUAGE.PYTHON ? "## " : "// ") +
                        "Type your solution here"
                    }
                />
                {/*Until here*/}
                {showInterviewerView && (
                    <div className="interviewer-view-container">
                        <InterviewerView />
                    </div>
                )}
            </div>
            <Dialog open={showDialog} onClose={handleClosePickRole} >
                <DialogTitle>Pick a Role</DialogTitle>
                <DialogContent>
                    {!isInterviewerChosen && (
                        <Button
                            variant="contained"
                            color="warning"
                            style={{ color: "black" }}
                            onClick={() => {
                                setInterviewer(true);
                                setShowDialog(false);
                                socket?.emit("interviewer chosen");
                            }}
                        >
                            Interviewer
                        </Button>
                    )}
                    {!isIntervieweeChosen && (
                        <Button
                            variant="contained"
                            color="warning"
                            style={{ color: "black" }}
                            onClick={() => {
                                setInterviewer(false);
                                setShowDialog(false);
                                socket?.emit("interviewee chosen");
                            }}
                        >
                            Interviewee
                        </Button>
                    )}
                </DialogContent>
            </Dialog>
            <SimpleSnackbar
                snackBarIsOpen={snackBarIsOpen}
                onClose={handleSnackbarClose}
            />
        </div>
    );
};

export default CollabPage;
