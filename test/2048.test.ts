import { TwentyFortyEight, Direction } from "../src/2048";
import Display from "../src/display";

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

  function setupBoard(game: TwentyFortyEight) {
    let originalBoard = game.board();

    originalBoard.populate(0, 2, 2);
    originalBoard.populate(1, 2, 4);
    originalBoard.populate(1, 1, 8);
    originalBoard.populate(2, 1, 16);
    originalBoard.populate(2, 3, 32);
    originalBoard.populate(3, 0, 64);
    originalBoard.populate(3, 2, 128);
  }

  it("slides unsupported numbers to the left when tilting left", () => {
    let game = new TwentyFortyEight();
    setupBoard(game);

    let tiltedBoard = game.tilt(Direction.Left);

    let expectedBoard = new TwentyFortyEight().board();
    expectedBoard.populate(0, 0, 64);
    expectedBoard.populate(0, 1, 8);
    expectedBoard.populate(1, 2, 4);
    expectedBoard.populate(0, 3, 32);
    expectedBoard.populate(1, 1, 16);
    expectedBoard.populate(0, 2, 2);
    expectedBoard.populate(2, 2, 128);

    expect(tiltedBoard).toEqual(expectedBoard);
  });

  it("slides unsupported numbers to the right when tilting right", () => {
    let game = new TwentyFortyEight();
    setupBoard(game);

    let tiltedBoard = game.tilt(Direction.Right);

    let expectedBoard = new TwentyFortyEight().board();
    expectedBoard.populate(3, 0, 64);
    expectedBoard.populate(3, 1, 16);
    expectedBoard.populate(2, 2, 4);
    expectedBoard.populate(3, 3, 32);
    expectedBoard.populate(2, 1, 8);
    expectedBoard.populate(1, 2, 2);
    expectedBoard.populate(3, 2, 128);

    expect(tiltedBoard).toEqual(expectedBoard);
  });

  it("slides unsupported numbers down when tilting down", () => {
    let game = new TwentyFortyEight();
    setupBoard(game);

    let tiltedBoard = game.tilt(Direction.Down);

    let expectedBoard = new TwentyFortyEight().board();
    expectedBoard.populate(0, 0, 2);
    expectedBoard.populate(1, 0, 8);
    expectedBoard.populate(1, 1, 4);
    expectedBoard.populate(2, 0, 16);
    expectedBoard.populate(2, 1, 32);
    expectedBoard.populate(3, 0, 64);
    expectedBoard.populate(3, 1, 128);

    expect(tiltedBoard).toEqual(expectedBoard);
  });

  it("slides unsupported numbers up when tilting up", () => {
    let game = new TwentyFortyEight();
    setupBoard(game);

    let tiltedBoard = game.tilt(Direction.Up);

    let expectedBoard = new TwentyFortyEight().board();
    expectedBoard.populate(0, 3, 2);
    expectedBoard.populate(1, 3, 4);
    expectedBoard.populate(1, 2, 8);
    expectedBoard.populate(2, 3, 32);
    expectedBoard.populate(2, 2, 16);
    expectedBoard.populate(3, 3, 128);
    expectedBoard.populate(3, 2, 64);

    expect(tiltedBoard).toEqual(expectedBoard);
  });

  it("can play a game", () => {
    let game = new TwentyFortyEight();
    game.start();
    
    new Display().show(game.board());
  });
});
