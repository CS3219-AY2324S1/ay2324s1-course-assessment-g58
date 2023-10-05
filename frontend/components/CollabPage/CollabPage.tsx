import { useAuth } from "@/contexts/AuthContext";
import { useMatching } from "@/contexts/MatchingContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import  InterviewerView  from "./InterviewerView"
import {Container, Box, Button, Paper, TextareaAutosize, Dialog, DialogTitle, DialogContent} from "@mui/material"

const CollabPage = () => {
    const { user } = useAuth();
    const { roomId, cancelMatching } = useMatching();
    const router = useRouter();
    const [socket, setSocket] = useState<Socket>();
    const [isInterviewer, setInterviewer] = useState<boolean>();
    const [showInterviewerView, setShowInterviewerView] = useState(false);
    const [showDialog, setShowDialog] = useState(true);

    const toggleInterviewerView = () => {
        setShowInterviewerView(!showInterviewerView);
    };
    const startRoleChange = () => {
        socket?.emit('roleSwitch');
        console.log("role switch");
    };
    const changeRole = () => {
        setInterviewer(!isInterviewer);
    };
    

    useEffect(() => {   
        // Reject people with no roomId
        if (router.pathname == '/collab' && roomId === "") {
            router.push('/');
        }
    }, [roomId, router.pathname]);

    // Connect to collab service socket via roomId
    useEffect(() => {
        if (roomId === "") return;
        //TODO: non hardcode url handling 
        const socket = io("http://localhost:3005", {
            auth: {
                roomId: roomId,
            }
        });
        setSocket(socket);
        socket.on('changeRole', () => {
            console.log("role changed");
    
            changeRole();
            
        })
    }, [roomId, isInterviewer]);

    // When unmounting this component i.e leaving page, cancel matching
    useEffect(() => {
        return () => {
            cancelMatching();
        };
    }, []);

    useEffect(() => {
        console.log(isInterviewer);
      }, [isInterviewer]);

    return (
        <div>
            <div className="button-container">
                <Box display="flex" alignItems="center">
                    { isInterviewer &&   
                    (
                    <Button variant="contained" color="primary" onClick={toggleInterviewerView}>
                        {showInterviewerView ? 'Hide Interviewer View' : 'Show Interviewer View'}
                    </Button>
                    
                    )}
                    <Button variant="contained" color="secondary" onClick={startRoleChange}>
                    Switch roles
                    </Button>
                </Box>
            </div>
            <div className="code-editor-and-interviewer">
                {/*Enter Code editor component here*/}
                <div className="code-editor-container">
                <Paper elevation={3} className="code-editor">
                    <TextareaAutosize
                    minRows={20}
                    className="code-input"
                    style={{ width: '100%' }} 
                    placeholder="Enter your code here..."
                    />
                </Paper>
                </div>
                {/*Until here*/}
                {showInterviewerView && (
                <div className="interviewer-view-container">
                    <InterviewerView />
                </div>
                )}
            </div>
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
            <DialogTitle>Pick a Role</DialogTitle>
            <DialogContent>
              <Button variant="contained" color="warning" style={{color: 'black'}} onClick={() => {setInterviewer(true);
      
                                                                          setShowDialog(false); }}>
                Interviewer
              </Button>
              <Button variant="contained" color="warning" style={{color: 'black'}} onClick={() => {setInterviewer(false);
                                                                          
                                                                          setShowDialog(false);}}>
                Interviewee
              </Button>
            </DialogContent>
          </Dialog>
        </div>



    )
}

export default CollabPage;