import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import boxen from "boxen";
import Board from "../board";
import { EndReason } from "./game-controller";

export class UIRenderer {
  private normalBoardBoxProps: boxen.Options;
  private levelUpBoardBoxProps: boxen.Options;

  constructor() {
    this.normalBoardBoxProps = {
      padding: 0,
      margin: 0,
      borderStyle: "round",
      borderColor: "white",
      backgroundColor: "#222222",
    };
    this.levelUpBoardBoxProps = {
      padding: 0,
      margin: 0,
      borderStyle: "doubleSingle",
      borderColor: "yellowBright",
      backgroundColor: "#222222",
    };
  }

  showInitialScreen(): void {
    clear();
    console.log(chalk.yellow(figlet.textSync("2048-ts", { horizontalLayout: "full" })));
  }

  showBoard(board: Board, score: number, hasNewScoreLevel: boolean): void {
    clear();
    console.log(chalk.yellow(figlet.textSync("2048-ts", { horizontalLayout: "full" })));
    console.log(chalk.bgWhiteBright.black(`Score: ${score.toString()}`));

    const formattedBoard = this.format(board);
    
    if (hasNewScoreLevel) {
      console.log(boxen(formattedBoard, this.levelUpBoardBoxProps));
    } else {
      console.log(boxen(formattedBoard, this.normalBoardBoxProps));
    }
  }

  redLog(message: string): void {
    console.log(
      chalk.red(
        figlet.textSync(message, { horizontalLayout: "full" })
      )
    );
  }

  greenLog(message: string): void {
    console.log(
      chalk.green(
        figlet.textSync(message, { horizontalLayout: "full" })
      )
    );
  }

  showGameEnd(reason: EndReason): void {
    console.log();
    switch (reason) {
      case EndReason.PlayerQuit:
        this.redLog("Thanks for playing");
        break;
      case EndReason.BoardFull:
        this.redLog("Game over - board full");
        break;
      case EndReason.BoardComplete:
        this.greenLog("Congratulations - you WON!!!");
        break;
    }
    process.exit(0);
  }
  
  pad(value: number): number | string {
    if (value <= 9) {
      return `  ${value.toString()} `;
    }
    if (value <= 99) {
      return ` ${value.toString()} `;
    }
    if (value <= 999) {
      return ` ${value.toString()}`;
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