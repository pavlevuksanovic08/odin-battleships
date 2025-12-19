import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

export class Player {
  constructor() {
    if (new.target === Player) {
        throw new Error("Player is abstract and cannot be instantiated directly");
    }
    this.gameboard = new Gameboard();
  }
  async attack() {
    throw new Error("attack() must me implemented by subclass");
  }
}

export class RealPlayer extends Player {
  async attack(gameboard, table) {
    const pos = await this.#waitForClick(table);
    const x = Number(pos.x);
    const y = Number(pos.y);
    gameboard.receiveAttack(x, y);
    if (gameboard.board[x][y] instanceof Ship)
      table.rows[x].cells[y].className = "hit";
    else table.rows[x].cells[y].className = "miss";
  }

   #waitForClick(table) {
    return new Promise((resolve) => {
      const handler = (event) => {
        if (event.target.tagName !== "TD") return;
        const x = event.target.dataset.x;
        const y = event.target.dataset.y;
        if (event.target.className) return; // ignore already-attacked cells
        table.removeEventListener("click", handler);
        resolve({ x: x, y: y });
      };
      table.addEventListener("click", handler);
    });
  }
}

export class ComputerPlayer extends Player {}
