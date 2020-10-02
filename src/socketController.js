import events from "./events"

const socketController = (socket) => {
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

    socket.on(events.setNickname, ({nickname}) => {
        socket.nickname = nickname;
        broadcast(events.newUser, {nickname});        
    })

    socket.on(events.disconnect, () => {
        broadcast(events.disconnected, {nickname : socket.nickname});     
    })

};

export default socketController