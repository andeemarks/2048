import readline from "readline";
import { GameController } from "./game-controller";

type KeyPress = { ctrl: boolean; name: string };

export class InputHandler {
  private controller: GameController;

  constructor(controller: GameController) {
    this.controller = controller;
  }

  setupKeyboardInput(): void {
    readline.createInterface({ input: process.stdin, output: process.stdout });
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (_, key: KeyPress) => {
      this.handleKeyPress(key);
    });
  }

  private handleKeyPress(key: KeyPress): void {
    if (key.ctrl && key.name === "c") {
      this.controller.quit();
      return;
    }

    const validDirections = ["up", "down", "left", "right"];
    if (validDirections.includes(key.name)) {
      this.controller.handleMove(key.name);
    }
  }
}