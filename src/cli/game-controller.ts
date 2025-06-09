import { Game } from "../game";
import Board from "../board";
import { LevelUpScoreObserver } from "../score-observer";
import { InvalidTiltDirectionError } from "../game";

export enum EndReason {
  PlayerQuit,
  BoardFull,
  BoardComplete,
}

export interface GameStateObserver {
  onBoardUpdate(board: Board, score: number): void;
  onGameEnd(reason: EndReason): void;
}

export class GameController {
  private game: Game;
  private board: Board;
  private scoreObserver: LevelUpScoreObserver;
  private stateObserver?: GameStateObserver;

  constructor() {
    this.game = new Game();
    this.scoreObserver = new LevelUpScoreObserver();
    this.board = new Board();
  }

  start(): void {
    this.game.start(this.scoreObserver);
    this.board = this.game.board();
    this.notifyBoardUpdate();
  }

  handleMove(direction: string): boolean {
    try {
      this.board = this.game.tilt(this.board, direction.toLowerCase());
      this.notifyBoardUpdate();
      
      const endReason = this.checkGameEnd();
      if (endReason !== null) {
        this.stateObserver?.onGameEnd(endReason);
        return false;
      }
      
      return true;
    } catch (error) {
      if (error instanceof InvalidTiltDirectionError) {
        console.log("Valid input only please :-)");
      }
      return true;
    }
  }

  quit(): void {
    this.stateObserver?.onGameEnd(EndReason.PlayerQuit);
  }

  setObserver(observer: GameStateObserver): void {
    this.stateObserver = observer;
  }

  hasNewScoreLevel(): boolean {
    return this.scoreObserver.hasNewScoreLevel();
  }

  resetScoreLevel(): void {
    this.scoreObserver.resetNetScoreLevel();
  }

  private checkGameEnd(): EndReason | null {
    if (this.board.isFull()) {
      return EndReason.BoardFull;
    }
    if (this.board.isComplete()) {
      return EndReason.BoardComplete;
    }
    return null;
  }

  private notifyBoardUpdate(): void {
    this.stateObserver?.onBoardUpdate(this.board, this.game.score());
  }
}