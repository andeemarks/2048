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

  rotateBoardBy90Degrees(board: Board): Board {
    let spaces = board._board;
    return new Board(
      spaces[0].map((_, index) => spaces.map((row) => row[index]).reverse())
    );
  }

  tiltRight(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(this.rotateBoardBy90Degrees(board));

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    tiltedBoard = this.rotateBoardBy90Degrees(this.rotateBoardBy90Degrees(tiltedBoard));

    return tiltedBoard;
  }
}

class TwentyFortyEight {
  private _board = new Board();

  board(): Board {
    return this._board;
  }

  shuffle(unshuffled: number[]): number[] {
    return unshuffled
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  start(): Board {
    let startRows = this.shuffle([0, 1, 2, 3]);
    let startColumns = this.shuffle([0, 1, 2, 3]);

    this._board.populate(startColumns[0], startRows[0], 2);
    this._board.populate(startColumns[1], startRows[1], 2);

    // console.log(this._board.toString());

    return this._board;
  }

  tiltLeft(): Board {
    return this._board.tiltLeft(this._board);
  }

  tiltRight(): Board {
    return this._board.tiltRight(this._board);
  }
}

export { TwentyFortyEight, Board };
