import RowControl from "../src/row-control";

describe("RowControl", () => {
  it("collapses populated spaces when tilting left", () => {
    expect(new RowControl([2, 0, 0, 4]).tilt()).toEqual([2, 4, 0, 0]);
    expect(new RowControl([0, 8, 0, 32]).tilt()).toEqual([8, 32, 0, 0]);
    expect(new RowControl([0, 0, 16, 0]).tilt()).toEqual([16, 0, 0, 0]);
  });

  it("leaves unpopulated rows unchanged when tilting", () => {
    expect(new RowControl([0, 0, 0, 0]).tilt()).toEqual([0, 0, 0, 0]);
  });

  it("leaves fully non-collapsible rows unchanged when tilting", () => {
    expect(new RowControl([2, 4, 8, 16]).tilt()).toEqual([2, 4, 8, 16]);
  });

  it("sums successive populated spaces of the same value when tilting left", () => {
    expect(new RowControl([2, 0, 0, 2]).tilt()).toEqual([4, 0, 0, 0]);
    expect(new RowControl([0, 8, 0, 8]).tilt()).toEqual([16, 0, 0, 0]);
    expect(new RowControl([4, 4, 0, 0]).tilt()).toEqual([8, 0, 0, 0]);
  });

  it("sums multiple successive populated spaces of the same value when tilting left", () => {
    expect(new RowControl([2, 2, 4, 4]).tilt()).toEqual([4, 8, 0, 0]);
    expect(new RowControl([2, 2, 2, 4]).tilt()).toEqual([4, 2, 4, 0]);
  });
});
