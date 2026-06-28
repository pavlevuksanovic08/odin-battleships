import DomUtils from "./domUtils";

export class BoardRender {
	static load(gameboard, placeholder) {
		const table = BoardRender.#createTable(gameboard, placeholder);

		return table;
	}

	static #createTable(gameboard, placeholder) {
		const table = DomUtils.createElement("table");

		for (let i = 0; i < gameboard.board.length; i++) {
			const row = DomUtils.createElement("tr");
			for (let j = 0; j < gameboard.board[0].length; j++) {
				const cell = DomUtils.createElement("td", {
					dataset: { x: i, y: j },
				});
				DomUtils.appendToParent(row, cell);
			}
			DomUtils.appendToParent(table, row);
		}
		DomUtils.appendToParent(placeholder, table);

		return table;
	}

	static showWinner(player1, player2) {
		const winner = player1.gameboard.areShipsSunk() ? player2 : player1;
		const loser = player1.gameboard.areShipsSunk() ? player1 : player2;
		winner.score += 1;
		const winnerDiv = DomUtils.createElement("div", {
			className: "winner-message",
		});
		const message = DomUtils.createElement("h2", {
			innerText: `Congratulations ${winner.name}, you have won!`
		});
		const score = DomUtils.createElement("p", {
			innerText: `Score: ${winner.name} ${winner.score} - ${loser.name} ${loser.score}`
		});
		DomUtils.appendToParent(winnerDiv, score);
		DomUtils.appendToParent(winnerDiv, message);
		DomUtils.appendToParent(document.body, winnerDiv);
	}
}
