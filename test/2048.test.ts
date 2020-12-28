import {TwentyFortyEight, Board} from "../src/2048";

describe('2048', () => {

  const game = new TwentyFortyEight();

  it('holds a board of the right dimensions', () => {
    const board = game.board();

    expect(board).toBeDefined();
    expect(board.width()).toBe(4);
    expect(board.height()).toBe(4);
  })

  it('the board starts empty', () => {
    const spaces = game.board().spaces();

    expect(spaces.every((space: Number) => {return space == 0;})).toBeTruthy();
  })

  it('populates 2 spaces on the board when starting', () => {
    const spaces = game.start().spaces();

    expect(
      spaces.filter((space: Number) => {
        return space == 2;
      }).length
    ).toBe(2);
    
  })

  it('populates 2 different spaces each start', () => {
    const spaces1 = new TwentyFortyEight().start().spaces();
    const spaces2 = new TwentyFortyEight().start().spaces();
    const spaces3 = new TwentyFortyEight().start().spaces();
    const spaces4 = new TwentyFortyEight().start().spaces();

    expect(spaces1).not.toEqual(spaces2);
    expect(spaces2).not.toEqual(spaces3);
    expect(spaces3).not.toEqual(spaces4);
  })
})
