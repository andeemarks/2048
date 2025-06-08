# 2048
CLI Typescript version of 2048 game

## Running

`npm start`

![](/resources/screenshot.png)

## Testing (including Linting)

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

Test Suites: 5 passed, 5 total
Tests:       1 skipped, 31 passed, 32 total
Snapshots:   0 total
Time:        1.457 s
Ran all test suites.
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Main as 2048.ts
    participant CLI as CLIApplication
    participant Controller as GameController
    participant Input as InputHandler
    participant Renderer as UIRenderer
    participant Game
    participant Board
    participant Display
    participant ScoreObs as LevelUpScoreObserver

    Note over User, ScoreObs: Application Startup & Initialization
    User->>Main: Start Application
    Main->>CLI: new CLIApplication()
    
    activate CLI
    CLI->>Controller: new GameController()
    CLI->>Input: new InputHandler(controller)
    CLI->>Renderer: new UIRenderer()
    CLI->>Controller: setObserver(this)
    
    Main->>CLI: run()
    CLI->>Renderer: showInitialScreen()
    Renderer->>Renderer: clear(), figlet "2048-ts"
    
    CLI->>Controller: start()
    activate Controller
    Controller->>Game: new Game()
    Controller->>ScoreObs: new LevelUpScoreObserver()
    Controller->>Game: start(scoreObserver)
    Game->>Board: with_value(col, row, 2) x2
    Game-->>Controller: return board
    Controller->>Controller: notifyBoardUpdate()
    Controller->>CLI: onBoardUpdate(board, score)
    deactivate Controller
    
    CLI->>Controller: hasNewScoreLevel()
    Controller-->>CLI: false
    CLI->>Renderer: showBoard(board, score, false)
    
    activate Renderer
    Renderer->>Display: new Display()
    Renderer->>Display: format(board)
    Display-->>Renderer: formatted string
    Renderer->>Renderer: figlet, chalk, boxen styling
    deactivate Renderer
    
    CLI->>Input: setupKeyboardInput()
    Input->>Input: readline setup, keypress events
    deactivate CLI

    Note over User, ScoreObs: Game Loop - User Input & State Updates
    User->>Input: keypress (e.g., "left")
    
    activate Input
    Input->>Input: handleKeyPress(key)
    Input->>Controller: handleMove("left")
    deactivate Input
    
    activate Controller
    Controller->>Game: tilt(board, "left")
    
    activate Game
    Game->>Game: BoardControl.tiltLeft(board, this)
    Note over Game: Row processing & tile merging
    Game->>ScoreObs: scoreIncreasedBy(value) [if tiles merged]
    ScoreObs->>ScoreObs: _newScoreLevel = true [if new high score]
    Game->>Board: with_value(col, row, newTile)
    Game-->>Controller: return new board
    deactivate Game
    
    Controller->>Controller: notifyBoardUpdate()
    Controller->>CLI: onBoardUpdate(board, score)
    
    Controller->>Controller: checkGameEnd()
    alt board not full and not complete
        Controller-->>Input: true (continue)
    else game ended
        Controller->>CLI: onGameEnd(reason)
        CLI->>Renderer: showGameEnd(reason)
        Renderer->>Renderer: figlet end message, process.exit()
    end
    deactivate Controller
    
    activate CLI
    CLI->>Controller: hasNewScoreLevel()
    Controller->>ScoreObs: hasNewScoreLevel()
    ScoreObs-->>Controller: true/false
    Controller-->>CLI: boolean
    
    CLI->>Renderer: showBoard(board, score, hasNewScoreLevel)
    
    activate Renderer
    Renderer->>Display: format(board)
    Display-->>Renderer: formatted string
    
    alt hasNewScoreLevel
        Renderer->>Renderer: boxen with levelUp styling
        CLI->>Controller: resetScoreLevel()
        Controller->>ScoreObs: resetNetScoreLevel()
    else normal display
        Renderer->>Renderer: boxen with normal styling
    end
    deactivate Renderer
    
    deactivate CLI

    Note over User, ScoreObs: Error Handling
    User->>Input: invalid keypress
    Input->>Controller: handleMove("invalid")
    Controller->>Game: tilt(board, "invalid")
    Game-->>Controller: throws InvalidTiltDirectionError
    Controller->>Controller: catch error, log message
    Controller-->>Input: true (continue)

    Note over User, ScoreObs: Game End Scenarios  
    alt Board Full
        Controller->>Board: isFull()
        Board-->>Controller: true
        Controller->>CLI: onGameEnd(BoardFull)
    else 2048 Reached
        Controller->>Board: isComplete()
        Board-->>Controller: true
        Controller->>CLI: onGameEnd(BoardComplete)  
    else User Quit (Ctrl+C)
        Input->>Controller: quit()
        Controller->>CLI: onGameEnd(PlayerQuit)
    end
    
    CLI->>Renderer: showGameEnd(reason)
    Renderer->>Renderer: display appropriate message, exit
