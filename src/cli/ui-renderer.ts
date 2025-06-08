import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import boxen from "boxen";
import Board from "../board";
import { EndReason } from "./game-controller";

const colorMap: Map<number, (value: number) => string> = new Map();
colorMap.set(0, (_value: number) => chalk.bgBlack("    "));
colorMap.set(2, (value: number) => chalk.black.bgWhite(`  ${value.toString()} `));
colorMap.set(4, (value: number) => chalk.black.bgWhiteBright(`  ${value.toString()} `));
colorMap.set(8, (value: number) => chalk.black.bgCyanBright(`  ${value.toString()} `));
colorMap.set(16, (value: number) => chalk.black.bgCyan(` ${value.toString()} `));
colorMap.set(32, (value: number) => chalk.black.bgBlueBright(` ${value.toString()} `));
colorMap.set(64, (value: number) => chalk.black.bgBlue(` ${value.toString()} `));
colorMap.set(128, (value: number) => chalk.black.bgMagentaBright(` ${value.toString()} `));
colorMap.set(256, (value: number) => chalk.whiteBright.bgMagenta(` ${value.toString()}`));
colorMap.set(512, (value: number) => chalk.black.bgYellow(` ${value.toString()}`));
colorMap.set(1024, (value: number) => chalk.black.bgYellowBright(` ${value.toString()}`));
colorMap.set(2048, (value: number) => chalk.whiteBright.bgRedBright(` ${value.toString()}`));

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
    console.log(boxen(this.format(board), hasNewScoreLevel ? this.levelUpBoardBoxProps : this.normalBoardBoxProps));
  }

  redLog(message: string): void {
    console.log( chalk.red( figlet.textSync(message, { horizontalLayout: "full" }) ) );
  }

  greenLog(message: string): void {
    console.log( chalk.green( figlet.textSync(message, { horizontalLayout: "full" }) ) );
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

  format(board: Board): string {
    const spaces = board.spaces();
    let displaySpace = "";
    for (let row = board.height() - 1; row >= 0; row--) {
      for (let column = 0; column < board.rowAtPosition(row).length; column++) {
        const space = spaces[row][column];
        const colorFunc = colorMap.get(space);
        if (colorFunc) {
            displaySpace += colorFunc(space);
        }

      }
      displaySpace += "\n";
    }

    return displaySpace.trim();
  }

}