type Board = Number[][];

class TwentyFortyEight {
    private _board: Board =  [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    board(): Board {
        return this._board;
    }
}

export {TwentyFortyEight};
export type {Board};