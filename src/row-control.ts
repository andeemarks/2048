
class RowControl {
  static tiltLeftRow(row: Number[]): Number[] {
    let populatedSpaces = row.filter((space: Number) => {
      return space != 0;
    });

    return populatedSpaces.concat([0, 0, 0, 0]).slice(0, row.length);
  }
}

export { RowControl }