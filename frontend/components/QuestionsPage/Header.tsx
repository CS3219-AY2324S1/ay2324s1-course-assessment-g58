import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface HeaderProps {}

function Header(props: HeaderProps) {
    const { user, logout } = useAuth();
    const labelStyle = {
        marginLeft: "10px",
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 500 }}>
            {user && (
                <>
                    <Typography variant="h4" color="text.primary">
                        Welcome, {user}
                    </Typography>
                    <Button
                        style={labelStyle}
                        onClick={logout}
                        variant="contained"
                    >
                        Logout
                    </Button>
                </>
            )}
        </Box>
    );
}

export default Header;
