import BoardRotator from "../src/board-rotator";
import Board from "../src/board";

describe("BoardControl", () => {
  it("rotates the board clockwise 90 degrees", () => {
    let board = new Board([
      [2, 4],
      [8, 16],
    ]);

    let rotatedBoard = BoardRotator.rotate90Degrees(board);

    expect(rotatedBoard.spaces()).toEqual([
      [8, 2],
      [16, 4],
    ]);
  });

  it("rotates the board clockwise 90 degrees a specified number of times", () => {
    let board = new Board([
      [2, 4],
      [8, 16],
    ]);

    let rotatedBoard = BoardRotator.rotate90Degrees(board, 2);

    expect(rotatedBoard.spaces()).toEqual([
      [16, 8],
      [4, 2],
    ]);
  });

  it("errors when attempting to rotate less than 1 time", () => {
    expect(() => {BoardRotator.rotate90Degrees(new Board(), 0)}).toThrowError();
    expect(() => {BoardRotator.rotate90Degrees(new Board(), -1)}).toThrowError();
  });

  it("errors when attempting to rotate more than one full circle", () => {
    expect(() => {BoardRotator.rotate90Degrees(new Board(), 4)}).toThrowError();
    expect(() => {BoardRotator.rotate90Degrees(new Board(), 67)}).toThrowError();
  });
});
