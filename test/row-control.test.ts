import RowControl from "../src/row-control";

describe("RowControl", () => {
  function rowAfterTilting(row: number[]): number[] {
    return new RowControl(row).tilt();
  }

  it("collapses empty spaces when tilting", () => {
    expect(rowAfterTilting([2, 0, 0, 4])).toEqual([2, 4, 0, 0]);
    expect(rowAfterTilting([0, 8, 0, 32])).toEqual([8, 32, 0, 0]);
    expect(rowAfterTilting([0, 0, 16, 0])).toEqual([16, 0, 0, 0]);
  });

  it("leaves unpopulated rows unchanged when tilting", () => {
    expect(rowAfterTilting([0, 0, 0, 0])).toEqual([0, 0, 0, 0]);
  });

  it("leaves fully non-combinable rows unchanged when tilting", () => {
    expect(rowAfterTilting([2, 4, 8, 16])).toEqual([2, 4, 8, 16]);
  });

  it("combines successive equal populated spaces when tilting", () => {
    expect(rowAfterTilting([2, 0, 0, 2])).toEqual([4, 0, 0, 0]);
    expect(rowAfterTilting([0, 8, 0, 8])).toEqual([16, 0, 0, 0]);
    expect(rowAfterTilting([4, 4, 0, 0])).toEqual([8, 0, 0, 0]);
  });

  it("combines multiple successive equal populated spaces when tilting", () => {
    expect(rowAfterTilting([2, 2, 4, 4])).toEqual([4, 8, 0, 0]);
    expect(rowAfterTilting([2, 2, 2, 4])).toEqual([4, 2, 4, 0]);
  });
});
