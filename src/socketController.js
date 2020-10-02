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
    

    socket.on(events.setNickname, ({nickname}) => {
        socket.nickname = nickname;
        socket.broadcast.emit(events.newUser, {nickname});        
    })
};

export default socketController