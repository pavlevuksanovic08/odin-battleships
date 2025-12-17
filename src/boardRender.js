import DomUtils from "./domUtils";
import { Ship } from "./ship";

export class BoardRender {

    static load(gameboard, placeholder) {
        const table = BoardRender.#createTable(gameboard, placeholder);

        BoardRender.#addEventListeners(gameboard, table);

        return table;
    }

    static #createTable(gameboard, placeholder) {
        const table = DomUtils.createElement('table');

        for (let i = 0; i < gameboard.board.length; i++) {
            const row = DomUtils.createElement("tr");
            for (let j = 0; j < gameboard.board[0].length; j++) {
                const cell = DomUtils.createElement("td", {dataset: {x: i, y: j}});
                DomUtils.appendToParent(row, cell);
            }
            DomUtils.appendToParent(table, row);
        }
        DomUtils.appendToParent(placeholder, table);

        return table;
    }

    static #addEventListeners(gameboard, table) {
        for (let i = 0; i < table.rows.length; i++) {
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                const cell = table.rows[i].cells[j];
                cell.addEventListener("click", (event) => {
                    let x = Number(cell.dataset.x);
                    let y = Number(cell.dataset.y);
                    gameboard.receiveAttack(x, y);
                    if (gameboard.board[x][y] instanceof Ship) event.target.className = "hit";
                    else event.target.className = "miss";
                })
            }
        }
    }


}