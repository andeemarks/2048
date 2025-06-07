interface RowTiltObserver {
  collapsed(_value: number): void;
  slid(): void;
}

class NullRowTiltObserver implements RowTiltObserver {
  slid(): void { 
    // intentionally blank
  }

  collapsed(_value: number): void {
    // intentionally blank
  }
}

export type { RowTiltObserver };
export { NullRowTiltObserver };
