import { RowTiltObserver, NullRowTiltObserver } from "./row-tilt-observer";

class RowControl {
  private _row: number[];

  constructor(row: number[]) {
    this._row = row;
  }

  slidePopulatedSpaces(observer: RowTiltObserver): number[] {
    let populatedSpaces = this._row.filter((space: Number) => {
      return space != 0;
    });

    let slidSpaces: number[] = populatedSpaces
      .concat([0, 0, 0, 0])
      .slice(0, this._row.length);

    let rowsAreEqual: boolean = slidSpaces.every(
      (val, index) => val === this._row[index]
    );
    if (!rowsAreEqual) {
      observer.slid();
    }

    return slidSpaces;
  }

  tilt(observer: RowTiltObserver = new NullRowTiltObserver()): number[] {
    let slidSpaces = this.slidePopulatedSpaces(observer);

    return this.sumEqualNeighbours(slidSpaces, observer);
  }

  private isSpacePopulated(space: number): boolean {
    return space != 0;
  }

  private areNeighboursEqual(space1: number, space2: number) {
    return space1 == space2;
  }

  sumEqualNeighbours(spaces: number[], observer: RowTiltObserver): number[] {
    let rowLength = spaces.length;
    for (var i = 0; this.isSpacePopulated(spaces[i]) && i < rowLength; i++) {
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
