import chalk from "chalk";
import Board from "./board";

class Display {
  pad(value: number): number | string {
    if (value <= 9) {
      return `  ${value} `;
    }
    if (value <= 99) {
      return ` ${value} `;
    }
    if (value <= 999) {
      return ` ${value}`;
    }
    return value;
  }

  format(board: Board): string {
    const spaces = board.spaces();
    let displaySpace = "";
    for (let row = board.height() - 1; row >= 0; row--) {
      for (let column = 0; column < board.rowAtPosition(row).length; column++) {
        const space = spaces[row][column];
        switch (space) {
          case 0:
            displaySpace += chalk.bgBlack("    ");
            break;
          case 2:
            displaySpace += chalk.black.bgWhite(this.pad(space));
            break;
          case 4:
            displaySpace += chalk.black.bgWhiteBright(this.pad(space));
            break;
          case 8:
            displaySpace += chalk.black.bgCyanBright(this.pad(space));
            break;
          case 16:
            displaySpace += chalk.black.bgCyan(this.pad(space));
            break;
          case 32:
            displaySpace += chalk.black.bgBlueBright(this.pad(space));
            break;
          case 64:
            displaySpace += chalk.black.bgBlue(this.pad(space));
            break;
          case 128:
            displaySpace += chalk.black.bgMagentaBright(this.pad(space));
            break;
          case 256:
            displaySpace += chalk.whiteBright.bgMagenta(this.pad(space));
            break;
          case 512:
            displaySpace += chalk.black.bgYellow(this.pad(space));
            break;
          case 1024:
            displaySpace += chalk.black.bgYellowBright(this.pad(space));
            break;
          case 2048:
            displaySpace += chalk.whiteBright.bgRedBright(this.pad(space));
            break;
        }
      }
      displaySpace += "\n";
    }

    return displaySpace.trim();
  }
}

export default Display;
