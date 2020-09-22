const socket = io("/");

socket.on("hello", () => {
    console.log("somebody joined")
});

setTimeout(() => socket.emit("helloGuys"), 4000);