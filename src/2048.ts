import Board from "./board";
import BoardControl from "./board-control";

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

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private populateEmptySquare(board: Board): Board {
    let spaces = board.spaces();
    let emptySpaces = [];
    for (let row = 0; row < board.height(); row++) {
      for (let column = 0; column < board.rowAtPosition(row).length; column++) {
        let space = spaces[row][column];
        if (space == 0) {
          emptySpaces.push({ row: row, column: column });
        }
      }
    }

    let emptySquare = emptySpaces[this.getRandomInt(emptySpaces.length)];
    board.populate(emptySquare.column, emptySquare.row, 2);

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

    tiltedBoard = this.populateEmptySquare(tiltedBoard);

    return tiltedBoard;
  }
}

export { TwentyFortyEight, Direction };
