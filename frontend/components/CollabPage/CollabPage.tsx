import { useAuth } from "@/contexts/AuthContext";
import { useMatching } from "@/contexts/MatchingContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import CollabPageNavigation from "./CollabPageQuestion/CollabPageNavigation";
import QuestionPanel from "./CollabPageQuestion/QuestionPanel";

const CollabPage = () => {
    const { user } = useAuth();
    const { roomId, cancelMatching, questions } = useMatching();
    const router = useRouter();
    const [socket, setSocket] = useState<Socket>();
    const [questionNumber, setQuestionNumber] = useState(0);
    const [isNextQnHandshakeOpen, setIsNextQnHandshakeOpen] = useState(false);
    const [iHaveAcceptedNextQn, setIHaveAcceptedNextQn] = useState(false);

    const questionPanelProps = {
        question_number: questionNumber + 1,
        question: questions[questionNumber],
    }; 

    // Called when Next question button is pressed by this user
    const handleNextQuestion = () => {
        socket?.emit('openNextQuestionPrompt');
    };
    // Called when this user accepts next question prompt
    const handleIPressedAccept = () => {
        setIHaveAcceptedNextQn(true);
        socket?.emit('aUserHasAcceptedNextQuestionPrompt');
    };
    // Called when this user rejects next question prompt
    const handleIPressedReject = () => {
        setIHaveAcceptedNextQn(false);
        socket?.emit('aUserHasRejectedNextQuestionPrompt');
    };
    const collabPageNavigationProps = {
        handleNextQuestion: handleNextQuestion,
        isNextQnHandshakeOpen: isNextQnHandshakeOpen,
        setIsNextQnHandshakeOpen: setIsNextQnHandshakeOpen,
        handleIPressedAccept: handleIPressedAccept,
        handleIPressedReject: handleIPressedReject,
        iHaveAcceptedNextQn: iHaveAcceptedNextQn,
    }
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

        // Server tells clients this when any client clicks on 'Next qn` button
        socket.on('openNextQuestionPrompt', () => {
            setIsNextQnHandshakeOpen(true);
        });

        // Server tells clients this when all clients in room have accepted next question prompt
        socket.on('proceedWithNextQuestion', () => {
            console.log("proceedWithNextQuestion");
            setIsNextQnHandshakeOpen(false);
            setIHaveAcceptedNextQn(false);

            if (questionNumber >= questions.length - 1) {
                alert("You have completed all the questions!");
                router.push('/');
            } else {
                setQuestionNumber((prev) => prev + 1);
            }

        });
        
        // Server tells clients this when a client in room has rejected next question prompt
        socket.on('dontProceedWithNextQuestion', () => {
            console.log("dontProceedWithNextQuestion");
            setIsNextQnHandshakeOpen(false);
            setIHaveAcceptedNextQn(false);
            alert("Proposal to move on to next question has been rejected.");
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId, questionNumber]);

    // When unmounting this component i.e leaving page, cancel matching (leave mathcing service socket)
    useEffect(() => {
        return () => {
            cancelMatching();
        };
    }, []);
    
    return (
        <div>
            <CollabPageNavigation
                {...collabPageNavigationProps}
            />
            <h1>Collab Page</h1>
            <h2>Username: {user}</h2>
            <h2>Room ID: {roomId}</h2>
            {questions[questionNumber] ? (
                <QuestionPanel 
                    {...questionPanelProps}
                />
            ) : (
                <p>No more questions available.</p>
            )}
        </div>
    )
}

export default CollabPage;