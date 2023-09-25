import { Avatar, Box, Button, Card, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import ContributionTracker from './ContributionTracker';
import CloseIcon from '@mui/icons-material/Close';

const ProfilePage = () => {
    const { user } = useAuth();
    const [ submissions, setSubmissions ] = useState(0);
    const [ isEditing, setEditing ] = useState(false);
    
    useEffect(() => {
        const squares = document.querySelector('.squares');
        squares!.innerHTML = '';
        let totalSubmissions = 0;
        for (var i = 1; i < 365; i++) {
            const level = Math.floor(Math.random() * 3);  
            squares!.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
            totalSubmissions += level;
        }
        setSubmissions(totalSubmissions);
    }, [])
    return (
        <Box width="full" height="full">
            <Stack direction="row">
                <Stack className="w-2/12"/>
                <Grid container spacing={3} className="w-8/12">
                    <Grid item className="w-1/3">
                        <Card className="p-4">
                            <Stack direction="row">
                                <Avatar className="w-20 h-20 text-4xl">{(user as string)[0]}</Avatar>
                                <Stack className="p-4">
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {user}
                                    </Typography>
                                    <Typography variant="caption">
                                        User email
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Button 
                                onClick={() => setEditing(!isEditing)}
                                variant="outlined" color="info" style={{ textTransform: 'none' }} 
                                className="w-full mt-2 border-none hover:border-none bg-blue-50"
                            >
                                Edit Profile
                            </Button>
                            {isEditing && 
                                <Stack>
                                    <Divider className="my-4"/>
                                    <TextField
                                        variant="outlined"
                                        label="Enter a New Username"
                                        size="small"
                                    />
                                    <Stack direction="row" className="mt-2 justify-between">
                                        <Button className="w-[49%] border-none hover:border-none bg-green-50" variant="outlined" color="success" onClick={() => console.log("TODO: Add this functionality!")}>
                                            Save
                                        </Button>
                                        <Button className="w-[49%] border-none hover:border-none bg-red-50" variant="outlined" color="error" onClick={() => setEditing(false)}>
                                            Cancel
                                        </Button>
                                    </Stack>
                                </Stack>
                                // TODO: Fill out the inputs to edit username + password
                            }
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
                        <Grid container spacing={3} className="w-full"> 
                            <Grid item className="w-full">
                                <Card className="p-4">
                                    <Stack direction="row" className="items-center">
                                        <Typography variant="h6" fontWeight="bold">
                                            {submissions} 
                                        </Typography>
                                        <Typography className="ml-2">
                                            submissions in the last year
                                        </Typography>
                                    </Stack>
                                    <ContributionTracker />
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Stack className="w-2/12"/>
            </Stack>

        </Box>
    );
}

export default ProfilePage;
