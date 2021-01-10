// import * as tetrisjs from './tetris.js';

function pickShape() {
    let num = Math.floor((Math.random()) * 7);
    let shapesArr = [
        {
            matrix: [
                [0,    0,   0,    0],
                ['l', 'l', 'l', 'l'],
                [0,    0,   0,    0],
                [0,    0,   0,    0],
            ],
            color: 'skyblue',
        },
        {
            matrix: [
                [0,   0,   0],
                ['b', 0,   0],
                ['b', 'b', 'b'],
            ],
            color: 'blue',
        },
        {
            matrix: [
                [0,    0,   0],
                [0,    0,  'o'],
                ['o', 'o', 'o'],
            ],
            color: 'orange',
        },
        {
            matrix: [
                ['y', 'y'],
                ['y', 'y'],
            ],
            color: 'yellow',
        },
        {
            matrix: [
                [0,    0,    0],
                [0,   'g', 'g'],
                ['g', 'g',   0],
            ],
            color: 'green',
        },
        {
            matrix: [
                [0,     0,     0],
                [0,    'p',    0],
                ['p',  'p',  'p'],
            ],
            color: 'purple',
        },
        {
            matrix: [
                [0,     0,     0],
                ['r',  'r',    0],
                [0,    'r',  'r'],
            ],
            color: 'red',
        },
    ];
    return shapesArr[num];
};

function generateCurrShape() {
    let shape = pickShape();
    return new Shape(shape.matrix, shape.color);
};

class Shape {
    constructor(matrix, color) {
        this.matrix = matrix;
        this.color = color;
        this.x = (maxX / 2) - 2;
        this.y = 0;
    }
    show() {
        for(let y = 0; y < this.matrix.length; y++) {
            for(let x = 0; x < this.matrix[y].length; x++) {
                if(this.matrix[y][x] !== 0) {
                    context.fillStyle = this.color;
                    context.fillRect((x + this.x) * 20, (y + this.y) * 20, 20, 20);
                } 
            }
        }
    }
    move() {
        if(timeCounter == 1000) {
            detectDownwardCollision();
            // let isCollision = detectDownwardCollision();
            // if(isCollision == 'bottomCollision') {
            //     for(let y = 0; y < currShape.matrix.length; y++) {
            //         for(let x = 0; x < currShape.matrix[y].length; x++) {
            //             if(currShape.matrix[y][x] !== 0) {
            //                 arena[y + currShape.y][x + currShape.x] = currShape.color;
            //             }
            //         }
            //     }
            //     resetShape();
            // } else if(isCollision == 'arenaCollision') { // if it collides downward with something on the arena then I need to keep it there
            //     for(let y = 0; y < currShape.matrix.length; y++) {
            //         for(let x = 0; x < currShape.matrix[y].length; x++) {
            //             if(currShape.matrix[y][x] !== 0) {
            //                 arena[y + currShape.y][x + currShape.x] = currShape.color;
            //             }
            //         }
            //     }
            //     resetShape();
            // }
            // else {
            //     currShape.y++;
            // }
            // timeCounter = 0; // whether the current shape changes or not I want to reset the timeCounter
        }
    }
};

let currShape = generateCurrShape();










// ----------------------------------- EXTRA ------------------------------------------------------
// class LightBlueShape extends Shape {
//     constructor(matrix, color) {
//         super(matrix, color);
//     }
// };


// link for module video: https://www.youtube.com/watch?v=cRHQNNcYf6s