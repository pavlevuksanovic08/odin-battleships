import { BoardRender } from "./boardRender";
import { Player } from "./player";
import { Ship } from "./ship";

export class Game {
	constructor(player1, table1, player2, table2) {
		if (!player1 || !player2 || !table1 || !table2)
			throw new Error(
				"Wrong number of arguments: game shold have four arguments.",
			);
		if (
			!this.#checkPlayers(player1, player2) ||
			!this.#checkTables(table1, table2)
		)
			throw new Error(
				"Wrong type of arguments: Game object should have two players and two tables.",
			);

		this.player1 = player1;
		this.player2 = player2;

		this.player1.table = table1;
		this.player2.table = table2;
	}
	async play() {
		let currentPlayer = this.#pickRandomPlayer();
		while (!this.#isEnd(this.player1.gameboard, this.player2.gameboard)) {
			await currentPlayer.attack(
            	currentPlayer === this.player1
            	    ? this.player2.gameboard
            	    : this.player1.gameboard,
            	currentPlayer.table);			
			currentPlayer = this.#switchPlayer(currentPlayer);
		}
		this.#resetGameboard();
		this.#showWinner(currentPlayer);
	}

	#switchPlayer(currentPlayer) {
		return currentPlayer === this.player1 ? this.player2 : this.player1;
	}

	#checkPlayers(player1, player2) {
		if (player1 instanceof Player && player2 instanceof Player) return true;
		return false;
	}

	#checkTables(table1, table2) {
		if (
			table1 instanceof HTMLTableElement &&
			table2 instanceof HTMLTableElement
		)
			return true;
		return false;
	}

	#pickRandomPlayer() {
		let random = Math.round(Math.random() * 10) % 2;
		return random === 0 ? this.player1 : this.player2;
	}

	#isEnd(gameboard1, gameboard2) {
		if (gameboard1.areShipsSunk() || gameboard2.areShipsSunk()) return true;
		return false;
	}

	#showWinner() {
		BoardRender.showWinner(
			this.player1,
			this.player2,
		);
	}

	#resetGameboard() {
		this.player1.gameboard.board.forEach(element => {
			if (element == "miss") element = null;
			else if (element instanceof Ship) element.hits = 0;
			else element = null;
		});;
		this.player2.gameboard.board.forEach(element => {
			if (element == "miss") element = null;
			else if (element instanceof Ship) element.hits = 0;
			else element = null;		
		});;
	}
}
