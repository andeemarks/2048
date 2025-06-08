# 2048
CLI Typescript version of 2048 game

## Running

`npm start`

## Testing (including Linting)

`npm test`

```
npm test

> 2048@1.0.0 pretest
> eslint src/**


> 2048@1.0.0 test
> jest --no-cache

 PASS  test/row-control.test.ts
 PASS  test/board-rotator.test.ts
 PASS  test/board-control.test.ts
 PASS  test/board.test.ts
 PASS  test/game.test.ts

Test Suites: ${\textsf{\color{lightgreen}5 passed}}$, 5 total
Tests:       1 skipped, ${\textsf{\color{lightgreen}31 passed}}$, 32 total
Snapshots:   0 total
Time:        1.457 s
Ran all test suites.
```