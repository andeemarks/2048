import Board from "./board";
import RowControl from "./row-control";
import BoardRotator from "./board-rotator";

class BoardControl {
  private static tilt(board: Board): Board {
    let tiltedBoard: number[][] = [];
    for (let row = 0; row < board.height(); row++) {
      tiltedBoard[row] = new RowControl(board.rowAtPosition(row)).tilt();
    }

    return new Board(tiltedBoard);
  }

  static tiltLeft(board: Board): Board {
    console.log("left");
    let tiltedBoard = this.tilt(board);

    return tiltedBoard;
  }

  static tiltRight(board: Board): Board {
    console.log("right");
    let rotatedBoard = BoardRotator.rotate90Degrees(board, 2);

    let tiltedBoard = this.tilt(rotatedBoard);

    return BoardRotator.rotate90Degrees(tiltedBoard, 2);
  }

  static tiltDown(board: Board): Board {
    console.log("down");
    let rotatedBoard = BoardRotator.rotate90Degrees(board, 3);

    let tiltedBoard = this.tilt(rotatedBoard);

    return BoardRotator.rotate90Degrees(tiltedBoard);
  }

  static tiltUp(board: Board): Board {
    console.log("up");
    let rotatedBoard = BoardRotator.rotate90Degrees(board);

    let tiltedBoard = this.tilt(rotatedBoard);

    return BoardRotator.rotate90Degrees(tiltedBoard, 3);
  }
}

export default BoardControl;
