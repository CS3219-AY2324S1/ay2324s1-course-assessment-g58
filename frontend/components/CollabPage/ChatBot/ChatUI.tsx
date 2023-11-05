// Source: https://frontendshape.com/post/create-a-chat-ui-in-react-with-mui-5
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Avatar,
    Grid,
    Paper,
    Skeleton,
    Stack,
    Modal,
    IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from "@mui/icons-material/Send";
import { RawMessageData } from '@/types/ChatBotMessage';
import { fetchPost } from '@/utils/apiHelpers';
import { useAuth } from "@/contexts/AuthContext";
import { GptResponseResult } from '@/types/AiServiceResults';
import ModalContent from './GptModalContent';

function ChatUI() {
    const [input, setInput] = useState("");
    const { user } = useAuth();
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<RawMessageData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<RawMessageData[]>(() => {
        // Get messages from local storage when the component mounts
        const storedMessages = localStorage.getItem('messages-aiChatbot');
        if (storedMessages) {
            return JSON.parse(storedMessages);
        }
        // Default messages if there are no stored messages
        return [
           { id: 1, text: "Hi there! Ask me if you need help! Click on me to expand too!", sender: "bot" },
        ];
    });
    useEffect(() => {
        // Store messages in local storage whenever messages state changes
        localStorage.setItem('messages-aiChatbot', JSON.stringify(messages));
    }, [messages]);

    // Stuff to autoscroll to bottom of chat
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    useEffect(scrollToBottom, [messages, waitingForResponse]);

    const handleModalOpen = (message: RawMessageData) => {
        setSelectedMessage(message);
        setIsModalOpen(true);
    };
      
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
      
    const handleSend = async () => {
        if (input.trim() !== "") {
            const nextIdRequest = messages[messages.length - 1].id + 1;
            const sender = user ? user : "?";
            const newMessages = [...messages, { id: nextIdRequest, text: input, sender: sender }];
            setMessages(newMessages);
            setWaitingForResponse(true);
            setInput("");
            const response = await fetchPost("/api/chatbot", { content: input });
            if (response.status == 201) {
                const gptResponse: GptResponseResult = response.data;
                const { hasError, message, error } = gptResponse;
                console.log(gptResponse);
                if (!hasError && message) {
                    const nextIdReply = newMessages[newMessages.length - 1].id + 1;
                    setMessages([...newMessages, { id: nextIdReply, text: message, sender: "bot" }]);
                } else {
                    alert("Ai service error: " + error);
                }
            } else {
                alert("Error: " + response.status + " " + response.message);
            }
            setWaitingForResponse(false);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "grey.200",
            }}
        >
            <Box
                sx={{ height: "300px", flexGrow: 1, overflow: "auto", p: 2 }}
            >
                {messages.map((message) => (
                    <Message  key={message.id} message={message} onClick={handleModalOpen}/>
                ))}
                {waitingForResponse && <LoadingMessage />}
                <div ref={messagesEndRef} />
            </Box>
            <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Ask me anything!"
                            variant="outlined"
                            value={input}
                            onChange={handleInputChange}
                            multiline
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            fullWidth={false}
                            size="small"
                            color="primary"
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                        >
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <Box sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    maxHeight: "80vh",
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    tabSize: 4,
                }}>
                    <IconButton onClick={handleModalClose}>
                        <CloseIcon />
                    </IconButton>
                    {selectedMessage && (
                        //<Typography variant="body1">{selectedMessage.text}</Typography>
                        <ModalContent text={selectedMessage.text} />
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

interface MessageProps {
    message: RawMessageData;
    onClick: (message: RawMessageData) => void;
};

function Message({message, onClick}: MessageProps) {
    const isBot = message.sender === "bot";
    const handleClick = () => {
        if (isBot) {
            onClick(message);
        }
    };

    return (
        <Box
            onClick={handleClick}
            sx={{
                display: "flex",
                justifyContent: isBot ? "flex-start" : "flex-end",
                mb: 2,
            }}
        >
            <Box
                sx={{
                display: "flex",
                flexDirection: isBot ? "row" : "row-reverse",
                alignItems: "center",
                }}
            >
                <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}>
                    {isBot ? "B" : message.sender[0]}
                </Avatar>
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        ml: isBot ? 1 : 0,
                        mr: isBot ? 0 : 1,
                        backgroundColor: isBot ? "primary.light" : "secondary.light",
                        borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                    }}
                >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {message.text}
                </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

function LoadingMessage() {
    return (
        <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                    display: "flex",
                    flexDirection:"row",
                    alignItems: "center",
                    }}
                >
                    <Avatar sx={{ bgcolor:"primary.main"}}>
                        {"B"}
                    </Avatar>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            ml: 1,
                            mr: 0,
                            backgroundColor: "primary.light",
                            borderRadius: "20px 20px 20px 5px",
                        }}
                    >
                    <Stack spacing={1}>
                        <Skeleton variant="text" width={50}/>
                    </Stack>
                    </Paper>
                </Box>
            </Box>
    );
}
export default ChatUI;