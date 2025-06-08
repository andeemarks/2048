import BoardControl from "../src/board-control";
import Board from "../src/board";

describe("BoardControl", () => {
  let original = new Board();

  beforeAll(() => {
    original = original.with_value(0, 2, 2)
      .with_value(1, 2, 4)
      .with_value(1, 1, 8)
      .with_value(2, 1, 16)
      .with_value(2, 3, 32)
      .with_value(3, 0, 64)
      .with_value(3, 2, 128);
  });

  it("slides unsupported numbers to the left when tilting left", () => {
    let tiltedBoard = BoardControl.tiltLeft(original);

    let expected = new Board().with_value(0, 0, 64)
      .with_value(0, 1, 8)
      .with_value(1, 2, 4)
      .with_value(0, 3, 32)
      .with_value(1, 1, 16)
      .with_value(0, 2, 2)
      .with_value(2, 2, 128);

    expect(tiltedBoard).toEqual(expected);
  });

  it("slides unsupported numbers to the right when tilting right", () => {
    let tiltedBoard = BoardControl.tiltRight(original);

    let expected = new Board().with_value(3, 0, 64)
      .with_value(3, 1, 16)
      .with_value(2, 2, 4)
      .with_value(3, 3, 32)
      .with_value(2, 1, 8)
      .with_value(1, 2, 2)
      .with_value(3, 2, 128);

    expect(tiltedBoard).toEqual(expected);
  });

  it("slides unsupported numbers down when tilting down", () => {
    let tiltedBoard = BoardControl.tiltDown(original);

    let expected = new Board()
      .with_value(0, 0, 2)
      .with_value(1, 0, 8)
      .with_value(1, 1, 4)
      .with_value(2, 0, 16)
      .with_value(2, 1, 32)
      .with_value(3, 0, 64)
      .with_value(3, 1, 128);

    expect(tiltedBoard).toEqual(expected);
  });

  it("slides unsupported numbers up when tilting up", () => {
    let tiltedBoard = BoardControl.tiltUp(original);

    let expected = new Board()
      .with_value(0, 3, 2)
      .with_value(1, 3, 4)
      .with_value(1, 2, 8)
      .with_value(2, 3, 32)
      .with_value(2, 2, 16)
      .with_value(3, 3, 128)
      .with_value(3, 2, 64);

    expect(tiltedBoard).toEqual(expected);
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
});
