import { Board } from "./board";
import { RowControl } from "./row-control";

class BoardControl {
  static rotateBoardBy90Degrees(
    board: Board,
    _rotationCount: number = 1
  ): Board {
    let spaces = board.spaces();

    for (var i = 0; i < _rotationCount; i++) {
      spaces = spaces[0].map((_, index) =>
        spaces.map((row) => row[index]).reverse()
      );
    }

    return new Board(spaces);
  }

  static tiltLeft(board: Board): Board {
    let tiltedBoard: Number[][] = [];
    for (let row = 0; row < board.height(); row++) {
      tiltedBoard[row] = RowControl.tiltLeftRow(board.rowAtPosition(row));
    }

    return new Board(tiltedBoard);
  }

  static tiltRight(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(board, 2);

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    return this.rotateBoardBy90Degrees(tiltedBoard, 2);
  }

  static tiltDown(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(board, 3);

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    return this.rotateBoardBy90Degrees(tiltedBoard);
  }

  static tiltUp(board: Board) {
    let rotatedBoard = this.rotateBoardBy90Degrees(board);

    let tiltedBoard = this.tiltLeft(rotatedBoard);

    return this.rotateBoardBy90Degrees(tiltedBoard, 3);
  }
}

export { BoardControl };
