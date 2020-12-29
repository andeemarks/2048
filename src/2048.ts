import { Board } from './board';

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

    return this._board;
  }

  tiltLeft(): Board {
    return this._board.tiltLeft(this._board);
  }

  tiltRight(): Board {
    return this._board.tiltRight(this._board);
  }

  tiltDown(): Board {
    return this._board.tiltDown(this._board);
  }

  tiltUp(): Board {
    return this._board.tiltUp(this._board);
  }
}

export { TwentyFortyEight };
