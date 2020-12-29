import { TwentyFortyEight, Direction } from "../src/2048";
import Display from "../src/display";
import Board from "../src/board";

describe("2048", () => {
  const game = new TwentyFortyEight();

  it("holds a board of the right dimensions", () => {
    const board = game.board();

    expect(board).toBeDefined();
    expect(board.width()).toBe(4);
    expect(board.height()).toBe(4);
  });

  it("the board starts empty", () => {
    const spaces = game.board().flatten();

    expect(
      spaces.every((space: Number) => {
        return space == 0;
      })
    ).toBeTruthy();
  });

  it("populates 2 spaces on the board when starting", () => {
    const spaces = game.start().flatten();

    expect(
      spaces.filter((space: Number) => {
        return space == 2;
      }).length
    ).toBe(2);
  });

  it("populates 2 different spaces each start", () => {
    const spaces1 = new TwentyFortyEight().start().flatten();
    const spaces2 = new TwentyFortyEight().start().flatten();
    const spaces3 = new TwentyFortyEight().start().flatten();
    const spaces4 = new TwentyFortyEight().start().flatten();

    expect(spaces1).not.toEqual(spaces2);
    expect(spaces2).not.toEqual(spaces3);
    expect(spaces3).not.toEqual(spaces4);
  });

  it("can play a game", () => {
    let game = new TwentyFortyEight();
    game.start();

    new Display().show(game.board());
  });

  function countPopulatedSquares(board: Board): number {
    return board.flatten().filter((space: number) => {
      return space > 0;
    }).length;
  }

  it("randomly populates a new empty square when tilting", () => {
    let board = game.board();
    let boardPopulationCount = countPopulatedSquares(board);
    let newBoard = game.tilt(Direction.Left);
    let newBoardPopulationCount = countPopulatedSquares(newBoard);

    expect(newBoardPopulationCount).toEqual(boardPopulationCount + 1);
  });

  it("errors when tilting a full board", () => {
    let fullBoard = new Board([[]]);
    let game = new TwentyFortyEight(fullBoard);

    expect(() => {
      game.tilt(Direction.Left);
    }).toThrowError();
  });
});
