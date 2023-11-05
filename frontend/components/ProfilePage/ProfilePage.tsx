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
import ContributionTracker from "./ContributionTracker";
import { validateEmail } from "@/utils/validationHelpers";

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

    // TODO: Add a toast for successful update/creation/deletion
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
                alert("Success! Updated: " + res.data.user.email);
            } else {
                alert(res.message);
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
                alert("Success! Deleted: " + res.data.email);
                logout();
            } else {
                alert(res.message);
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
                    setInvites([...invites, inviteeEmail]);
                    setInviteeEmail("");
                } else {
                    alert(res.message);
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

    useEffect(() => {
        const squares = document.querySelector(".squares");
        squares!.innerHTML = "";
        let totalSubmissions = 0;
        for (var i = 1; i < 365; i++) {
            const level = Math.floor(Math.random() * 3);
            squares!.insertAdjacentHTML(
                "beforeend",
                `<li data-level="${level}"></li>`
            );
            totalSubmissions += level;
        }
        setSubmissions(totalSubmissions);
    }, []);

    return (
        <Box >
            <Container sx ={{ marginLeft: "0", width: "100%"}}>
                <Grid container spacing={1} sx={{height: '100vh'}}>
                    <Grid item sx={{width: "25%"}}>
                        <Card
                            sx={{
                                padding: "1rem",
                                position: "relative", 
                                minWidth: 190, // Set your desired minimum width
                                height: 400,
                                marginTop: "1rem"
                                
                            }}
                        >
                            
                                <Avatar
                                    sx={{
                                        width: "8rem",
                                        height: "8rem",
                                        fontSize: "4rem",
                                        marginLeft: "3.75rem",
                                    }}
                                >
                                    {(user as string)[0]}
                                </Avatar>
                                <Stack padding={2}>
                                    <Stack direction="row">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16" style={{ marginRight:"7", marginTop:"7.8"}}>
                                            <path fill="currentColor" d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6.004 6.004 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"/>
                                        </svg>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {user}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16" style={{  marginRight:"8", marginTop:"7.8", marginLeft:"-1"}}>
                                            <path fill="currentColor" d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"/>
                                        </svg>
                                        <Typography variant="subtitle1" fontWeight="bold">{email}</Typography>
                                    </Stack>
                                </Stack>
                            
                            {/* Edit Profile */}
                            <Button
                                onClick={() => setEditing(!isEditing)}
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    
                                    width: "100%",
                                }}
                            >
                                Edit Profile
                            </Button>
                            {isEditing && (
                                <Stack>
                                    <Box
                                        sx={{
                                            bgcolor: "lightgray",
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
                                                setUpdatedUsername(e.target.value);
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
                                                onClick={() => setEditing(false)}
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
                                                bgcolor: "lightgray",
                                                borderRadius: "0.5rem",
                                                padding: 2,
                                                marginTop: 2,
                                            }}
                                        >
                                            <Typography padding={1} variant="subtitle2">
                                                Send an Invitation Email to add a new
                                                Admin
                                            </Typography>
                                            <Stack direction="row">
                                                <TextField
                                                    variant="outlined"
                                                    label="Enter an Email"
                                                    value={inviteeEmail}
                                                    size="small"
                                                    onChange={(e) =>
                                                        setInviteeEmail(e.target.value)
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
                                                        onClick={handleInviteCreate}
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
                                                    {invites.map((invite, index) => (
                                                        <ListItem
                                                            key={invite as string}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                sx={{
                                                                    overflowX: "hidden",
                                                                }}
                                                                primary={invite}
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
                                                    ))}
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
                                            account? This action cannot be undone.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={() => setIsDialogOpen(false)}
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                        <Button onClick={deleteUser} color="error">
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid
                        container
                        spacing={6}
                        columns={6}
                        sx={{
                            
                            paddingY: 1,
                            paddingRight: 0,
                            paddingLeft: 5,
                            width: "75%",
                            
                        }}
                    >
                        <Grid item xs={6} sx={{
                            paddingLeft: 100,
                            
                        }}>
                            <Stack>
                                <Card sx={{ padding: 3, minHeight: "87%",  marginTop: "1rem" }}>
                                    <Stack direction="row">
                                        <Typography variant="h6" fontWeight="bold">
                                            {submissions}
                                        </Typography>
                                        <Typography marginLeft={0.5} marginTop={0.75}>
                                            submissions in the last year
                                        </Typography>
                                    </Stack>
                                    <ContributionTracker />
                                </Card>
                                <Grid item xs={6}>
                            <Card sx={{ minHeight:200}}>
                                <Typography
                                    variant="h6"
                                    sx={{ paddingX: 2, paddingTop: 1 }}
                                >
                                    Our Users
                                </Typography>

                                
                                <List
                                    sx={{
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                        margin: 1,
                                        bgcolor: "lightgray",
                                        borderRadius: "0.5rem",
                                    }}
                                >
                                    
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
                        </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                        
                    </Grid>
                
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
