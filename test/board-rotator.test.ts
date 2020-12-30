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
});
