import { TwentyFortyEight } from "../src/2048";

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
    originalBoard.populate(1, 2, 2);
    originalBoard.populate(1, 1, 2);
    originalBoard.populate(2, 1, 2);
    originalBoard.populate(2, 3, 2);
    originalBoard.populate(3, 0, 2);
    originalBoard.populate(3, 2, 2);
  }

  it("slides unsupported numbers to the left when tilting left", () => {
    let game = new TwentyFortyEight();
    setupBoard(game);

    let tiltedBoard = game.tiltLeft();

    let expectedBoard = new TwentyFortyEight().board();
    expectedBoard.populate(0, 0, 2);
    expectedBoard.populate(0, 1, 2);
    expectedBoard.populate(0, 2, 2);
    expectedBoard.populate(0, 3, 2);
    expectedBoard.populate(1, 1, 2);
    expectedBoard.populate(1, 2, 2);
    expectedBoard.populate(2, 2, 2);

    expect(tiltedBoard).toEqual(expectedBoard);
  });

  it("slides unsupported numbers to the right when tilting right", () => {
    let game = new TwentyFortyEight();
    setupBoard(game);

    let tiltedBoard = game.tiltRight();

    let expectedBoard = new TwentyFortyEight().board();
    expectedBoard.populate(3, 0, 2);
    expectedBoard.populate(3, 1, 2);
    expectedBoard.populate(3, 2, 2);
    expectedBoard.populate(3, 3, 2);
    expectedBoard.populate(2, 1, 2);
    expectedBoard.populate(2, 2, 2);
    expectedBoard.populate(1, 2, 2);

    expect(tiltedBoard).toEqual(expectedBoard);
  });

  it("slides unsupported numbers down when tilting down", () => {
    let game = new TwentyFortyEight();
    setupBoard(game);

    let tiltedBoard = game.tiltDown();

    let expectedBoard = new TwentyFortyEight().board();
    expectedBoard.populate(0, 0, 2);
    expectedBoard.populate(1, 0, 2);
    expectedBoard.populate(1, 1, 2);
    expectedBoard.populate(2, 0, 2);
    expectedBoard.populate(2, 1, 2);
    expectedBoard.populate(3, 0, 2);
    expectedBoard.populate(3, 1, 2);

    expect(tiltedBoard).toEqual(expectedBoard);
  });

  it("slides unsupported numbers up when tilting up", () => {
    let game = new TwentyFortyEight();
    setupBoard(game);

    let tiltedBoard = game.tiltUp();

    let expectedBoard = new TwentyFortyEight().board();
    expectedBoard.populate(0, 3, 2);
    expectedBoard.populate(1, 3, 2);
    expectedBoard.populate(1, 2, 2);
    expectedBoard.populate(2, 3, 2);
    expectedBoard.populate(2, 2, 2);
    expectedBoard.populate(3, 3, 2);
    expectedBoard.populate(3, 2, 2);

    expect(tiltedBoard).toEqual(expectedBoard);
  });
});
