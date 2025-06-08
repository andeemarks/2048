import { GameController, GameStateObserver, EndReason } from "./game-controller";
import { InputHandler } from "./input-handler";
import { UIRenderer } from "./ui-renderer";
import Board from "../board";

export class CLIApplication implements GameStateObserver {
  private controller: GameController;
  private inputHandler: InputHandler;
  private renderer: UIRenderer;

  constructor() {
    this.controller = new GameController();
    this.inputHandler = new InputHandler(this.controller);
    this.renderer = new UIRenderer();
    
    this.controller.setObserver(this);
  }

  run(): void {
    this.renderer.showInitialScreen();
    this.controller.start();
    this.inputHandler.setupKeyboardInput();
  }

  onBoardUpdate(board: Board, score: number): void {
    const hasNewScoreLevel = this.controller.hasNewScoreLevel();
    this.renderer.showBoard(board, score, hasNewScoreLevel);
    
    if (hasNewScoreLevel) {
      this.controller.resetScoreLevel();
    }
  }

  onGameEnd(reason: EndReason): void {
    this.renderer.showGameEnd(reason);
  }
}