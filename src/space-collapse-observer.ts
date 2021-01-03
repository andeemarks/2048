interface SpaceCollapseObserver {
  collapsed(_value: number): void;
}

class NullSpaceCollapseObserver implements SpaceCollapseObserver {
  collapsed(_value: number) {}
}

export type { SpaceCollapseObserver };
export { NullSpaceCollapseObserver };
