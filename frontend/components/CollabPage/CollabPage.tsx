import { useAuth } from "@/contexts/AuthContext";
import { useMatching } from "@/contexts/MatchingContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CollabPage = () => {
    const { user } = useAuth();
    const { roomId, cancelMatching } = useMatching();
    const router = useRouter();

    // Cancel matching when user leaves the page
    useEffect(() => {
        if (router.pathname != '/collab') {
            cancelMatching();
        }
    }, [router.pathname]);

    return (
        <div>
            <h1>Collab Page</h1>
            <h2>Username: {user}</h2>
            <h2>Room ID: {roomId}</h2>
        </div>
    )
}

export default CollabPage;