import { Game, Direction } from "../src/game";
import Display from "../src/display";
import Board from "../src/board";

describe("2048", () => {
  const game = new Game();

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
    const spaces1 = new Game().start().flatten();
    const spaces2 = new Game().start().flatten();
    const spaces3 = new Game().start().flatten();
    const spaces4 = new Game().start().flatten();

    expect(spaces1).not.toEqual(spaces2);
    expect(spaces2).not.toEqual(spaces3);
    expect(spaces3).not.toEqual(spaces4);
  });

  it("can play a game", () => {
    let game = new Game();
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

  it("errors when creating a 0-sized board", () => {
    expect(() => {
      new Game(new Board([[]]));
    }).toThrowError();
  });

  it("errors when creating a non-square board", () => {
    expect(() => {
      new Game(new Board([[2], [4]]));
    }).toThrowError();
  });

  it("errors when tilting/populating a completely full board", () => {
    let fullBoard = new Board([
      [2, 4],
      [8, 16],
    ]);
    let game = new Game(fullBoard);

    expect(() => {
      game.tilt(Direction.Left);
    }).toThrowError();
  });
});
