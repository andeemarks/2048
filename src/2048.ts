#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const { Game } = require("./game");
const Display = require("./display");
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Tilt (L)eft, (R)ight, (U)p, (D)own ? ",
});

clear();
console.log(
  chalk.red(figlet.textSync("2048-ts", { horizontalLayout: "full" }))
);

let game = new Game();
game.start();
let board = game.board();
board.print();

// let display = new Display();
// display.show(board);

rl.prompt();
rl.on("line", (tiltDirection) => {
  console.log(`|${tiltDirection}|`);
  board = game.tilt(board, tiltDirection);
  board.print();
  rl.prompt();
});

rl.on("close", function () {
  console.log(
    chalk.red(
      figlet.textSync("\nThanks for playing", { horizontalLayout: "full" })
    )
  );
  process.exit(0);
});

export {};
