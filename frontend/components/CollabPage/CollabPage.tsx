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

    useEffect(() => {
        // Reject people with no roomId
        if (router.pathname == "/collab" && roomId === "") {
            router.push("/");
        }
    }, [roomId, router.pathname]);

    // Connect to collab service socket via roomId
    useEffect(() => {
        if (roomId === "") return;
        //TODO: non hardcode url handling
        const socket = io("http://localhost:3005", {
            auth: {
                roomId: roomId,
            },
        });
        setSocket(socket);
    }, [roomId]);

    // When unmounting this component i.e leaving page, cancel matching
    useEffect(() => {
        return () => {
            cancelMatching();
        };
    }, []);

    return (
        <div>
            <h1>Collab Page</h1>
            <h2>Username: {user}</h2>
            <h2>Room ID: {roomId}</h2>
        </div>
    );
};

export default CollabPage;
