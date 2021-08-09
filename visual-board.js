export default class VisualBoard {
    constructor(m, n, cellSize) {
        this.n = n;//lines
        this.m = m;//rows
        this.cellSize = cellSize;
    }
    draw(p5context, gameBoard) {
        const { n, m } = this;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                p5context.push();
                if (!gameBoard[j][i]) {
                    p5context.noFill();
                }
                p5context.square(i * this.cellSize, j * this.cellSize, this.cellSize);
                p5context.pop();
            }
        }
    }
}