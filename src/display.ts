import chalk from "chalk";
import boxen from "boxen";
import Board from "./board";

class Display {
  constructor() {}

  pad(value: number) {
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

  show(board: Board) {
    board.populate(0, 0, 2);
    board.populate(1, 0, 8);
    board.populate(1, 1, 4);
    board.populate(2, 0, 16);
    board.populate(2, 1, 32);
    board.populate(3, 0, 64);
    board.populate(3, 1, 128);
    board.populate(0, 2, 256);
    board.populate(1, 2, 512);
    board.populate(2, 2, 1024);
    board.populate(3, 2, 2048);

    let spaces = board.spaces();
    let displaySpace: string = "";
    for (let row = 0; row < board.height(); row++) {
      displaySpace += "\n";

      for (let column = 0; column < board.rowAtPosition(row).length; column++) {
        let space = spaces[row][column];
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
    }
    console.log(
      boxen("Board" + displaySpace, {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "white",
        backgroundColor: "#222222",
      })
    );
  }
}

export default Display;
