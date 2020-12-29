import { Board } from './board';

class BoardControl {
  static tiltLeftRow(row: Number[]): Number[] {
    let populatedSpaces = row.filter((space: Number) => {
      return space != 0;
    });

    return populatedSpaces.concat([0, 0, 0, 0]).slice(0, row.length);
  }

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
      tiltedBoard[row] = BoardControl.tiltLeftRow(board.rowAtPosition(row));
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

export { BoardControl }