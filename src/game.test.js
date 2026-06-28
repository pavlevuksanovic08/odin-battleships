/**
 * @jest-environment jsdom
 */

import { Game } from "./game";
import { BoardRender } from "./boardRender";
import { Player } from "./player";

jest.mock("./boardRender", () => ({
  BoardRender: {
    showWinner: jest.fn(),
  },
}));

class TestPlayer extends Player{
  constructor(name) {
    super(name);
    this.table = null;
    this.gameboard = {
      board: [[]],
      areShipsSunk: jest.fn(),
    };
    this.attack = jest.fn(() => Promise.resolve());
  }
}

describe("Game.play()", () => {
  let player1;
  let player2;
  let table1;
  let table2;
  let game;

  beforeEach(() => {
    player1 = new TestPlayer("Player 1");
    player2 = new TestPlayer("Player 2");

    table1 = document.createElement("table");
    table2 = document.createElement("table");

    // game ends after one attack
    player1.gameboard.areShipsSunk.mockReturnValue(false);
    player2.gameboard.areShipsSunk
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    jest.spyOn(Math, "random").mockReturnValue(0);

    game = new Game(player1, table1, player2, table2);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("calls attack and shows winner", async () => {
    await game.play();

    expect(player1.attack).toHaveBeenCalledTimes(1);
    expect(BoardRender.showWinner).toHaveBeenCalledTimes(1);
  });
});
