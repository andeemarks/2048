import {TwentyFortyEight, Board} from "../src/2048";

describe('2048', () => {

  const game = new TwentyFortyEight();

  it('holds a board of the right dimensions', () => {
    const board = game.board();

    expect(board).toBeDefined();
    expect(board.length).toBe(4);
    expect(board[0].length).toBe(4);
  })

  it('the board starts empty', () => {
    const board: Board = game.board();
    const spaces = ([] as Number[]).concat(... board);

    expect(spaces.every((space: Number) => {return space == 0;})).toBeTruthy();
  })

  it('populates 2 spaces on the board when starting', () => {
    const board: Board = game.start();
    const spaces = ([] as Number[]).concat(...board);

    expect(
      spaces.filter((space: Number) => {
        return space == 2;
      }).length
    ).toBe(2);
    
  })

  it('populates 2 different spaces each start', () => {
    const spaces1 = ([] as Number[]).concat(...new TwentyFortyEight().start());
    const spaces2 = ([] as Number[]).concat(...new TwentyFortyEight().start());
    const spaces3 = ([] as Number[]).concat(...new TwentyFortyEight().start());
    const spaces4 = ([] as Number[]).concat(...new TwentyFortyEight().start());

    expect(spaces1).not.toEqual(spaces2);
    expect(spaces2).not.toEqual(spaces3);
    expect(spaces3).not.toEqual(spaces4);
  })
})
