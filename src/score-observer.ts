interface ScoreObserver {
  scoreIncreasedBy(score: number): void;
}

class NullScoreObserver implements ScoreObserver {
  scoreIncreasedBy(_score: number): void {}
}

class LevelUpScoreObserver implements ScoreObserver {
  private _scoreLevel = 0;
  private _newScoreLevel = false;

  scoreIncreasedBy(score: number): void {
    if (score > this._scoreLevel) {
      this._scoreLevel = score;
      this._newScoreLevel = true;
    }
  }

  hasNewScoreLevel(): boolean {
    return this._newScoreLevel;
  }

  resetNetScoreLevel(): void {
    this._newScoreLevel = false;
  }
}

export type { ScoreObserver };
export { NullScoreObserver, LevelUpScoreObserver };
