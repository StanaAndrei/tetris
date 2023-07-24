import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js";
import { NRROWS, NRCOLS, CELLSIZE, SHAPES, BLOCKED, FULL_LINE_SCORE, DOWN_ARROW_SCORE } from "./constants.js";
import Piece from "./piece.js";
import VisualBoard from "./visual-board.js";
const messageDiv = document.querySelector('#message');
let score = 0;
const scoreDiv = document.querySelector('#score');
let visBoard;
let gameBoard = new Array(NRROWS).fill().map(() => new Array(NRCOLS).fill(0));
let piece;
let canGoDown = new Boolean();

const getRandElemFrom = arr => {
    return arr[Math.floor(arr.length * Math.random())];
}

const updateBoard = () => {
    for (let i = 0; i < NRROWS; i++) {
        for (let j = 0; j < NRCOLS; j++) {
            if (gameBoard[i][j] !== BLOCKED) {
                gameBoard[i][j] = 0;
            }
            piece.posOf1s.forEach(element => {
                if (element.i === i && element.j === j) {
                    gameBoard[i][j] = 1;
                }
            });
        }
    }
}

const blockPieces = () => {
    for (let i = 0; i < NRROWS; i++) {
        for (let j = 0; j < NRCOLS; j++) {
            if (gameBoard[i][j] === 1) {
                gameBoard[i][j] = BLOCKED;
            }
        }
    }
}

const removeLines = () => {
    let fullLines = [];
    for (let i = 0; i < NRROWS; i++) {
        let ok = true;
        for (let j = 0; j < NRCOLS; j++) {
            ok &= Boolean(gameBoard[i][j] === BLOCKED);
        }
        if (ok) {
            fullLines.push(i);
        }
    }
    if (!fullLines.length) {
        return;
    }
    score += fullLines.length * FULL_LINE_SCORE;
    for (let it = 0; it < fullLines.length; it++) {
        for (let line = fullLines[it]; line > 0; line--) {
            for (let j = 0; j < NRCOLS; j++) {
                gameBoard[line][j] = gameBoard[line - 1][j];
            }
        }
    }
}

const checkGameOver = () => {
    for (let j = 0; j < NRCOLS; j++) {
        if (gameBoard[0][j] === BLOCKED) {
            return true;
        }
    }
    return false;
}

new p5(p5context => {
    p5context.setup = () => {
        p5context.createCanvas(NRCOLS * CELLSIZE, NRROWS * CELLSIZE);
        visBoard = new VisualBoard(NRCOLS, NRROWS, CELLSIZE);
        piece = new Piece(0, NRCOLS / 2, getRandElemFrom(SHAPES));
        piece.rotate(gameBoard);
        setInterval(() => canGoDown = piece.applyGravity(gameBoard), 1500);
    }
    p5context.draw = () => {
        p5context.background(20);
        visBoard.draw(p5context, gameBoard);
        if (checkGameOver()) {
            messageDiv.innerText = 'YOU LOST!';
            return;
        }
        updateBoard();
        if (!canGoDown) {
            blockPieces();
            piece = new Piece(0, NRCOLS / 2, getRandElemFrom(SHAPES));
            piece.rotate(gameBoard);
            canGoDown = true;
        }
        removeLines();
        scoreDiv.innerText = `${score}`;
    }
    p5context.keyPressed = () => {
        const {
            LEFT_ARROW,
            RIGHT_ARROW,
            UP_ARROW,
            DOWN_ARROW
        } = p5context;
        switch (p5context.keyCode) {
            case DOWN_ARROW:
                score += DOWN_ARROW_SCORE;
                canGoDown = piece.applyGravity(gameBoard);
                break;
            case UP_ARROW:
                piece.rotate(gameBoard);
                break;
            case LEFT_ARROW:
                piece.move(-1, gameBoard);
                break;
            case RIGHT_ARROW:
                piece.move(1, gameBoard);
                break;
        }
    }
}, document.querySelector('#canvas-area'));