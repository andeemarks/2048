import { Board } from "./board";
import { BoardControl } from "./board-control";

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
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

    return this._board;
  }

  tilt(direction: Direction): Board {
    switch (direction) {
      case Direction.Left:
        return BoardControl.tiltLeft(this._board);
      case Direction.Up:
        return BoardControl.tiltUp(this._board);
      case Direction.Down:
        return BoardControl.tiltDown(this._board);
      case Direction.Right:
        return BoardControl.tiltRight(this._board);
    }
  }
}

export { TwentyFortyEight, Direction };
