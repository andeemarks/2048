import Board from "./board";
import RowControl from "./row-control";
import {RowTiltObserver, NullRowTiltObserver} from "./row-tilt-observer";

class BoardTilter {
  private static tilt(board: Board, observer: RowTiltObserver): Board {
    const tiltedBoard: number[][] = [];
    for (let row = 0; row < board.height(); row++) {
      tiltedBoard[row] = new RowControl(board.rowAtPosition(row)).tilt( observer );
    }

    return new Board(tiltedBoard);
  }

  static left( board: Board, observer: RowTiltObserver = new NullRowTiltObserver() ): Board {
    const tiltedBoard = this.tilt(board, observer);

    return tiltedBoard;
  }

  static right( board: Board, observer: RowTiltObserver = new NullRowTiltObserver() ): Board {
    const rotatedBoard = this.quarterTurn(board, 2);
    const tiltedBoard = this.tilt(rotatedBoard, observer);

    return this.quarterTurn(tiltedBoard, 2);
  }

  static down( board: Board, observer: RowTiltObserver = new NullRowTiltObserver() ): Board {
    const rotatedBoard = this.quarterTurn(board, 3);
    const tiltedBoard = this.tilt(rotatedBoard, observer);

    return this.quarterTurn(tiltedBoard);
  }

  static up( board: Board, observer: RowTiltObserver = new NullRowTiltObserver() ): Board {
    const rotatedBoard = this.quarterTurn(board);
    const tiltedBoard = this.tilt(rotatedBoard, observer);

    return this.quarterTurn(tiltedBoard, 3);
  }

  static quarterTurn(board: Board, turnCount = 1): Board {
    if (turnCount < 1 || turnCount >= 4) {
      throw new RangeError();
    }

    let spaces = board.spaces();

    for (let i = 0; i < turnCount; i++) {
      spaces = spaces[0].map((_, index) =>
        spaces.map((row) => row[index]).reverse()
      );
    }

    return new Board(spaces);
  }

}

export default BoardTilter;
