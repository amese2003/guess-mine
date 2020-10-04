import events from "./events"

let sockets = [];

const socketController = (socket, io) => {
    // //setTimeout(() => socket.broadcast.emit("hello"), 5000);
    // socket.on("newMessage", ({ message }) => {
    //     socket.broadcast.emit("messageNotif", { 
    //         message,
    //         nickname:socket.nickname || "Anon"
    //     });
    // });

    // socket.on("setNickname", ({nickname}) => {
    //     socket.nickname = nickname;
    // });
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    const superBroadCast = (event, data) => io.emit(event, data);
    const sendPlayerUpdate = () =>
        superBroadCast(events.playerUpdate, {sockets});

    socket.on(events.setNickname, ({nickname}) => {
        socket.nickname = nickname;
        sockets.push({id: socket.id, points: 0, nickname : nickname});
        broadcast(events.newUser, {nickname});        
        sendPlayerUpdate();
    })

    socket.on(events.disconnect, () => {
        sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
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