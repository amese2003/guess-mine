const socketController = (socket) => {
    console.log(socket);

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

    socket.on("setNickname", ({nickname}) => {
        console.log(nickname);
        socket.nickname = nickname;
    })

};

export default socketController