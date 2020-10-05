import { disableCanvas, enableCanvas, hideControls, resetCanvas, showControls } from "./paint";

const board = document.getElementById("jsPlayerBoard");
const notifs = document.getElementById("jsNotifs");


const addPlayers = (players) => {
    board.innerHTML = ""
    players.forEach(player => {
        const playerElement = document.createElement("span");
        playerElement.innerText = `${player.nickname}: ${player.points}`;
        board.appendChild(playerElement);
    });
}

const setNotifis = (text) => {
    notifs.innerText = "";
    notifs.innerText = text;
}

export const handlePlayerUpdate = ({sockets}) => addPlayers(sockets);
export const handleGameStarted = () => {
    setNotifis("");
    disableCanvas();
    hideControls();
};

export const handleGameEnded = () => {
    setNotifis("Game Ended.");
    disableCanvas();
    hideControls();
    resetCanvas();
}

export const handleLeaderNotifi = ({word}) => {
    enableCanvas();
    showControls();
    notifs.innerText = `You are the leader, paint : ${word}`;
}
