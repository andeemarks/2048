import Board from "./board";
import BoardControl from "./board-control";
import { RowTiltObserver } from "./row-tilt-observer";
import { ScoreObserver, NullScoreObserver } from "./score-observer";

enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

class InvalidTiltDirectionError extends Error {
  constructor(message = "") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class Game implements RowTiltObserver {
  private _board: Board;
  private _score = 0;
  private _hasSlid = false;
  private _scoreObserver: ScoreObserver = new NullScoreObserver();

  constructor(board: Board = new Board()) {
    if (board.width() == 0 || board.width() != board.height()) {
      throw new Error(`Cannot create game with invalid board`);
    }

    this._board = board;
  }

  collapsed(value: number): void {
    this._score += value;
    this._scoreObserver.scoreIncreasedBy(value);
  }

  slid(): void {
    this._hasSlid = true;
  }

  board(): Board {
    return this._board;
  }

  score(): number {
    return this._score;
  }

  shuffle(unshuffled: number[]): number[] {
    return unshuffled
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  start(scoreObserver: ScoreObserver = new NullScoreObserver()): Board {
    const startRows = this.shuffle([0, 1, 2, 3]);
    const startColumns = this.shuffle([0, 1, 2, 3]);

    this._board = this._board.with_value(startColumns[0], startRows[0], 2);
    this._board = this._board.with_value(startColumns[1], startRows[1], 2);
    this._scoreObserver = scoreObserver;

    return this._board;
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private populateEmptySpace(board: Board): Board {
    const emptySpaces = board.findEmptySpaces();
    const emptySpace = emptySpaces[this.getRandomInt(emptySpaces.length)];

    return board.with_value( emptySpace.column, emptySpace.row, this.choosePopulationValue() );
  }

  choosePopulationValue(): number {
    return this.getRandomInt(2) == 1 ? 2 : 4;
  }

  tilt(board: Board, direction: string): Board {
    let tiltedBoard: Board;
    this._hasSlid = false;
    switch (direction as Direction) {
      case Direction.Left:
        tiltedBoard = BoardControl.tiltLeft(board, this);
        break;
      case Direction.Up:
        tiltedBoard = BoardControl.tiltUp(board, this);
        break;
      case Direction.Down:
        tiltedBoard = BoardControl.tiltDown(board, this);
        break;
      case Direction.Right:
        tiltedBoard = BoardControl.tiltRight(board, this);
        break;
      default:
        throw new InvalidTiltDirectionError(direction);
    }

    return this.populateEmptySpace(tiltedBoard);
  }
}

export { Game, Direction, InvalidTiltDirectionError };
