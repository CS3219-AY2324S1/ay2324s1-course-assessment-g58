import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import React from "react";
import MatchingButton from "./MatchingButton";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const pages = ['Home'];
const settings = ['Profile', 'Logout'];

function NavigationBar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMainButtonClick = (page: String) => {
    if (page === 'Home') {
      router.push('/');
    }
  };

  const handleSettingsButtonClick = (setting: String) => {
    handleCloseUserMenu();
    if (setting === 'Profile') {
      router.push('/profile');
    } else if (setting === 'Logout') {
      logout();
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PeerPrep
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleMainButtonClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {user && <MatchingButton />}
          {user &&
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar> {(user as string)[0]} </Avatar>
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleSettingsButtonClick(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;