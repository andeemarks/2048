import BoardControl from "../src/board-control";
import Board from "../src/board";

describe("BoardControl", () => {
  function countPopulatedSquares(board: Board): number {
    return board.flatten().filter((space: number) => {
      return space > 0;
    }).length;
  }

  it("randomly populates a new empty square when tilting", () => {
    let board = new Board();
    let boardPopulationCount = countPopulatedSquares(board);
    let newBoard = BoardControl.tiltDown(board);
    let newBoardPopulationCount = countPopulatedSquares(newBoard);

    expect(newBoardPopulationCount).toEqual(boardPopulationCount + 1);
  });

  it("errors when no remaining empty squares are available", () => {});
});
