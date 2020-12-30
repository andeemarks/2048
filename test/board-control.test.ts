import BoardControl from "../src/board-control";
import Board from "../src/board";

describe("BoardControl", () => {
  function setupBoard(): Board {
    let originalBoard = new Board();

    originalBoard.populate(0, 2, 2);
    originalBoard.populate(1, 2, 4);
    originalBoard.populate(1, 1, 8);
    originalBoard.populate(2, 1, 16);
    originalBoard.populate(2, 3, 32);
    originalBoard.populate(3, 0, 64);
    originalBoard.populate(3, 2, 128);

    return originalBoard;
  }

  it("slides unsupported numbers to the left when tilting left", () => {
    let board = setupBoard();

    let tiltedBoard = BoardControl.tiltLeft(board);

    let expectedBoard = new Board();
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
    let board = setupBoard();

    let tiltedBoard = BoardControl.tiltRight(board);

    let expectedBoard = new Board();
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
    let board = setupBoard();

    let tiltedBoard = BoardControl.tiltDown(board);

    let expectedBoard = new Board();
    expectedBoard.populate(0, 0, 2);
    expectedBoard.populate(1, 0, 8);
    expectedBoard.populate(1, 1, 4);
    expectedBoard.populate(2, 0, 16);
    expectedBoard.populate(2, 1, 32);
    expectedBoard.populate(3, 0, 64);
    expectedBoard.populate(3, 1, 128);

    expect(tiltedBoard).toEqual(expectedBoard);
  });

  it("tilting does not change completely empty boards", () => {
    let board = new Board([
      [0, 0],
      [0, 0],
    ]);

    let tiltedBoard = BoardControl.tiltUp(board);

    expect(tiltedBoard).toEqual(board);
  });

  it("tilting does not change completely full boards", () => {
    let board = new Board([
      [2, 4],
      [8, 16],
    ]);

    let tiltedBoard = BoardControl.tiltUp(board);

    expect(tiltedBoard).toEqual(board);
  });

  it("slides unsupported numbers up when tilting up", () => {
    let board = setupBoard();

    let tiltedBoard = BoardControl.tiltUp(board);

    let expectedBoard = new Board();
    expectedBoard.populate(0, 3, 2);
    expectedBoard.populate(1, 3, 4);
    expectedBoard.populate(1, 2, 8);
    expectedBoard.populate(2, 3, 32);
    expectedBoard.populate(2, 2, 16);
    expectedBoard.populate(3, 3, 128);
    expectedBoard.populate(3, 2, 64);

    expect(tiltedBoard).toEqual(expectedBoard);
  });
});
