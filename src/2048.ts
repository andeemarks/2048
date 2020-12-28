type Board = Number[][];

class TwentyFortyEight {
  private _board: Board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  board(): Board {
    return this._board;
  }

  start(): Board {
    let startRows = [0, 1, 2, 3]
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    let startColumns = [0, 1, 2, 3]
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    this._board[startColumns[0]][startRows[0]] = 2;
    this._board[startColumns[1]][startRows[1]] = 2;

    // console.log(this._board);

    return this._board;
  }
}

export { TwentyFortyEight };
export type { Board };
