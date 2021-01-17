interface RowTiltObserver {
  collapsed(_value: number): void;
  slid(): void;
}

class NullRowTiltObserver implements RowTiltObserver {
  slid(): void {}
  collapsed(_value: number) {}
}

export type { RowTiltObserver };
export { NullRowTiltObserver };
