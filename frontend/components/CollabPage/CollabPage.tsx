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
    
    const questionPanelProps = {
        question_number: questionNumber + 1,
        question: questions[questionNumber],
    }; 

    const handleNextQuestion = () => {
        socket?.emit('openNextQuestionPrompt');
    };
    const handleIPressedAccept = () => {
        socket?.emit('aUserHasAcceptedNextQuestionPrompt');
    };
    const collabPageNavigationProps = {
        handleNextQuestion: handleNextQuestion,
        isNextQnHandshakeOpen: isNextQnHandshakeOpen,
        setIsNextQnHandshakeOpen: setIsNextQnHandshakeOpen,
        handleIPressedAccept: handleIPressedAccept,
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

        socket.on('openNextQuestionPrompt', () => {
            setIsNextQnHandshakeOpen(true);
        });
    }, [roomId, questionNumber]);

    // When unmounting this component i.e leaving page, cancel matching
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
            <QuestionPanel 
                {...questionPanelProps}
            />
        </div>
    )
}

export default CollabPage;