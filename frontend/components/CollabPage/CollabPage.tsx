import { useAuth } from "@/contexts/AuthContext";
import { useMatching } from "@/contexts/MatchingContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const CollabPage = () => {
    const { user } = useAuth();
    const { roomId, cancelMatching } = useMatching();
    const router = useRouter();
    const [socket, setSocket] = useState<Socket>();

    // Reject people with no roomId
    useEffect(() => {   
        if (router.pathname == '/collab' && roomId === "") {
            router.push('/');
        }
    }, [roomId, router.pathname]);

    // Cancel matching when user leaves the page
    useEffect(() => {
        if (router.pathname != '/collab') {
            cancelMatching();
        }
    }, [router.pathname]);

    // Connect to collab service socket via roomId
    useEffect(() => {
        if (roomId === "") return;

        const socket = io("http://localhost:3005");
        setSocket(socket);

        return () => {
            socket.disconnect();
        };

    }, [roomId]);
    return (
        <div>
            <h1>Collab Page</h1>
            <h2>Username: {user}</h2>
            <h2>Room ID: {roomId}</h2>
        </div>
    )
}

export default CollabPage;