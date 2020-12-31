#!/usr/bin/env node

// const game = require("./src/game");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

clear();
console.log(
  chalk.red(figlet.textSync("2048-ts", { horizontalLayout: "full" }))
);

export {}