import { Gameboard } from "./gameboard"

export class Player {
    constructor() {
        this.gameboard = new Gameboard();
    }
}

export class RealPlayer extends Player {

}

export class ComputerPlayer extends Player {
    
}