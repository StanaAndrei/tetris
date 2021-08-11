import { NRROWS, NRCOLS, BLOCKED } from "./constants.js";

const getPosOf1sFromShape = ({ line, col, shape }) => {
    let posOf1s = [];
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape.length; j++) {
            if (shape[i][j]) {
                posOf1s.push({
                    i: line + i,
                    j: col + j
                });
            }
        }
    }
    return posOf1s;
}

const isGoodPos = (i, j) => {
    return (i < NRROWS && j < NRCOLS && i >= 0 && j >= 0);
}

export default class Piece {
    constructor(line, col, shape) {
        this.line = line;
        this.col = col;
        this.shape = shape;
        this.len = shape.length;
        this.posOf1s = getPosOf1sFromShape(this);
    }
    move(dir, gameBoard) {
        if (!this.posOf1s.every(({ j }) => isGoodPos(0/**in position */, j + dir))) {
            return;
        }//*/
        for (let elem of this.posOf1s) {
            if (gameBoard[elem.i][elem.j + dir] === BLOCKED) {
                return;
            }
        }

        for (let elem of this.posOf1s) {
            elem.j += dir;
        }
        this.col += dir;
    }
    applyGravity(gameBoard) {
        if (!this.posOf1s.every(({ i }) => i + 1 !== NRROWS)) {
            return false;
        }
        for (let elem of this.posOf1s) {
            if (gameBoard[elem.i + 1][elem.j] === BLOCKED) {
                return false;
            }
        }

        for (let elem of this.posOf1s) {
            elem.i += 1;
        }
        this.line += 1;
        return true;
    }
    rotate(gameBoard) {
        const { len } = this;
        const aux = new Array(len).fill().map(() => new Array(len).fill(0));
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                aux[j][len - i - 1] = this.shape[i][j];
            }
        }
        let posOf1s = getPosOf1sFromShape(this);
        for (let elem of posOf1s) {
            const { i, j } = elem;
            if (!isGoodPos(i, j) || gameBoard[i][j] === BLOCKED) {
                return;
            }
        }
        this.shape = aux;
        this.posOf1s = posOf1s;
    }
}
