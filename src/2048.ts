class Board {
  private _board: Number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  width(): Number {
      return this._board[0].length;
  }

  height(): Number {
      return this._board.length;
  }

  spaces(): Number[] {
     return ([] as Number[]).concat(...this._board); 
  }

  populate(column: number, row: number, value: number) {
    this._board[column][row] = value;
  }

  toString(): String {
    //   let result = "";
      return this._board.join("\n");
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

    console.log(this._board.toString());

    return this._board;
  }
}

export { TwentyFortyEight, Board };

