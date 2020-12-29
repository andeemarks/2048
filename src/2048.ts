import Board from "./board";
import BoardControl from "./board-control";

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

class TwentyFortyEight {
  private _board: Board;

  constructor(board: Board = new Board()) {
    this._board = board;
  }

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

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private populateEmptySpace(board: Board): Board {
    let emptySpaces = board.findEmptySpaces();

    // console.log(emptySpaces);
    // console.log(board);

    if (emptySpaces.length == 0) {
      throw new Error(`Cannot find empty spaces - board looks full.`);
    }

    let emptySpace = emptySpaces[this.getRandomInt(emptySpaces.length)];
    board.populate(emptySpace.column, emptySpace.row, 2);

    return board;
  }

  tilt(direction: Direction): Board {
    var tiltedBoard;
    switch (direction) {
      case Direction.Left:
        tiltedBoard = BoardControl.tiltLeft(this._board);
      case Direction.Up:
        tiltedBoard = BoardControl.tiltUp(this._board);
      case Direction.Down:
        tiltedBoard = BoardControl.tiltDown(this._board);
      case Direction.Right:
        tiltedBoard = BoardControl.tiltRight(this._board);
    }

    tiltedBoard = this.populateEmptySpace(tiltedBoard);

    return tiltedBoard;
  }
}

export { TwentyFortyEight, Direction };
