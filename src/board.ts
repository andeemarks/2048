class Board {
  private _board: Number[][];

  constructor(
    spaces: Number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  ) {
    this._board = spaces;
  }

  spaces(): Number[][] {
    return this._board;
  }

  width(): number {
    return this._board[0].length;
  }

  height(): number {
    return this._board.length;
  }

  flatten(): Number[] {
    return ([] as Number[]).concat(...this._board);
  }

  populate(column: number, row: number, value: number) {
    this._board[row][column] = value;
  }

  toString(): String {
    let result = "";
    for (let i = this._board.length; i > 0; i--) {
      result = result + this._board[i - 1].join("") + "\n";
    }
    return result;
  }

  rowAtPosition(position: number): Number[] {
    if (position < 0 || position >= this.height())
      throw new Error(`Illegal attempt to access row ${position} on board`);

    return this._board[position];
  }

  print() {
    console.log(this.toString());
  }
}

class BoardControl {
  static tiltLeftRow(row: Number[]): Number[] {
    let populatedSpaces = row.filter((space: Number) => {
      return space != 0;
    });

    return populatedSpaces.concat([0, 0, 0, 0]).slice(0, row.length);
  }

  static tiltLeft(board: Board): Board {
    let tiltedBoard: Number[][] = [];
    for (let row = 0; row < board.height(); row++) {
      tiltedBoard[row] = BoardControl.tiltLeftRow(board.rowAtPosition(row));
    }

    return new Board(tiltedBoard);
  }

  static rotateBoardBy90Degrees(
    board: Board,
    _rotationCount: number = 1
  ): Board {
    let spaces = board.spaces();

    for (var i = 0; i < _rotationCount; i++) {
      spaces = spaces[0].map((_, index) =>
        spaces.map((row) => row[index]).reverse()
      );
    }

    return new Board(spaces);
  }

  static tiltRight(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(board, 2);

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    return this.rotateBoardBy90Degrees(tiltedBoard, 2);
  }

  static tiltDown(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(board, 3);

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    return this.rotateBoardBy90Degrees(tiltedBoard);
  }

  static tiltUp(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(board);

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    return this.rotateBoardBy90Degrees(tiltedBoard, 3);
  }
}

export { Board, BoardControl };
