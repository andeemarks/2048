#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
import boxen from "boxen";
const { Game } = require("./game");
import Display from "./display";
import Board from "./board";
import readline from "readline";
import { LevelUpScoreObserver } from "./score-observer";

let rl: readline.Interface;
let board: Board;
let game: typeof Game;
let display: Display;
let scoreObserver = new LevelUpScoreObserver();

function show(board: string) {
  if (scoreObserver.hasNewScoreLevel()) {
    scoreObserver.resetNetScoreLevel();
    console.log(
      boxen(board, {
        padding: 0,
        margin: 0,
        borderStyle: "round",
        borderColor: "yellow",
        backgroundColor: "#222222",
      })
    );
  } else {
    console.log(
      boxen(board, {
        padding: 0,
        margin: 0,
        borderStyle: "round",
        borderColor: "white",
        backgroundColor: "#222222",
      })
    );
  }
}

enum EndReason {
  PlayerQuit,
  BoardFull,
  BoardComplete,
}

function setup() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  clear();
  console.log(
    chalk.yellow(figlet.textSync("2048-ts", { horizontalLayout: "full" }))
  );

  game = new Game();
  game.start(scoreObserver);
  board = game.board();
  display = new Display();
  show(display.format(board));
}

function updateBoard() {
  clear();
  console.log(
    chalk.yellow(figlet.textSync("2048-ts", { horizontalLayout: "full" }))
  );
  console.log(chalk.bgWhiteBright.black(`Score: ${game.score()}`));

  show(display.format(board));
}

function endOnPlayerExit() {
  console.log(
    chalk.red(
      figlet.textSync("Thanks for playing", { horizontalLayout: "full" })
    )
  );
}

function endOnFullBoard() {
  console.log(
    chalk.red(
      figlet.textSync("Game over - board full", { horizontalLayout: "full" })
    )
  );
}

function endOnCompleteBoard() {
  console.log(
    chalk.green.bold(
      figlet.textSync("Congratulations - you WON!!!", {
        horizontalLayout: "full",
      })
    )
  );
}

function end(reason: EndReason) {
  console.log();
  switch (reason) {
    case EndReason.PlayerQuit:
      endOnPlayerExit();
      break;
    case EndReason.BoardFull:
      endOnFullBoard();
      break;
    case EndReason.BoardComplete:
      endOnCompleteBoard();
      break;
  }
  process.exit(0);
}

function gameLoop() {
  process.stdin.on("keypress", (_, key) => {
    if (key.ctrl && key.name === "c") {
      end(EndReason.PlayerQuit);
    } else {
      try {
        board = game.tilt(board, key.name.toLowerCase());
      } catch (InvalidTiltDirectionError) {
        console.log(chalk.red.bold("Valid input only please :-)"));
      }
      updateBoard();

      if (board.isFull()) {
        end(EndReason.BoardFull);
      }
      if (board.isComplete()) {
        end(EndReason.BoardComplete);
      }
    }
  });
}

setup();
gameLoop();

export {};
