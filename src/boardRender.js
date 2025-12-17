import DomUtils from "./domUtils";


export class BoardRender {

    static load(gameboard, placeholder) {
        const table = BoardRender.#createTable(gameboard, placeholder);

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



}