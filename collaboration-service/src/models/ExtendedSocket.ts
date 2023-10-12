import { Socket } from "socket.io";

export class ExtendedSocket extends Socket {
    roomId: string = "";
}
