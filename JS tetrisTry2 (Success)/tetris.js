// import * as shapesjs from './shapes.js';
let canvas = document.getElementById('tetris');
let context = canvas.getContext('2d');

// context.scale(20, 20); // multiplied all draws by 20 instead of using the scale with (20, 20);
let maxX = 16;
let maxY = 30;

// function reset() {
//     currShape = generateCurrShape();
//     arena = generateMatrix(maxX, maxY);
// }

function resetBoard() {
    arena = [];
    for(let y = 0; y < maxY; y++) {
        arena.push([]);
        for(let x = 0; x < maxX; x++) {
            arena[y].push(0);
        }
    }
};

function resetShape() {
    currShape = generateCurrShape();
}

function detectDownwardCollision() {
    let value;
    for(let y = 0; y < currShape.matrix.length; y++) {
        // console.log(currShape.matrix[y].length)
        console.log(currShape.matrix[y])
        for(let x = 0; x < currShape.matrix[y].length; x++) {
            if(currShape.matrix[y][x] !== 0) { // checking whether or not there is something drawn there in the shape matrix
                if(arena[y + currShape.y + 1] == undefined) { // collision detection for bottom
                    value = 'bottomCollision';
                    // x = currShape.matrix[y].length;
                    // y = currShape.matrix.length;
                } else if(arena[y + currShape.y + 1][x + currShape.x] !== 0) {
                    if(currShape.y == 0) {
                        value = 'resetBoard'
                        // x = currShape.matrix[y].length;
                        // y = currShape.matrix.length;
                    } else {
                        value = 'arenaCollision';
                        // x = currShape.matrix[y].length;
                        // y = currShape.matrix.length;
                    }
                }
            }
        }
    };

    if(value == 'bottomCollision') { // action based on the top part of the function
        for(let y = 0; y < currShape.matrix.length; y++) {
            for(let x = 0; x < currShape.matrix[y].length; x++) {
                if(currShape.matrix[y][x] !== 0) {
                    arena[y + currShape.y][x + currShape.x] = currShape.color;
                }
            }
        }
        resetShape();
    } else if(value == 'arenaCollision') { // if it collides downward with something on the arena then I need to keep it there
        for(let y = 0; y < currShape.matrix.length; y++) {
            for(let x = 0; x < currShape.matrix[y].length; x++) {
                if(currShape.matrix[y][x] !== 0) {
                    arena[y + currShape.y][x + currShape.x] = currShape.color;
                }
            }
        }
        resetShape();
    } else if(value == 'resetBoard') {
        resetBoard();
    } else {
        currShape.y++;
    }
    timeCounter = 0;
}

function colorBackground() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// keeping track of time inorder to know when to drop the currShape
let timeCounter = 0
setInterval(() => {timeCounter += 100;}, 100);


function update() {
    colorBackground();

    currShape.show();
    currShape.move();
    areanShow();
    checkArenaForFullRows();
    // requestAnimationFrame(update()); // used setup() and setInterva to replace this
};

function setup() {
    return setInterval(update, 100);
}
setup();


//checking Arena rows
function checkRow(row) {
    for(let x = 0; x < row.length; x++) {
        if(row[x] == 0) {
            return false
        }
    }
    return true;
};
function checkArenaForFullRows() {
    for(let y = 0; y < arena.length; y++) {
        let isFullRow = checkRow(arena[y]);
        if(isFullRow) {
            arena.splice(y, 1);
            arena.unshift(new Array(maxX).fill(0));
        };
    }
}
//

function checkIfRotationIntersects(rotatedMatrix) { // return true if intersecting and false if it doesent
    for(let y = 0; y < rotatedMatrix.length; y++) {
        for(let x = 0; x < rotatedMatrix[y].length; x++) {
            if(rotatedMatrix[y][x] !== 0 && (arena[y + currShape.y][x + currShape.x] !== 0 || currShape.x + x < 0 || currShape.x + x > maxX || currShape.y + y < 0 || currShape + y > maxY)) { // checks the arena and borders
                return true;
            }
        }
    }
    return false;
}

