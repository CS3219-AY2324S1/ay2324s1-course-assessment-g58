import {
    Avatar,
    Button,
    Box,
    Card,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import { fetchToken, useAuth } from "../../contexts/AuthContext";
import { useEffect, useState, FormEvent } from "react";
import { fetchGet, fetchPut, fetchDelete, fetchPost } from "@/utils/apiHelpers";
import SessionTracker from "./SessionComponent/SessionTracker";
import { validateEmail } from "@/utils/validationHelpers";
import { messageHandler } from "@/utils/handlers";
import HistoryTable from "./HistoryTable";

type User = {
    username: string;
    email: string;
};

const ProfilePage = () => {
    const { user, email, admin, logout, setUser } = useAuth();
    const [submissions, setSubmissions] = useState(0);
    const [isEditing, setEditing] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [inviteeEmail, setInviteeEmail] = useState("");
    const [invites, setInvites] = useState<String[]>([]);
    const [isInviting, setInviting] = useState(false);
    const [isInviteError, setInviteError] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    const updateUser = async (event: FormEvent) => {
        event.preventDefault();
        await fetchPut("/api/users", {
            username: updatedUsername,
            email: email,
        }).then((res) => {
            if (res.data) {
                // get new token
                localStorage.setItem("accessToken", res.data.token);
                setUser(updatedUsername);
                messageHandler(
                    "Success! Updated: " + res.data.user.email,
                    "success"
                );
            } else {
                messageHandler(res.message, "error");
            }
        });
    };

    const deleteUser = async (event: FormEvent) => {
        event.preventDefault();
        await fetchDelete("/api/users", {
            email: email,
        }).then((res) => {
            console.log(res);
            if (res.status == 200) {
                setIsDialogOpen(false);
                messageHandler(
                    "Success! Deleted: " + res.data.email,
                    "success"
                );
                logout();
            } else {
                messageHandler(res.message, "error");
            }
        });
    };

    const handleInviteCreate = async () => {
        setInviteError(false);
        // Validate email
        if (!validateEmail(inviteeEmail)) {
            // Handle error
            setInviteError(true);
            return;
        }
        setSubmitting(true);
        await fetchPost("/api/invite", {
            email: email,
            inviteeEmail: inviteeEmail,
            token: fetchToken(),
        })
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    if (!invites.includes(inviteeEmail)) {
                        // Add email if not already in list of invites
                        setInvites([...invites, inviteeEmail]);
                    }
                    setInviteeEmail("");
                } else {
                    messageHandler(res.message, "error");
                    console.error("Create failed");
                }
            })
            .finally(() => setSubmitting(false));
    };

    const handleInviteDelete = async (index: number) => {
        setSubmitting(true);
        await fetchDelete("/api/invite", {
            email: email,
            inviteeEmail: invites[index],
            token: fetchToken(),
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    const updatedEmails = invites.filter((_, i) => i !== index);
                    setInvites(updatedEmails);
                } else {
                    console.error("Delete failed");
                }
            })
            .finally(() => setSubmitting(false));
    };

    const refreshUsers = async () => {
        await fetchGet("/api/users").then((res) => {
            if (res.status == 200 && res.data) setUsers(res.data);
        });
    };

    const refreshInvites = async () => {
        // don't refresh if not admin
        if (!admin) {
            return;
        }

        const token = fetchToken();
        await fetchPost("/api/invite/get-all", { token: token }).then((res) => {
            if (res.status == 200 && res.data) {
                setInvites(res.data);
            }
        });
    };

    useEffect(() => {
        refreshUsers();
        refreshInvites();
    }, []);

    return (
        <Box>
            <Container>
                <Stack direction="row" sx={{ width: "100%", marginTop: 1 }}>
                    <Stack sx={{ width: "35%", height: "100%", margin: 1 }}>
                        <Card sx={{ padding: 2, minHeight: 617 }}>
                            <Stack direction="row">
                                <Avatar
                                    sx={{
                                        width: "5rem",
                                        height: "5rem",
                                        fontSize: "2.25rem",
                                    }}
                                >
                                    {(user as string)[0]}
                                </Avatar>
                                <Stack padding={2}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        {user}
                                    </Typography>
                                    <Typography variant="caption">
                                        {email}
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/* Edit Profile */}
                            <Button
                                onClick={() => setEditing(!isEditing)}
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    marginTop: "1rem",
                                    width: "100%",
                                }}
                            >
                                Edit Profile
                            </Button>
                            {isEditing && (
                                <Stack>
                                    <Box
                                        sx={{
                                            borderRadius: "0.5rem",
                                            padding: 2,
                                            marginTop: 2,
                                        }}
                                    >
                                        <TextField
                                            variant="outlined"
                                            label="Enter a New Username"
                                            value={updatedUsername}
                                            size="small"
                                            onChange={(e) => {
                                                setUpdatedUsername(
                                                    e.target.value
                                                );
                                            }}
                                            sx={{ width: "100%" }}
                                        />
                                        <Stack
                                            direction="row"
                                            marginTop={2}
                                            justifyContent={"right"}
                                        >
                                            <Button
                                                sx={{ textTransform: "none" }}
                                                variant="contained"
                                                color="success"
                                                onClick={updateUser}
                                            >
                                                <CheckIcon />
                                            </Button>
                                            <Button
                                                sx={{
                                                    width: "10%",
                                                    textTransform: "none",
                                                    marginLeft: 2,
                                                }}
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    setEditing(false)
                                                }
                                            >
                                                <CloseIcon />
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Stack>
                            )}
                            {/* Invite Admins */}
                            {admin && (
                                <Stack>
                                    <Button
                                        onClick={() => setInviting(!isInviting)}
                                        variant="contained"
                                        color="success"
                                        sx={{
                                            textTransform: "none",
                                            marginTop: "1rem",
                                            width: "100%",
                                        }}
                                    >
                                        Invite Admins
                                    </Button>
                                    {isInviting && (
                                        <Box
                                            sx={{
                                                borderRadius: "0.5rem",
                                                padding: 2,
                                                marginTop: 2,
                                            }}
                                        >
                                            <Typography
                                                padding={1}
                                                variant="subtitle2"
                                            >
                                                Send an Invitation Email to add
                                                a new Admin
                                            </Typography>
                                            <Stack direction="row">
                                                <TextField
                                                    variant="outlined"
                                                    label="Enter an Email"
                                                    value={inviteeEmail}
                                                    size="small"
                                                    onChange={(e) =>
                                                        setInviteeEmail(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter")
                                                            handleInviteCreate();
                                                    }}
                                                    sx={{ width: "100%" }}
                                                    error={isInviteError}
                                                    helperText={
                                                        isInviteError
                                                            ? "Please enter a valid email."
                                                            : ""
                                                    }
                                                />
                                                <Box>
                                                    <Button
                                                        sx={{
                                                            height: "95%",
                                                            marginLeft: 1,
                                                        }}
                                                        variant="contained"
                                                        color="info"
                                                        onClick={
                                                            handleInviteCreate
                                                        }
                                                    >
                                                        <SendIcon />
                                                    </Button>
                                                </Box>
                                            </Stack>
                                            {/* Invitees List */}
                                            {invites.length > 0 && (
                                                <List
                                                    sx={{
                                                        maxHeight: "200px",
                                                        overflowY: "scroll",
                                                        margin: 1,
                                                        bgcolor: "azure",
                                                        borderRadius: "0.5rem",
                                                    }}
                                                >
                                                    {/* Example list of current users */}
                                                    {invites.map(
                                                        (invite, index) => (
                                                            <ListItem
                                                                key={
                                                                    invite as string
                                                                }
                                                            >
                                                                <ListItemAvatar>
                                                                    <Avatar />
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    sx={{
                                                                        overflowX:
                                                                            "hidden",
                                                                    }}
                                                                    primary={
                                                                        invite
                                                                    }
                                                                />
                                                                <CloseIcon
                                                                    sx={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() =>
                                                                        handleInviteDelete(
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>
                                            )}
                                        </Box>
                                    )}
                                </Stack>
                            )}
                            {/* Delete Account */}
                            <Stack>
                                <Button
                                    sx={{
                                        width: "100%",
                                        textTransform: "none",
                                        marginTop: 2,
                                    }}
                                    variant="contained"
                                    color="error"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Delete Account
                                </Button>
                                <Dialog
                                    open={isDialogOpen}
                                    onClose={() => setIsDialogOpen(false)}
                                >
                                    <DialogTitle>Warning</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Are you sure you want to delete your
                                            account? This action cannot be
                                            undone.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={() =>
                                                setIsDialogOpen(false)
                                            }
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={deleteUser}
                                            color="error"
                                        >
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Stack>
                        </Card>
                    </Stack>

                    {/* Submissions/Users */}
                    <Stack sx={{ width: "65%", height: "100%", margin: 1 }}>
                        <Card
                            sx={{ padding: 2, marginBottom: 2, minHeight: 250 }}
                        >
                            <SessionTracker username={user} />
                        </Card>
                        <Card sx={{ padding: 2, minHeight: 350 }}>
                            {/* Header */}
                            <Typography
                                variant="h6"
                                sx={{ paddingX: 2, paddingTop: 1 }}
                            >
                                Our Users
                            </Typography>

                            {/* User List */}
                            <List
                                sx={{
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    margin: 1,
                                    borderRadius: "0.5rem",
                                }}
                            >
                                {/* Example list of current users */}
                                {users.map((user) => (
                                    <ListItem key={user.email}>
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{ width: 32, height: 32 }}
                                            >
                                                {user.username[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.username} />
                                    </ListItem>
                                ))}
                            </List>

                            <Button
                                variant="outlined"
                                color="error"
                                onClick={refreshUsers}
                                sx={{
                                    fontSize: "12px", // Adjust the font size as needed
                                    width: "40%",
                                    margin: 1,
                                }}
                            >
                                expand / refresh
                            </Button>
                        </Card>
                    </Stack>
                </Stack>

                {/* History */}
                <Stack sx={{ width: "100%" }}>
                    <Card sx={{ padding: 2, margin: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                paddingX: 2,
                                paddingY: 1,
                                fontWeight: "bold",
                            }}
                        >
                            PeerPrep History
                        </Typography>
                        <HistoryTable username={user as string} />
                    </Card>
                </Stack>

                {/* Renders a backdrop while processing request */}
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={isSubmitting}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </Box>
    );
};

export default ProfilePage;
