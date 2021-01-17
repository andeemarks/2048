import RowControl from "../src/row-control";
import { RowTiltObserver } from "./row-tilt-observer";

describe("RowControl", () => {
  function rowAfterTilting(row: number[]): number[] {
    return new RowControl(row).tilt();
  }

  class TestObserver implements RowTiltObserver {
    private _collapseCalled: boolean = false;
    private _slidCalled: boolean = false;

    slid(): void {
      this._slidCalled = true;
    }

    collapsed(_value: number): void {
      this._collapseCalled = true;
    }

    public get collapseCalled(): boolean {
      return this._collapseCalled;
    }

    public get slidCalled(): boolean {
      return this._slidCalled;
    }
  }

  it("alerts the observer when space sliding happens", () => {
    let testObserver = new TestObserver();

    new RowControl([2, 0, 0, 4]).tilt(testObserver);

    expect(testObserver.slidCalled).toBe(true);
  });

  it("does not alert the observer when no space sliding happens", () => {
    let testObserver = new TestObserver();

    new RowControl([2, 4, 0, 0]).tilt(testObserver);

    expect(testObserver.slidCalled).toBe(false);
  });

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
