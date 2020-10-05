import { handleNewMessage } from "./chat";
import { handleDisconnected, handleNewUser } from "./notifications";
import { handleBeganPath, handleFilled, handleStrokedPath } from "./paint";
import { handleGameEnded, handleGameStarted, handleGameStarting, handleLeaderNotifi, handlePlayerUpdate } from "./players";

let socket = null;

export const getSocket = () => socket;

//export const updateSocket = aSocket => (socket = aSocket);

export const initSocket = (aSocket) => {
    const { events } = window;
    //updateSocket(aSocket);
    socket = aSocket;
    socket.on(events.newUser, handleNewUser);
    socket.on(events.disconnected, handleDisconnected);
    socket.on(events.newMessage, handleNewMessage);
    socket.on(events.beginPath, handleBeganPath);
    socket.on(events.strokePath, handleStrokedPath);
    socket.on(events.filled, handleFilled);
    socket.on(events.playerUpdate, handlePlayerUpdate);
    socket.on(events.gameStarted, handleGameStarted);
    socket.on(events.leaderNotif, handleLeaderNotifi);
    socket.on(events.gameEnded, handleGameEnded);
    socket.on(events.gameStarting, handleGameStarting);
}