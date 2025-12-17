import { BoardRender } from "./boardRender";
import { Gameboard } from "./gameboard";
import DomUtils from "./domUtils";
import "@testing-library/jest-dom";

describe("BoardRender class", () => {
    test("check existance", () => {
        expect(BoardRender).toBeDefined();
    })

    describe("load func", () => {
        

        test("creates table", () => {
            const gameboard = new Gameboard();
            const placeholder = DomUtils.createElement("div");

            const table = BoardRender.load(gameboard, placeholder);

            expect(table).not.toBeUndefined();
        })

        test("add event listener that calls recieve attack for that position on gameboard", () => {
            const gameboard = new Gameboard();
            const placeholder = DomUtils.createElement("div");
            
            const table = BoardRender.load(gameboard, placeholder);

            table.rows[3].cells[5].click();

            expect(gameboard.board[3][5]).toBe("miss");

            gameboard.placeShip([7, 7], [7, 7]);

            table.rows[7].cells[7].click();

            expect(gameboard.board[7][7].hits).toBe(1);

            
        })
    })
}) 