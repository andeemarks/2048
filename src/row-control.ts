class RowControl {
  static collapsePopulatedSpaces(row: number[]): number[] {
    let populatedSpaces = row.filter((space: Number) => {
      return space != 0;
    });

    let collapsedSpaces: number[] = populatedSpaces
      .concat([0, 0, 0, 0])
      .slice(0, row.length);

    return collapsedSpaces;
  }

  static tiltLeftRow(row: number[]): number[] {
    let collapsedSpaces = this.collapsePopulatedSpaces(row);

    return this.sumEqualNeighbours(collapsedSpaces);
  }

  static isSpacePopulated(space: number): boolean {
    return space != 0;
  }

  static areNeighboursEqual(space1: number, space2: number) {
    return space1 == space2;
  }

  static sumEqualNeighbours(spaces: number[]): number[] {
    let rowLength = spaces.length;
    for (var i = 0; this.isSpacePopulated(spaces[i]) && i < rowLength; i++) {
      if (this.areNeighboursEqual(spaces[i], spaces[i + 1])) {
        spaces[i] = 2 * spaces[i];
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
