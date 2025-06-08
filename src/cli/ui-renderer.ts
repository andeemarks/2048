import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import boxen from "boxen";
import Board from "../board";
import Display from "../display";
import { EndReason } from "./game-controller";

export class UIRenderer {
  private display: Display;
  private normalBoardBoxProps: boxen.Options;
  private levelUpBoardBoxProps: boxen.Options;

  constructor() {
    this.display = new Display();
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

    const formattedBoard = this.display.format(board);
    
    if (hasNewScoreLevel) {
      console.log(boxen(formattedBoard, this.levelUpBoardBoxProps));
    } else {
      console.log(boxen(formattedBoard, this.normalBoardBoxProps));
    }
  }

  showGameEnd(reason: EndReason): void {
    console.log();
    switch (reason) {
      case EndReason.PlayerQuit:
        console.log(
          chalk.red(
            figlet.textSync("Thanks for playing", { horizontalLayout: "full" })
          )
        );
        break;
      case EndReason.BoardFull:
        console.log(
          chalk.red(
            figlet.textSync("Game over - board full", { horizontalLayout: "full" })
          )
        );
        break;
      case EndReason.BoardComplete:
        console.log(
          chalk.green.bold(
            figlet.textSync("Congratulations - you WON!!!", {
              horizontalLayout: "full",
            })
          )
        );
        break;
    }
    process.exit(0);
  }
}