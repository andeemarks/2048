import { Game, Direction } from "../src/game";
import Board from "../src/board";

describe("2048 Game", () => {
  const game = new Game();

  describe("initialisation", () => {
    it("holds a board of the right dimensions", () => {
      const board = game.board();

      expect(board).toBeDefined();
      expect(board.width()).toBe(4);
      expect(board.height()).toBe(4);
    });

    it("the board starts empty", () => {
      const spaces = game.board().flatten();

      expect(
        spaces.every((space: Number) => {
          return space == 0;
        })
      ).toBeTruthy();
    });

    it("starts the score at 0", () => {
      expect(game.score()).toEqual(0);
    });

    it("errors when creating a 0-sized board", () => {
      expect(() => {
        new Game(new Board([[]]));
      }).toThrowError();
    });

    it("errors when creating a non-square board", () => {
      expect(() => {
        new Game(new Board([[2], [4]]));
      }).toThrowError();
    });
  });

  describe("scoring", () => {
    it("adds to the score each time spaces are collapsed", () => {
      let game = new Game(
        new Board([
          [2, 2],
          [2, 4],
        ])
      );
      game.tilt(game.board(), Direction.Left);

      expect(game.score()).toEqual(4);
    });

    it("adds to the score each time multiple spaces are collapsed", () => {
      let game = new Game(
        new Board([
          [2, 4],
          [2, 4],
        ])
      );
      game.tilt(game.board(), Direction.Down);

      expect(game.score()).toEqual(12);
    });
  });

  describe("starting", () => {
    it("populates 2 spaces on the board when starting", () => {
      const spaces = game.start().flatten();

      expect(
        spaces.filter((space: Number) => {
          return space == 2;
        }).length
      ).toBe(2);
    });

    it("populates 2 different spaces each start", () => {
      Array.from({ length: 10 }, () =>
        expect(new Game().start().flatten()).not.toEqual(
          new Game().start().flatten()
        )
      );
    });
  });

  function countPopulatedSquares(board: Board): number {
    return board.flatten().filter((space: number) => {
      return space > 0;
    }).length;
  }

  describe("populating", () => {
    it("chooses either 2 or 4 for populating a new square", () => {
      let populationValues: number[] = [];
      let numberOfSamples = 500;
      Array.from({ length: numberOfSamples }, () =>
        populationValues.push(new Game().choosePopulationValue())
      );

      let countOfValuesWith2 = populationValues.filter((value: number) => {
        return value == 2;
      }).length;
      let countOfValuesWith4 = populationValues.filter((value: number) => {
        return value == 4;
      }).length;

      expect(countOfValuesWith2 + countOfValuesWith4).toEqual(numberOfSamples);
      expect(Math.abs(countOfValuesWith2 - countOfValuesWith4)).toBeLessThan(
        numberOfSamples / 10
      );
    });
  });

  describe("tilting", () => {
    it("randomly populates a new empty square when tilting", () => {
      let board = game.board();
      let boardPopulationCount = countPopulatedSquares(board);
      let newBoard = game.tilt(board, Direction.Left);
      let newBoardPopulationCount = countPopulatedSquares(newBoard);

      expect(newBoardPopulationCount).toEqual(boardPopulationCount + 1);
    });

    it("skips populating a new empty square when tilting an already tilted board", () => {
      let board = new Board([
        [2, 0],
        [2, 0],
      ]);
      let newBoard = game.tilt(board, Direction.Left);

      expect(newBoard).toEqual(board);
    });

    it("errors when tilting/populating a completely full board", () => {
      let fullBoard = new Board([
        [2, 4],
        [8, 16],
      ]);
      let game = new Game(fullBoard);

      expect(() => {
        game.tilt(fullBoard, Direction.Left);
      }).toThrowError();
    });
  });
});
