import { Ship } from "./ship";

describe("SHIP CLASS", () => {

    test("ship exists", () => {
        const ship = new Ship(4);
        expect(ship).toBeDefined();
        expect(typeof ship).toBe("object");
        expect(ship.length).toBe(4);
        expect(ship.hits).toBe(0);
    });

    test("hit increases hits count", () => {
        const ship = new Ship(3);
        expect(ship.hits).toBe(0);
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test("isSunk returns false if not enough hits", () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });

    test("isSunk returns true if hits equal length", () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});