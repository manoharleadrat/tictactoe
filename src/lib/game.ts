// Game types
export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type GameStatus = 'playing' | 'won' | 'draw';
export type GameMode = 'human-vs-human' | 'human-vs-ai';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  board: CellValue[];
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  moveHistory: number[];
  gameMode: GameMode;
  difficulty: Difficulty;
  isAiThinking: boolean;
}

export interface Score {
  human: number;
  ai: number;
  draws: number;
}

export class TicTacToeGame {
  private board: CellValue[];
  private currentPlayer: Player;
  private status: GameStatus;
  private winner: Player | null;
  private moveHistory: number[];
  private gameMode: GameMode;
  private difficulty: Difficulty;
  private isAiThinking: boolean;
  private humanPlayer: Player;

  constructor(gameMode: GameMode = 'human-vs-ai', difficulty: Difficulty = 'medium') {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.status = 'playing';
    this.winner = null;
    this.moveHistory = [];
    this.gameMode = gameMode;
    this.difficulty = difficulty;
    this.isAiThinking = false;
    this.humanPlayer = 'X'; // Human always plays X, AI plays O
  }

  public getGameState(): GameState {
    return {
      board: [...this.board],
      currentPlayer: this.currentPlayer,
      status: this.status,
      winner: this.winner,
      moveHistory: [...this.moveHistory],
      gameMode: this.gameMode,
      difficulty: this.difficulty,
      isAiThinking: this.isAiThinking
    };
  }

  public setGameMode(gameMode: GameMode): void {
    this.gameMode = gameMode;
    this.reset();
  }

  public setDifficulty(difficulty: Difficulty): void {
    this.difficulty = difficulty;
  }

  public isAiTurn(): boolean {
    return this.gameMode === 'human-vs-ai' && this.currentPlayer === 'O';
  }

  public async makeMove(index: number): Promise<boolean> {
    if (this.status !== 'playing' || this.board[index] !== null) {
      return false;
    }

    this.board[index] = this.currentPlayer;
    this.moveHistory.push(index);
    
    if (this.checkWin()) {
      this.status = 'won';
      this.winner = this.currentPlayer;
    } else if (this.checkDraw()) {
      this.status = 'draw';
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    return true;
  }

  public async makeAiMove(): Promise<boolean> {
    if (this.status !== 'playing' || !this.isAiTurn()) {
      return false;
    }

    this.isAiThinking = true;
    
    // Add a small delay to make AI thinking visible
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const aiMove = this.getAiMove();
    if (aiMove !== -1) {
      this.board[aiMove] = this.currentPlayer;
      this.moveHistory.push(aiMove);
      
      if (this.checkWin()) {
        this.status = 'won';
        this.winner = this.currentPlayer;
      } else if (this.checkDraw()) {
        this.status = 'draw';
      } else {
        this.currentPlayer = 'X';
      }
    }

    this.isAiThinking = false;
    return aiMove !== -1;
  }

  public undoMove(): boolean {
    if (this.moveHistory.length === 0 || this.status !== 'playing') {
      return false;
    }

    const lastMove = this.moveHistory.pop()!;
    this.board[lastMove] = null;
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    
    return true;
  }

  public reset(): void {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.status = 'playing';
    this.winner = null;
    this.moveHistory = [];
  }

  private checkWin(): boolean {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return this.board[a] !== null && 
             this.board[a] === this.board[b] && 
             this.board[b] === this.board[c];
    });
  }

  private checkDraw(): boolean {
    return this.board.every(cell => cell !== null);
  }

  public getWinningPattern(): number[] | null {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (this.board[a] !== null && 
          this.board[a] === this.board[b] && 
          this.board[b] === this.board[c]) {
        return pattern;
      }
    }
    return null;
  }

  public getAvailableMoves(): number[] {
    return this.board
      .map((cell, index) => cell === null ? index : null)
      .filter((index): index is number => index !== null);
  }

  public isGameOver(): boolean {
    return this.status === 'won' || this.status === 'draw';
  }

  private getAiMove(): number {
    const availableMoves = this.getAvailableMoves();
    
    if (availableMoves.length === 0) {
      return -1;
    }

    switch (this.difficulty) {
      case 'easy':
        return this.getEasyMove(availableMoves);
      case 'medium':
        return this.getMediumMove(availableMoves);
      case 'hard':
        return this.getHardMove(availableMoves);
      default:
        return this.getMediumMove(availableMoves);
    }
  }

  private getEasyMove(availableMoves: number[]): number {
    // Random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  private getMediumMove(availableMoves: number[]): number {
    // Try to win, then block, then random
    const winMove = this.findWinningMove('O');
    if (winMove !== -1) return winMove;

    const blockMove = this.findWinningMove('X');
    if (blockMove !== -1) return blockMove;

    // Prefer center and corners
    const center = 4;
    if (availableMoves.includes(center)) return center;

    const corners = [0, 2, 6, 8];
    for (const corner of corners) {
      if (availableMoves.includes(corner)) return corner;
    }

    return this.getEasyMove(availableMoves);
  }

  private getHardMove(availableMoves: number[]): number {
    // Use minimax algorithm for optimal play
    let bestScore = -Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      this.board[move] = 'O';
      const score = this.minimax(this.board, 0, false);
      this.board[move] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  private minimax(board: CellValue[], depth: number, isMaximizing: boolean): number {
    if (this.checkWinForPlayer(board, 'O')) return 10 - depth;
    if (this.checkWinForPlayer(board, 'X')) return depth - 10;
    if (this.checkDrawForBoard(board)) return 0;

    const availableMoves = board
      .map((cell, index) => cell === null ? index : null)
      .filter((index): index is number => index !== null);

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (const move of availableMoves) {
        board[move] = 'O';
        const score = this.minimax(board, depth + 1, false);
        board[move] = null;
        maxScore = Math.max(maxScore, score);
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (const move of availableMoves) {
        board[move] = 'X';
        const score = this.minimax(board, depth + 1, true);
        board[move] = null;
        minScore = Math.min(minScore, score);
      }
      return minScore;
    }
  }

  private findWinningMove(player: Player): number {
    const availableMoves = this.getAvailableMoves();
    
    for (const move of availableMoves) {
      this.board[move] = player;
      if (this.checkWinForPlayer(this.board, player)) {
        this.board[move] = null;
        return move;
      }
      this.board[move] = null;
    }
    
    return -1;
  }

  private checkWinForPlayer(board: CellValue[], player: Player): boolean {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return board[a] === player && board[b] === player && board[c] === player;
    });
  }

  private checkDrawForBoard(board: CellValue[]): boolean {
    return board.every(cell => cell !== null);
  }
}
