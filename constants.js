const NRROWS = 20, NRCOLS = 10;
const CELLSIZE = 30;

const SHAPES = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],

    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],

    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],

    [
        [1, 1],
        [1, 1],
    ],

    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],

    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],

    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],

]
const BLOCKED = 2;
const FULL_LINE_SCORE = 100;
const DOWN_ARROW_SCORE = 1;

export { NRROWS, NRCOLS, CELLSIZE, SHAPES, BLOCKED, FULL_LINE_SCORE, DOWN_ARROW_SCORE };