import events from "./events"
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;
let leader = null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)]

const socketController = (socket, io) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    const superBroadCast = (event, data) => io.emit(event, data);
    const sendPlayerUpdate = () =>
        superBroadCast(events.playerUpdate, {sockets});

    const startGame = () => {
        if (inProgress === false){
            inProgress = true;
            leader = chooseLeader();
            word = chooseWord();
            setTimeout(() => {
                superBroadCast(events.gameStarted);
                io.to(leader.id).emit(events.leaderNotif, { word });
            }, 2000);           
        }
    }

    const endGame = () => {
        inProgress = false;
        superBroadCast(events.gameEnded);
    };

    socket.on(events.setNickname, ({nickname}) => {
        socket.nickname = nickname;
        sockets.push({id: socket.id, points: 0, nickname : nickname});
        broadcast(events.newUser, {nickname});        
        sendPlayerUpdate();
        if(sockets.length === 2){
            startGame();
        }
    })

    socket.on(events.disconnect, () => {
        sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
        if (sockets.length === 1 || (leader && leader.id === socket.id)) {
            endGame();
        }
        broadcast(events.disconnected, {nickname : socket.nickname});  
        sendPlayerUpdate(); 
    })

    socket.on(events.sendMessage, ({message}) => {
        broadcast(events.newMessage, {message, nickname : socket.nickname});
    })

    socket.on(events.beginPath, ({x, y}) => {
        broadcast(events.beginPath, { x, y });
    })

    socket.on(events.strokePath, ({x, y, color}) => {
        broadcast(events.strokePath, {x, y, color});
    })

    socket.on(events.fill, ({color}) =>{
        broadcast(events.filled, { color });
    })

};

export default socketController