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
} from "@mui/material";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { useEffect, useState, FormEvent } from "react";
import { fetchPost, fetchGet, fetchPut, fetchDelete } from "@/utils/apiHelpers";
// import ContributionTracker from './ContributionTracker';
import CloseIcon from "@mui/icons-material/Close";
import { log } from "console";

type User = {
    username: string;
    email: string;
};

const ProfilePage = () => {
    const { user, email, logout, setUser, token } = useAuth();
    const [submissions, setSubmissions] = useState(0);
    const [isEditing, setEditing] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // useEffect(() => {
    //     const squares = document.querySelector('.squares');
    //     squares!.innerHTML = '';
    //     let totalSubmissions = 0;
    //     for (var i = 1; i < 365; i++) {
    //         const level = Math.floor(Math.random() * 3);
    //         squares!.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
    //         totalSubmissions += level;
    //     }
    //     setSubmissions(totalSubmissions);
    // }, [])

    // loads list of users upon entering profile page
    useEffect(() => {
        refreshUsers();
    }, [user]);

    const refreshUsers = async () => {
        await fetchGet("/api/users", { token: token }).then((res) => {
            if (res.status == 200 && res.data) setUsers(res.data);
        });
    };

    const updateUser = async (event: FormEvent) => {
        event.preventDefault();
        await fetchPut("/api/users", {
            username: updatedUsername,
            email: email,
            token: token,
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
            token: token,
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
        <Box width="full" height="full">
            <Stack direction="row">
                <Grid container spacing={3} className="w-10/12">
                    <Grid item className="w-1/3">
                        <Card
                            className="p-4"
                            sx={{
                                backgroundColor: "white",
                                position: "relative", // Set the background color here
                            }}
                        >
                            <Stack direction="row">
                                <Avatar className="w-20 h-20 text-4xl">
                                    {(user as string)[0]}
                                </Avatar>
                                <Stack className="p-4">
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
                            <Button
                                onClick={() => setEditing(!isEditing)}
                                variant="outlined"
                                color="info"
                                style={{ textTransform: "none" }}
                                className="w-full mt-2 border-none hover:border-none bg-blue-50"
                            >
                                Edit Profile
                            </Button>
                            {isEditing && (
                                <Stack>
                                    <Divider className="my-4" />
                                    <TextField
                                        variant="outlined"
                                        label="Enter a New Username"
                                        value={updatedUsername}
                                        size="small"
                                        onChange={(e) => {
                                            setUpdatedUsername(e.target.value);
                                        }}
                                    />
                                    <Stack
                                        direction="row"
                                        className="mt-2 justify-between"
                                    >
                                        <Button
                                            className="w-[49%] border-none hover:border-none bg-green-50"
                                            variant="outlined"
                                            color="success"
                                            onClick={updateUser}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            className="w-[49%] border-none hover:border-none bg-red-50"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => setEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                    <Button
                                        className="w-[49%] border-none hover:border-none bg-red-50"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => setIsDialogOpen(true)}
                                        style={{
                                            marginTop: "100px",
                                            marginLeft: "auto",
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
                    <Grid item className="w-2/3">
                        {/* <Grid container spacing={3} className="w-full"> 
                            <Grid item className="w-1/2">
                                <Card>
                                    Solved
                                </Card>
                            </Grid>
                            <Grid item className="w-1/2">
                                <Card>
                                    Badges
                                </Card>
                            </Grid>
                        </Grid> */}
                        <Grid container spacing={3} className="w-2/3">
                            <Grid item className="w-full">
                                <Card className="p-4">
                                    <Stack
                                        direction="row"
                                        className="items-center"
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            {submissions}
                                        </Typography>
                                        <Typography className="ml-2">
                                            submissions in the last year
                                        </Typography>
                                    </Stack>
                                    {/* <ContributionTracker /> */}
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className="w-2/12">
                    <Card
                        className="p-0"
                        sx={{
                            backgroundColor: "white", // Set the background color here
                            // Other CSS properties can also be defined
                        }}
                    >
                        {/* Header */}
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

                        {/* User List */}
                        <List sx={{ maxHeight: "200px", overflowY: "auto" }}>
                            {/* Example list of current users */}
                            {users.map((user) => (
                                <ListItem key={user.email}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 32, height: 32 }}>
                                            {user.username}
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
                </Grid>
            </Stack>
        </Box>
    );
};

export default ProfilePage;
