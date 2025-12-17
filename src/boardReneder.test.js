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
            
            expect(table).not.toBeNull();
        })
    })
}) 