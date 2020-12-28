class Board {
  private _board: Number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

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

  setRow(position: number, row: Number[]) {
    this._board[position] = row;
  }

  print() {
    console.log(this.toString());
  }

  tiltLeftRow(row: Number[]): Number[] {
    let populatedSpaces = row.filter((space: Number) => {return space != 0;});
    let tiltedRow = populatedSpaces.concat([0, 0, 0, 0]).slice(0, row.length);

    console.log(tiltedRow);

    return tiltedRow;
  }

  tiltLeft() {
    this.print();

    let tiltedBoard = new Board();
    for (let row = 0; row < this._board.length; row++) {
      tiltedBoard.setRow(row, this.tiltLeftRow(this._board[row]));
    }

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
    return this._board.tiltLeft();
  }
}

export { TwentyFortyEight, Board };