document.addEventListener('keydown', (event) => { // dececting the keypresses
    if(event.keyCode == 37) {
        let edgeCollision = false;
        let arenaCollision = false;

        for(let y = 0; y < currShape.matrix.length; y++) {
            for(let x = 0; x < currShape.matrix[y].length; x++) {
                if(currShape.matrix[y][x] !== 0) {
                    if((x + currShape.x) <= 0) {
                        edgeCollision = true;
                    }
                }
                if(currShape.matrix[y][x] !== 0) { // collision detection for arena
                    if(arena[y + currShape.y][x + currShape.x - 1] !== 0) {
                        arenaCollision = true;
                    }                
                }
            }
        }
        if(!edgeCollision && !arenaCollision) {
            currShape.x--;
        }
    } else if(event.keyCode == 39) {
        let edgeCollision = false;
        let arenaCollision = false;
        for(let y = 0; y < currShape.matrix.length; y++) {
            for(let x = 0; x < currShape.matrix[y].length; x++) {
                if(currShape.matrix[y][x] !== 0) { // collision detection for edge
                    if((x + currShape.x) + 1 >= maxX) {
                        edgeCollision = true;
                    }
                }
                if(currShape.matrix[y][x] !== 0) { // collision detection for arena
                    if(arena[y + currShape.y][x + currShape.x + 1] !== 0) {
                        arenaCollision = true;
                    }                
                }
            }
        }
        if(!edgeCollision && !arenaCollision) {
            currShape.x++;
        }
    } else if(event.keyCode == 38) {
        // let currCopy = Object.assign([], currShape.matrix) ; // creating a copy of the currShape - so that I can rotate it and check if the rotation will be able to be done before I apply it to the shape
        let currCopy = [];
        for(let y = 0; y < currShape.matrix.length; y++) {
            currCopy.push([]);
            for(let x = 0; x < currShape.matrix[y].length; x++) {
                currCopy[y].push(currShape.matrix[y][x]);
            }
        };

        for(let y = 0; y < currCopy.length; y++) {
            for(let x = y; x < currCopy[y].length; x++) {
                let temp = currCopy[y][x]; // keeping track of matrix[y][x] before the switch
                currCopy[y][x] = currCopy[x][y];
                currCopy[x][y] = temp;
            }
        }
        let yLength = currCopy[0].length;
        for(let y = 0; y < currCopy.length; y++) {
            for(let x = 0; x < yLength / 2; x++) {
                let temp = currCopy[y][x];
                currCopy[y][x] = currCopy[y][yLength - 1 - x];
                currCopy[y][yLength - 1 - x] = temp;
            }
        }
        let isIntersecting = checkIfRotationIntersects(currCopy);
        if(!isIntersecting) {
            currShape.matrix = currCopy;
        }
    } else if(event.keyCode == 40) {
        detectDownwardCollision();
    }
    //     let isCollision = detectDownwardCollision();
    //         if(isCollision == 'bottomCollision') {
    //             for(let y = 0; y < currShape.matrix.length; y++) {
    //                 for(let x = 0; x < currShape.matrix[y].length; x++) {
    //                     if(currShape.matrix[y][x] !== 0) {
    //                         arena[y + currShape.y][x + currShape.x] = currShape.color;
    //                     }
    //                 }
    //             }
    //             resetShape();
    //         } else if(isCollision == 'arenaCollision') { // if it collides downward with something on the arena then I need to keep it there
    //             for(let y = 0; y < currShape.matrix.length; y++) {
    //                 for(let x = 0; x < currShape.matrix[y].length; x++) {
    //                     if(currShape.matrix[y][x] !== 0) {
    //                         arena[y + currShape.y][x + currShape.x] = currShape.color;
    //                     }
    //                 }
    //             }
    //             resetShape();
    //         } else {
    //             currShape.y++;
    //         }
    //     timeCounter = 0;
    // }
});