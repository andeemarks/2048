class Board {
  private _board: number[][];

  constructor(
    spaces: number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  ) {
    this._board = spaces;
  }

  spaces(): number[][] {
    return this._board;
  }

  width(): number {
    return this._board[0].length;
  }

  height(): number {
    return this._board.length;
  }

  flatten(): number[] {
    return ([] as number[]).concat(...this._board);
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

  rowAtPosition(position: number): number[] {
    if (position < 0 || position >= this.height()) {
      throw new Error(`Illegal attempt to access row ${position} on board`);
    }

    return this._board[position];
  }

  print() {
    console.log(this.toString());
  }
}

export default Board;
