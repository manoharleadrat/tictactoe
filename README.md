# Tic Tac Toe - Next.js TypeScript with AI

A beautiful and interactive Tic Tac Toe game built with Next.js, TypeScript, and Tailwind CSS. Now featuring an intelligent AI opponent with multiple difficulty levels!

## Features

- 🎮 **Interactive Game Board**: Click on any empty cell to make your move
- 🤖 **AI Opponent**: Play against an intelligent computer opponent
- 🎯 **Multiple Difficulty Levels**: 
  - **Easy**: Random moves (good for beginners)
  - **Medium**: Strategic play with win/block logic
  - **Hard**: Unbeatable AI using minimax algorithm
- 🔄 **Undo Functionality**: Take back your last move if you change your mind
- 📊 **Score Tracking**: Persistent score tracking with localStorage
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **TypeScript**: Full type safety and better development experience
- 🏆 **Win Detection**: Automatic win detection with visual highlighting
- 👥 **Game Modes**: Choose between Human vs Human or Human vs AI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tictactoe
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Main game page
│   └── globals.css     # Global styles
├── components/
│   ├── Cell.tsx        # Individual cell component
│   ├── GameBoard.tsx   # Game board component
│   ├── GameInfo.tsx    # Game status display
│   ├── ScoreBoard.tsx  # Score tracking component
│   └── ControlButtons.tsx # Game control buttons
└── lib/
    └── game.ts         # Game logic and types
```

## Game Rules

1. **Human vs AI Mode**: You play as X, AI plays as O
2. **Human vs Human Mode**: Two players take turns
3. Players take turns placing their mark on the board
4. The first player to get 3 marks in a row (horizontally, vertically, or diagonally) wins
5. If all 9 squares are filled and no one has 3 in a row, the game is a draw
6. Use the "Undo Move" button to take back your last move
7. Click "New Game" to start fresh
8. Scores are automatically saved and persist between sessions

## AI Difficulty Levels

- **😊 Easy**: The AI makes random moves, perfect for beginners
- **🤔 Medium**: The AI tries to win and block your moves, plus prefers center and corner positions
- **😈 Hard**: The AI uses the minimax algorithm for optimal play - nearly unbeatable!

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects
- **localStorage** - Persistent score storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with ❤️ using Next.js and TypeScript
- Inspired by classic Tic Tac Toe games
- UI design inspired by modern web applications