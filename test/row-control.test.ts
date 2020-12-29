import RowControl from "../src/row-control";

describe("RowControl", () => {
  it("collapses populated spaces when tilting left", () => {
    expect(RowControl.tiltLeftRow([2, 0, 0, 4])).toEqual([2, 4, 0, 0]);
    expect(RowControl.tiltLeftRow([0, 8, 0, 32])).toEqual([8, 32, 0, 0]);
    expect(RowControl.tiltLeftRow([0, 0, 16, 0])).toEqual([16, 0, 0, 0]);
  });

  it("leaves unpopulated rows unchanged when tilting", () => {
    expect(RowControl.tiltLeftRow([0, 0, 0, 0])).toEqual([0, 0, 0, 0]);
  });

  it("sums successive populated spaces of the same value when tilting left", () => {
    expect(RowControl.tiltLeftRow([2, 0, 0, 2])).toEqual([4, 0, 0, 0]);
    expect(RowControl.tiltLeftRow([0, 8, 0, 8])).toEqual([16, 0, 0, 0]);
    expect(RowControl.tiltLeftRow([4, 4, 0, 0])).toEqual([8, 0, 0, 0]);
  });

  it("sums multiple successive populated spaces of the same value when tilting left", () => {
    expect(RowControl.tiltLeftRow([2, 2, 4, 4])).toEqual([4, 8, 0, 0]);
    expect(RowControl.tiltLeftRow([2, 2, 2, 4])).toEqual([4, 2, 4, 0]);
  });
});
