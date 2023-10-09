import { useAuth } from "@/contexts/AuthContext";
import { useMatching } from "@/contexts/MatchingContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import CodeEditor from "./CodeEditor";
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
import { LANGUAGE } from "@/utils/enums";

const CollabPage = () => {
    const { language, roomId, cancelMatching } = useMatching();
    const router = useRouter();
    const [isInterviewer, setInterviewer] = useState<boolean>();
    const [isInterviewerChosen, setInterviewerChosen] =
        useState<boolean>(false);
    const [isIntervieweeChosen, setIntervieweeChosen] =
        useState<boolean>(false);
    const [showInterviewerView, setShowInterviewerView] = useState(false);
    const [showDialog, setShowDialog] = useState(true);

    // const toggleInterviewerView = () => {
    //     setShowInterviewerView(!showInterviewerView);
    // };
    // const startRoleChange = () => {
    //     socket?.emit("roleSwitch");
    //     console.log("role switch");
    // };
    // const changeRole = () => {
    //     setInterviewer(!isInterviewer);
    // };

    useEffect(() => {
        // Reject people with no roomId
        if (router.pathname == "/collab" && roomId === "") {
            router.push("/");
        }
    }, [roomId, router.pathname]);

    // set up socket
    // const socket = io("http://localhost:3005", {
    //     auth: {
    //         roomId: roomId + "role",
    //     },
    //     autoConnect: false,
    // });
    // socket.connect();

    // socket?.on("changeRole", () => {
    //     console.log("role changed");
    //     changeRole();
    // });
    // socket?.on("interviewer-chosen", () => {
    //     console.log("interviewer chosen");
    //     setInterviewerChosen(true);
    // });
    // socket?.on("interviewee-chosen", () => {
    //     console.log("interviewee chosen");
    //     setIntervieweeChosen(true);
    // });

    // When unmounting this component i.e leaving page, cancel matching
    useEffect(() => {
        return () => {
            cancelMatching();
        };
    }, [roomId]);

    return (
        <div>
            {/* <div className="button-container">
                <Box display="flex" alignItems="center">
                    {isInterviewer && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleInterviewerView}
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
                    >
                        Switch roles
                    </Button>
                </Box>
            </div> */}
            <div className="code-editor-and-interviewer">
                <CodeEditor
                    language={language}
                    roomId={roomId}
                    editorContent={
                        (language == LANGUAGE.PYTHON ? "## " : "// ") +
                        "Type your solution here"
                    }
                />
                {/*Until here*/}
                {/* {showInterviewerView && (
                    <div className="interviewer-view-container">
                        <InterviewerView />
                    </div>
                )} */}
            </div>
            {/* <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
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
            </Dialog> */}
        </div>
    );
};

export default CollabPage;