```

## Class Diagram

```mermaid

classDiagram
    %% CLI Application Layer
    class CLIApplication {
        -controller: GameController
        -inputHandler: InputHandler
        -renderer: UIRenderer
        +constructor()
        +run(): void
        +onBoardUpdate(board: Board, score: number): void
        +onGameEnd(reason: EndReason): void
    }

    class GameController {
        -game: Game
        -board: Board
        -scoreObserver: LevelUpScoreObserver
        -observer?: GameStateObserver
        +constructor()
        +start(): void
        +handleMove(direction: string): boolean
        +quit(): void
        +setObserver(observer: GameStateObserver): void
        +hasNewScoreLevel(): boolean
        +resetScoreLevel(): void
        -checkGameEnd(): EndReason | null
        -notifyBoardUpdate(): void
    }

    class InputHandler {
        -controller: GameController
        +constructor(controller: GameController)
        +setupKeyboardInput(): void
        -handleKeyPress(key: KeyPress): void
    }

    class UIRenderer {
        -display: Display
        -normalBoardBoxProps: boxen.Options
        -levelUpBoardBoxProps: boxen.Options
        +constructor()
        +showInitialScreen(): void
        +showBoard(board: Board, score: number, hasNewScoreLevel: boolean): void
        +showGameEnd(reason: EndReason): void
    }

    %% CLI Interfaces and Types
    class GameStateObserver {
        <<interface>>
        +onBoardUpdate(board: Board, score: number): void
        +onGameEnd(reason: EndReason): void
    }

    class EndReason {
        <<enumeration>>
        PlayerQuit
        BoardFull
        BoardComplete
    }

    class KeyPress {
        <<type>>
        +ctrl: boolean
        +name: string
    }

    %% Core Game Classes (Unchanged)
    class Game {
        -_board: Board
        -_score: number
        -_hasSlid: boolean
        -_scoreObserver: ScoreObserver
        +constructor(board?: Board)
        +collapsed(value: number): void
        +slid(): void
        +board(): Board
        +score(): number
        +shuffle(unshuffled: number[]): number[]
        +start(scoreObserver?: ScoreObserver): Board
        +choosePopulationValue(): number
        +tilt(board: Board, direction: string): Board
        -getRandomInt(max: number): number
        -populateEmptySpace(board: Board): Board
    }

    class Board {
        -_board: number[][]
        +constructor(spaces?: number[][])
        +spaces(): number[][]
        +width(): number
        +height(): number
        +isFull(): boolean
        +isComplete(): boolean
        +flatten(): number[]
        +with_value(column: number, row: number, value: number): Board
        +toString(): string
        +rowAtPosition(position: number): number[]
        +print(): void
        +findEmptySpaces(): EmptySpace[]
    }

    class Display {
        +pad(value: number): number | string
        +format(board: Board): string
    }

    %% Control Classes
    class BoardControl {
        +tiltLeft(board: Board, observer?: RowTiltObserver)$ Board
        +tiltRight(board: Board, observer?: RowTiltObserver)$ Board
        +tiltDown(board: Board, observer?: RowTiltObserver)$ Board
        +tiltUp(board: Board, observer?: RowTiltObserver)$ Board
        -tilt(board: Board, observer: RowTiltObserver)$ Board
    }

    class BoardRotator {
        +rotate90Degrees(board: Board, rotationCount?: number)$ Board
    }

    class RowControl {
        -_row: number[]
        +constructor(row: number[])
        +slidePopulatedSpaces(observer: RowTiltObserver): number[]
        +tilt(observer?: RowTiltObserver): number[]
        +sumEqualNeighbours(spaces: number[], observer: RowTiltObserver): number[]
        -isSpacePopulated(space: number): boolean
        -areNeighboursEqual(space1: number, space2: number): boolean
    }

    %% Observer Interfaces and Implementations
    class RowTiltObserver {
        <<interface>>
        +collapsed(value: number): void
        +slid(): void
    }

    class NullRowTiltObserver {
        +slid(): void
        +collapsed(value: number): void
    }

    class ScoreObserver {
        <<interface>>
        +scoreIncreasedBy(score: number): void
    }

    class NullScoreObserver {
        +scoreIncreasedBy(score: number): void
    }

    class LevelUpScoreObserver {
        -_scoreLevel: number
        -_newScoreLevel: boolean
        +scoreIncreasedBy(score: number): void
        +hasNewScoreLevel(): boolean
        +resetNetScoreLevel(): void
    }

    %% Enums and Error Classes
    class Direction {
        <<enumeration>>
        Up: "up"
        Down: "down"
        Left: "left" 
        Right: "right"
    }

    class InvalidTiltDirectionError {
        +constructor(message?: string)
        +name: string
    }

    class Error {
        <<built-in>>
        +message: string
        +name: string
        +stack?: string
    }

    class RangeError {
        <<built-in>>
        +message: string
        +name: string
    }

    %% Type Definitions
    class EmptySpace {
        <<type>>
        +row: number
        +column: number
    }

    %% Main Application Entry Point
    class Main2048 {
        <<module>>
        +main(): void
    }

    %% CLI Layer Relationships
    CLIApplication --> GameController : orchestrates
    CLIApplication --> InputHandler : creates & uses
    CLIApplication --> UIRenderer : creates & uses
    CLIApplication ..|> GameStateObserver : implements

    GameController --> Game : manages
    GameController --> Board : tracks state
    GameController --> LevelUpScoreObserver : uses
    GameController --> GameStateObserver : notifies
    GameController --> EndReason : uses

    InputHandler --> GameController : delegates to
    InputHandler --> KeyPress : handles

    UIRenderer --> Display : uses
    UIRenderer --> Board : renders
    UIRenderer --> EndReason : handles

    %% Core Game Relationships (Preserved)
    Game --> Board : manages
    Game --> ScoreObserver : notifies
    Game ..|> RowTiltObserver : implements
    Game --> BoardControl : delegates to
    Game --> Direction : uses
    Game --> InvalidTiltDirectionError : throws

    BoardControl --> Board : operates on
    BoardControl --> RowTiltObserver : notifies
    BoardControl --> BoardRotator : uses for rotation
    BoardControl --> RowControl : creates

    BoardRotator --> Board : transforms
    BoardRotator --> RangeError : throws

    RowControl --> RowTiltObserver : notifies

    Display --> Board : formats

    Board --> EmptySpace : returns
    Board --> RangeError : throws

    RowTiltObserver <|.. NullRowTiltObserver : implements
    RowTiltObserver <|.. Game : implements

    ScoreObserver <|.. NullScoreObserver : implements  
    ScoreObserver <|.. LevelUpScoreObserver : implements

    InvalidTiltDirectionError --|> Error : extends

    %% Main application relationships
    Main2048 --> CLIApplication : creates & runs

    %% Notes about the architecture
    note for CLIApplication "Orchestrates CLI components\nImplements GameStateObserver\nNo business logic"
    note for GameController "Pure game state management\nObserver pattern coordinator\nSingle responsibility"
    note for UIRenderer "All display logic isolated\nChalk, figlet, boxen styling\nNo game logic"
    note for InputHandler "Keyboard input processing\nValidation and delegation\nNo game state"
    
```
