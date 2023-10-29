import { useEffect, useRef, useState,  } from "react";
import Draggable from "react-draggable";
import { Button, Grid, Typography, Stack } from "@mui/material";
import { Videocam, VideocamOff, MicNone, MicOff } from "@mui/icons-material";
import {Peer, MediaConnection} from "peerjs";
import { useMatching } from "@/contexts/MatchingContext";
declare global {
    interface Window {
      localStream: MediaStream | undefined;
    }
  }
const VideoAudioChat = ({ username1, username2 }: {
    username1: string | null;
    username2: string;
  }) => {
  const [videoToggle, setVideoToggle] = useState(true);
  const [audioToggle, setAudioToggle] = useState(true);
  const userVideoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const partnerVideoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const userNameRef = useRef<string | null>(null);
  const partnerNameRef = useRef<string | null>(null);
  const [callActive, setCallActive] = useState(true);
  const { socketId } = useMatching();
  

  useEffect(() => {
    // Get current username
    if (socketId === username1) {
      userNameRef.current =username1;
      partnerNameRef.current = username2;
    } else if (socketId === username2) {
      userNameRef.current = username2;
      partnerNameRef.current = username1;
    }
    if (socketId) {
      console.log(socketId);
    }
    const peer = socketId ? new Peer(socketId) : new Peer();

    let dispose = () => {};
    if (socketId !== username1) {
      setTimeout(() => {
        navigator.mediaDevices.getUserMedia(
          { video: true, audio: true })
          .then((stream) => {
            window.localStream = stream;
            showVideo(stream, userVideoRef.current, true);
            dispose = showStream(
              peer.call(username1!, stream),
              partnerVideoRef.current
            );
          }).catch(
          (error) => {
            console.log("Failed to get local stream", error);
          }
        );
      }, 3000);
      return () => {
        dispose();
        peer.destroy();
        if (window.localStream) {
          window.localStream.getVideoTracks().forEach((track) => track.stop());
          window.localStream.getAudioTracks().forEach((track) => track.stop());
        }
      };
    } else {
      const handler = (call: MediaConnection) => {
        navigator.mediaDevices.getUserMedia(
          { video: true, audio: true })
          .then((stream) => {
            window.localStream = stream;
            showVideo(stream, userVideoRef.current, true);
            call.answer(stream);
          }).catch(
          (error) => {
            console.log("Failed to get local stream", error);
          }
        );

        dispose = showStream(call, partnerVideoRef.current);
      };

      peer.on("call", handler);

      return () => {
        dispose();
        peer.off("call", handler);
        peer.destroy();
        if (window.localStream) {
          window.localStream.getVideoTracks().forEach((track) => track.stop());
          window.localStream.getAudioTracks().forEach((track) => track.stop());
        }
      };
    }
  }, []);

  const showVideo = (stream: MediaStream, video: HTMLVideoElement, muted: boolean) => {
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();
  };

  const showStream = (call: MediaConnection, otherVideo: HTMLVideoElement) => {
    const handler = (remoteStream: MediaStream) => {
      showVideo(remoteStream, otherVideo, false);
    };
    call.on("stream", handler);

    return () => call.off("stream", handler);
  };

  const handleVideoToggle = () => {
    if(window.localStream){
    window.localStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !videoToggle));
    setVideoToggle(!videoToggle);
  };
};

  const handleAudioToggle = () => {
    if(window.localStream) {
    window.localStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !audioToggle));
    setAudioToggle(!audioToggle);
  };
  
};
const handleEndCall = () => {
  if (callActive) {
    setCallActive(false); // Set callActive to false
    userVideoRef = useRef<HTMLVideoElement>(document.createElement("video"));
    partnerVideoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  }
};

  return (
    callActive ? (
    <Draggable>
      <div className="video-container">
      <Stack direction="column">
        <Stack direction="row" alignItems="center" justifyContent="space-between" >
          <div className="video">
            <video ref={partnerVideoRef} />
          </div> 
        
          <div className="video">
            <video ref={userVideoRef} />
          </div> 
        </Stack>
        <Stack direction="row" alignItems="center">  
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: "5px" }}
            onClick={handleVideoToggle}
          >
            {videoToggle ? <Videocam /> : <VideocamOff />}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: "5px" }}
            onClick={handleAudioToggle}
          >
            {audioToggle ? <MicNone /> : <MicOff />}
          </Button>
          <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{ margin: '5px' }}
              className="end-call-button" // Apply the CSS class here
              onClick={handleEndCall} // Attach the onClick event to close the component
            >
              End Call
            </Button>
        </Stack>
      </Stack>
      </div>
    </Draggable>
    ) :  null
  );
};

export default VideoAudioChat;