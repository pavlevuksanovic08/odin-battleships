import { experiments } from "webpack";
import { Gameboard } from "./gameboard"
import { Ship } from "./ship";

describe("GAMEBOARD CLASS", () => {
    const gameboard = new Gameboard();
    test("check existance", () => {
        expect(gameboard).toBeDefined();
        expect(typeof gameboard).toBe("object");
    })

    describe("PLACE SHIP METHOD", () => {
        test("place ship verticaly", () => {
            const gameboard = new Gameboard();
            gameboard.placeShip([2, 5], [5, 5]);
            expect(gameboard.board[2][5]).not.toBeNull();
            expect(gameboard.board[3][5]).not.toBeNull();
            expect(gameboard.board[4][5]).not.toBeNull();
            expect(gameboard.board[5][5]).not.toBeNull();
        })
    
        test("place ship horizontaly", () => {
            const gameboard = new Gameboard();
            gameboard.placeShip([5, 2], [5, 5]);
            expect(gameboard.board[5][2]).not.toBeNull();
            expect(gameboard.board[5][3]).not.toBeNull();
            expect(gameboard.board[5][4]).not.toBeNull();
            expect(gameboard.board[5][5]).not.toBeNull();

            gameboard.placeShip([0, 2], [0, 4])
            expect(gameboard.board[0][2]).not.toBeNull();
            expect(gameboard.board[0][3]).not.toBeNull();
            expect(gameboard.board[0][4]).not.toBeNull();
        })
    
        test("distinguish ships", () => {
            const gameboard = new Gameboard();
            gameboard.placeShip([2, 3], [2, 3]);
            gameboard.placeShip([4, 4], [4, 5]);
    
            expect(gameboard.board[2][3]).not.toBe(gameboard.board[4][5])
            expect(gameboard.board[4][4]).toBe(gameboard.board[4][5])
        })
    
        describe("place ship error handling", () => {
            
            test("missing arguments", () => {
                const gameboard = new Gameboard();
                
                expect(() => gameboard.placeShip([2, 5])).toThrow("Missing argument: coordinates not specified");
                expect(() => gameboard.placeShip()).toThrow("Missing argument: coordinates not specified");
                
            });
            
            test("wrong type of argument", () => {
                const gameboard = new Gameboard();

                expect(() => gameboard.placeShip([5], [3])).toThrow("Wrong type of argument: argument sholud be [int, int]");
                expect(()=> gameboard.placeShip(["t", "y"], ["t", "y"])).toThrow("Wrong type of argument: argument sholud be [int, int]");
            })
            test("arguments out of range", () => {
                const gameboard = new Gameboard();
    
                expect(() => gameboard.placeShip([3, 5], [11, 5])).toThrow("Coordinates out of range");
            });
    
            test("unable diagonal ships", () => {
                const gameboard = new Gameboard();
    
                expect(() => gameboard.placeShip([3, 2], [4, 3])).toThrow("Ships must be inline");
            })
    
            test("length less than or equal to 4", () => {
                const gameboard = new Gameboard();
    
                expect(() => gameboard.placeShip([2, 2], [2, 7])).toThrow("Ship's length is bigger than 4");
            })
    
    
        })
    })
    
    describe("recive attack", () => {
        test("check existance", () => {
            const gameboard = new Gameboard();
            expect(gameboard.receiveAttack).toBeDefined();
            expect(typeof gameboard.receiveAttack).toBe("function");
        })

        test("hitting ship", () => {
            const gameboard = new Gameboard();
            const ship = new Ship(1);
            gameboard.board[5][5] = ship;
            gameboard.receiveAttack(5, 5);
            expect(ship.hits).toBe(1);
        })
        test("missing ship", () => {
            const gameboard = new Gameboard();
            gameboard.receiveAttack(4, 4);
            expect(gameboard.board[4][4]).toBe("miss");
        })

        test("coordinates with zero", () => {
            const gameboard = new Gameboard();
            gameboard.receiveAttack(0, 0);
            expect(gameboard.board[0][0]).toBe("miss");
        })

        describe("error handling", () => {
            const gameboard = new Gameboard()
            test("missing args", () => {
                expect(() => gameboard.receiveAttack(5)).toThrow("Missing argument");
                expect(() => gameboard.receiveAttack()).toThrow("Missing argument");
            });
            
            test("wrong type of args", () => {
                expect(() => gameboard.receiveAttack("t", "6")).toThrow("Missing argument")
            })

            test("out of range", () => {
                expect(() => gameboard.receiveAttack(11, 5)).toThrow("Out of range");

            })
        })
    })
    describe("ships sunk", () => {
        test("existance check", () => {
            const gameboard = new Gameboard()
            expect(gameboard.areShipsSunk).toBeDefined();
            expect(typeof gameboard.areShipsSunk).toBe("function")
        })

        test("sunk ship", () => {
            const gameboard = new Gameboard();
            gameboard.placeShip([3, 4], [3, 5]);
            expect(gameboard.areShipsSunk()).toBe(false);

            gameboard.receiveAttack(3, 4);
            gameboard.receiveAttack(3, 5);

            expect(gameboard.areShipsSunk()).toBe(true);
        })
    })
})