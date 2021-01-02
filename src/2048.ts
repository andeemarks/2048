#!/usr/bin/env node

function show(board: string) {
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
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
import boxen from "boxen";
const { Game } = require("./game");
import Display from "./display";
import Board from "./board";
import readline from "readline";

let rl: readline.Interface;
let board: Board;
let game: typeof Game;
let display: Display;

function setup() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Tilt (L)eft, (R)ight, (U)p, (D)own ? ",
  });
  clear();
  console.log(
    chalk.red(figlet.textSync("2048-ts", { horizontalLayout: "full" }))
  );
  game = new Game();
  game.start();
  board = game.board();
  display = new Display();
  show(display.format(board));
}

function exit() {
  console.log();
  console.log(
    chalk.red(
      figlet.textSync("Thanks for playing", { horizontalLayout: "full" })
    )
  );
  process.exit(0);
}

function gameLoop() {
  rl.prompt();
  rl.on("line", (tiltDirection) => {
    try {
      board = game.tilt(board, tiltDirection.toUpperCase());
      show(display.format(board));
    } catch (InvalidTiltDirectionError) {
      console.log(chalk.red.bold("Valid input only please :-)"));
    }
    rl.prompt();
  }).on("close", exit);
}

setup();
gameLoop();

export {};
