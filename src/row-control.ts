import { RowTiltObserver, NullRowTiltObserver } from "./row-tilt-observer";

class RowControl {
  private _row: number[];

  constructor(row: number[]) {
    this._row = row;
  }

  slidePopulatedSpaces(observer: RowTiltObserver): number[] {
    const populatedSpaces = this._row.filter((space: number) => {
      return space != 0;
    });

    const slidSpaces: number[] = populatedSpaces
      .concat([0, 0, 0, 0])
      .slice(0, this._row.length);

    const rowsAreEqual: boolean = slidSpaces.every(
      (val, index) => val === this._row[index]
    );
    if (!rowsAreEqual) {
      observer.slid();
    }

    return slidSpaces;
  }

  tilt(observer: RowTiltObserver = new NullRowTiltObserver()): number[] {
    const slidSpaces = this.slidePopulatedSpaces(observer);

    return this.sumEqualNeighbours(slidSpaces, observer);
  }

  private isSpacePopulated(space: number): boolean {
    return space != 0;
  }

  private areNeighboursEqual(space1: number, space2: number): boolean {
    return space1 == space2;
  }

  sumEqualNeighbours(spaces: number[], observer: RowTiltObserver): number[] {
    const rowLength = spaces.length;
    for (let i = 0; this.isSpacePopulated(spaces[i]) && i < rowLength; i++) {
      if (this.areNeighboursEqual(spaces[i], spaces[i + 1])) {
        spaces[i] = 2 * spaces[i];
        observer.collapsed(spaces[i]);
        spaces = spaces
          .slice(0, i + 1)
          .concat(spaces.slice(i + 2))
          .concat([0]);
      }
    }

    return spaces;
  }
}

export default RowControl;
