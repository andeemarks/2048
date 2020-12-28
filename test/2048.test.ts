import TwentyFortyEight from "../src/2048";

describe('2048', () => {

  const game = new TwentyFortyEight();

  it('holds a board of the right dimensions', () => {
    const board = game.board();
    expect(board).toBeDefined();
    expect(board.length).toBe(4);
    expect(board[0].length).toBe(4);
  })

})
