import { RealPlayer, ComputerPlayer, Player } from "./player";
import { Gameboard } from "./gameboard";
import DomUtils from "./domUtils";
import { BoardRender } from "./boardRender";
import { Game } from "./game";

test("Player object cant be created", () => {
	expect(() => new Player()).toThrow();
});

describe("RealPlayer class", () => {
	test("check existance", () => {
		const player = new RealPlayer();
		expect(player).toBeDefined();
	});

	test("attack function", async () => {
		const player = new RealPlayer();
		const gameboard = new Gameboard();
		const placeholder = DomUtils.createElement("div");

		const table = BoardRender.load(gameboard, placeholder);

		const attackPromise = player.attack(gameboard, table);

		table.rows[3].cells[5].click();

		await attackPromise;

		expect(gameboard.board[3][5]).toBe("miss");
		expect(table.rows[3].cells[5].className).toBe("miss");

		gameboard.placeShip([7, 7], [7, 7]);

		const attackPromise2 = player.attack(gameboard, table);

		table.rows[7].cells[7].click();

		await attackPromise2;

		expect(gameboard.board[7][7].hits).toBe(1);
		expect(table.rows[7].cells[7].className).toBe("hit");
	});
    test("same place can't be attacked twice", async () => {
        const player = new RealPlayer();
        const gameboard = new Gameboard();
        const placeholder = DomUtils.createElement("div");
        const table = BoardRender.load(gameboard, placeholder);

        // FIRST ATTACK
        const attack1 = player.attack(gameboard, table);
        table.rows[7].cells[7].click();
        await attack1;

        expect(table.rows[7].cells[7].className).toBe("miss");
        expect(gameboard.board[7][7]).toBe("miss");

        // SECOND ATTACK
        const attack2 = player.attack(gameboard, table);

        table.rows[7].cells[7].click(); // ignored
        table.rows[8].cells[8].click(); // valid

        await attack2;

        expect(table.rows[7].cells[7].className).toBe("miss");
        expect(gameboard.board[7][7]).toBe("miss");

        expect(table.rows[8].cells[8].className).toBe("miss");
        expect(gameboard.board[8][8]).toBe("miss");
    });
});

describe("ComputerPlayer class", () => {
	test("check existance", () => {
		const player = new ComputerPlayer();
		expect(player).toBeDefined();
	});
});
