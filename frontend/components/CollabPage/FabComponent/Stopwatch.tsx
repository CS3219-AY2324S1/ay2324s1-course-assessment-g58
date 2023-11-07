// Source: https://github.com/jinderbrar/Stopwatch-using-ReactJS-and-Material-UI/blob/main/src/components/Stopwatch.js
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import Draggable from "react-draggable";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import MinimizeIcon from '@mui/icons-material/Minimize';
import RestoreIcon from "@mui/icons-material/Restore";

export interface StopwatchProps {
    isRunning: boolean;
    isReset: boolean;
    setIsReset: (isReset: boolean) => void;
    sendStartRequest: () => void;
    sendStopRequest: () => void;
    sendResetRequest: () => void;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

const Stopwatch = ({
    isRunning,
    isReset,
    setIsReset,
    sendStartRequest,
    sendStopRequest,
    sendResetRequest,
    setIsOpen,
    isOpen }: StopwatchProps) => {
  const [time, setTime] = useState<number>(0.0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = () => {
    const sec = `${Math.floor(time) % 60}`.padStart(2, "0");
    const min = `${Math.floor(time / 60) % 60}`.padStart(2, "0");
    const hour = `${Math.floor(time / 3600)}`.padStart(2, "0");
    return (
      <>
        <Typography variant="h1">{[hour, min, sec].join(":")}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
          {["hr", "min", "sec"].map((unit) => (
            <Typography key={unit} variant="overline">
              {unit}
            </Typography>
          ))}
        </Box>
      </>
    );
  };

  const handlePlayPause = () => {
    if (isActive) {
      sendStopRequest();
    } else {
      sendStartRequest();
    }
  };
  const handleReset = () => {
    sendResetRequest();
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isRunning) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  
  }, [isRunning]);

  useEffect(() => {
    if (isReset) {
      setIsReset(false);
      setTime(0);
    }
  }, [isReset]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => setTime((prevTime) => prevTime + 0.1), 100);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isActive]);

  return (
    <div className={isOpen ? "stopwatch" : "hidden"}>
      <Draggable>
        <Box 
          sx={{
            position: 'absolute', // Centering in the viewport
            top: '50%', // Align vertically
            left: '50%', // Align horizontally
            transform: 'translate(-50%, -50%)', // Adjust the position to center
            bgcolor: 'background.paper', // Use theme's paper color for background
            boxShadow: 3, // Apply some shadow
            p: 4, // Padding around the content
            borderRadius: 'borderRadius' // Optional: rounded corners
          }}
        >
          {/* Close button at the top right corner */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          >
            <IconButton onClick={onClose}>
              <MinimizeIcon />
            </IconButton>
          </Box>
          <Grid m={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Grid item>{formatTime()}</Grid>
            <Grid item>
              <ControlButtons
                args={{
                  time,
                  isActive,
                  handlePlayPause,
                  handleReset
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Draggable>
    </div>
  );
};

type ControlButtonsProps = {
  args: {
    time: number;
    isActive: boolean;
    handlePlayPause: () => void;
    handleReset: () => void;
  };
};

const ControlButtons: React.FC<ControlButtonsProps> = ({
  args: { time, isActive, handlePlayPause, handleReset }
}) => {
  return (
    <>
      {/* play or pause stopwatch */}
      <Tooltip title={isActive ? "Pause" : "Play"}>
        <IconButton onClick={() => handlePlayPause()}>
          {isActive ? (
            <PauseCircleFilledIcon sx={{ color: "palette.status.pause", fontSize: "48px" }} />
          ) : (
            <PlayCircleFilledIcon sx={{ color: "palette.status.play", fontSize: "48px" }} />
          )}
        </IconButton>
      </Tooltip>
      {/* reset stopwatch */}
      <Tooltip title="Reset">
        <IconButton disabled={time === 0} onClick={() => handleReset()}>
          <RestoreIcon sx={{ fontSize: "48px" }} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Stopwatch;
