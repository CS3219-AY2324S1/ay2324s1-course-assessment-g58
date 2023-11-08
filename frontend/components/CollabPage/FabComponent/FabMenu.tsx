import React, { useState } from "react";
import { Fab, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { StopwatchProps } from "./Stopwatch";
import Stopwatch from "./Stopwatch";
import dynamic from "next/dynamic";
const VideoAudioChat = dynamic(() => import("../VideoComm"), { ssr: false });

interface FabMenuProps {
    stopwatchProps: StopwatchProps;
    username1: string | null;
    username2: string;
}

const FabMenu = ({ stopwatchProps, username1, username2 }: FabMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [stopwatchOpen, setStopwatchOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const [callActive, setCallActive] = useState(true);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickVideo = () => {
        setAnchorEl(null);
        setCallActive(true);
    };
    
    const handleClickStopwatch = () => {
        setStopwatchOpen(true);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseStopwatch = () => {
        setStopwatchOpen(false);
    };

    stopwatchProps.setIsOpen = setStopwatchOpen;
    stopwatchProps.isOpen = stopwatchOpen;

    return (
        <div>
            <Fab
                color="primary"
                aria-label="add"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                }}
                onClick={handleClick}
            >
                <MenuIcon />
            </Fab>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuItem onClick={handleClickVideo}>Video</MenuItem>
                <MenuItem onClick={handleClickStopwatch}>Stopwatch</MenuItem>
            </Menu>
            <VideoAudioChat 
                username1={username1} 
                username2={username2}
                callActive={callActive}
                setCallActive={setCallActive}
            />
            <Stopwatch {...stopwatchProps} />
        </div>
    );
};

export default FabMenu;
