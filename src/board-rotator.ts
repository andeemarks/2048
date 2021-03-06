import Board from "./board";

class BoardRotator {
  static rotate90Degrees(board: Board, rotationCount: number = 1): Board {
    if (rotationCount < 1 || rotationCount >= 4) {
      throw Error;
    }

    let spaces = board.spaces();

    for (var i = 0; i < rotationCount; i++) {
      spaces = spaces[0].map((_, index) =>
        spaces.map((row) => row[index]).reverse()
      );
    }

    return new Board(spaces);
  }
}

export default BoardRotator;
