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

  width(): number {
    return this._board[0].length;
  }

  height(): number {
    return this._board.length;
  }

  spaces(): Number[] {
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
    return this._board[position - 1];
  }

  print() {
    console.log(this.toString());
  }

  tiltLeftRow(row: Number[]): Number[] {
    let populatedSpaces = row.filter((space: Number) => {
      return space != 0;
    });

    return populatedSpaces.concat([0, 0, 0, 0]).slice(0, row.length);
  }

  tiltLeft(board: Board): Board {
    let tiltedBoard: Number[][] = [];
    for (let row = 0; row < board._board.length; row++) {
      tiltedBoard[row] = this.tiltLeftRow(this.tiltLeftRow(board._board[row]));
    }

    return new Board(tiltedBoard);
  }

  rotateBoardBy90Degrees(board: Board, _rotationCount: number = 1): Board {
    let spaces = board._board;

    for (var i = 0; i < _rotationCount; i++) {
      spaces = spaces[0].map((_, index) =>
        spaces.map((row) => row[index]).reverse()
      );
    }

    return new Board(spaces);
  }

  tiltRight(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(board, 2);

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    return this.rotateBoardBy90Degrees(tiltedBoard, 2);
  }

  tiltDown(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(board, 3);

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    return this.rotateBoardBy90Degrees(tiltedBoard);
  }

  tiltUp(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(board);

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    return this.rotateBoardBy90Degrees(tiltedBoard, 3);
  }
}

export { Board };
