import { RealPlayer, ComputerPlayer } from "./player";
import { BoardRender } from "./boardRender";
import "./styles.css";
import { Game } from "./game";

const player1 = new RealPlayer("Pavle");
const player2 = new ComputerPlayer("Computer");

// Player 1 ships
player1.gameboard.randomPlaceShips([4, 4, 2, 3, 1])

// Player 2 ships
player2.gameboard.randomPlaceShips([4, 4, 2, 3, 1])

const table1Placeholder = document.getElementById("table1Placeholder");
const table2Placeholder = document.getElementById("table2Placeholder");

BoardRender.load(player1.gameboard, table1Placeholder);
BoardRender.load(player2.gameboard, table2Placeholder);

const game = new Game(player1, table2Placeholder.querySelector("table"), player2, table1Placeholder.querySelector("table"));

game.play();