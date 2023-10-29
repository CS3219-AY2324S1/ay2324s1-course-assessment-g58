import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    Grid,
    IconButton,
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
    Container,
} from "@mui/material";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { useEffect, useState, FormEvent } from "react";
import { fetchPost, fetchGet, fetchPut, fetchDelete } from "@/utils/apiHelpers";
import ContributionTracker from "./ContributionTracker";
import CloseIcon from "@mui/icons-material/Close";
import { log } from "console";

type User = {
    username: string;
    email: string;
};

const ProfilePage = () => {
    const { user, email, logout, setUser } = useAuth();
    const [submissions, setSubmissions] = useState(0);
    const [isEditing, setEditing] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    // loads list of users upon entering profile page
    useEffect(() => {
        refreshUsers();
    }, [user]);

    const refreshUsers = async () => {
        await fetchGet("/api/users").then((res) => {
            if (res.status == 200 && res.data) setUsers(res.data);
        });
    };

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
    return (
        <Box >
            <Container sx ={{ marginLeft:"0"}}>
                <Grid container spacing={1} sx={{height: '100vh'}}>
                    <Grid item sx={{width: "20%"}}>
                        <Card
                            sx={{
                                padding: "1rem",
                                position: "relative", // Set the background color here
                                minWidth: 190, // Set your desired minimum width
                                minHeight: 200,
                                marginLeft:"0"
                            }}
                        >
                            <Avatar>
                                    {(user as string)[0]}
                                </Avatar>
                                <Stack>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16" style={{  verticalAlign: 'middle', marginRight:"5"}}>
                                            <path fill="currentColor" d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6.004 6.004 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"/>
                                        </svg>
                                        <Typography
                                            variant="caption"
                                            fontWeight="bold"
                                            sx={{fontSize:"16"}}
                                        >
                                            {user}
                                        </Typography>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16" style={{  verticalAlign: 'middle', marginRight:"5"}}>
                                            <path fill="currentColor" d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"/>
                                        </svg>
                                        <Typography variant="caption" sx={{fontSize:""}} >
                                            {email}
                                        </Typography>
                                    </div>
                                </Stack>
                            <Button
                                onClick={() => setEditing(!isEditing)}
                                variant="outlined"
                                color="info"
                                style={{ textTransform: "none" }}
                                className="border-none hover:border-none bg-blue-50"
                                sx={{marginBottom:"5px"}}
                            >
                                Edit Profile
                            </Button>
                            {isEditing && (
                                <Stack>
                                    <Divider/>
                                    <TextField
                                        variant="outlined"
                                        label="Enter a New Username"
                                        value={updatedUsername}
                                        size="small"
                                        sx={{marginBottom:"1px"}}
                                        onChange={(e) => {
                                            setUpdatedUsername(e.target.value);
                    
                                        }}
                                    />
                                    <Stack
                                        direction="row"
                                    >
                                        <Button
                                            className="border-none hover:border-none bg-green-50"
                                            variant="outlined"
                                            color="success"
                                            onClick={updateUser}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            className="border-none hover:border-none bg-red-50"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => setEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                    <Button
                                        className=" border-none hover:border-none bg-red-50"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => setIsDialogOpen(true)}
                                        style={{
                            
                                            marginRight: "auto",
                                            marginTop: "50px",
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Dialog
                                        open={isDialogOpen}
                                        onClose={() => setIsDialogOpen(false)}
                                    >
                                        <DialogTitle>Warning</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Are you sure you want to delete
                                                your account? This action cannot
                                                be undone.
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
                            )}
                        </Card>
                    </Grid>
                    <Grid item className="">
                        <Card className="">
                            <Stack direction="row" className="items-center">
                                <Typography variant="h6" fontWeight="bold">
                                    {submissions}
                                </Typography>
                                <Typography className="">
                                    submissions in the last year
                                </Typography>
                            </Stack>
                            <ContributionTracker />
                        </Card>
                    </Grid>
                </Grid>
                {/* <Grid container className="w-full pr-6 mt-4">
                    <Card className="p-0 w-full bg-white">
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                backgroundColor: "#E0E9FF",
                                color: "Black",
                                padding: "1px",
                            }}
                        >
                            Our Users
                        </Typography>
                        <List sx={{ maxHeight: "200px", overflowY: "auto" }}>
                            {users.map((user) => (
                                <ListItem key={user.email}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 32, height: 32 }}>
                                            {user.username[0]}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.username} />
                                </ListItem>
                            ))}
                        </List>

                        <Button
                            className="w-[40%] border-none hover:border-none bg-red-50 font-size-small"
                            variant="outlined"
                            color="error"
                            onClick={refreshUsers}
                            sx={{
                                fontSize: "9px", // Adjust the font size as needed
                            }}
                        >
                            expand / refresh
                        </Button>
                    </Card>
                </Grid> */}
            </Container>
        </Box>
    );
};

export default ProfilePage;
