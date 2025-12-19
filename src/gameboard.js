
import { Ship } from "./ship";


export class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    }

    placeShip(start, end) {

        if (!start || !end) throw new Error("Missing argument: coordinates not specified");
        if (!this.#argType(start) || !this.#argType(end)) throw new Error("Wrong type of argument: argument sholud be [int, int]")
        if (!this.#checkCoordinatesRange(start, end)) throw new Error("Coordinates out of range");
        if (!this.#checkCoordinatesPosition(start, end)) throw new Error("Ships must be inline");

        

        let isHorizontal = start[0] === end[0] ? true : false;
        let length = isHorizontal ? end[1] - start[1] : end[0] - start[0];

        if (!this.#checkLength(length)) throw new Error("Ship's length is bigger than 4")

        const ship = new Ship(length);

        if (isHorizontal) {
            for (let i = start[1]; i <= end[1]; i++) {
                this.board[start[0]][i] = ship;
            }
        } else {
            for (let i = start[0]; i <= end[0]; i++) {
                this.board[i][start[1]] = ship;
            }
        }
    }

    #checkCoordinatesRange(start, end) {
        if (this.#checkRange(start[0]) &&
            this.#checkRange(start[1]) &&
            this.#checkRange(end[0]) &&
            this.#checkRange(end[1])) return true;
        return false;
    }

    #checkCoordinatesPosition(start, end) {
        if (start[0] != end[0] && start[1] != end[1]) return false;
        return true;
    }

    #checkLength(length) {
        return length > 4 ? false : true;
    }

    #checkRange(value) {
        if (value < 10 && value >= 0) return true;
        return false;
    }

    #argType(arg) {
        return (
            Array.isArray(arg) &&
            arg.length === 2 &&
            Number.isInteger(arg[0]) &&
            Number.isInteger(arg[1])
        );
    }

    receiveAttack(x, y) {
        if (typeof x !== "number" || typeof y !== "number") throw new Error("Missing argument");
        if (!this.#checkRange(x) || !this.#checkRange(y)) throw new Error("Out of range")
        if (this.board[x][y]) {
            this.board[x][y].hit();
        } else {
            this.board[x][y] = "miss";
        }
    }

    areShipsSunk() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] instanceof Ship && !this.board[i][j].isSunk()) 
                    return false;
            }
        }
        return true;
    }

    randomPlaceShips(shipLengths) {
        for (let length of shipLengths) {
            let placed = false;
            while (!placed) {
                let isHorizontal = Math.random() < 0.5;
                let startX = Math.floor(Math.random() * 10);
                let startY = Math.floor(Math.random() * 10);
                let endX = isHorizontal ? startX : startX + length - 1;
                let endY = isHorizontal ? startY + length - 1 : startY;

                if (endX < 10 && endY < 10) {
                    let canPlace = true;
                    if (isHorizontal) {
                        for (let i = startY; i <= endY; i++) {
                            if (this.board[startX][i] !== null) {
                                canPlace = false;
                                break;
                            }
                        }
                    } else {
                        for (let i = startX; i <= endX; i++) {
                            if (this.board[i][startY] !== null) {
                                canPlace = false;
                                break;
                            }
                        }
                    }

                    if (canPlace) {
                        this.placeShip([startX, startY], [endX, endY]);
                        placed = true;
                    }
                }
            }
        }
    }  
}