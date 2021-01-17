import Board from "./board";
import RowControl from "./row-control";
import BoardRotator from "./board-rotator";
import {RowTiltObserver, NullRowTiltObserver} from "./row-tilt-observer";

class BoardControl {
  private static tilt(board: Board, observer: RowTiltObserver): Board {
    let tiltedBoard: number[][] = [];
    for (let row = 0; row < board.height(); row++) {
      tiltedBoard[row] = new RowControl(board.rowAtPosition(row)).tilt(
        observer
      );
    }

    return new Board(tiltedBoard);
  }

  static tiltLeft(
    board: Board,
    observer: RowTiltObserver = new NullRowTiltObserver()
  ): Board {
    let tiltedBoard = this.tilt(board, observer);

    return tiltedBoard;
  }

  static tiltRight(
    board: Board,
    observer: RowTiltObserver = new NullRowTiltObserver()
  ): Board {
    let rotatedBoard = BoardRotator.rotate90Degrees(board, 2);

    let tiltedBoard = this.tilt(rotatedBoard, observer);

    return BoardRotator.rotate90Degrees(tiltedBoard, 2);
  }

  static tiltDown(
    board: Board,
    observer: RowTiltObserver = new NullRowTiltObserver()
  ): Board {
    let rotatedBoard = BoardRotator.rotate90Degrees(board, 3);

    let tiltedBoard = this.tilt(rotatedBoard, observer);

    return BoardRotator.rotate90Degrees(tiltedBoard);
  }

  static tiltUp(
    board: Board,
    observer: RowTiltObserver = new NullRowTiltObserver()
  ): Board {
    let rotatedBoard = BoardRotator.rotate90Degrees(board);

    let tiltedBoard = this.tilt(rotatedBoard, observer);

    return BoardRotator.rotate90Degrees(tiltedBoard, 3);
  }
}

export default BoardControl;
