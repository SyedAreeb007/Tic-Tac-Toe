import React, { useState } from 'react';
import logo from '../Assets/Images/logo.png';

const Game = () => {
    const initialBoard = Array(9).fill(null); // Initial state of the game board
    const [board, setBoard] = useState(initialBoard);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board)) {
            return;
        }
        const newBoard = [...board];
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const renderSquare = (index) => {
        const squareValue = board[index];
        const squareClassName = squareValue ? `square ${squareValue}` : "square";

        return (
            <button className={squareClassName} onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    const resetGame = () => {
        setBoard(initialBoard);
        setXIsNext(true);
    };

    const status = () => {
        const winner = calculateWinner(board);
        const isBoardFull = board.every(square => square !== null);

        if (winner) {
            return <h2>Winner: {winner}</h2>;
        } else if (isBoardFull) {
            return <h2>It's a tie!</h2>;
        } else {
            return <h2>Next Player: {xIsNext ? 'X' : 'O'}</h2>;
        }
    };

    return (
        <div className="board-container">
            <img src={logo} alt="Logo" className="logo" />
            <h1>
    <span style={{ color: 'black' }}>Tic </span>
    <span style={{ color: 'yellow', WebkitTextStroke: '2px black' }}>Tac </span>
    <span style={{ color: 'black' }}>Toe</span>
</h1>


            <div className="status">{status()}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button className="button" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default Game;
