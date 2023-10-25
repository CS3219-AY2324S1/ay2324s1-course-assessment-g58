// Source: https://github.com/mui/material-ui/blob/v5.14.13/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from "react";
import { useRouter } from "next/router";
import { fetchPost, fetchGet } from "@/utils/apiHelpers";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  SelectChangeEvent,
} from "@mui/material";

type User = {
    username: string;
    email: string;
};

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MUI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUpBox() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(
      "sending username, email, password: {} {} {} ",
      username,
      email,
      password,
      admin
    );
    await fetchPost("/api/users", {
      username: username,
      email: email,
      password: password,
      admin: admin,
    })
      .then((res) => {
        if (res.status == 201) {
          alert("Success! Added: " + res.data.email);
          router.push("/login?mode=login");
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-disabled-label">Role</InputLabel>
                <FormControl fullWidth>
                  <Select
                  labelId="adminSelect"
                  id="adminSelect"
                  value={admin? "admin" : "user"}
                  label="role"
                  onChange={(e: SelectChangeEvent) => {
                    e.target.value === "admin"
                      ? setAdmin(true)
                      : setAdmin(false);
                  }}
                >
                  <MenuItem disabled>
                    <em>Select a role</em>
                  </MenuItem>
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => router.push("/login?mode=login")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
