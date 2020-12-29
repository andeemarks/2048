class RowControl {
  static tiltLeftRow(row: number[]): number[] {
    let populatedSpaces = row.filter((space: Number) => {
      return space != 0;
    });

    let collapsedSpaces: number[] = populatedSpaces
      .concat([0, 0, 0, 0])
      .slice(0, row.length);

    for (var i = 0; collapsedSpaces[i] != 0; i++) {
      if (collapsedSpaces[i] == collapsedSpaces[i + 1]) {
        collapsedSpaces[i] = 2 * collapsedSpaces[i];
        collapsedSpaces[i + 1] = 0;
      }
    }

    return collapsedSpaces;
  }
}

export default RowControl;
