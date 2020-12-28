type Board = Number[][];

class TwentyFortyEight {
    private _board: Board =  [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    board(): Board {
        return this._board;
    }

    start(): Board {
        this._board[0][1] = 2;
        this._board[2][3] = 2;
        return this._board;
    }
}

export {TwentyFortyEight};
export type {Board};