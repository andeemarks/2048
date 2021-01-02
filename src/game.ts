import Board from "./board";
import BoardControl from "./board-control";

enum Direction {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R",
}

class InvalidTiltDirectionError extends Error {
  constructor(message: any = "") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class Game {
  private _board: Board;

  constructor(board: Board = new Board()) {
    if (board.width() == 0 || board.width() != board.height()) {
      throw new Error(`Cannot create game with invalid board`);
    }

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

    if (emptySpaces.length == 0) {
      throw new Error(`Cannot find empty spaces - board looks full.`);
    }

    let emptySpace = emptySpaces[this.getRandomInt(emptySpaces.length)];
    board.populate(emptySpace.column, emptySpace.row, 2);

    return board;
  }

  tilt(board: Board, direction: Direction): Board {
    var tiltedBoard: Board;
    switch (direction) {
      case Direction.Left:
        tiltedBoard = BoardControl.tiltLeft(board);
        break;
      case Direction.Up:
        tiltedBoard = BoardControl.tiltUp(board);
        break;
      case Direction.Down:
        tiltedBoard = BoardControl.tiltDown(board);
        break;
      case Direction.Right:
        tiltedBoard = BoardControl.tiltRight(board);
        break;
      default:
        throw new InvalidTiltDirectionError(direction);
        break;
    }

    return this.populateEmptySpace(tiltedBoard);
  }
}

export { Game, Direction, InvalidTiltDirectionError };
