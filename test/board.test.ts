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

  it("knows when the player has won", () => {
    expect(board.isComplete()).toBeFalsy();

    expect(
      new Board([
        [2, 4],
        [1024, 512],
      ]).isComplete()
    ).toBeFalsy();

    expect(
      new Board([
        [2, 2, 2],
        [4, 0, 2048],
        [64, 32, 4],
      ]).isComplete()
    ).toBeTruthy();
    
    expect(new Board([[2048]]).isComplete()).toBeTruthy();
  });
});
