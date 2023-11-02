// Source: https://frontendshape.com/post/create-a-chat-ui-in-react-with-mui-5
import React, { ChangeEvent, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Avatar,
    Grid,
    Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { RawMessageData } from '@/types/ChatBotMessage';

const messages: RawMessageData[] = [
    { id: 1, text: "Hi there!", sender: "bot" },
    { id: 2, text: "Hello!", sender: "user" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
];

function ChatUI() {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() !== "") {
            console.log(input);
            setInput("");
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
                <Message message={message} />
                ))}
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
        </Box>
    );
};

interface MessageProps {
    message: RawMessageData;
};

function Message({message}: MessageProps) {
    const isBot = message.sender === "bot";

    return (
        <Box
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
                    {isBot ? "B" : "U"}
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
                <Typography variant="body1">{message.text}</Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default ChatUI;
