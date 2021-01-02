import Board from "../src/board";

describe("Board", () => {
  const board = new Board();

  it("guards attempts to access out-of-bound rows", () => {
    expect(() => {
      board.rowAtPosition(-1);
    }).toThrowError();

    expect(() => {
      board.rowAtPosition(board.height());
    }).toThrowError();
  });

  it("knows when it is full", () => {
    expect(board.isFull()).toBeFalsy();
    expect(new Board([[0]]).isFull()).toBeFalsy();
    expect(new Board([[2]]).isFull()).toBeTruthy();
  });
});
